<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use App\Support\ImageUploader;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TestimonialController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/testimonials/index', [
            'testimonials' => Testimonial::query()->orderBy('sort_order')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'quote' => ['required', 'string'],
            'name' => ['required', 'string', 'max:255'],
            'role' => ['nullable', 'string', 'max:255'],
            'photo' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp,avif', 'max:8192'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        Testimonial::query()->create([
            'quote' => $validated['quote'],
            'name' => $validated['name'],
            'role' => $validated['role'] ?? null,
            'photo_path' => ImageUploader::store($request->file('photo'), 'testimonials'),
            'sort_order' => $validated['sort_order'] ?? 0,
            'is_active' => $request->boolean('is_active', true),
        ]);

        $this->flashSuccess('Testimoni berhasil ditambahkan.');

        return back();
    }

    public function update(Request $request, Testimonial $testimonial): RedirectResponse
    {
        $validated = $request->validate([
            'quote' => ['required', 'string'],
            'name' => ['required', 'string', 'max:255'],
            'role' => ['nullable', 'string', 'max:255'],
            'photo' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp,avif', 'max:8192'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $data = [
            'quote' => $validated['quote'],
            'name' => $validated['name'],
            'role' => $validated['role'] ?? null,
            'sort_order' => $validated['sort_order'] ?? 0,
            'is_active' => $request->boolean('is_active'),
        ];

        if ($request->hasFile('photo')) {
            ImageUploader::delete($testimonial->photo_path);
            $data['photo_path'] = ImageUploader::store($request->file('photo'), 'testimonials');
        }

        $testimonial->update($data);

        $this->flashSuccess('Testimoni berhasil diperbarui.');

        return back();
    }

    public function destroy(Testimonial $testimonial): RedirectResponse
    {
        ImageUploader::delete($testimonial->photo_path);
        $testimonial->delete();

        $this->flashSuccess('Testimoni berhasil dihapus.');

        return back();
    }
}
