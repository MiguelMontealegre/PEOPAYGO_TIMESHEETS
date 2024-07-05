<?php

namespace App\QueryFilters;

use Closure;
use Illuminate\Contracts\Database\Eloquent\Builder;

class ClientCompanyFilter
{

    public function handle($request, Closure $next): Builder
    {
        $builder = $next($request);
        if (request()->has('filters.clientCompanies')) {
            $builder->whereIn('clientCompanyId', request()->input('filters.clientCompanies'));
        }

        // Join to make searchable
        return $builder;

    }//end handle()


}//end class
