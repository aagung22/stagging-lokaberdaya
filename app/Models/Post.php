<?php

namespace App\Models;

use App\Models\Concerns\ResolvesImageUrls;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'post_category_id',
    'title',
    'slug',
    'author',
    'published_at',
    'excerpt',
    'body',
    'image_path',
    'external_link',
    'is_published',
    'sort_order',
])]
class Post extends Model
{
    use ResolvesImageUrls;

    protected $appends = ['image_url'];

    protected function casts(): array
    {
        return [
            'published_at' => 'datetime',
            'is_published' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(PostCategory::class, 'post_category_id');
    }

    public function getImageUrlAttribute(): ?string
    {
        return $this->resolveImageUrl($this->image_path);
    }
}
