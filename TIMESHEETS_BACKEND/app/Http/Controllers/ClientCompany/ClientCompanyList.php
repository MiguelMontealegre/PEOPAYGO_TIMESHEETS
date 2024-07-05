<?php
declare(strict_types=1);

namespace App\Http\Controllers\ClientCompany;

use App\Models\ClientCompany;
use App\QueryFilters\Pagination;
use App\QueryFilters\ParentUserFilter;
use App\Http\Controllers\Base\ScoutList;
use App\Http\Requests\PaginationRequest;
use Illuminate\Contracts\Container\Container;
use App\Http\Resources\ClientCompany\ClientCompanyResource;

class ClientCompanyList extends ScoutList
{

    /**
     * @var string
     */
    public string $modelClass = ClientCompany::class;

    /**
     * @var string
     */
    public string $resourceClass = ClientCompanyResource::class;

    /**
     * @var string
     */
    public string $requestClass = PaginationRequest::class;


    /**
     * @param Container $container
     */
    public function __construct(Container $container)
    {
        $this->filters = [
            Pagination::class,
			ParentUserFilter::class,
        ];
        parent::__construct($container);

    }//end __construct()


}//end class
