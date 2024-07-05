<?php

namespace App\Models;

use App\Traits\UuidTrait;
use Laravel\Scout\Searchable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ClientCompany extends Model
{
    use HasFactory, Searchable, UuidTrait;

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
     * Rename Default Table Name
     *
     * @var string
     */
    protected $table = 'clientCompanies';



	/**
     * Overrides Searchable fields
     *
     * @return array
     */
    public function toSearchableArray(): array
    {
        return [
            'name'           => $this->name,
        ];

    }//end toSearchableArray()




	/**
     * Get user
     *
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'userId');

    }//end user()
}
