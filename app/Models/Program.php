<?php

namespace App\Models;

use App\Models\Concerns\ResolvesImageUrls;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable([
    'slug',
    'title',
    'page_title',
    'short_description',
    'hero_image',
    'hero_description',
    'sort_order',
    'is_active',
])]
class Program extends Model
{
    use ResolvesImageUrls;

    protected $appends = ['hero_image_url'];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    public function stats(): HasMany
    {
        return $this->hasMany(ProgramStat::class)->orderBy('sort_order');
    }

    public function activities(): HasMany
    {
        return $this->hasMany(ProgramActivity::class)->orderBy('sort_order');
    }

    public function getHeroImageUrlAttribute(): ?string
    {
        return $this->resolveImageUrl($this->hero_image);
    }
}
