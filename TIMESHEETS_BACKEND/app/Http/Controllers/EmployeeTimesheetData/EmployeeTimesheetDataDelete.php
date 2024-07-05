<?php
declare(strict_types=1);

namespace App\Http\Controllers\EmployeeTimesheetData;

use App\Http\Controllers\Base\BaseDelete;
use App\Models\EmployeeTimesheetData;

class EmployeeTimesheetDataDelete extends BaseDelete
{

    /**
     * @var string
     */
    public string $modelClass = EmployeeTimesheetData::class;

}//end class
