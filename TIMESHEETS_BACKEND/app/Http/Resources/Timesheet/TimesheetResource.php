<?php
declare(strict_types=1);

namespace App\Http\Resources\Timesheet;

use App\Http\Resources\EmployeeTimesheetData\EmployeeTimesheetDataResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TimesheetResource extends JsonResource
{


    /**
     * Transform the resource into an array.
     *
     * @param Request $request
     *
     * @return array
     */
    public function toArray($request): array
    {

        $response = collect(
            [
                'id'             => $this->resource->id,
                'title'           => $this->resource->title,
				'status'           => $this->resource->status,
				'note'           => $this->resource->note,
				'checkDate'           => $this->resource->checkDate,

				'clientCompany' => $this->resource->clientCompany,

				'employeesTimesheetData'       => EmployeeTimesheetDataResource::collection($this->resource->employeeTimesheetData),
				'paymentPeriodStartDate'           => $this->resource->paymentPeriodStartDate,
				'paymentPeriodEndDate'           => $this->resource->paymentPeriodEndDate,
            ]
        );

        return $response->toArray();

    }//end toArray()


}//end class
