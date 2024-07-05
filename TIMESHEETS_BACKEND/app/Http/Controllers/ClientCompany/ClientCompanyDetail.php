<?php
declare(strict_types=1);

namespace App\Http\Controllers\ClientCompany;

use App\Http\Controllers\Base\BaseDetail;
use App\Http\Resources\ClientCompany\ClientCompanyResource;
use App\Models\ClientCompany;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;


class ClientCompanyDetail extends BaseDetail
{

    /**
     * @var string
     */
    public string $modelClass = ClientCompany::class;

    /**
     * @var string
     */
    public string $resourceClass = ClientCompanyResource::class;


}//end class
