<?php

namespace App\Console\Commands;

use App\Services\DirectoryBrokerCompanyImportService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class ImportDirectoryBrokerCompanies extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'import:directory-companies {--file=broker_companies.xlsx : The Excel file name in public/sources}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import directory broker companies from Excel file';

    /**
     * Execute the console command.
     */
    public function handle(DirectoryBrokerCompanyImportService $importService)
    {
        $sourcesPath = public_path('sources');
        $fileName = $this->option('file');
        $filePath = $sourcesPath . '/' . $fileName;

        if (!File::exists($filePath)) {
            $this->error("File not found: {$filePath}");
            return Command::FAILURE;
        }

        $this->info("Importing directory broker companies from: {$fileName}");
        
        $result = $importService->import($filePath);

        if ($result['success']) {
            $this->info("Successfully imported {$result['imported']} companies.");
            if (!empty($result['errors'])) {
                foreach ($result['errors'] as $error) {
                    $this->warn($error);
                }
            }
            return Command::SUCCESS;
        } else {
            $this->error("Failed to import companies: " . ($result['message'] ?? 'Unknown error'));
             if (!empty($result['errors'])) {
                foreach ($result['errors'] as $error) {
                    $this->error($error);
                }
            }
            return Command::FAILURE;
        }
    }
}
