<?php

use App\Models\ContactMessage;
use App\Models\CoreValue;
use App\Models\HeroSlide;
use App\Models\Partner;
use App\Models\Post;
use App\Models\PostCategory;
use App\Models\Program;
use App\Models\ProgramActivity;
use App\Models\SiteSetting;
use App\Models\Testimonial;
use App\Models\UmkmRegion;
use App\Models\User;
use Database\Seeders\ContentSeeder;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    Storage::fake('public');
    $this->seed(ContentSeeder::class);

    $this->actingAs(User::factory()->admin()->create());
});

test('admin can update site settings', function () {
    $this->put(route('admin.settings.update'), [
        'site_name' => 'Loka Baru',
        'site_tagline' => 'Tagline baru',
        'phone' => '08123456789',
        'email' => 'halo@example.com',
        'address' => 'Jl. Baru No. 1',
    ])->assertRedirect();

    expect(SiteSetting::get('site_name'))->toBe('Loka Baru')
        ->and(SiteSetting::get('phone'))->toBe('08123456789');
});

test('admin can create update and delete a hero slide', function () {
    $this->post(route('admin.hero-slides.store'), [
        'image' => UploadedFile::fake()->image('hero.jpg'),
        'title' => 'Slide Baru',
        'subtitle' => 'Subjudul',
        'sort_order' => 2,
        'is_active' => true,
    ])->assertRedirect();

    $slide = HeroSlide::query()->where('title', 'Slide Baru')->firstOrFail();
    expect($slide->image_path)->not->toBeNull();

    $this->put(route('admin.hero-slides.update', $slide), [
        'title' => 'Slide Diperbarui',
        'sort_order' => 5,
        'is_active' => false,
    ])->assertRedirect();

    expect($slide->fresh())
        ->title->toBe('Slide Diperbarui')
        ->is_active->toBeFalse();

    $this->delete(route('admin.hero-slides.destroy', $slide))->assertRedirect();

    $this->assertDatabaseMissing('hero_slides', ['id' => $slide->id]);
});

test('admin can update a program with its statistics', function () {
    $program = Program::query()->firstOrFail();

    $this->put(route('admin.programs.update', $program), [
        'title' => 'Program Diperbarui',
        'slug' => $program->slug.'-baru',
        'page_title' => 'Halaman Program',
        'short_description' => 'Deskripsi singkat',
        'hero_description' => 'Deskripsi hero',
        'sort_order' => 1,
        'is_active' => true,
        'stats' => [
            ['label' => 'Penerima', 'value' => '25', 'icon' => 'users', 'sort_order' => 0],
            ['label' => 'Lahan', 'value' => '10 Ha', 'icon' => 'wheat', 'sort_order' => 1],
        ],
    ])->assertRedirect();

    $program->refresh();

    expect($program->title)->toBe('Program Diperbarui')
        ->and($program->stats)->toHaveCount(2)
        ->and($program->stats->first()->label)->toBe('Penerima');
});

test('admin can create update and delete a program activity', function () {
    $program = Program::query()->firstOrFail();

    $this->post(route('admin.programs.activities.store', $program), [
        'city' => 'Kota Baru',
        'category' => 'Fattening',
        'details' => "Lokasi: Desa A\nJumlah: 5",
        'long_description' => 'Penjelasan',
        'sort_order' => 3,
        'image' => UploadedFile::fake()->image('activity.jpg'),
    ])->assertRedirect();

    $activity = ProgramActivity::query()->where('city', 'Kota Baru')->firstOrFail();
    expect($activity->detail_items)->toBe(['Lokasi: Desa A', 'Jumlah: 5']);

    $this->put(route('admin.programs.activities.update', [$program, $activity]), [
        'city' => 'Kota Diperbarui',
        'details' => 'Satu poin',
        'sort_order' => 4,
    ])->assertRedirect();

    expect($activity->fresh())
        ->city->toBe('Kota Diperbarui')
        ->detail_items->toBe(['Satu poin']);

    $this->delete(route('admin.programs.activities.destroy', [$program, $activity]))
        ->assertRedirect();

    $this->assertDatabaseMissing('program_activities', ['id' => $activity->id]);
});

test('admin can create update and delete an umkm region with images and beneficiaries', function () {
    $this->post(route('admin.umkm.store'), [
        'city' => 'Kota UMKM',
        'description' => 'Deskripsi wilayah',
        'sort_order' => 2,
        'images' => [UploadedFile::fake()->image('one.jpg'), UploadedFile::fake()->image('two.jpg')],
        'beneficiaries' => [
            ['name' => 'Budi', 'business' => 'Kopi'],
            ['name' => 'Sari', 'business' => 'Batik'],
        ],
    ])->assertRedirect(route('admin.umkm.index'));

    $region = UmkmRegion::query()->where('city', 'Kota UMKM')->firstOrFail();

    expect($region->images)->toHaveCount(2)
        ->and($region->beneficiaries)->toHaveCount(2);

    $this->put(route('admin.umkm.update', $region), [
        'city' => 'Kota UMKM Baru',
        'description' => 'Deskripsi baru',
        'sort_order' => 3,
        'remove_images' => [$region->images->first()->id],
        'beneficiaries' => [
            ['name' => 'Andi', 'business' => 'Tenun'],
        ],
    ])->assertRedirect(route('admin.umkm.index'));

    $region->refresh();

    expect($region->city)->toBe('Kota UMKM Baru')
        ->and($region->images)->toHaveCount(1)
        ->and($region->beneficiaries)->toHaveCount(1)
        ->and($region->beneficiaries->first()->name)->toBe('Andi');

    $this->delete(route('admin.umkm.destroy', $region))->assertRedirect();

    $this->assertDatabaseMissing('umkm_regions', ['id' => $region->id]);
});

test('admin can create update and delete a blog post', function () {
    $category = PostCategory::query()->firstOrFail();

    $this->post(route('admin.posts.store'), [
        'title' => 'Artikel Baru',
        'post_category_id' => $category->id,
        'author' => 'Admin',
        'published_at' => '2026-01-10',
        'excerpt' => 'Ringkasan',
        'body' => 'Isi artikel',
        'sort_order' => 1,
        'is_published' => true,
        'image' => UploadedFile::fake()->image('post.jpg'),
    ])->assertRedirect(route('admin.posts.index'));

    $post = Post::query()->where('title', 'Artikel Baru')->firstOrFail();

    expect($post->slug)->toBe('artikel-baru')
        ->and($post->is_published)->toBeTrue();

    $this->put(route('admin.posts.update', $post), [
        'title' => 'Artikel Diperbarui',
        'slug' => 'artikel-diperbarui',
        'post_category_id' => $category->id,
        'sort_order' => 2,
        'is_published' => false,
    ])->assertRedirect(route('admin.posts.index'));

    expect($post->fresh())
        ->title->toBe('Artikel Diperbarui')
        ->is_published->toBeFalse();

    $this->delete(route('admin.posts.destroy', $post))->assertRedirect();

    $this->assertDatabaseMissing('posts', ['id' => $post->id]);
});

test('admin can create update and delete a blog category', function () {
    $this->post(route('admin.categories.store'), [
        'name' => 'Kategori Baru',
        'sort_order' => 1,
    ])->assertRedirect();

    $category = PostCategory::query()->where('name', 'Kategori Baru')->firstOrFail();
    expect($category->slug)->toBe('kategori-baru');

    $this->put(route('admin.categories.update', $category), [
        'name' => 'Kategori Diperbarui',
        'slug' => 'kategori-baru',
        'sort_order' => 2,
    ])->assertRedirect();

    expect($category->fresh()->name)->toBe('Kategori Diperbarui');

    $this->delete(route('admin.categories.destroy', $category))->assertRedirect();

    $this->assertDatabaseMissing('post_categories', ['id' => $category->id]);
});

test('admin can create update and delete a testimonial', function () {
    $this->post(route('admin.testimonials.store'), [
        'quote' => 'Kutipan baru',
        'name' => 'Nama Baru',
        'role' => 'Petani',
        'sort_order' => 1,
        'is_active' => true,
        'photo' => UploadedFile::fake()->image('photo.jpg'),
    ])->assertRedirect();

    $testimonial = Testimonial::query()->where('name', 'Nama Baru')->firstOrFail();

    $this->put(route('admin.testimonials.update', $testimonial), [
        'quote' => 'Kutipan diperbarui',
        'name' => 'Nama Diperbarui',
        'is_active' => false,
    ])->assertRedirect();

    expect($testimonial->fresh())
        ->name->toBe('Nama Diperbarui')
        ->is_active->toBeFalse();

    $this->delete(route('admin.testimonials.destroy', $testimonial))->assertRedirect();

    $this->assertDatabaseMissing('testimonials', ['id' => $testimonial->id]);
});

test('admin can create update and delete a partner', function () {
    $this->post(route('admin.partners.store'), [
        'name' => 'Mitra Baru',
        'url' => 'https://example.com',
        'sort_order' => 1,
        'is_active' => true,
        'logo' => UploadedFile::fake()->image('logo.jpg'),
    ])->assertRedirect();

    $partner = Partner::query()->where('name', 'Mitra Baru')->firstOrFail();

    $this->put(route('admin.partners.update', $partner), [
        'name' => 'Mitra Diperbarui',
        'is_active' => false,
    ])->assertRedirect();

    expect($partner->fresh())
        ->name->toBe('Mitra Diperbarui')
        ->is_active->toBeFalse();

    $this->delete(route('admin.partners.destroy', $partner))->assertRedirect();

    $this->assertDatabaseMissing('partners', ['id' => $partner->id]);
});

test('admin can create update and delete a core value', function () {
    $this->post(route('admin.core-values.store'), [
        'title' => 'Nilai Baru',
        'description' => 'Deskripsi nilai',
        'icon' => 'leaf',
        'sort_order' => 1,
    ])->assertRedirect();

    $value = CoreValue::query()->where('title', 'Nilai Baru')->firstOrFail();

    $this->put(route('admin.core-values.update', $value), [
        'title' => 'Nilai Diperbarui',
        'description' => 'Deskripsi baru',
    ])->assertRedirect();

    expect($value->fresh()->title)->toBe('Nilai Diperbarui');

    $this->delete(route('admin.core-values.destroy', $value))->assertRedirect();

    $this->assertDatabaseMissing('core_values', ['id' => $value->id]);
});

test('messages page receives the contact messages prop', function () {
    $message = ContactMessage::query()->create([
        'name' => 'Pengunjung',
        'email' => 'pengunjung@example.com',
        'subject' => 'Halo',
        'message' => 'Isi pesan',
    ]);

    $this->get(route('admin.messages.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/messages/index')
            ->has('messages', 1)
            ->where('messages.0.id', $message->id)
        );
});

test('admin can toggle and delete a contact message', function () {
    $message = ContactMessage::query()->create([
        'name' => 'Pengunjung',
        'email' => 'pengunjung@example.com',
        'subject' => 'Halo',
        'message' => 'Isi pesan',
    ]);

    $this->patch(route('admin.messages.toggle-read', $message))->assertRedirect();
    expect($message->fresh()->is_read)->toBeTrue();

    $this->patch(route('admin.messages.toggle-read', $message))->assertRedirect();
    expect($message->fresh()->is_read)->toBeFalse();

    $this->delete(route('admin.messages.destroy', $message))->assertRedirect();

    $this->assertDatabaseMissing('contact_messages', ['id' => $message->id]);
});

test('regular users cannot mutate admin content', function () {
    $this->actingAs(User::factory()->create());

    $this->post(route('admin.core-values.store'), [
        'title' => 'Tidak Boleh',
        'description' => 'Tidak boleh',
    ])->assertForbidden();

    $this->assertDatabaseMissing('core_values', ['title' => 'Tidak Boleh']);
});
