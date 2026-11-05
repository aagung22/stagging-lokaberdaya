<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Program;
use App\Models\ProgramActivity;
use App\Support\ImageUploader;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProgramActivityController extends Controller
{
    public function index(Program $program): Response
    {
        return Inertia::render('admin/programs/activities/index', [
            'program' => $program,
            'activities' => $program->activities()->get(),
        ]);
    }

    public function create(Program $program): Response
    {
        return Inertia::render('admin/programs/activities/edit', [
            'program' => $program,
            'activity' => null,
        ]);
    }

    public function store(Request $request, Program $program): RedirectResponse
    {
        $validated = $this->validateActivity($request);

        $program->activities()->create([
            ...$validated,
            'detail_items' => $this->detailItems($request),
            'image_path' => ImageUploader::store($request->file('image'), 'activities'),
        ]);

        $this->flashSuccess('Kegiatan berhasil ditambahkan.');

        return to_route('admin.programs.activities.index', $program);
    }

    public function edit(Program $program, ProgramActivity $activity): Response
    {
        abort_unless($activity->program_id === $program->id, 404);

        return Inertia::render('admin/programs/activities/edit', [
            'program' => $program,
            'activity' => $activity,
        ]);
    }

    public function update(Request $request, Program $program, ProgramActivity $activity): RedirectResponse
    {
        abort_unless($activity->program_id === $program->id, 404);

        $validated = $this->validateActivity($request);
        $data = [
            ...$validated,
            'detail_items' => $this->detailItems($request),
        ];

        if ($request->hasFile('image')) {
            ImageUploader::delete($activity->image_path);
            $data['image_path'] = ImageUploader::store($request->file('image'), 'activities');
        }

        $activity->update($data);

        $this->flashSuccess('Kegiatan berhasil diperbarui.');

        return to_route('admin.programs.activities.index', $program);
    }

    public function destroy(Program $program, ProgramActivity $activity): RedirectResponse
    {
        abort_unless($activity->program_id === $program->id, 404);

        ImageUploader::delete($activity->image_path);
        $activity->delete();

        $this->flashSuccess('Kegiatan berhasil dihapus.');

        return back();
    }

    /**
     * @return array<string, mixed>
     */
    private function validateActivity(Request $request): array
    {
        $validated = $request->validate([
            'city' => ['required', 'string', 'max:255'],
            'category' => ['nullable', 'string', 'max:255'],
            'details' => ['nullable', 'string'],
            'long_description' => ['nullable', 'string'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp,avif', 'max:8192'],
        ]);

        return [
            'city' => $validated['city'],
            'category' => $validated['category'] ?? null,
            'long_description' => $validated['long_description'] ?? null,
            'sort_order' => (int) ($validated['sort_order'] ?? 0),
        ];
    }

    /**
     * @return array<int, string>
     */
    private function detailItems(Request $request): array
    {
        return collect(preg_split('/\R/', (string) $request->input('details', '')) ?: [])
            ->map(fn (string $item): string => trim($item))
            ->filter()
            ->values()
            ->all();
    }
}
