<?php
declare(strict_types=1);

namespace App\Http\Controllers\Timesheet;

use App\Http\Controllers\Base\BaseDetail;
use App\Http\Resources\Timesheet\TimesheetResource;
use App\Models\Timesheet;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;


class TimesheetDetail extends BaseDetail
{

    /**
     * @var string
     */
    public string $modelClass = Timesheet::class;

    /**
     * @var string
     */
    public string $resourceClass = TimesheetResource::class;


}//end class
