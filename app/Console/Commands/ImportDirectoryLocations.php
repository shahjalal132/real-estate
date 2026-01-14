<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\DirectoryLocationImportService;
use Illuminate\Support\Facades\File;

class ImportDirectoryLocations extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'import:directory-locations {file=dirrectories_locations.xlsx}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import directory locations from Excel file in public/sources/';

    /**
     * Execute the console command.
     */
    public function handle(DirectoryLocationImportService $importService)
    {
        $fileName = $this->argument('file');
        $filePath = public_path('sources/' . $fileName);

        if (!File::exists($filePath)) {
            $this->error("File not found: {$filePath}");
            return Command::FAILURE;
        }

        $this->info("Starting import from: {$fileName}");
        
        $result = $importService->import($filePath);

        if ($result['success']) {
            $this->info($result['message']);
            $this->info("Total Imported: " . $result['imported']);
            if (!empty($result['errors'])) {
                $this->warn("There were some row-level errors:");
                foreach ($result['errors'] as $error) {
                    $this->warn("- {$error}");
                }
            }
            return Command::SUCCESS;
        } else {
            $this->error($result['message']);
             if (!empty($result['errors'])) {
                foreach ($result['errors'] as $error) {
                    $this->error("- {$error}");
                }
            }
            return Command::FAILURE;
        }
    }
}
