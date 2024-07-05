<?php
declare(strict_types=1);

namespace App\Http\Controllers\Employee;
use App\Http\Controllers\Base\BaseCreate;
use App\Http\Requests\Employee\EmployeeRequest;
use App\Http\Resources\Employee\EmployeeResource;
use App\Models\Employee;


class EmployeeCreate extends BaseCreate
{

    /**
     * @var string
     */
    public string $modelClass = Employee::class;

    /**
     * @var string
     */
    public string $resourceClass = EmployeeResource::class;

    /**
     * @var string
     */
    public string $requestClass = EmployeeRequest::class;

}//end class
