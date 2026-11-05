<?php

namespace App\Models;

use App\Models\Concerns\ResolvesImageUrls;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['name', 'logo_path', 'url', 'sort_order', 'is_active'])]
class Partner extends Model
{
    use ResolvesImageUrls;

    protected $appends = ['logo_url'];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    public function getLogoUrlAttribute(): ?string
    {
        return $this->resolveImageUrl($this->logo_path);
    }
}
