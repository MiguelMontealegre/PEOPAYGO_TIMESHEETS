<?php
declare(strict_types=1);

namespace App\Http\Controllers\Employee;

use App\Models\Employee;
use App\QueryFilters\Pagination;
use App\Http\Controllers\Base\ScoutList;
use App\Http\Requests\PaginationRequest;
use App\QueryFilters\ClientCompanyFilter;
use Illuminate\Contracts\Container\Container;
use App\Http\Resources\Employee\EmployeeResource;

class EmployeeList extends ScoutList
{

    /**
     * @var string
     */
    public string $modelClass = Employee::class;

    /**
     * @var string
     */
    public string $resourceClass = EmployeeResource::class;

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
			ClientCompanyFilter::class,
        ];
        parent::__construct($container);

    }//end __construct()


}//end class
