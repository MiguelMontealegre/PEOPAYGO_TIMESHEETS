<?php

namespace App\Models;

use App\Models\Employee;
use App\Models\Timesheet;
use App\Traits\UuidTrait;
use Laravel\Scout\Searchable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class EmployeeTimesheetData extends Model
{
    use Searchable, UuidTrait;

	/**
     * @var string Rename created_at
     */
    const CREATED_AT = 'createdAt';
    /**
     * @var string Rename updated_at
     */
    const UPDATED_AT = 'updatedAt';
    /**
     * @var string Rename deleted_at
     */
    const DELETED_AT = 'deletedAt';

	

	/**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [];




	/**
     * Rename Default Table Name
     *
     * @var string
     */
    protected $table = 'employeeTimesheetData';



	/**
     * Overrides Searchable fields
     *
     * @return array
     */
    public function toSearchableArray(): array
    {
        return [
            'grossSalary'           => $this->grossSalary,
        ];

    }//end toSearchableArray()





	/**
     * Get timesheet
     *
     * @return BelongsTo
     */
    public function timesheet(): BelongsTo
    {
        return $this->belongsTo(Timesheet::class, 'timesheetId');

    }//end modelbot()




	/**
     * Get timesheet
     *
     * @return BelongsTo
     */
    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class, 'employeeId');

    }//end modelbot()


}
