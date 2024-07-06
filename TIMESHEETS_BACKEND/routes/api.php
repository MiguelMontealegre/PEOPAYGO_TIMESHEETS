<?php

use App\Http\Middleware\IsAdmin;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\User\UserList;
use App\Http\Controllers\Media\MediaList;
use App\Http\Controllers\User\UserDelete;
use App\Http\Controllers\User\UserDetail;
use App\Http\Controllers\HelperController;
use App\Http\Controllers\Media\MediaDetail;
use App\Http\Controllers\Media\MediaUpdate;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Employee\EmployeeList;
use App\Http\Controllers\Media\MediaController;
use App\Http\Controllers\Employee\EmployeeCreate;
use App\Http\Controllers\Employee\EmployeeDelete;
use App\Http\Controllers\Employee\EmployeeDetail;
use App\Http\Controllers\Employee\EmployeeUpdate;
use App\Http\Controllers\Timesheet\TimesheetList;
use App\Http\Controllers\Auth\LoginUserController;
use App\Http\Controllers\Timesheet\TimesheetDelete;
use App\Http\Controllers\Timesheet\TimesheetDetail;
use App\Http\Controllers\Auth\RegisterUserController;
use App\Http\Controllers\Employee\EmployeeController;
use App\Http\Controllers\MediaEntity\MediaEntityList;
use App\Http\Controllers\PaymentType\PaymentTypeList;
use App\Http\Controllers\Auth\PasswordResetController;
use App\Http\Controllers\Auth\PasswordForgotController;
use App\Http\Controllers\MediaEntity\MediaEntityCreate;
use App\Http\Controllers\MediaEntity\MediaEntityDelete;
use App\Http\Controllers\MediaEntity\MediaEntityDetail;
use App\Http\Controllers\MediaEntity\MediaEntityUpdate;
use App\Http\Controllers\PaymentType\PaymentTypeCreate;
use App\Http\Controllers\PaymentType\PaymentTypeDelete;
use App\Http\Controllers\PaymentType\PaymentTypeDetail;
use App\Http\Controllers\PaymentType\PaymentTypeUpdate;
use App\Http\Controllers\Timesheet\TimesheetController;
use App\Http\Controllers\ClientCompany\ClientCompanyList;
use App\Http\Controllers\Auth\PasswordTokenCheckController;
use App\Http\Controllers\ClientCompany\ClientCompanyCreate;
use App\Http\Controllers\ClientCompany\ClientCompanyDelete;
use App\Http\Controllers\ClientCompany\ClientCompanyDetail;
use App\Http\Controllers\ClientCompany\ClientCompanyUpdate;
use App\Http\Controllers\MediaEntity\MediaEntityController;
use App\Http\Controllers\PaymentType\PaymentTypeController;
use App\Http\Controllers\ClientCompany\ClientCompanyController;
use App\Http\Controllers\EmployeeTimesheetData\EmployeeTimesheetDataList;
use App\Http\Controllers\EmployeeTimesheetData\EmployeeTimesheetDataDelete;
use App\Http\Controllers\EmployeeTimesheetData\EmployeeTimesheetDataDetail;

/** Open Routes */
Route::prefix('users')
    ->group(function () {
        Route::get('logout', LogoutController::class);
        Route::post('register', [RegisterUserController::class, 'register']);
        Route::post('login', [LoginUserController::class, 'login']);
        Route::post('password-forgot', PasswordForgotController::class);
        Route::post('password-token-check', PasswordTokenCheckController::class);
        Route::post('password-reset', PasswordResetController::class);
    });

Route::group(['middleware' => ['web']], function () {
    Route::get('/google-auth/callback', [LoginUserController::class, 'externalAuthCallback']);
});



/** No Opened Routes */

/** Mobile Routes with OAuth Token */
Route::middleware(['auth.secure'])->group(function () {
    /** Mobile */
    Route::post('/users/login-by-email', [LoginUserController::class, 'loginByEmail']);
    Route::post('/media/upload-file', [MediaController::class, 'uploadFile']);

    /** Others */
    Route::get('/users/get-by-slug/{hashId}/{userSlug}', [UserController::class, 'getByUserByHashAndSlug']);
    Route::get('/users/get-by-id/{user}', [UserDetail::class, 'show']);
    /** Stories */
});

Route::get('{user}/email-confirmation', [RegisterUserController::class, 'emailConfirmation']);
/** User Routes */
Route::prefix('users')
    ->middleware(['auth:sanctum'])
    ->group(function () {
        Route::get('get-role-list', [UserController::class, 'getRoleList']);
        Route::get('get-by-session', [UserController::class, 'getBySession']);
        Route::get('get-archived', [UserController::class, 'getArchived']);
        Route::get('{user}/send-email-confirmation', [RegisterUserController::class, 'sendEmailConfirmation']);
        Route::get('{user}/email-confirmation', [RegisterUserController::class, 'emailConfirmation'])->middleware([IsAdmin::class]);

        Route::post('create-internal', [RegisterUserController::class, 'createInternal']);
        Route::post('create-admin', [RegisterUserController::class, 'createAdmin'])->middleware([IsAdmin::class]);
        Route::post('login-by-id', [LoginUserController::class, 'loginById'])->middleware([IsAdmin::class]);
        Route::post('update-password', [UserController::class, 'updatePassword']);
        Route::post('update-role', [UserController::class, 'updateRole']);
        Route::post('update-profile-media', [UserController::class, 'updateProfileMedia']);

        Route::get('/', [UserList::class, 'list']);
        Route::get('/{user}', [UserDetail::class, 'show']);
        Route::delete('/{user}', [UserDelete::class, 'delete']);
        Route::put('/archive/{user}', [UserController::class, 'archive']);
        Route::put('/restore/{user}', [UserController::class, 'restore']);
        Route::put('/{user}', [UserController::class, 'update']);
    });





Route::prefix('payment-types')
	->middleware([IsAdmin::class])
    ->group(function () {
        Route::get('/', [PaymentTypeList::class, 'list']);
		Route::get('/all', [PaymentTypeController::class, 'getPaymentTypesList']);
        Route::get('/{paymentType}', [PaymentTypeDetail::class, 'show']);
        Route::post('/', [PaymentTypeCreate::class, 'create']);
        Route::put('/{paymentType}', [PaymentTypeUpdate::class, 'update']);
        Route::delete('/{paymentType}', [PaymentTypeDelete::class, 'delete']);
});


Route::prefix('employees')
	->middleware(['auth:sanctum'])
    ->group(function () {
        Route::get('/', [EmployeeList::class, 'list']);
		Route::get('/all-from-company', [EmployeeController::class, 'getEmployeesList']);
        Route::get('/{employee}', [EmployeeDetail::class, 'show']);
        Route::post('/', [EmployeeCreate::class, 'create']);
        Route::put('/{employee}', [EmployeeUpdate::class, 'update']);
        Route::delete('/{employee}', [EmployeeDelete::class, 'delete']);
});



Route::prefix('client-companies')
	->middleware(['auth:sanctum'])
    ->group(function () {
        Route::get('/', [ClientCompanyList::class, 'list']);
        Route::get('/{clientCompany}', [ClientCompanyDetail::class, 'show']);
        Route::post('/', [ClientCompanyController::class, 'createClientCompany']);
        Route::put('/{clientCompany}', [ClientCompanyUpdate::class, 'update']);
        Route::delete('/{clientCompany}', [ClientCompanyDelete::class, 'delete']);
});



Route::prefix('timesheets')
	->middleware(['auth:sanctum'])
    ->group(function () {
        Route::get('/', [TimesheetList::class, 'list']);
        Route::get('/{timesheet}', [TimesheetDetail::class, 'show']);
		Route::post('/', [TimesheetController::class, 'createTimesheet']);
		Route::put('/{timesheet}', [TimesheetController::class, 'updateTimesheet']);
		Route::put('/{timesheet}/admin', [TimesheetController::class, 'adminEdit']);
        Route::delete('/{timesheet}', [TimesheetDelete::class, 'delete']);
});



Route::prefix('employee-timesheet-Data')
	->middleware(['auth:sanctum'])
    ->group(function () {
        Route::get('/', [EmployeeTimesheetDataList::class, 'list']);
        Route::get('/{employeeTimesheetData}', [EmployeeTimesheetDataDetail::class, 'show']);
        Route::delete('/{employeeTimesheetData}', [EmployeeTimesheetDataDelete::class, 'delete']);
});



/** Media Routes */
Route::prefix('media')
    ->middleware(['auth:sanctum'])
    ->group(function () {
        Route::get('/', [MediaList::class, 'list']);
        Route::post('/upload', [MediaController::class, 'uploadFile']);
        Route::post('/upload-file-from-url', [MediaController::class, 'uploadFileFromUrl']);
        Route::post('/encode-image', [MediaController::class, 'encodeImage']);
        Route::post('/create-media-for-aws-url', [MediaController::class, 'createMediaForAWSUrl']);
        Route::delete('/{media}', [MediaController::class, 'delete']);
        Route::get('/{media}', [MediaDetail::class, 'show']);
        Route::put('/{media}', [MediaUpdate::class, 'update']);
        ## User Tags
        Route::post('/add-user-tag', [MediaController::class, 'addUserTag']);
        Route::delete('/delete-user-tag/{mediaUserTag}', [MediaController::class, 'deleteUserTag']);

        //Robin API
        Route::post('/handle-doc', [MediaController::class, 'handleDoc']);
    });

Route::post('upload', [MediaController::class, 'uploadFile']);

/** Media Entity Routes */
Route::prefix('media-entity')
    ->middleware(['auth:sanctum'])
    ->group(function () {
        /** Singleton */
        Route::get('/', [MediaEntityList::class, 'list']);
        Route::post('/', [MediaEntityCreate::class, 'create']);
        Route::get('/{mediaEntity}', [MediaEntityDetail::class, 'show']);
        Route::delete('/{mediaEntity}', [MediaEntityDelete::class, 'delete']);
        Route::put('/{mediaEntity}', [MediaEntityUpdate::class, 'update']);
    });

Route::prefix('media-entities')
    ->middleware(['auth:sanctum'])
    ->group(function () {
        Route::get('{media}', [MediaEntityController::class, 'getMediaEntitiesByMediaId']);
    });

Route::prefix('helper')
    ->middleware(['auth:sanctum'])
    ->group(function () {
        Route::get('/get-timezone-list', [HelperController::class, 'getTimezoneList']);
        Route::get('/get-timezone-list-with-offset', [HelperController::class, 'getTimezoneWithOffset']);
    });





