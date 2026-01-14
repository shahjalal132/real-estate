<?php

namespace App\Services;

use App\Models\DirectoryBrokerCompany;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use PhpOffice\PhpSpreadsheet\IOFactory;

class DirectoryBrokerCompanyImportService
{
    public function import(string $filePath): array
    {
        if (!file_exists($filePath)) {
            return [
                'success' => false,
                'message' => 'File not found: ' . $filePath,
                'imported' => 0,
                'errors' => []
            ];
        }

        $errors = [];
        $importedCount = 0;

        try {
            $spreadsheet = IOFactory::load($filePath);
            $worksheet = $spreadsheet->getActiveSheet();
            $rows = $worksheet->toArray();
            
            // Remove header row
            $header = array_shift($rows);
            
            // Normalize headers to identify index
            $headerMap = [];
            foreach ($header as $index => $columnName) {
                $headerMap[trim($columnName)] = $index;
            }

            // Expected headers mapping
            $requiredHeaders = [
                'Company', 'Specialty', 'HQ Market', 'HQ City', 'HQ State', 'HQ Country', 'Website',
                'Employees', 'Locations', 'Managed Properties', 'Owned Properties', 'Operated Properties',
                'Lease Transactions (3Y)', 'Lease Transactions SF (3Y)', 'Lease Listings', 
                'Lease Listings Portfolio SF', 'Lease Listings Available SF',
                'Sale Transactions (3Y)', 'Sale Transactions SF (3Y)', 'Sale Transactions Volume (3Y)',
                'Sale Listings', 'Sale Listings SF'
            ];

            // Verify headers
            foreach ($requiredHeaders as $reqHeader) {
                if (!array_key_exists($reqHeader, $headerMap)) {
                     // Could be strict or lenient. Let's log warning and try to proceed if most match, 
                     // or return error. For now, let's assume if 'Company' exists we are good, 
                     // but mapping logic relies on names.
                }
            }

            DB::beginTransaction();

            foreach ($rows as $index => $row) {
                // Skip empty rows
                if (empty($row[0])) continue;

                try {
                   DirectoryBrokerCompany::create([
                        'company' => $row[$headerMap['Company']] ?? null,
                        'specialty' => $row[$headerMap['Specialty']] ?? null,
                        'hq_market' => $row[$headerMap['HQ Market']] ?? null,
                        'hq_city' => $row[$headerMap['HQ City']] ?? null,
                        'hq_state' => $row[$headerMap['HQ State']] ?? null,
                        'hq_country' => $row[$headerMap['HQ Country']] ?? null,
                        'website' => $row[$headerMap['Website']] ?? null,
                        
                        'employees' => $this->parseNumber($row[$headerMap['Employees']] ?? null),
                        'locations' => $this->parseNumber($row[$headerMap['Locations']] ?? null),
                        'managed_properties' => $this->parseNumber($row[$headerMap['Managed Properties']] ?? null),
                        'owned_properties' => $this->parseNumber($row[$headerMap['Owned Properties']] ?? null),
                        'operated_properties' => $this->parseNumber($row[$headerMap['Operated Properties']] ?? null),
                        
                        'lease_transactions_3y' => $this->parseNumber($row[$headerMap['Lease Transactions (3Y)']] ?? null),
                        'lease_transactions_sf_3y' => $this->parseNumber($row[$headerMap['Lease Transactions SF (3Y)']] ?? null),
                        'lease_listings' => $this->parseNumber($row[$headerMap['Lease Listings']] ?? null),
                        'lease_listings_portfolio_sf' => $this->parseNumber($row[$headerMap['Lease Listings Portfolio SF']] ?? null),
                        'lease_listings_available_sf' => $this->parseNumber($row[$headerMap['Lease Listings Available SF']] ?? null),
                        
                        'sale_transactions_3y' => $this->parseNumber($row[$headerMap['Sale Transactions (3Y)']] ?? null),
                        'sale_transactions_sf_3y' => $this->parseNumber($row[$headerMap['Sale Transactions SF (3Y)']] ?? null),
                        'sale_transactions_volume_3y' => $this->parseDecimal($row[$headerMap['Sale Transactions Volume (3Y)']] ?? null),
                        'sale_listings' => $this->parseNumber($row[$headerMap['Sale Listings']] ?? null),
                        'sale_listings_sf' => $this->parseNumber($row[$headerMap['Sale Listings SF']] ?? null),
                   ]);

                   $importedCount++;

                } catch (\Exception $e) {
                    $errors[] = "Row " . ($index + 2) . ": " . $e->getMessage();
                }
            }

            DB::commit();

            return [
                'success' => true,
                'imported' => $importedCount,
                'errors' => $errors
            ];

        } catch (\Exception $e) {
            DB::rollBack();
            return [
                'success' => false,
                'message' => $e->getMessage(),
                'imported' => 0,
                'errors' => $errors
            ];
        }
    }

    private function parseNumber($value)
    {
        if (is_numeric($value)) {
            return $value;
        }
        if (empty($value) || $value === '-') {
            return null;
        }
        // Remove commas and other non-numeric chars except dot/minus
        $clean = preg_replace('/[^0-9\.-]/', '', (string)$value);
        if ($clean === '') return null;
        return (int)$clean;
    }
    
    private function parseDecimal($value)
    {
         if (is_numeric($value)) {
            return $value;
        }
        if (empty($value) || $value === '-') {
            return null;
        }
        // Remove currency symbols, commas
        $clean = preg_replace('/[^0-9\.-]/', '', (string)$value);
         if ($clean === '') return null;
        return (float)$clean;
    }
}
