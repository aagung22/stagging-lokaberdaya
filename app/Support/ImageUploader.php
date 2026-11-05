<?php

namespace App\Support;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class ImageUploader
{
    /**
     * Store an uploaded image on the public disk.
     */
    public static function store(?UploadedFile $file, string $folder): ?string
    {
        if (! $file) {
            return null;
        }

        return $file->store($folder, 'public');
    }

    /**
     * Delete an uploaded image. Seeded/public images are left untouched.
     */
    public static function delete(?string $path): void
    {
        if (blank($path)) {
            return;
        }

        if (str_starts_with($path, '/') || str_starts_with($path, 'http://') || str_starts_with($path, 'https://')) {
            return;
        }

        Storage::disk('public')->delete($path);
    }

    /**
     * Resolve a stored path or preset asset into a public URL.
     */
    public static function url(?string $path): ?string
    {
        if (blank($path)) {
            return null;
        }

        if (str_starts_with($path, '/') || str_starts_with($path, 'http://') || str_starts_with($path, 'https://')) {
            return $path;
        }

        return Storage::disk('public')->url($path);
    }
}
