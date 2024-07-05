<?php
declare(strict_types=1);

namespace App\Http\Controllers\ClientCompany;

use App\Http\Controllers\Base\BaseUpdate;
use App\Http\Requests\ClientCompany\ClientCompanyRequest;
use App\Http\Resources\ClientCompany\ClientCompanyResource;
use App\Models\ClientCompany;

class ClientCompanyUpdate extends BaseUpdate
{

    /**
     * @var string
     */
    public string $modelClass = ClientCompany::class;

    /**
     * @var string
     */
    public string $resourceClass = ClientCompanyResource::class;

    /**
     * @var string
     */
    public string $requestClass = ClientCompanyRequest::class;

}//end class
