<?php
declare(strict_types=1);

namespace App\Http\Controllers\Employee;

use Carbon\Carbon;
use App\Models\Employee;
use Illuminate\Http\Request;
use App\Models\User\UserProfile;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use App\Http\Resources\User\UserResource;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Resources\Employee\EmployeeResource;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;


class EmployeeController extends Controller
{

	/**
     * @return JsonResponse
     */
    public function getEmployeesList(Request $request): JsonResponse
    {
		$companies = $request->input('companies');
        return response()
            ->json(EmployeeResource::collection(Employee::whereIn('clientCompanyId', $companies)->get()))
            ->setStatusCode(ResponseAlias::HTTP_OK);

    }//end getRoleList()

}//end class
