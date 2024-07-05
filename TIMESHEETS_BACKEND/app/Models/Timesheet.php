<?php

namespace App\Models;

use App\Traits\UuidTrait;
use Laravel\Scout\Searchable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Timesheet extends Model
{
    use Searchable, UuidTrait;

	/**
     * @var string Rename created_at
     */
    const CREATED_AT = 'createdAt';
    /**
     * @var string Rename updated_at
     */
    const UPDATED_AT = 'updatedAt';
    /**
     * @var string Rename deleted_at
     */
    const DELETED_AT = 'deletedAt';

	

	/**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [];


	/**
     * Overrides Searchable fields
     *
     * @return array
     */
    public function toSearchableArray(): array
    {
        return [
            'title'           => $this->title,
        ];

    }//end toSearchableArray()






	/**
     * Get clientCompany
     *
     * @return BelongsTo
     */
    public function clientCompany(): BelongsTo
    {
        return $this->belongsTo(ClientCompany::class, 'clientCompanyId');

    }//end modelbot()
}
