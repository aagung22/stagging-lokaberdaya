<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use App\Models\HeroSlide;
use App\Models\Partner;
use App\Models\Post;
use App\Models\Program;
use App\Models\ProgramActivity;
use App\Models\Testimonial;
use App\Models\UmkmRegion;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('admin/dashboard', [
            'stats' => [
                'programs' => Program::query()->count(),
                'activities' => ProgramActivity::query()->count(),
                'umkm_regions' => UmkmRegion::query()->count(),
                'posts' => Post::query()->count(),
                'testimonials' => Testimonial::query()->count(),
                'partners' => Partner::query()->count(),
                'hero_slides' => HeroSlide::query()->count(),
                'unread_messages' => ContactMessage::query()->where('is_read', false)->count(),
            ],
            'recentMessages' => ContactMessage::query()->latest()->take(5)->get(),
        ]);
    }
}
