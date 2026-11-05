<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Program;
use App\Support\ImageUploader;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ProgramController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/programs/index', [
            'programs' => Program::query()
                ->withCount(['stats', 'activities'])
                ->orderBy('sort_order')
                ->get(),
        ]);
    }

    public function edit(Program $program): Response
    {
        return Inertia::render('admin/programs/edit', [
            'program' => $program->load(['stats', 'activities']),
        ]);
    }

    public function update(Request $request, Program $program): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', Rule::unique('programs', 'slug')->ignore($program)],
            'page_title' => ['nullable', 'string', 'max:255'],
            'short_description' => ['nullable', 'string'],
            'hero_description' => ['nullable', 'string'],
            'hero_image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp,avif', 'max:8192'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['nullable', 'boolean'],
            'stats' => ['nullable', 'array'],
            'stats.*.label' => ['nullable', 'string', 'max:255'],
            'stats.*.value' => ['nullable', 'string', 'max:255'],
            'stats.*.icon' => ['nullable', 'string', 'max:255'],
            'stats.*.sort_order' => ['nullable', 'integer', 'min:0'],
        ]);

        $data = [
            'title' => $validated['title'],
            'slug' => $validated['slug'],
            'page_title' => $validated['page_title'] ?? null,
            'short_description' => $validated['short_description'] ?? null,
            'hero_description' => $validated['hero_description'] ?? null,
            'sort_order' => $validated['sort_order'] ?? 0,
            'is_active' => $request->boolean('is_active'),
        ];

        if ($request->hasFile('hero_image')) {
            ImageUploader::delete($program->hero_image);
            $data['hero_image'] = ImageUploader::store($request->file('hero_image'), 'programs');
        }

        $program->update($data);

        $program->stats()->delete();

        foreach ($request->input('stats', []) as $stat) {
            $label = trim((string) ($stat['label'] ?? ''));
            $value = trim((string) ($stat['value'] ?? ''));

            if ($label === '' || $value === '') {
                continue;
            }

            $program->stats()->create([
                'label' => $label,
                'value' => $value,
                'icon' => $stat['icon'] ?? null,
                'sort_order' => (int) ($stat['sort_order'] ?? 0),
            ]);
        }

        $this->flashSuccess('Data program berhasil diperbarui.');

        return back();
    }
}
