<?php

use App\Enums\TimesheetEnum;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('timesheets', function (Blueprint $table) {
			$table->uuid('id')->primary();

			$table->string('title');
			$table->string('status')->default(TimesheetEnum::PENDING->name);
			$table->text('note')->nullable();
			$table->timestamp('checkDate');
			$table->timestamp('paymentPeriodStartDate');
			$table->timestamp('paymentPeriodEndDate');

			$table->uuid('clientCompanyId')->nullable();
			$table->foreign('clientCompanyId')
				->references('id')
				->on('clientCompanies')
				->onDelete('restrict')
				->onUpdate('restrict');

			$table->timestamp('updatedAt')->useCurrent()->useCurrentOnUpdate();
			$table->timestamp('createdAt')->useCurrent();
			$table->timestamp('deletedAt')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('timesheets');
    }
};
