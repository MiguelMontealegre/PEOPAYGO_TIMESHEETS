<?php
declare(strict_types=1);

namespace Database\Seeders;

use App\Models\PaymentType;
use App\Models\PlanFeature;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PaymentTypeSeeder extends Seeder
{
    /**
     * Run Seeder
     *
     * @return void
     */
    public function run(): void
    {

		PaymentType::query()->create(
			[
				'id'       => Str::uuid(),
				'name' => 'hour',
			]
		);
		PaymentType::query()->create(
			[
				'id'       => Str::uuid(),
				'name' => 'salary',
			]
		);

    }//end run()
}//end class
