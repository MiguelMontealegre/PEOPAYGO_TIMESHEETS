<?php
declare(strict_types=1);

namespace App\Enums\User;


/**
 * UserRoleEnum
 *
 * INCLUDE WITH SINGULAR (ENTITY) _ ROLE
 *
 * @category Enums
 * @package  App\Enums

 */
enum UserRoleEnum: string
{
    case ADMIN = 'ADMIN';
	case CLIENT_USER = 'CLIENT_USER';
}//end enum
