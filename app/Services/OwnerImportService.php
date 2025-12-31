<?php

namespace App\Services;

use App\Models\OwnerCompany;
use App\Models\OwnerFund;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Shared\Date as PhpSpreadsheetDate;

class OwnerImportService
{
    /**
     * Import companies from Excel file
     */
    public function importCompanies(string $filePath): array
    {
        $spreadsheet = IOFactory::load($filePath);
        $worksheet = $spreadsheet->getActiveSheet();
        $rows = $worksheet->toArray();

        if (empty($rows)) {
            return ['success' => false, 'message' => 'File is empty'];
        }

        // First row should be headers
        $headers = array_map('trim', array_map('strtolower', $rows[0]));
        $columnMapping = $this->mapCompanyColumns($headers);

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

                // Skip if company is empty
                if (empty($data['company'])) {
                    continue;
                }

                // Normalize data
                $data = $this->normalizeCompanyData($data);

                try {
                    OwnerCompany::updateOrCreate(
                        ['company' => $data['company']],
                        $data
                    );
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
     * Import funds from Excel file
     */
    public function importFunds(string $filePath): array
    {
        $spreadsheet = IOFactory::load($filePath);
        $worksheet = $spreadsheet->getActiveSheet();
        $rows = $worksheet->toArray();

        if (empty($rows)) {
            return ['success' => false, 'message' => 'File is empty'];
        }

        // First row should be headers
        $headers = array_map('trim', array_map('strtolower', $rows[0]));
        $columnMapping = $this->mapFundColumns($headers);

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

                // Skip if fund_name is empty
                if (empty($data['fund_name'])) {
                    continue;
                }

                // Normalize data
                $data = $this->normalizeFundData($data);

                try {
                    OwnerFund::updateOrCreate(
                        ['fund_name' => $data['fund_name']],
                        $data
                    );
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
     * Map Excel column headers to database columns for companies
     */
    protected function mapCompanyColumns(array $headers): array
    {
        $mapping = [];
        $expectedColumns = [
            'company' => 'company',
            'hierarchy' => 'hierarchy',
            'owner type' => 'owner_type',
            'hq city' => 'hq_city',
            'hq state' => 'hq_state',
            'hq country' => 'hq_country',
            'properties' => 'properties',
            'portfolio sf' => 'portfolio_sf',
            'average sf' => 'average_sf',
            'apt units' => 'apt_units',
            'hotel rooms' => 'hotel_rooms',
            'land (acre)' => 'land_acre',
            'main property type' => 'main_property_type',
            'sf delivered 24 months' => 'sf_delivered_24_months',
            'sf under construction' => 'sf_under_construction',
            'continental focus' => 'continental_focus',
            'primary country' => 'primary_country',
            'territory' => 'territory',
            'sale listings' => 'sale_listings',
            '$ sale listings' => 'sale_listings_value',
            'acquisitions 24 months' => 'acquisitions_24_months',
            'dispositions 24 months' => 'dispositions_24_months',
        ];

        foreach ($expectedColumns as $excelHeader => $dbColumn) {
            $index = array_search($excelHeader, $headers);
            $mapping[$dbColumn] = $index !== false ? $index : null;
        }

        return $mapping;
    }

    /**
     * Map Excel column headers to database columns for funds
     */
    protected function mapFundColumns(array $headers): array
    {
        $mapping = [];
        $expectedColumns = [
            'company' => 'fund_name',
            'hierarchy' => 'hierarchy',
            'owner type' => 'owner_type',
            'hq city' => 'hq_city',
            'hq state' => 'hq_state',
            'hq country' => 'hq_country',
            'properties' => 'properties',
            'portfolio sf' => 'portfolio_sf',
            'average sf' => 'average_sf',
            'apt units' => 'apt_units',
            'hotel rooms' => 'hotel_rooms',
            'land (acre)' => 'land_acre',
            'main property type' => 'main_property_type',
            'sf delivered 24 months' => 'sf_delivered_24_months',
            'sf under construction' => 'sf_under_construction',
            'continental focus' => 'continental_focus',
            'primary country' => 'primary_country',
            'territory' => 'territory',
            'sale listings' => 'sale_listings',
            '$ sale listings' => 'sale_listings_value',
            'acquisitions 24 months' => 'acquisitions_24_months',
            'dispositions 24 months' => 'dispositions_24_months',
        ];

        foreach ($expectedColumns as $excelHeader => $dbColumn) {
            $index = array_search($excelHeader, $headers);
            $mapping[$dbColumn] = $index !== false ? $index : null;
        }

        return $mapping;
    }

    /**
     * Normalize company data before saving
     */
    protected function normalizeCompanyData(array $data): array
    {
        // Convert numeric strings to appropriate types
        if (isset($data['properties']) && $data['properties'] !== null) {
            $data['properties'] = is_numeric($data['properties']) ? (int) $data['properties'] : null;
        }

        foreach (['portfolio_sf', 'average_sf', 'land_acre', 'sf_delivered_24_months', 'sf_under_construction', 'sale_listings_value', 'acquisitions_24_months', 'dispositions_24_months'] as $field) {
            if (isset($data[$field]) && $data[$field] !== null) {
                $data[$field] = $this->extractNumeric($data[$field]);
            }
        }

        if (isset($data['apt_units']) && $data['apt_units'] !== null) {
            $data['apt_units'] = is_numeric($data['apt_units']) ? (int) $data['apt_units'] : null;
        }

        if (isset($data['hotel_rooms']) && $data['hotel_rooms'] !== null) {
            $data['hotel_rooms'] = is_numeric($data['hotel_rooms']) ? (int) $data['hotel_rooms'] : null;
        }

        if (isset($data['sale_listings']) && $data['sale_listings'] !== null) {
            $data['sale_listings'] = is_numeric($data['sale_listings']) ? (int) $data['sale_listings'] : null;
        }

        return $data;
    }

    /**
     * Normalize fund data before saving
     */
    protected function normalizeFundData(array $data): array
    {
        // Same normalization as companies
        return $this->normalizeCompanyData($data);
    }

    /**
     * Extract numeric value from string
     */
    protected function extractNumeric($value): ?float
    {
        if ($value === null || $value === '') {
            return null;
        }

        if (is_numeric($value)) {
            return (float) $value;
        }

        if (is_string($value)) {
            // Remove commas and other formatting
            $cleaned = preg_replace('/[^0-9.]/', '', $value);
            if (is_numeric($cleaned)) {
                return (float) $cleaned;
            }
        }

        return null;
    }
}

