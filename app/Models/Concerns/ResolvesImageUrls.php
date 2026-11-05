<?php

namespace App\Models\Concerns;

use Illuminate\Support\Facades\Storage;

trait ResolvesImageUrls
{
    /**
     * Resolve a stored image path into a public URL.
     *
     * Existing assets are stored as `/images/...`, while uploaded files use
     * a relative path on the public disk (`hero/abc.webp`).
     */
    protected function resolveImageUrl(?string $path): ?string
    {
        if (blank($path)) {
            return null;
        }

        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://') || str_starts_with($path, '/')) {
            return $path;
        }

        return Storage::disk('public')->url($path);
    }
}
