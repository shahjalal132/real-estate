<?php

namespace App\Console\Commands;

use App\Services\PropertyImportService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class ImportPropertiesFromFiles extends Command
{
    protected $signature = 'import:properties-from-files';
    protected $description = 'Import properties from JSON files in public/sources/';

    public function handle(PropertyImportService $importService)
    {
        $path = public_path('sources');

        if (!File::exists($path)) {
            $this->error("Directory not found: {$path}");
            return;
        }

        $files = File::files($path);
        $jsonFiles = array_filter($files, function ($file) {
            return $file->getExtension() === 'json';
        });

        if (empty($jsonFiles)) {
            $this->info("No JSON files found in {$path}");
            return;
        }

        $this->info("Found " . count($jsonFiles) . " JSON files. Starting import...");

        foreach ($jsonFiles as $file) {
            $this->info("Processing file: " . $file->getFilename());
            
            $content = File::get($file->getPathname());
            $data = json_decode($content, true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                $this->error("Invalid JSON in file: " . $file->getFilename());
                continue;
            }
            
            $items = [];
            if (isset($data['id']) && isset($data['name'])) {
                $items[] = $data;
            } elseif (is_array($data) && array_is_list($data)) {
                $items = $data;
            } else {
                $this->warn("Skipping file " . $file->getFilename() . ": Unrecognized structure.");
                continue;
            }

            $bar = $this->output->createProgressBar(count($items));
            $bar->start();

            foreach ($items as $item) {
                try {
                    $importService->importFromJson($item);
                } catch (\Exception $e) {
                    $this->error("Error importing property ID " . ($item['id'] ?? 'unknown') . ": " . $e->getMessage());
                }
                $bar->advance();
            }

            $bar->finish();
            $this->newLine();
        }

        $this->info("Import completed.");
    }
}
