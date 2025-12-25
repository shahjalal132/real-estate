<?php

namespace App\Services;

use App\Models\TennentCompany;
use App\Models\TennentLocation;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Shared\Date as PhpSpreadsheetDate;
use PhpOffice\PhpSpreadsheet\Spreadsheet;

class TennentImportService
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

                // Skip if tenant_name is empty
                if (empty($data['tenant_name'])) {
                    continue;
                }

                // Normalize data
                $data = $this->normalizeCompanyData($data);

                try {
                    TennentCompany::updateOrCreate(
                        ['tenant_name' => $data['tenant_name']],
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
     * Import locations from Excel file
     */
    public function importLocations(string $filePath): array
    {
        $spreadsheet = IOFactory::load($filePath);
        $worksheet = $spreadsheet->getActiveSheet();
        $rows = $worksheet->toArray();

        if (empty($rows)) {
            return ['success' => false, 'message' => 'File is empty'];
        }

        // First row should be headers
        $headers = array_map('trim', array_map('strtolower', $rows[0]));
        $columnMapping = $this->mapLocationColumns($headers);

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

                // Skip if tenant_name is empty
                if (empty($data['tenant_name'])) {
                    continue;
                }

                // Normalize data
                $data = $this->normalizeLocationData($data);

                try {
                    TennentLocation::create($data);
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
            'tenant name' => 'tenant_name',
            'industry' => 'industry',
            'territory' => 'territory',
            'hq market' => 'hq_market',
            'locations' => 'locations',
            'sf occupied' => 'sf_occupied',
            'highest use by sf' => 'highest_use_by_sf',
            'employees' => 'employees',
            'growth' => 'growth',
            'revenue' => 'revenue',
            'credit rating' => 'credit_rating',
            'established' => 'established',
            'parent company' => 'parent_company',
            'website' => 'website',
            'hq phone' => 'hq_phone',
            'hq city' => 'hq_city',
            'hq state' => 'hq_state',
            'hq postal code' => 'hq_postal_code',
            'hq country' => 'hq_country',
            'naics' => 'naics',
            'sic' => 'sic',
        ];

        foreach ($expectedColumns as $excelHeader => $dbColumn) {
            $index = array_search($excelHeader, $headers);
            $mapping[$dbColumn] = $index !== false ? $index : null;
        }

        return $mapping;
    }

    /**
     * Map Excel column headers to database columns for locations
     */
    protected function mapLocationColumns(array $headers): array
    {
        $mapping = [];
        $expectedColumns = [
            'address' => 'address',
            'city' => 'city',
            'state' => 'state',
            'country' => 'country',
            'tenant name' => 'tenant_name',
            'sf occupied' => 'sf_occupied',
            'floor' => 'floor',
            'space use' => 'space_use',
            'moved in' => 'moved_in',
            'commencement' => 'commencement',
            'expiration' => 'expiration',
            '% of building' => 'percent_of_building',
            'occupancy type' => 'occupancy_type',
            'rent/sf/year' => 'rent_per_sf_year',
            'rent type' => 'rent_type',
            'employees' => 'employees',
            'sf/employee' => 'sf_per_employee',
            'industry' => 'industry',
            'star rating' => 'star_rating',
            'green rating' => 'green_rating',
            'building name' => 'building_name',
            'building park' => 'building_park',
            'center name' => 'center_name',
            'property type' => 'property_type',
            'secondary type' => 'secondary_type',
            'center type' => 'center_type',
            'market' => 'market',
            'submarket' => 'submarket',
            'location type' => 'location_type',
            'landlord' => 'landlord',
            'landlord representative' => 'landlord_representative',
            'tenant representative' => 'tenant_representative',
            'best tenant contact' => 'best_tenant_contact',
            'best tenant phone' => 'best_tenant_phone',
            'location phone' => 'location_phone',
            'website' => 'website',
            'future move' => 'future_move',
            'future move type' => 'future_move_type',
            'signed' => 'signed',
            'suite' => 'suite',
            'zip' => 'zip',
            'time in building' => 'time_in_building',
            'store type' => 'store_type',
            'naics' => 'naics',
            'sic' => 'sic',
            'property id' => 'property_id',
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
        if (isset($data['locations']) && $data['locations'] !== null) {
            $data['locations'] = is_numeric($data['locations']) ? (int) $data['locations'] : null;
        }

        if (isset($data['sf_occupied']) && $data['sf_occupied'] !== null) {
            $data['sf_occupied'] = $this->extractNumeric($data['sf_occupied']);
        }

        if (isset($data['employees']) && $data['employees'] !== null) {
            $data['employees'] = is_numeric($data['employees']) ? (int) $data['employees'] : null;
        }

        if (isset($data['revenue']) && $data['revenue'] !== null) {
            $data['revenue'] = $this->extractNumeric($data['revenue']);
        }

        if (isset($data['established']) && $data['established'] !== null) {
            $year = $this->extractYear($data['established']);
            $data['established'] = $year ?: null;
        }

        return $data;
    }

    /**
     * Normalize location data before saving
     */
    protected function normalizeLocationData(array $data): array
    {
        // Convert numeric strings to appropriate types
        if (isset($data['sf_occupied']) && $data['sf_occupied'] !== null) {
            $data['sf_occupied'] = $this->extractNumeric($data['sf_occupied']);
        }

        if (isset($data['percent_of_building']) && $data['percent_of_building'] !== null) {
            $data['percent_of_building'] = $this->extractNumeric($data['percent_of_building']);
        }

        if (isset($data['rent_per_sf_year']) && $data['rent_per_sf_year'] !== null) {
            $data['rent_per_sf_year'] = $this->extractNumeric($data['rent_per_sf_year']);
        }

        if (isset($data['employees']) && $data['employees'] !== null) {
            $data['employees'] = is_numeric($data['employees']) ? (int) $data['employees'] : null;
        }

        if (isset($data['sf_per_employee']) && $data['sf_per_employee'] !== null) {
            $data['sf_per_employee'] = $this->extractNumeric($data['sf_per_employee']);
        }

        if (isset($data['star_rating']) && $data['star_rating'] !== null) {
            $data['star_rating'] = is_numeric($data['star_rating']) ? (int) $data['star_rating'] : null;
        }

        // Parse dates
        foreach (['moved_in', 'commencement', 'expiration', 'future_move', 'signed'] as $dateField) {
            if (isset($data[$dateField]) && $data[$dateField] !== null) {
                $data[$dateField] = $this->extractDate($data[$dateField]);
            }
        }

        if (isset($data['property_id']) && $data['property_id'] !== null) {
            $data['property_id'] = is_numeric($data['property_id']) ? (int) $data['property_id'] : null;
        }

        return $data;
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

    /**
     * Extract year from string or number
     */
    protected function extractYear($value): ?int
    {
        if ($value === null || $value === '') {
            return null;
        }

        if (is_numeric($value)) {
            $year = (int) $value;
            // Validate year range (reasonable business years)
            if ($year >= 1800 && $year <= 2100) {
                return $year;
            }
        }

        if (is_string($value)) {
            // Try to extract year from date string
            $timestamp = strtotime($value);
            if ($timestamp !== false) {
                $year = (int) date('Y', $timestamp);
                if ($year >= 1800 && $year <= 2100) {
                    return $year;
                }
            }

            // Try to extract 4-digit year from string
            if (preg_match('/\b(19|20)\d{2}\b/', $value, $matches)) {
                $year = (int) $matches[0];
                if ($year >= 1800 && $year <= 2100) {
                    return $year;
                }
            }
        }

        return null;
    }

    /**
     * Extract date from various formats
     */
    protected function extractDate($value): ?string
    {
        if ($value === null || $value === '') {
            return null;
        }

        // Handle DateTime objects directly
        if ($value instanceof \DateTime) {
            return $value->format('Y-m-d');
        }

        try {
            // If it's a numeric value, it might be an Excel date serial number
            if (is_numeric($value)) {
                // Excel date serial numbers are typically > 1 and < 100000
                // Regular dates in Excel start from 1900-01-01
                $floatValue = (float) $value;
                if ($floatValue > 1 && $floatValue < 100000) {
                    try {
                        $dateTime = PhpSpreadsheetDate::excelToDateTimeObject($floatValue);
                        return $dateTime->format('Y-m-d');
                    } catch (\Exception $e) {
                        // If it fails, try as regular date
                    }
                }
            }

            // Try standard date parsing (handles formatted date strings from Excel)
            if (is_string($value)) {
                $trimmed = trim($value);
                if ($trimmed !== '') {
                    $carbon = Carbon::parse($trimmed);
                    return $carbon->format('Y-m-d');
                }
            }
        } catch (\Exception $e) {
            // Return null if parsing fails
            return null;
        }

        return null;
    }
}
