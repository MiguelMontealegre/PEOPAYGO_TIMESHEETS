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
		Schema::create('employees', function (Blueprint $table) {
			$table->uuid('id')->primary();
			$table->string('name');
			$table->bigInteger('paymentAmount');

			$table->uuid('clientCompanyId')->nullable();
			$table->foreign('clientCompanyId')
				->references('id')
				->on('clientCompanies')
				->onDelete('restrict')
				->onUpdate('restrict');


			$table->uuid('paymentTypeId')->nullable();
			$table->foreign('paymentTypeId')
				->references('id')
				->on('paymentTypes')
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
		Schema::dropIfExists('employees');
	}
};
