<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\PostCategory;
use App\Support\ImageUploader;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/posts/index', [
            'posts' => Post::query()->with('category')->orderByDesc('published_at')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/posts/edit', [
            'post' => null,
            'categories' => PostCategory::query()->orderBy('sort_order')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $this->validatePost($request);

        Post::query()->create([
            ...$validated,
            'slug' => $this->slug($validated),
            'image_path' => ImageUploader::store($request->file('image'), 'posts'),
            'is_published' => $request->boolean('is_published', true),
        ]);

        $this->flashSuccess('Artikel berhasil ditambahkan.');

        return to_route('admin.posts.index');
    }

    public function edit(Post $post): Response
    {
        return Inertia::render('admin/posts/edit', [
            'post' => $post,
            'categories' => PostCategory::query()->orderBy('sort_order')->get(),
        ]);
    }

    public function update(Request $request, Post $post): RedirectResponse
    {
        $validated = $this->validatePost($request, $post);
        $data = [
            ...$validated,
            'slug' => $this->slug($validated),
            'is_published' => $request->boolean('is_published'),
        ];

        if ($request->hasFile('image')) {
            ImageUploader::delete($post->image_path);
            $data['image_path'] = ImageUploader::store($request->file('image'), 'posts');
        }

        $post->update($data);

        $this->flashSuccess('Artikel berhasil diperbarui.');

        return to_route('admin.posts.index');
    }

    public function destroy(Post $post): RedirectResponse
    {
        ImageUploader::delete($post->image_path);
        $post->delete();

        $this->flashSuccess('Artikel berhasil dihapus.');

        return back();
    }

    /**
     * @return array<string, mixed>
     */
    private function validatePost(Request $request, ?Post $post = null): array
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', Rule::unique('posts', 'slug')->ignore($post)],
            'post_category_id' => ['nullable', 'integer', 'exists:post_categories,id'],
            'author' => ['nullable', 'string', 'max:255'],
            'published_at' => ['nullable', 'date'],
            'excerpt' => ['nullable', 'string'],
            'body' => ['nullable', 'string'],
            'external_link' => ['nullable', 'url', 'max:255'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp,avif', 'max:8192'],
        ]);

        return [
            'title' => $validated['title'],
            'slug' => $validated['slug'] ?? null,
            'post_category_id' => $validated['post_category_id'] ?? null,
            'author' => $validated['author'] ?? null,
            'published_at' => $validated['published_at'] ?? null,
            'excerpt' => $validated['excerpt'] ?? null,
            'body' => $validated['body'] ?? null,
            'external_link' => $validated['external_link'] ?? null,
            'sort_order' => (int) ($validated['sort_order'] ?? 0),
        ];
    }

    /**
     * @param  array<string, mixed>  $validated
     */
    private function slug(array $validated): string
    {
        return Str::slug($validated['slug'] ?? $validated['title']);
    }
}
