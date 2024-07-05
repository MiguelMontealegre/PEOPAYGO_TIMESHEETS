<?php
declare(strict_types=1);

namespace App\Enums;


/**
 * UserRoleEnum
 *
 * INCLUDE WITH SINGULAR (ENTITY) _ ROLE
 *
 * @category Enums
 * @package  App\Enums

 */
enum TimesheetEnum: string
{
    case PENDING = 'PENDING';
	case PROCESSED = 'PROCESSED';
}//end enum
