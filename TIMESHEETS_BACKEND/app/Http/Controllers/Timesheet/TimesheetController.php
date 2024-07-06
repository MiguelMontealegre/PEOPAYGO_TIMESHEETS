<?php
declare(strict_types=1);

namespace App\Http\Controllers\Timesheet;

use Carbon\Carbon;
use App\Models\Timesheet;
use App\Enums\TimesheetEnum;
use Illuminate\Http\Request;
use App\Models\User\UserProfile;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use App\Models\EmployeeTimesheetData;
use App\Http\Resources\User\UserResource;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Requests\Timesheet\TimesheetRequest;
use App\Http\Resources\Timesheet\TimesheetResource;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;


class TimesheetController extends Controller
{


	protected function createTimesheet(TimesheetRequest $request): JsonResponse
	{
		$cleanRequest = $request->except(['employees']);
		$timesheet = Timesheet::create($cleanRequest);

		$employeesIds = $request->input('employees');
		
		foreach($employeesIds as $employeeId){
			EmployeeTimesheetData::create([
				'timesheetId' => $timesheet->id,
				'employeeId' => $employeeId
			]);
		}

		return response()
			->json($timesheet)
			->setStatusCode(Response::HTTP_OK);
	} //end createModelBot()





	protected function updateTimesheet(Timesheet $timesheet, TimesheetRequest $request): JsonResponse
	{
		$cleanRequest = $request->except(['employees']);
		$timesheet->update($cleanRequest);

		$employeesIds = $request->input('employees');
		$employeesTimesheetData = EmployeeTimesheetData::query()->where('timesheetId', $timesheet->id)->whereNotIn('id', $employeesIds)->get();
		foreach ($employeesTimesheetData as $elem) {
			$elem->delete();
		}
		
		foreach($employeesIds as $employeeId){
			EmployeeTimesheetData::create([
				'timesheetId' => $timesheet->id,
				'employeeId' => $employeeId
			]);
		}

		return response()
			->json($timesheet)
			->setStatusCode(Response::HTTP_OK);
	} //end createModelBot()



	protected function adminEdit(Timesheet $timesheet, Request $request): JsonResponse
	{

		$status = $request->input('status', isset($timesheet->status) ? $timesheet->status : TimesheetEnum::PENDING->name);
		$note = $request->input('note', null);

		$timesheet->update([
			'status' => $status,
			'note' => $note
		]);


		return response()
			->json($timesheet)
			->setStatusCode(Response::HTTP_OK);
	} //end createModelBot()


}//end class
