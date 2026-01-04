<?php

namespace App\Console\Commands;

use App\Services\TennentImportService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class ImportCompanyLocations extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'import:company-locations 
                            {--file=company_locations.xlsx : The Excel file name for company locations}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import company locations from Excel file in public/sources/';

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

        $file = $this->option('file');
        $filePath = $sourcesPath . '/' . $file;

        if (!File::exists($filePath)) {
            $this->error("File not found: {$filePath}");
            return Command::FAILURE;
        }

        $this->info("Importing company locations from: {$file}");

        $result = $importService->importLocations($filePath);

        if ($result['success']) {
            $this->info("Successfully imported {$result['imported']} company locations.");
            if (!empty($result['errors'])) {
                foreach ($result['errors'] as $error) {
                    $this->warn($error);
                }
            }
            $this->info("Import completed.");
            return Command::SUCCESS;
        } else {
            $this->error("Failed to import company locations: " . ($result['message'] ?? 'Unknown error'));
            if (!empty($result['errors'])) {
                foreach ($result['errors'] as $error) {
                    $this->error($error);
                }
            }
            return Command::FAILURE;
        }
    }
}
