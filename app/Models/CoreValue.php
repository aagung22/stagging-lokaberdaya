<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['title', 'description', 'icon', 'sort_order'])]
class CoreValue extends Model
{
    protected function casts(): array
    {
        return [
            'sort_order' => 'integer',
        ];
    }
}
