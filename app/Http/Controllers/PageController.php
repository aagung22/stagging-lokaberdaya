<?php

namespace App\Http\Controllers;

use App\Models\CoreValue;
use App\Models\HeroSlide;
use App\Models\Partner;
use App\Models\Program;
use App\Models\SiteSetting;
use App\Models\Testimonial;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function landing(): Response
    {
        return Inertia::render('landing', [
            'heroSlides' => HeroSlide::query()
                ->where('is_active', true)
                ->orderBy('sort_order')
                ->get(),
            'programs' => Program::query()
                ->where('is_active', true)
                ->orderBy('sort_order')
                ->get(),
            'testimonials' => Testimonial::query()
                ->where('is_active', true)
                ->orderBy('sort_order')
                ->get(),
            'partners' => Partner::query()
                ->where('is_active', true)
                ->orderBy('sort_order')
                ->get(),
            'landingStats' => $this->landingStats(),
        ]);
    }

    public function about(): Response
    {
        $settings = SiteSetting::allValues();

        return Inertia::render('about', [
            'coreValues' => CoreValue::query()->orderBy('sort_order')->get(),
            'storyParagraphs' => $this->paragraphs($settings['about_story'] ?? ''),
        ]);
    }

    public function contact(): Response
    {
        return Inertia::render('contact');
    }

    /**
     * @return array<int, array{value: string, label: string, icon: string}>
     */
    private function landingStats(): array
    {
        $settings = SiteSetting::allValues();
        $icons = ['users', 'leaf', 'building'];

        return collect(range(1, 3))
            ->map(fn (int $index): array => [
                'value' => $settings["landing_stat_{$index}_value"] ?? '',
                'label' => $settings["landing_stat_{$index}_label"] ?? '',
                'icon' => $settings["landing_stat_{$index}_icon"] ?? $icons[$index - 1],
            ])
            ->filter(fn (array $stat): bool => $stat['value'] !== '' || $stat['label'] !== '')
            ->values()
            ->all();
    }

    /**
     * @return array<int, string>
     */
    private function paragraphs(?string $value): array
    {
        if (blank($value)) {
            return [];
        }

        return collect(preg_split('/\R{2,}/', trim($value)) ?: [])
            ->map(fn (string $paragraph): string => trim($paragraph))
            ->filter()
            ->values()
            ->all();
    }
}
