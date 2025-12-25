<?php

namespace App\Console\Commands;

use App\Services\TennentImportService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class ImportTennentData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'import:tennent-data 
                            {--companies-file=tennent_companies.xlsx : The Excel file name for companies}
                            {--locations-file=tennent_locations.xlsx : The Excel file name for locations}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import tenant companies and locations from Excel files in public/sources/';

    /**
     * Execute the console command.
     */
    public function handle(TennentImportService $importService)
    {
        $sourcesPath = public_path('sources');

        if (!File::exists($sourcesPath)) {
            $this->error("Directory not found: {$sourcesPath}");
            return Command::FAILURE;
        }

        // Import companies
        $companiesFile = $this->option('companies-file');
        $companiesPath = $sourcesPath . '/' . $companiesFile;

        if (File::exists($companiesPath)) {
            $this->info("Importing companies from: {$companiesFile}");
            $result = $importService->importCompanies($companiesPath);
            
            if ($result['success']) {
                $this->info("Successfully imported {$result['imported']} companies.");
                if (!empty($result['errors'])) {
                    foreach ($result['errors'] as $error) {
                        $this->warn($error);
                    }
                }
            } else {
                $this->error("Failed to import companies: " . ($result['message'] ?? 'Unknown error'));
                if (!empty($result['errors'])) {
                    foreach ($result['errors'] as $error) {
                        $this->error($error);
                    }
                }
                return Command::FAILURE;
            }
        } else {
            $this->warn("Companies file not found: {$companiesPath}");
        }

        // Import locations
        $locationsFile = $this->option('locations-file');
        $locationsPath = $sourcesPath . '/' . $locationsFile;

        if (File::exists($locationsPath)) {
            $this->info("Importing locations from: {$locationsFile}");
            $result = $importService->importLocations($locationsPath);
            
            if ($result['success']) {
                $this->info("Successfully imported {$result['imported']} locations.");
                if (!empty($result['errors'])) {
                    foreach ($result['errors'] as $error) {
                        $this->warn($error);
                    }
                }
            } else {
                $this->error("Failed to import locations: " . ($result['message'] ?? 'Unknown error'));
                if (!empty($result['errors'])) {
                    foreach ($result['errors'] as $error) {
                        $this->error($error);
                    }
                }
                return Command::FAILURE;
            }
        } else {
            $this->warn("Locations file not found: {$locationsPath}");
        }

        $this->info("Import completed.");
        return Command::SUCCESS;
    }
}
