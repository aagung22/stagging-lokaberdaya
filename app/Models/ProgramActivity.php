<?php

namespace App\Models;

use App\Models\Concerns\ResolvesImageUrls;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'program_id',
    'city',
    'category',
    'image_path',
    'detail_items',
    'long_description',
    'sort_order',
])]
class ProgramActivity extends Model
{
    use ResolvesImageUrls;

    protected $appends = ['image_url'];

    protected function casts(): array
    {
        return [
            'detail_items' => 'array',
            'sort_order' => 'integer',
        ];
    }

    public function program(): BelongsTo
    {
        return $this->belongsTo(Program::class);
    }

    public function getImageUrlAttribute(): ?string
    {
        return $this->resolveImageUrl($this->image_path);
    }
}
