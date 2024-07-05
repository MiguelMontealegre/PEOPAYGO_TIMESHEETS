<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('employeeTimesheetData', function (Blueprint $table) {
			$table->uuid('id')->primary();

			$table->uuid('timesheetId')->nullable();
			$table->foreign('timesheetId')
				->references('id')
				->on('timesheets')
				->onDelete('restrict')
				->onUpdate('restrict');


			$table->uuid('employeeId')->nullable();
			$table->foreign('employeeId')
				->references('id')
				->on('employees')
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
		Schema::dropIfExists('employeeTimesheetData');
	}
};
