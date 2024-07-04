<?php
declare(strict_types=1);

namespace App\Http\Controllers\PaymentType;

use App\Http\Controllers\Base\BaseUpdate;
use App\Http\Requests\PaymentType\PaymentTypeRequest;
use App\Http\Resources\PaymentType\PaymentTypeResource;
use App\Models\PaymentType;

class PaymentTypeUpdate extends BaseUpdate
{

    /**
     * @var string
     */
    public string $modelClass = PaymentType::class;

    /**
     * @var string
     */
    public string $resourceClass = PaymentTypeResource::class;

    /**
     * @var string
     */
    public string $requestClass = PaymentTypeRequest::class;

}//end class
