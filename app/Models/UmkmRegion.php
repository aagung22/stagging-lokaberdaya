<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['city', 'description', 'sort_order'])]
class UmkmRegion extends Model
{
    protected function casts(): array
    {
        return [
            'sort_order' => 'integer',
        ];
    }

    public function images(): HasMany
    {
        return $this->hasMany(UmkmRegionImage::class)->orderBy('sort_order');
    }

    public function beneficiaries(): HasMany
    {
        return $this->hasMany(UmkmBeneficiary::class)->orderBy('sort_order');
    }
}
