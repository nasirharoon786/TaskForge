<?php

namespace App\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * Define your route model bindings, pattern filters, etc.
     *
     * @return void
     */
    public function boot()
    {

    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Define your routes.
     *
     * @return void
     */
    public function map()
    {
        $this->mapApiRoutes();

        // You can add other route mappings here (e.g., for web routes)
    }

    /**
     * Define the "api" routes for your application.
     *
     * @return void
     */
    protected function mapApiRoutes()
    {
        Route::prefix('api') // Automatically adds the 'api' prefix to all routes
            ->middleware('api') // Apply the 'api' middleware group
            // ->namespace($this->namespace) // Optional: Set the namespace for the controllers
            ->group(base_path('routes/api.php')); // Load the routes from api.php
    }
}
