<?php
declare(strict_types=1);

namespace App\Http\Controllers\Timesheet;

use App\Http\Controllers\Base\BaseDelete;
use App\Models\Timesheet;

class TimesheetDelete extends BaseDelete
{

    /**
     * @var string
     */
    public string $modelClass = Timesheet::class;

}//end class
