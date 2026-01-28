<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@tenantshq.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
            'user_type' => 'admin',
            'remember_token' => Str::random(10),
        ]);
    }
}
