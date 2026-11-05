<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['umkm_region_id', 'name', 'business', 'sort_order'])]
class UmkmBeneficiary extends Model
{
    protected function casts(): array
    {
        return [
            'sort_order' => 'integer',
        ];
    }

    public function region(): BelongsTo
    {
        return $this->belongsTo(UmkmRegion::class, 'umkm_region_id');
    }
}
