<?php
declare(strict_types=1);

namespace App\Http\Controllers\ClientCompany;

use Carbon\Carbon;
use App\Models\ClientCompany;
use App\Models\User\Role;
use App\Models\User;
use App\Helpers\UserHelper;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\User\UserRole;
use App\Enums\User\UserRoleEnum;
use App\Models\User\UserProfile;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use App\Http\Resources\User\UserResource;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Resources\ClientCompany\ClientCompanyResource;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;


class ClientCompanyController extends Controller
{


}//end class
