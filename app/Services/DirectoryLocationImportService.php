<?php

namespace App\Services;

use App\Models\DirectoryLocation;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use PhpOffice\PhpSpreadsheet\IOFactory;
use Carbon\Carbon;

class DirectoryLocationImportService
{
    public function import(string $filePath)
    {
        if (!file_exists($filePath)) {
            return [
                'success' => false,
                'message' => 'File not found.',
                'imported' => 0,
                'errors' => []
            ];
        }

        try {
            $spreadsheet = IOFactory::load($filePath);
            $sheet = $spreadsheet->getActiveSheet();
            $rows = $sheet->toArray();
            
            // Remove header row
            $header = array_shift($rows);
            
            // Map headers to column indices
            $headerMap = $this->mapHeaders($header);
            
            // Validate essential headers
            if (!isset($headerMap['Company']) && !isset($headerMap['Address'])) {
                return [
                    'success' => false,
                    'message' => 'Required "Company" or "Address" columns not found.',
                    'imported' => 0,
                    'errors' => []
                ];
            }

            $importedCount = 0;
            $errors = [];
            $batchSize = 200;
            $batch = [];

            foreach ($rows as $index => $row) {
                // Skip empty rows
                if ($this->isRowEmpty($row)) {
                    continue;
                }

                try {
                    $locationData = $this->extractLocationData($row, $headerMap);
                    
                    // Add simple deduplication key (e.g. company + address + city)
                    // Does likely not have a unique ID in excel, so we might insert duplicates 
                    // or use updateOrCreate if we can identify unique.
                    // For now, assuming bulk insert. 
                    // To be safe and idempotent, we'll try updateOrCreate based on company + address
                    
                    $batch[] = $locationData;

                    if (count($batch) >= $batchSize) {
                        $this->processBatch($batch);
                        $importedCount += count($batch);
                        $batch = [];
                    }

                } catch (\Exception $e) {
                    $errors[] = "Row " . ($index + 2) . ": " . $e->getMessage();
                }
            }

            // Process remaining
            if (!empty($batch)) {
                $this->processBatch($batch);
                $importedCount += count($batch);
            }

            return [
                'success' => true,
                'message' => 'Import completed.',
                'imported' => $importedCount,
                'errors' => $errors
            ];

        } catch (\Exception $e) {
            Log::error('Directory Location Import Error: ' . $e->getMessage());
            return [
                'success' => false,
                'message' => 'Import failed: ' . $e->getMessage(),
                'imported' => 0,
                'errors' => [$e->getMessage()]
            ];
        }
    }

    private function processBatch(array $batch)
    {
        DB::transaction(function () use ($batch) {
            foreach ($batch as $data) {
                // Determine unique constraint. 
                // A location is uniquely identified by Address + City + Company usually.
                // We will use updateOrCreate to avoid duplicates on re-run.
                DirectoryLocation::updateOrCreate(
                    [
                        'company' => $data['company'],
                        'address' => $data['address'],
                        'city' => $data['city'],
                        'postal_code' => $data['postal_code'], // Adding postal code for stricter uniqueness
                    ],
                    $data
                );
            }
        });
    }

    private function mapHeaders(array $headerRow)
    {
        $map = [];
        foreach ($headerRow as $index => $value) {
            $map[trim($value)] = $index;
        }
        return $map;
    }

    private function isRowEmpty($row)
    {
        foreach ($row as $cell) {
            if (!empty($cell)) return false;
        }
        return true;
    }

    private function extractLocationData($row, $map)
    {
        return [
            'company' => $this->getValue($row, $map, 'Company'),
            'specialty' => $this->getValue($row, $map, 'Specialty'),
            'building_name' => $this->getValue($row, $map, 'Building Name'),
            'address' => $this->getValue($row, $map, 'Address'),
            'city' => $this->getValue($row, $map, 'City'),
            'state' => $this->getValue($row, $map, 'State'),
            'postal_code' => $this->getValue($row, $map, 'Postal Code'),
            'country' => $this->getValue($row, $map, 'Country'),
            'website' => $this->getValue($row, $map, 'Website'),
            
            'location_employees' => $this->getNumericValue($row, $map, 'Location Employees'),
            'lease_transactions_3y' => $this->getNumericValue($row, $map, 'Lease Transactions (3Y)'),
            'lease_transactions_sf_3y' => $this->getNumericValue($row, $map, 'Lease Transactions SF (3Y)'),
            'lease_listings' => $this->getNumericValue($row, $map, 'Lease Listings'),
            'lease_listings_portfolio_sf' => $this->getNumericValue($row, $map, 'Lease Listings Portfolio SF'),
            'lease_listings_available_sf' => $this->getNumericValue($row, $map, 'Lease Listings Available SF'),
            
            'sale_transactions_3y' => $this->getNumericValue($row, $map, 'Sale Transactions (3Y)'),
            'sale_transactions_sf_3y' => $this->getNumericValue($row, $map, 'Sale Transactions SF (3Y)'),
            'sale_transactions_volume_3y' => $this->getNumericValue($row, $map, 'Sale Transactions Volume (3Y)'),
            'sale_listings' => $this->getNumericValue($row, $map, 'Sale Listings'),
            'sale_listings_sf' => $this->getNumericValue($row, $map, 'Sale Listings SF'),
        ];
    }

    private function getValue($row, $map, $key)
    {
        return isset($map[$key]) && isset($row[$map[$key]]) ? trim($row[$map[$key]]) : null;
    }

    private function getNumericValue($row, $map, $key)
    {
        $val = $this->getValue($row, $map, $key);
        if ($val === null || $val === '') return 0;
        
        // Remove commas and other non-numeric chars except dot
        $cleanVal = preg_replace('/[^0-9.]/', '', $val);
        return is_numeric($cleanVal) ? $cleanVal : 0;
    }
}
