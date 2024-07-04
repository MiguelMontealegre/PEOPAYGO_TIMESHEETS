<?php
declare(strict_types=1);

namespace App\Http\Controllers\PaymentType;

use App\Models\PaymentType;
use App\Http\Controllers\Base\ScoutList;
use App\Http\Requests\PaginationRequest;
use Illuminate\Contracts\Container\Container;
use App\Http\Resources\PaymentType\PaymentTypeResource;

class PaymentTypeList extends ScoutList
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
    public string $requestClass = PaginationRequest::class;


    /**
     * @param Container $container
     */
    public function __construct(Container $container)
    {
        $this->filters = [
        ];
        parent::__construct($container);

    }//end __construct()


}//end class
