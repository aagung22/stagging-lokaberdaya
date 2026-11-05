<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\UmkmRegion;
use App\Support\ImageUploader;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UmkmRegionController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/umkm/index', [
            'regions' => UmkmRegion::query()
                ->withCount(['images', 'beneficiaries'])
                ->orderBy('sort_order')
                ->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/umkm/edit', [
            'region' => null,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $this->validateRegion($request);

        $region = UmkmRegion::query()->create([
            'city' => $validated['city'],
            'description' => $validated['description'] ?? null,
            'sort_order' => $validated['sort_order'] ?? 0,
        ]);

        $this->storeImages($request, $region);
        $this->storeBeneficiaries($request, $region);

        $this->flashSuccess('Wilayah UMKM berhasil ditambahkan.');

        return to_route('admin.umkm.index');
    }

    public function edit(UmkmRegion $region): Response
    {
        return Inertia::render('admin/umkm/edit', [
            'region' => $region->load(['images', 'beneficiaries']),
        ]);
    }

    public function update(Request $request, UmkmRegion $region): RedirectResponse
    {
        $validated = $this->validateRegion($request);

        $region->update([
            'city' => $validated['city'],
            'description' => $validated['description'] ?? null,
            'sort_order' => $validated['sort_order'] ?? 0,
        ]);

        $removeIds = collect($request->input('remove_images', []))->map(fn ($id): int => (int) $id);

        if ($removeIds->isNotEmpty()) {
            foreach ($region->images()->whereIn('id', $removeIds)->get() as $image) {
                ImageUploader::delete($image->image_path);
                $image->delete();
            }
        }

        $this->storeImages($request, $region);

        $region->beneficiaries()->delete();
        $this->storeBeneficiaries($request, $region);

        $this->flashSuccess('Wilayah UMKM berhasil diperbarui.');

        return to_route('admin.umkm.index');
    }

    public function destroy(UmkmRegion $region): RedirectResponse
    {
        foreach ($region->images as $image) {
            ImageUploader::delete($image->image_path);
        }

        $region->delete();

        $this->flashSuccess('Wilayah UMKM berhasil dihapus.');

        return back();
    }

    /**
     * @return array<string, mixed>
     */
    private function validateRegion(Request $request): array
    {
        return $request->validate([
            'city' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'images' => ['nullable', 'array'],
            'images.*' => ['image', 'mimes:jpg,jpeg,png,webp,avif', 'max:8192'],
            'remove_images' => ['nullable', 'array'],
            'remove_images.*' => ['integer'],
            'beneficiaries' => ['nullable', 'array'],
            'beneficiaries.*.name' => ['nullable', 'string', 'max:255'],
            'beneficiaries.*.business' => ['nullable', 'string', 'max:255'],
        ]);
    }

    private function storeImages(Request $request, UmkmRegion $region): void
    {
        foreach ($request->file('images', []) as $index => $file) {
            $region->images()->create([
                'image_path' => ImageUploader::store($file, 'umkm'),
                'sort_order' => $region->images()->count() + $index,
            ]);
        }
    }

    private function storeBeneficiaries(Request $request, UmkmRegion $region): void
    {
        foreach ($request->input('beneficiaries', []) as $index => $beneficiary) {
            $name = trim((string) ($beneficiary['name'] ?? ''));
            $business = trim((string) ($beneficiary['business'] ?? ''));

            if ($name === '' || $business === '') {
                continue;
            }

            $region->beneficiaries()->create([
                'name' => $name,
                'business' => $business,
                'sort_order' => $index,
            ]);
        }
    }
}
