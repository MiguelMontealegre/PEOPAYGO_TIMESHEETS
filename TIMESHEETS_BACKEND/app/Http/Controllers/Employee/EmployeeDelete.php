<?php
declare(strict_types=1);

namespace App\Http\Controllers\Employee;

use App\Http\Controllers\Base\BaseDelete;
use App\Models\Employee;

class EmployeeDelete extends BaseDelete
{

    /**
     * @var string
     */
    public string $modelClass = Employee::class;

}//end class
