<?php
declare(strict_types=1);

namespace App\Http\Controllers\PaymentType;

use App\Models\PaymentType;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class PaymentTypeController extends Controller
{
     /**
     * @return JsonResponse
     */
    public function getPaymentTypesList(): JsonResponse
    {
        return response()
            ->json(PaymentType::all())
            ->setStatusCode(ResponseAlias::HTTP_OK);

    }//end getRoleList()


}//end class
