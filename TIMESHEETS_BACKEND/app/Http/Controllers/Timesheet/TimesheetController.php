<?php
declare(strict_types=1);

namespace App\Http\Controllers\Timesheet;

use Carbon\Carbon;
use App\Models\Timesheet;
use Illuminate\Http\Request;
use App\Models\User\UserProfile;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use App\Http\Resources\User\UserResource;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Requests\Timesheet\TimesheetRequest;
use App\Http\Resources\Timesheet\TimesheetResource;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;


class TimesheetController extends Controller
{


	protected function createTimesheet(TimesheetRequest $request): JsonResponse
	{
		$timesheet = Timesheet::create($request->all());

		return response()
			->json($timesheet)
			->setStatusCode(Response::HTTP_OK);
	} //end createModelBot()


}//end class
