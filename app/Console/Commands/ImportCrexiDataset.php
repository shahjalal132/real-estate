<?php

namespace App\Console\Commands;

use App\Services\PropertyImportService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class ImportCrexiDataset extends Command
{
    protected $signature = 'import:crexi-dataset 
                            {file? : The JSON file to import (relative to public/sources/)}
                            {--all : Import all dataset files matching the pattern}';

    protected $description = 'Import properties from Crexi dataset JSON files (supports both old and new formats)';

    public function handle(PropertyImportService $importService)
    {
        $sourcesPath = public_path('sources');

        if (!File::exists($sourcesPath)) {
            $this->error("Directory not found: {$sourcesPath}");
            return Command::FAILURE;
        }

        $files = [];

        if ($this->option('all')) {
            // Find all dataset files matching the pattern
            $allFiles = File::files($sourcesPath);
            $files = array_filter($allFiles, function ($file) {
                return $file->getExtension() === 'json'
                    && str_contains($file->getFilename(), 'dataset_apify-crexi');
            });
        } elseif ($this->argument('file')) {
            // Import specific file
            $filePath = $sourcesPath . '/' . $this->argument('file');
            if (!File::exists($filePath)) {
                $this->error("File not found: {$filePath}");
                return Command::FAILURE;
            }
            $files = [new \SplFileInfo($filePath)];
        } else {
            // Default: import the most recent dataset file
            $allFiles = File::files($sourcesPath);
            $datasetFiles = array_filter($allFiles, function ($file) {
                return $file->getExtension() === 'json'
                    && str_contains($file->getFilename(), 'dataset_apify-crexi');
            });

            if (empty($datasetFiles)) {
                $this->error("No dataset files found in {$sourcesPath}");
                return Command::FAILURE;
            }

            // Sort by modification time, most recent first
            usort($datasetFiles, function ($a, $b) {
                return $b->getMTime() - $a->getMTime();
            });

            $files = [reset($datasetFiles)];
            $this->info("Importing most recent dataset file: " . reset($files)->getFilename());
        }

        if (empty($files)) {
            $this->error("No files found to import.");
            return Command::FAILURE;
        }

        $this->info("Found " . count($files) . " file(s) to import. Starting import...");
        $this->newLine();

        $totalImported = 0;
        $totalErrors = 0;

        foreach ($files as $file) {
            $this->info("Processing file: " . $file->getFilename());

            try {
                $content = File::get($file->getPathname());
                $data = json_decode($content, true);

                if (json_last_error() !== JSON_ERROR_NONE) {
                    $this->error("Invalid JSON in file: " . $file->getFilename() . " - " . json_last_error_msg());
                    $totalErrors++;
                    continue;
                }

                // Handle array of properties or single property
                $items = [];
                if (isset($data['id']) && isset($data['name'])) {
                    // Single property object
                    $items[] = $data;
                } elseif (is_array($data) && array_is_list($data)) {
                    // Array of properties
                    $items = $data;
                } else {
                    $this->warn("Skipping file " . $file->getFilename() . ": Unrecognized structure.");
                    $totalErrors++;
                    continue;
                }

                if (empty($items)) {
                    $this->warn("No properties found in file: " . $file->getFilename());
                    continue;
                }

                $this->info("Found " . count($items) . " property/properties to import.");
                $bar = $this->output->createProgressBar(count($items));
                $bar->start();

                foreach ($items as $item) {
                    try {
                        $property = $importService->importFromJson($item);
                        $totalImported++;
                    } catch (\Exception $e) {
                        $this->newLine();
                        $this->error("Error importing property ID " . ($item['id'] ?? 'unknown') . ": " . $e->getMessage());
                        $this->error("Stack trace: " . $e->getTraceAsString());
                        $totalErrors++;
                    }
                    $bar->advance();
                }

                $bar->finish();
                $this->newLine(2);
            } catch (\Exception $e) {
                $this->error("Error processing file " . $file->getFilename() . ": " . $e->getMessage());
                $totalErrors++;
            }
        }

        $this->info("Import completed.");
        $this->info("Successfully imported: {$totalImported} property/properties");
        if ($totalErrors > 0) {
            $this->warn("Errors encountered: {$totalErrors}");
        }

        return Command::SUCCESS;
    }
}
