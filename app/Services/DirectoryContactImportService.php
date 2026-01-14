<?php

namespace App\Services;

use App\Models\DirectoryContact;
use Illuminate\Support\Facades\DB;
use PhpOffice\PhpSpreadsheet\IOFactory;

class DirectoryContactImportService
{
    /**
     * Import directory contacts from Excel file
     */
    public function import(string $filePath): array
    {
        $spreadsheet = IOFactory::load($filePath);
        $worksheet = $spreadsheet->getActiveSheet();
        $rows = $worksheet->toArray();

        if (empty($rows)) {
            return ['success' => false, 'message' => 'File is empty'];
        }

        // First row should be headers
        $headers = array_map('trim', array_map('strtolower', $rows[0]));
        $columnMapping = $this->mapColumns($headers);

        $imported = 0;
        $errors = [];

        DB::beginTransaction();
        try {
            // Start from row 2 (skip header)
            for ($i = 1; $i < count($rows); $i++) {
                $row = $rows[$i];
                
                // Skip empty rows
                if (empty(array_filter($row))) {
                    continue;
                }

                $data = [];
                foreach ($columnMapping as $dbColumn => $excelIndex) {
                    if ($excelIndex !== null && isset($row[$excelIndex])) {
                        $value = trim($row[$excelIndex]);
                        $data[$dbColumn] = $value !== '' ? $value : null;
                    }
                }

                // Skip if name is empty (assuming name is required)
                if (empty($data['name'])) {
                    continue;
                }

                // Normalize data
                $data = $this->normalizeData($data);

                try {
                    // Assuming we might want to update if exists, or just create.
                    // 'name' and 'email' or 'phone' might be unique, but for now just create.
                    // Or perhaps updateOrCreate based on email if present, or name + company.
                    // Let's assume valid uniqueness is email if available, otherwise name + company.
                    // Given the fields, email seems best identifier if present.
                    // But some might interpret "import" as "add all". Use updateOrCreate to be safe?
                    // Let's check existing logic in Tennent data. It imported Companies by 'tenant_name'.
                    // For contacts, maybe Name + Company + Email?
                    // Let's stick to simple create or updateOrCreate on Email if present.
                    
                    if (!empty($data['email'])) {
                        DirectoryContact::updateOrCreate(
                            ['email' => $data['email']],
                            $data
                        );
                    } else {
                        // If no email, check name + company? Or just create.
                        // Let's trying creating, maybe avoid duplicates if same name and company.
                        DirectoryContact::updateOrCreate(
                            [
                                'name' => $data['name'], 
                                'company' => $data['company'] ?? null
                            ],
                            $data
                        );
                    }
                    
                    $imported++;
                } catch (\Exception $e) {
                    $errors[] = "Row " . ($i + 1) . ": " . $e->getMessage();
                }
            }

            DB::commit();
            return [
                'success' => true,
                'imported' => $imported,
                'errors' => $errors,
            ];
        } catch (\Exception $e) {
            DB::rollBack();
            return [
                'success' => false,
                'message' => $e->getMessage(),
                'errors' => $errors,
            ];
        }
    }

    /**
     * Map Excel column headers to database columns
     */
    protected function mapColumns(array $headers): array
    {
        $mapping = [];
        $expectedColumns = [
            'name' => 'name',
            'company' => 'company',
            'title' => 'title',
            'specialty' => 'specialty',
            'property type focus' => 'property_type_focus',
            'phone' => 'phone',
            'linkedin' => 'linkedin',
            'email' => 'email',
            'building name' => 'building_name',
            'address' => 'address',
            'city' => 'city',
            'state' => 'state',
            'postal code' => 'postal_code',
            'country' => 'country',
            'website' => 'website',
            'lease transactions (3y)' => 'lease_transactions_3y',
            'lease transactions sf (3y)' => 'lease_transactions_sf_3y',
            'lease listings' => 'lease_listings',
            'lease listings portfolio sf' => 'lease_listings_portfolio_sf',
            'lease listings available sf' => 'lease_listings_available_sf',
            'sale transactions (3y)' => 'sale_transactions_3y',
            'sale transactions sf (3y)' => 'sale_transactions_sf_3y',
            'sale transactions volume (3y)' => 'sale_transactions_volume_3y',
            'sale listings' => 'sale_listings',
            'sale listings sf' => 'sale_listings_sf',
        ];

        foreach ($expectedColumns as $excelHeader => $dbColumn) {
            // Search exact match first
            $index = array_search($excelHeader, $headers);
            $mapping[$dbColumn] = $index !== false ? $index : null;
        }

        return $mapping;
    }

    /**
     * Normalize data before saving
     */
    protected function normalizeData(array $data): array
    {
        $numericFields = [
            'lease_transactions_3y',
            'lease_transactions_sf_3y',
            'lease_listings',
            'lease_listings_portfolio_sf',
            'lease_listings_available_sf',
            'sale_transactions_3y',
            'sale_transactions_sf_3y',
            'sale_transactions_volume_3y',
            'sale_listings',
            'sale_listings_sf'
        ];

        foreach ($numericFields as $field) {
            if (isset($data[$field]) && $data[$field] !== null) {
                // Remove commas first, possibly whitespace
                $val = preg_replace('/[,\s]/', '', $data[$field]);
                // Check if numeric after cleaning
                if (is_numeric($val)) {
                    $data[$field] = $val;
                } else {
                    $data[$field] = null; // Set to null if invalid
                }
            }
        }

        return $data;
    }
}
