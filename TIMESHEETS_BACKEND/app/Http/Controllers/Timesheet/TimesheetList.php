<?php
declare(strict_types=1);

namespace App\Http\Controllers\Timesheet;

use App\Models\Timesheet;
use App\QueryFilters\Pagination;
use App\Http\Controllers\Base\ScoutList;
use App\Http\Requests\PaginationRequest;
use App\QueryFilters\ClientCompanyFilter;
use Illuminate\Contracts\Container\Container;
use App\Http\Resources\Timesheet\TimesheetResource;

class TimesheetList extends ScoutList
{

    /**
     * @var string
     */
    public string $modelClass = Timesheet::class;

    /**
     * @var string
     */
    public string $resourceClass = TimesheetResource::class;

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
