<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PostCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class PostCategoryController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/categories/index', [
            'categories' => PostCategory::query()->withCount('posts')->orderBy('sort_order')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', Rule::unique('post_categories', 'slug')],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);

        PostCategory::query()->create([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['slug'] ?? $validated['name']),
            'sort_order' => $validated['sort_order'] ?? 0,
        ]);

        $this->flashSuccess('Kategori berhasil ditambahkan.');

        return back();
    }

    public function update(Request $request, PostCategory $category): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', Rule::unique('post_categories', 'slug')->ignore($category)],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);

        $category->update([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['slug'] ?? $validated['name']),
            'sort_order' => $validated['sort_order'] ?? 0,
        ]);

        $this->flashSuccess('Kategori berhasil diperbarui.');

        return back();
    }

    public function destroy(PostCategory $category): RedirectResponse
    {
        $category->delete();

        $this->flashSuccess('Kategori berhasil dihapus.');

        return back();
    }
}
