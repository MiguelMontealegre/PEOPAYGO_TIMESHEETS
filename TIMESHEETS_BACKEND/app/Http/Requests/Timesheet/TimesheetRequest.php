<?php

declare(strict_types=1);

namespace App\Http\Requests\Timesheet;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class TimesheetRequest extends FormRequest
{


	/**
	 * Determine if the user is authorized to make this request.
	 *
	 * @return bool
	 */
	public function authorize(): bool
	{
		return true;
	} //end authorize()


	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array<string, mixed>
	 */
	public function rules(): array
	{

		return [
			'title' => ['required', 'string'],
			'status' => ['nullable', 'string'],
			'note' => ['nullable', 'string'],
			'checkDate' => ['required', 'date'],
			'paymentPeriodStartDate' => ['required', 'date'],
			'paymentPeriodEndDate' => ['required', 'date'],

			'employees' => ['required', 'array'],
			'employees.*' => [
				'required',
				'uuid',
				'exists:employees,id'
			],

		];
	} //end rules()


}//end class
