<?php

namespace App\Console\Commands;

use App\Services\DirectoryContactImportService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class ImportDirectoryContacts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'import:directory-contacts 
                            {--file=dirrectory_contacts.xlsx : The Excel file name to import}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import directory contacts from Excel file in public/sources/';

    /**
     * Execute the console command.
     */
    public function handle(DirectoryContactImportService $importService)
    {
        $sourcesPath = public_path('sources');

        if (!File::exists($sourcesPath)) {
            $this->error("Directory not found: {$sourcesPath}");
            return Command::FAILURE;
        }

        $fileName = $this->option('file');
        $filePath = $sourcesPath . '/' . $fileName;

        if (!File::exists($filePath)) {
            $this->error("File not found: {$filePath}");
            return Command::FAILURE;
        }

        $this->info("Importing directory contacts from: {$fileName}");
        
        $result = $importService->import($filePath);
        
        if ($result['success']) {
            $this->info("Successfully imported {$result['imported']} contacts.");
            if (!empty($result['errors'])) {
                foreach ($result['errors'] as $error) {
                    $this->warn($error);
                }
            }
            return Command::SUCCESS;
        } else {
            $this->error("Failed to import contacts: " . ($result['message'] ?? 'Unknown error'));
            if (!empty($result['errors'])) {
                foreach ($result['errors'] as $error) {
                    $this->error($error);
                }
            }
            return Command::FAILURE;
        }
    }
}
