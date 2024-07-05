<?php
declare(strict_types=1);

namespace App\Http\Controllers\ClientCompany;

use App\Http\Controllers\Base\BaseDelete;
use App\Models\ClientCompany;

class ClientCompanyDelete extends BaseDelete
{

    /**
     * @var string
     */
    public string $modelClass = ClientCompany::class;

}//end class
