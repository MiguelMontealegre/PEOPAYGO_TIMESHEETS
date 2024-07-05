<?php

namespace App\QueryFilters;

use Closure;
use Illuminate\Contracts\Database\Eloquent\Builder;

class TimesheetFilter
{

    public function handle($request, Closure $next): Builder
    {
        $builder = $next($request);
        if (request()->has('filters.timesheets')) {
            $builder->whereIn('timesheetId', request()->input('filters.timesheets'));
        }

        // Join to make searchable
        return $builder;

    }//end handle()


}//end class
