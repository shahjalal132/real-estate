<?php

namespace App\Console\Commands;

use App\Services\OwnerImportService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class ImportOwnerData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'import:owner-data 
                            {--companies-file=owners_company.xlsx : The Excel file name for companies}
                            {--funds-file=owners_fund.xlsx : The Excel file name for funds}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import owner companies and funds from Excel files in public/sources/';

    /**
     * Execute the console command.
     */
    public function handle(OwnerImportService $importService)
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

        // Import funds
        $fundsFile = $this->option('funds-file');
        $fundsPath = $sourcesPath . '/' . $fundsFile;

        if (File::exists($fundsPath)) {
            $this->info("Importing funds from: {$fundsFile}");
            $result = $importService->importFunds($fundsPath);

            if ($result['success']) {
                $this->info("Successfully imported {$result['imported']} funds.");
                if (!empty($result['errors'])) {
                    foreach ($result['errors'] as $error) {
                        $this->warn($error);
                    }
                }
            } else {
                $this->error("Failed to import funds: " . ($result['message'] ?? 'Unknown error'));
                if (!empty($result['errors'])) {
                    foreach ($result['errors'] as $error) {
                        $this->error($error);
                    }
                }
                return Command::FAILURE;
            }
        } else {
            $this->warn("Funds file not found: {$fundsPath}");
        }

        $this->info("Import completed.");
        return Command::SUCCESS;
    }
}
