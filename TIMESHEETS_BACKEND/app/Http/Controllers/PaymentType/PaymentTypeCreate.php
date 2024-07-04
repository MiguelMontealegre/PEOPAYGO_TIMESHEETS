<?php
declare(strict_types=1);

namespace App\Http\Controllers\PaymentType;
use App\Models\PaymentType;
use App\Http\Controllers\Base\BaseCreate;
use App\Http\Requests\PaymentType\PaymentTypeRequest;
use App\Http\Resources\PaymentType\PaymentTypeResource;


class PaymentTypeCreate extends BaseCreate
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
