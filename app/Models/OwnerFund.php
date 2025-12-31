<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OwnerFund extends Model
{
    protected $fillable = [
        'company',
        'fund',
        'fund_size',
        'status',
        'dry_powder',
        'aum',
        'vintage',
        'property_focus',
        'country_focus',
        'region_focus',
        'strategy',
        'fund_structure',
        'launch_date',
        'final_close_date',
        'months_in_market',
        'target_irr_gross',
        'target_irr_net',
        'min_fund_manager_loc',
        'properties',
        'portfolio_size_sf',
        'acquisitions_24_months',
        'dispositions_24_months',
    ];

    protected $casts = [
        'fund_size' => 'decimal:2',
        'dry_powder' => 'decimal:2',
        'aum' => 'decimal:2',
        'launch_date' => 'date',
        'final_close_date' => 'date',
        'months_in_market' => 'integer',
        'target_irr_gross' => 'decimal:2',
        'target_irr_net' => 'decimal:2',
        'properties' => 'integer',
        'portfolio_size_sf' => 'decimal:2',
        'acquisitions_24_months' => 'decimal:2',
        'dispositions_24_months' => 'decimal:2',
    ];
}
