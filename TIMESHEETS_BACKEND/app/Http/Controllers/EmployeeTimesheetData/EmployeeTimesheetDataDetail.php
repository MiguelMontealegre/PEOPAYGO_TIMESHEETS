<?php
declare(strict_types=1);

namespace App\Http\Controllers\EmployeeTimesheetData;

use App\Http\Controllers\Base\BaseDetail;
use App\Http\Resources\EmployeeTimesheetData\EmployeeTimesheetDataResource;
use App\Models\EmployeeTimesheetData;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;


class EmployeeTimesheetDataDetail extends BaseDetail
{

    /**
     * @var string
     */
    public string $modelClass = EmployeeTimesheetData::class;

    /**
     * @var string
     */
    public string $resourceClass = EmployeeTimesheetDataResource::class;


}//end class
