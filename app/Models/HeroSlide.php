<?php

namespace App\Models;

use App\Models\Concerns\ResolvesImageUrls;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['image_path', 'title', 'subtitle', 'sort_order', 'is_active'])]
class HeroSlide extends Model
{
    use ResolvesImageUrls;

    protected $appends = ['image_url'];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    public function getImageUrlAttribute(): ?string
    {
        return $this->resolveImageUrl($this->image_path);
    }
}
