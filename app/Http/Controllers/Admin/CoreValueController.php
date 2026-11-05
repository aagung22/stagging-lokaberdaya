<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CoreValue;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CoreValueController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/core-values/index', [
            'values' => CoreValue::query()->orderBy('sort_order')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'icon' => ['nullable', 'string', 'max:255'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);

        CoreValue::query()->create([
            ...$validated,
            'sort_order' => $validated['sort_order'] ?? 0,
        ]);

        $this->flashSuccess('Nilai berhasil ditambahkan.');

        return back();
    }

    public function update(Request $request, CoreValue $coreValue): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'icon' => ['nullable', 'string', 'max:255'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);

        $coreValue->update([
            ...$validated,
            'sort_order' => $validated['sort_order'] ?? 0,
        ]);

        $this->flashSuccess('Nilai berhasil diperbarui.');

        return back();
    }

    public function destroy(CoreValue $coreValue): RedirectResponse
    {
        $coreValue->delete();

        $this->flashSuccess('Nilai berhasil dihapus.');

        return back();
    }
}
