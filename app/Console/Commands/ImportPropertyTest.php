<?php

namespace App\Console\Commands;

use App\Services\PropertyImportService;
use Illuminate\Console\Command;

class ImportPropertyTest extends Command
{
    protected $signature = 'test:import-property';
    protected $description = 'Test property import service with example JSON';

    public function handle(PropertyImportService $service)
    {
        $json = '{
            "id": 2228471,
            "name": "3203 Fayetteville Rd, Raeford NC",
            "description": "Highway Commercial Opportunity in Raeford NC",
            "askingPrice": 295000,
            "status": "On-Market",
            "types": ["Land"],
            "locations": [
              {
                "address": "3203 Fayetteville Rd",
                "city": "Raeford",
                "county": "Hoke County",
                "state": {"code": "NC", "name": "North Carolina"},
                "zip": "28376",
                "latitude": 35.00319,
                "longitude": -79.1968877
              }
            ],
            "details": {
              "subtypes": ["Commercial"],
              "details": {
                "Zoning": "HC",
                "Lot Size (acres)": "3"
              }
            },
            "brokers": [
              {
                "id": 2285071,
                "firstName": "Corey",
                "lastName": "Croegaert",
                "phone": "910.987.2579",
                "email": "user@crexi.com",
                "brokerage": {
                  "name": "Grant-Murray Real Estate"
                }
              }
            ]
        }';

        $data = json_decode($json, true);
        $property = $service->importFromJson($data);

        $this->info("Property imported successfully: {$property->name} (ID: {$property->id})");
        $this->info("Location: {$property->location->city}, {$property->location->state_code}");
        $this->info("Brokers: " . $property->brokers->pluck('full_name')->join(', '));
    }
}
