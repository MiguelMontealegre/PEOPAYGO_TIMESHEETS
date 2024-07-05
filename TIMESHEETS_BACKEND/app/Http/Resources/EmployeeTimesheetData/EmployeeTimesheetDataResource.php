<?php
declare(strict_types=1);

namespace App\Http\Resources\EmployeeTimesheetData;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Employee\EmployeeResource;

class EmployeeTimesheetDataResource extends JsonResource
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
				'employee' => EmployeeResource::make($this->resource->employee)
            ]
        );

        return $response->toArray();

    }//end toArray()


}//end class
