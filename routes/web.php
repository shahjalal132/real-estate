<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [\App\Http\Controllers\HomeController::class, 'index']);

// Property routes
Route::get('/properties', [\App\Http\Controllers\PropertyController::class, 'index'])->name('properties.index');
Route::get('/properties/auctions', [\App\Http\Controllers\PropertyController::class, 'auctions'])->name('properties.auctions');
Route::get('/properties/residential', [\App\Http\Controllers\PropertyController::class, 'residentials'])->name('properties.residentials');
Route::get('/properties/commercial', [\App\Http\Controllers\PropertyController::class, 'commercial'])->name('properties.commercial');
Route::get('/properties/rental', [\App\Http\Controllers\PropertyController::class, 'rental'])->name('properties.rental');
Route::get('/properties/{property}/{url_slug}', [\App\Http\Controllers\PropertyController::class, 'show'])->name('properties.show');

// API routes for filters
Route::get('/api/brokers/search', [\App\Http\Controllers\BrokerController::class, 'search'])->name('api.brokers.search');

Route::middleware('auth')->group(function () {
    Route::get('/api/saved-searches', [\App\Http\Controllers\SavedSearchController::class, 'index'])->name('api.saved-searches.index');
    Route::post('/api/saved-searches', [\App\Http\Controllers\SavedSearchController::class, 'store'])->name('api.saved-searches.store');
    Route::put('/api/saved-searches/{savedSearch}', [\App\Http\Controllers\SavedSearchController::class, 'update'])->name('api.saved-searches.update');
    Route::delete('/api/saved-searches/{savedSearch}', [\App\Http\Controllers\SavedSearchController::class, 'destroy'])->name('api.saved-searches.destroy');
    Route::get('/api/saved-searches/{savedSearch}/apply', [\App\Http\Controllers\SavedSearchController::class, 'apply'])->name('api.saved-searches.apply');
});

Route::get('/optimize', function () {
    \Illuminate\Support\Facades\Artisan::call('optimize:clear');
    return 'Application optimized!';
})->name('optimize')->middleware('auth');

// Contacts routes
Route::get('/contacts/tenants', [\App\Http\Controllers\TenantCompanyController::class, 'index'])->name('contacts.tenants');
Route::get('/contacts/tenants/locations', [\App\Http\Controllers\TenantLocationController::class, 'index'])->name('contacts.tenants.locations');
Route::get('/contacts/tenants/locations/{id}', [\App\Http\Controllers\TenantLocationController::class, 'show'])->name('contacts.tenants.locations.show');
Route::get('/contacts/tenants/{id}/{tab?}', [\App\Http\Controllers\TenantCompanyController::class, 'show'])->name('contacts.tenants.show')->where('tab', 'summary|locations|transactions|lease-expirations|contacts|relationships|news');
Route::get('/contacts/owners', function () {
    return redirect('/contacts/owners/companies');
});
Route::get('/contacts/owners/companies', [\App\Http\Controllers\OwnerCompanyController::class, 'companies'])->name('contacts.owners.companies');
Route::get('/contacts/owners/funds', [\App\Http\Controllers\OwnerCompanyController::class, 'funds'])->name('contacts.owners.funds');
Route::get('/contacts/owners/{id}/{tab?}', [\App\Http\Controllers\OwnerCompanyController::class, 'show'])->name('contacts.owners.show')->where('tab', 'summary|properties|transactions|listings|funds|tenants|contacts|relationships|news');
Route::get('/contacts/brokers', [\App\Http\Controllers\BrokerController::class, 'index'])->name('contacts.brokers');
Route::get('/contacts/brokers/{id}/{tab?}', [\App\Http\Controllers\BrokerController::class, 'show'])->name('contacts.brokers.show');
Route::get('/contacts/locations', [\App\Http\Controllers\DirectoryLocationController::class, 'index'])->name('contacts.locations');
Route::get('/contacts/companies', [\App\Http\Controllers\DirectoryBrokerCompanyController::class, 'index'])->name('contacts.companies');
Route::get('/contacts/all', [\App\Http\Controllers\MiscController::class, 'contactsAll'])->name('contacts.all');

// Comparables routes
Route::get('/comps/commercial-sales', [\App\Http\Controllers\MiscController::class, 'compsCommercialSales'])->name('comps.commercial-sales');
Route::get('/comps/commercial-lease', [\App\Http\Controllers\MiscController::class, 'compsCommercialLease'])->name('comps.commercial-lease');
Route::get('/comps/residential-sales', [\App\Http\Controllers\MiscController::class, 'compsResidentialSales'])->name('comps.residential-sales');
Route::get('/comps/residential-lease', [\App\Http\Controllers\MiscController::class, 'compsResidentialLease'])->name('comps.residential-lease');
Route::get('/comps/all', [\App\Http\Controllers\MiscController::class, 'compsAll'])->name('comps.all');

// Scout System routes
Route::get('/scout', [\App\Http\Controllers\MiscController::class, 'scoutIndex'])->name('scout.index');
Route::get('/scout/owners-criteria', [\App\Http\Controllers\MiscController::class, 'scoutOwnersCriteria'])->name('scout.owners-criteria');
Route::get('/scout/tenant-criteria', [\App\Http\Controllers\MiscController::class, 'scoutTenantCriteria'])->name('scout.tenant-criteria');
Route::get('/scout/location-rankings', [\App\Http\Controllers\MiscController::class, 'scoutLocationRankings'])->name('scout.location-rankings');
Route::get('/scout/scout-map', [\App\Http\Controllers\MiscController::class, 'scoutScoutMap'])->name('scout.scout-map');
Route::get('/scout/scout-intelligence', [\App\Http\Controllers\MiscController::class, 'scoutScoutIntelligence'])->name('scout.scout-intelligence');

// Zoning Changes routes
Route::get('/zoning-changes/property-map', [\App\Http\Controllers\MiscController::class, 'zoningPropertyMap'])->name('zoning-changes.property-map');
Route::get('/zoning-changes/rezoning-map', [\App\Http\Controllers\MiscController::class, 'zoningRezoningMap'])->name('zoning-changes.rezoning-map');

// Pipeline / Underwriting routes
Route::get('/underwriting/saved', [\App\Http\Controllers\MiscController::class, 'underwritingSaved'])->name('underwriting.saved');
Route::get('/underwriting/completed', [\App\Http\Controllers\MiscController::class, 'underwritingCompleted'])->name('underwriting.completed');
Route::get('/underwriting/submitted', [\App\Http\Controllers\MiscController::class, 'underwritingSubmitted'])->name('underwriting.submitted');
Route::get('/underwriting/sheets', [\App\Http\Controllers\MiscController::class, 'underwritingSheets'])->name('underwriting.sheets');
Route::get('/underwriting/new-manual', [\App\Http\Controllers\MiscController::class, 'underwritingNewManual'])->name('underwriting.new-manual');
Route::get('/underwriting/new-ai', [\App\Http\Controllers\MiscController::class, 'underwritingNewAI'])->name('underwriting.new-ai');

// Tools routes
Route::get('/tools/mortgage-calculator', [\App\Http\Controllers\MiscController::class, 'toolsMortgageCalculator'])->name('tools.mortgage-calculator');
Route::get('/tools/cost-seg', [\App\Http\Controllers\MiscController::class, 'toolsCostSeg'])->name('tools.cost-seg');
Route::get('/tools/zoning-codes', [\App\Http\Controllers\MiscController::class, 'toolsZoningCodes'])->name('tools.zoning-codes');

// Todo Routes (Authenticated)
Route::middleware(['auth'])->group(function () {
    Route::get('/tools/todo', function() { return redirect()->route('tools.todo.my-tasks'); });
    Route::get('/tools/todo/my-tasks', [\App\Http\Controllers\TodoController::class, 'index'])->name('tools.todo.my-tasks');
    Route::post('/tools/todo/tasks', [\App\Http\Controllers\TodoController::class, 'store'])->name('tools.todo.store');
    Route::put('/tools/todo/tasks/{todoTask}', [\App\Http\Controllers\TodoController::class, 'update'])->name('tools.todo.update');
    Route::delete('/tools/todo/tasks/{todoTask}', [\App\Http\Controllers\TodoController::class, 'destroy'])->name('tools.todo.destroy');

    // Other Todo Views
    Route::get('/tools/todo/home', [\App\Http\Controllers\MiscController::class, 'todoHome'])->name('tools.todo.home');
    Route::get('/tools/todo/inbox', [\App\Http\Controllers\MiscController::class, 'todoInbox'])->name('tools.todo.inbox');
    Route::get('/tools/todo/reporting', [\App\Http\Controllers\MiscController::class, 'todoReporting'])->name('tools.todo.reporting');
    Route::get('/tools/todo/portfolios', [\App\Http\Controllers\MiscController::class, 'todoPortfolios'])->name('tools.todo.portfolios');
    Route::get('/tools/todo/goals', [\App\Http\Controllers\MiscController::class, 'todoGoals'])->name('tools.todo.goals');
    Route::get('/tools/todo/projects', [\App\Http\Controllers\MiscController::class, 'todoProjects'])->name('tools.todo.projects');
    Route::get('/tools/todo/teams', [\App\Http\Controllers\MiscController::class, 'todoTeams'])->name('tools.todo.teams');
});

Route::get('/tools/calendar', [\App\Http\Controllers\MiscController::class, 'toolsCalendar'])->name('tools.calendar');
Route::get('/tools/chatgpt-assistant', [\App\Http\Controllers\MiscController::class, 'toolsChatGPTAssistant'])->name('tools.chatgpt-assistant');
Route::get('/links/quick-links', [\App\Http\Controllers\MiscController::class, 'linksQuickLinks'])->name('links.quick-links');

// Settings routes
Route::get('/settings/buy-box', [\App\Http\Controllers\MiscController::class, 'settingsBuyBox'])->name('settings.buy-box');
Route::get('/settings/notifications', [\App\Http\Controllers\MiscController::class, 'settingsNotifications'])->name('settings.notifications');
Route::get('/settings/account', [\App\Http\Controllers\MiscController::class, 'settingsAccount'])->name('settings.account');
Route::get('/settings/subscription', [\App\Http\Controllers\MiscController::class, 'settingsSubscription'])->name('settings.subscription');

// Insights routes
Route::get('/insights', [\App\Http\Controllers\MiscController::class, 'insights'])->name('insights');

// News routes
Route::get('/news', [\App\Http\Controllers\MiscController::class, 'news'])->name('news.index');
Route::get('/news/{slug}', [\App\Http\Controllers\MiscController::class, 'newsShow'])->name('news.show');

// Footer links routes
Route::get('/quick-links/{slug}', [\App\Http\Controllers\MiscController::class, 'quickLink'])->name('quick-links.show');
Route::get('/learn-more/{slug}', [\App\Http\Controllers\MiscController::class, 'learnMore'])->name('learn-more.show');
Route::get('/policies/{slug}', [\App\Http\Controllers\MiscController::class, 'policy'])->name('policies.show');




Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Auth routes handled by Breeze (routes/auth.php)
require __DIR__.'/auth.php';
