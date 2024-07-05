<?php
declare(strict_types=1);

namespace App\Http\Controllers\Employee;

use App\Http\Controllers\Base\BaseDetail;
use App\Http\Resources\Employee\EmployeeResource;
use App\Models\Employee;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;


class EmployeeDetail extends BaseDetail
{

    /**
     * @var string
     */
    public string $modelClass = Employee::class;

    /**
     * @var string
     */
    public string $resourceClass = EmployeeResource::class;


}//end class
