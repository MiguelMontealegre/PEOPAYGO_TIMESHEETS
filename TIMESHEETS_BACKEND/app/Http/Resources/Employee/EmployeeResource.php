<?php
declare(strict_types=1);

namespace App\Http\Resources\Employee;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeResource extends JsonResource
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
                'name'           => $this->resource->name,
				'paymentAmount'           => $this->resource->paymentAmount,
				'paymentType'           => $this->resource->paymentType,
				'hours'           => $this->resource->hours,
				'clientCompany' => $this->resource->clientCompany
            ]
        );

        return $response->toArray();

    }//end toArray()


}//end class
