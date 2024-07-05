<?php
declare(strict_types=1);

namespace App\Http\Resources\ClientCompany;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ClientCompanyResource extends JsonResource
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
            ]
        );

        return $response->toArray();

    }//end toArray()


}//end class
