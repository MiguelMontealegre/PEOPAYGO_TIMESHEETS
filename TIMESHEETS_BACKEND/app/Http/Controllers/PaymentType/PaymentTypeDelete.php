<?php
declare(strict_types=1);

namespace App\Http\Controllers\PaymentType;

use App\Http\Controllers\Base\BaseDelete;
use App\Models\PaymentType;

class PaymentTypeDelete extends BaseDelete
{

    /**
     * @var string
     */
    public string $modelClass = PaymentType::class;

}//end class
