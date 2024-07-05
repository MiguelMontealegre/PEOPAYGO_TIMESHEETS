<?php

declare(strict_types=1);

namespace App\Http\Requests\ClientCompany;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ClientCompanyRequest extends FormRequest
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
			'name'          => [
				'string',
				'required'
			],
			'userId'        => [
				'required',
				'uuid',
				'exists:users,id',
			],
		];
	} //end rules()


}//end class
