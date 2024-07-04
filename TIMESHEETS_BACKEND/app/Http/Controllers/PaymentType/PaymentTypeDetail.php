<?php
declare(strict_types=1);

namespace App\Http\Controllers\PaymentType;

use App\Http\Controllers\Base\BaseDetail;
use App\Http\Resources\PaymentType\PaymentTypeResource;
use App\Models\PaymentType;
use Illuminate\Contracts\Container\Container;

class PaymentTypeDetail extends BaseDetail
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
     * @param Container $container
     */
    public function __construct(Container $container)
    {
        parent::__construct($container);

    }//end __construct()


}//end class
