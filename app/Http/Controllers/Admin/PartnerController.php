<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Partner;
use App\Support\ImageUploader;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PartnerController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/partners/index', [
            'partners' => Partner::query()->orderBy('sort_order')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'url' => ['nullable', 'url', 'max:255'],
            'logo' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp,avif', 'max:8192'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        Partner::query()->create([
            'name' => $validated['name'],
            'url' => $validated['url'] ?? null,
            'logo_path' => ImageUploader::store($request->file('logo'), 'partners'),
            'sort_order' => $validated['sort_order'] ?? 0,
            'is_active' => $request->boolean('is_active', true),
        ]);

        $this->flashSuccess('Mitra berhasil ditambahkan.');

        return back();
    }

    public function update(Request $request, Partner $partner): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'url' => ['nullable', 'url', 'max:255'],
            'logo' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp,avif', 'max:8192'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $data = [
            'name' => $validated['name'],
            'url' => $validated['url'] ?? null,
            'sort_order' => $validated['sort_order'] ?? 0,
            'is_active' => $request->boolean('is_active'),
        ];

        if ($request->hasFile('logo')) {
            ImageUploader::delete($partner->logo_path);
            $data['logo_path'] = ImageUploader::store($request->file('logo'), 'partners');
        }

        $partner->update($data);

        $this->flashSuccess('Mitra berhasil diperbarui.');

        return back();
    }

    public function destroy(Partner $partner): RedirectResponse
    {
        ImageUploader::delete($partner->logo_path);
        $partner->delete();

        $this->flashSuccess('Mitra berhasil dihapus.');

        return back();
    }
}
