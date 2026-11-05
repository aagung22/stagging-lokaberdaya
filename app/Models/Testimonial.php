<?php

namespace App\Models;

use App\Models\Concerns\ResolvesImageUrls;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['quote', 'name', 'role', 'photo_path', 'sort_order', 'is_active'])]
class Testimonial extends Model
{
    use ResolvesImageUrls;

    protected $appends = ['photo_url'];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    public function getPhotoUrlAttribute(): ?string
    {
        return $this->resolveImageUrl($this->photo_path);
    }
}
