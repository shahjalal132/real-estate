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
        
        // Get headers from first row
        $headersRow = $worksheet->getRowIterator(1, 1)->current();
        $headers = [];
        foreach ($headersRow->getCellIterator() as $cell) {
            $headers[] = trim(strtolower($cell->getCalculatedValue()));
        }

        if (empty($headers)) {
            return ['success' => false, 'message' => 'File is empty'];
        }

        $columnMapping = $this->mapFundColumns($headers);
        $rows = $worksheet->toArray();

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
                        $value = $row[$excelIndex];
                        
                        // Handle date columns - check if it's a numeric Excel date serial
                        if (in_array($dbColumn, ['launch_date', 'final_close_date']) && is_numeric($value)) {
                            try {
                                $date = PhpSpreadsheetDate::excelToDateTimeObject($value);
                                $value = $date->format('Y-m-d');
                            } catch (\Exception $e) {
                                // If conversion fails, treat as string and let parseDate handle it
                                $value = is_string($value) ? trim($value) : (string) $value;
                            }
                        } else {
                            $value = is_string($value) ? trim($value) : $value;
                        }
                        
                        $data[$dbColumn] = $value !== '' && $value !== null ? $value : null;
                    }
                }

                // Skip if fund is empty
                if (empty($data['fund'])) {
                    continue;
                }

                // Normalize data
                $data = $this->normalizeFundData($data);

                try {
                    OwnerFund::updateOrCreate(
                        ['fund' => $data['fund']],
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
            'company' => 'company',
            'fund' => 'fund',
            'fund size' => 'fund_size',
            'status' => 'status',
            'dry powder' => 'dry_powder',
            'aum' => 'aum',
            'vintage' => 'vintage',
            'property focus' => 'property_focus',
            'country focus' => 'country_focus',
            'region focus' => 'region_focus',
            'strategy' => 'strategy',
            'fund structure' => 'fund_structure',
            'launch date' => 'launch_date',
            'final close date' => 'final_close_date',
            'months in market' => 'months_in_market',
            'target irr - gross' => 'target_irr_gross',
            'target irr - net' => 'target_irr_net',
            'min fund manager loc' => 'min_fund_manager_loc',
            'properties (#)' => 'properties',
            'portfolio size (sf)' => 'portfolio_size_sf',
            'acquisitions 24 mont' => 'acquisitions_24_months',
            'dispositions 24 mont' => 'dispositions_24_months',
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
        // Convert numeric strings to appropriate types
        if (isset($data['properties']) && $data['properties'] !== null) {
            $data['properties'] = is_numeric($data['properties']) ? (int) $data['properties'] : null;
        }

        if (isset($data['months_in_market']) && $data['months_in_market'] !== null) {
            $data['months_in_market'] = is_numeric($data['months_in_market']) ? (int) $data['months_in_market'] : null;
        }

        // Convert decimal fields
        foreach (['fund_size', 'dry_powder', 'aum', 'target_irr_gross', 'target_irr_net', 'portfolio_size_sf', 'acquisitions_24_months', 'dispositions_24_months'] as $field) {
            if (isset($data[$field]) && $data[$field] !== null) {
                $data[$field] = $this->extractNumeric($data[$field]);
            }
        }

        // Parse date fields
        if (isset($data['launch_date']) && $data['launch_date'] !== null && $data['launch_date'] !== '') {
            $data['launch_date'] = $this->parseDate($data['launch_date']);
        }

        if (isset($data['final_close_date']) && $data['final_close_date'] !== null && $data['final_close_date'] !== '') {
            $data['final_close_date'] = $this->parseDate($data['final_close_date']);
        }

        return $data;
    }

    /**
     * Parse date from various formats
     */
    protected function parseDate($value): ?string
    {
        if (empty($value)) {
            return null;
        }

        // If it's already a Carbon instance or DateTime
        if ($value instanceof \DateTime) {
            return $value->format('Y-m-d');
        }

        // If it's a PhpSpreadsheet date serial number
        if (is_numeric($value) && $value > 25569) { // Excel epoch starts at 1900-01-01
            try {
                $date = PhpSpreadsheetDate::excelToDateTimeObject($value);
                return $date->format('Y-m-d');
            } catch (\Exception $e) {
                // Fall through to string parsing
            }
        }

        // Try to parse as string
        if (is_string($value)) {
            // Try common date formats
            $formats = ['Y-m-d', 'm/d/Y', 'd/m/Y', 'Y/m/d', 'M d, Y', 'F d, Y'];
            foreach ($formats as $format) {
                try {
                    $date = \Carbon\Carbon::createFromFormat($format, $value);
                    return $date->format('Y-m-d');
                } catch (\Exception $e) {
                    continue;
                }
            }
            
            // Last resort: try Carbon's parse
            try {
                $date = \Carbon\Carbon::parse($value);
                return $date->format('Y-m-d');
            } catch (\Exception $e) {
                return null;
            }
        }

        return null;
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

