<?php

namespace App\Http\Controllers;

use App\Models\Program;
use App\Models\UmkmRegion;
use Inertia\Inertia;
use Inertia\Response;

class ProgramController extends Controller
{
    public function agriculture(): Response
    {
        return $this->renderProgram('agriculture', 'agriculture');
    }

    public function agroforestry(): Response
    {
        return $this->renderProgram('agroforestry', 'agroforestry');
    }

    public function peternakan(): Response
    {
        return $this->renderProgram('peternakan', 'peternakan');
    }

    public function umkm(): Response
    {
        $program = Program::query()
            ->where('slug', 'umkm')
            ->with('stats')
            ->firstOrFail();

        return Inertia::render('umkm', [
            'program' => $program,
            'regions' => UmkmRegion::query()
                ->with(['images', 'beneficiaries'])
                ->orderBy('sort_order')
                ->get(),
        ]);
    }

    private function renderProgram(string $slug, string $component): Response
    {
        $program = Program::query()
            ->where('slug', $slug)
            ->with(['stats', 'activities'])
            ->firstOrFail();

        return Inertia::render($component, [
            'program' => $program,
        ]);
    }
}
