<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\PostCategory;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('blog', [
            'categories' => PostCategory::query()->orderBy('sort_order')->get(),
            'posts' => Post::query()
                ->with('category')
                ->where('is_published', true)
                ->orderByDesc('published_at')
                ->orderBy('sort_order')
                ->get(),
        ]);
    }
}
