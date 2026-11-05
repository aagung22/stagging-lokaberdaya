<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['key', 'value', 'group', 'type'])]
class SiteSetting extends Model
{
    /**
     * @var array<string, string|null>|null
     */
    protected static ?array $cachedValues = null;

    /**
     * @return array<string, string|null>
     */
    public static function allValues(): array
    {
        return static::$cachedValues ??= static::query()
            ->pluck('value', 'key')
            ->all();
    }

    public static function get(string $key, ?string $default = null): ?string
    {
        return static::allValues()[$key] ?? $default;
    }

    /**
     * @param  array<string, mixed>  $values
     */
    public static function setMany(array $values): void
    {
        foreach ($values as $key => $value) {
            static::query()->updateOrCreate(
                ['key' => $key],
                ['value' => $value],
            );
        }

        static::$cachedValues = null;
    }
}
