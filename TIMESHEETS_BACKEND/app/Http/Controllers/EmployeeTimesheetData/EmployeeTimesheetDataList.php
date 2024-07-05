<?php
declare(strict_types=1);

namespace App\Http\Controllers\EmployeeTimesheetData;

use App\QueryFilters\Pagination;
use App\Models\EmployeeTimesheetData;
use App\QueryFilters\TimesheetFilter;
use App\Http\Controllers\Base\ScoutList;
use App\Http\Requests\PaginationRequest;
use Illuminate\Contracts\Container\Container;
use App\Http\Resources\EmployeeTimesheetData\EmployeeTimesheetDataResource;

class EmployeeTimesheetDataList extends ScoutList
{

    /**
     * @var string
     */
    public string $modelClass = EmployeeTimesheetData::class;

    /**
     * @var string
     */
    public string $resourceClass = EmployeeTimesheetDataResource::class;

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
			TimesheetFilter::class,
        ];
        parent::__construct($container);

    }//end __construct()


}//end class
