<?php

namespace Database\Seeders;

use App\Models\CoreValue;
use App\Models\HeroSlide;
use App\Models\Partner;
use App\Models\Post;
use App\Models\PostCategory;
use App\Models\Program;
use App\Models\SiteSetting;
use App\Models\Testimonial;
use App\Models\UmkmRegion;
use Illuminate\Database\Seeder;

class ContentSeeder extends Seeder
{
    /**
     * Seed the public site content that used to be hardcoded in the pages.
     */
    public function run(): void
    {
        $this->seedSettings();
        $this->seedHeroSlides();
        $this->seedPrograms();
        $this->seedUmkmRegions();
        $this->seedBlog();
        $this->seedTestimonials();
        $this->seedPartners();
        $this->seedCoreValues();
    }

    private function seedSettings(): void
    {
        $settings = [
            'site_name' => 'Loka Berdaya Amerta',
            'site_tagline' => 'Budayakan Potensi Lokal untuk Tumbuhkan Kesejahteraan',
            'phone' => '081 330003450',
            'email' => 'info@lokaberdaya.com',
            'address' => 'Jl. Sarirogo No.1, Sari Rogo, Kec. Sidoarjo, Kabupaten Sidoarjo, Jawa Timur 61234',
            'maps_embed_url' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.307548570149!2d112.67889967357418!3d-7.431179073205722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7e132a4632891%3A0x4058849ad5fd97eb!2sYatim%20Mandiri%20Sidoarjo%3A%20Lembaga%20Amil%20Zakat%20Nasional!5e0!3m2!1sid!2sid!4v1793240614969!5m2!1sid!2sid',
            'hero_title' => 'Tumbuhkan Kesejahteraan',
            'hero_title_accent' => 'dengan Pemberdayaan',
            'hero_subtitle' => 'Budayakan Potensi Lokal untuk Tumbuhkan Kesejahteraan',
            'landing_stat_1_value' => '491',
            'landing_stat_1_label' => 'Penerima Manfaat',
            'landing_stat_1_icon' => 'users',
            'landing_stat_2_value' => '4',
            'landing_stat_2_label' => 'Program',
            'landing_stat_2_icon' => 'leaf',
            'landing_stat_3_value' => '28',
            'landing_stat_3_label' => 'Titik Pemberdayaan',
            'landing_stat_3_icon' => 'building',
            'about_years' => '30',
            'about_years_label' => 'Tahun Berkarya',
            'about_eyebrow' => 'Tentang Kami',
            'about_title' => 'Sekilas Tentang Loka Berdaya Amerta',
            'about_text' => 'Sebuah lembaga yang berkomitmen untuk mendorong pemberdayaan masyarakat, inovasi, dan pembangunan berkelanjutan. Loka Berdaya Amerta adalah lembaga pionir dalam pemberdayaan masyarakat yang fokus pada peningkatan keterampilan, ekonomi, pendidikan, dan keberlanjutan lingkungan melalui kolaborasi lintas sektor.',
            'vision' => 'Menjadi lembaga pionir dalam pemberdayaan masyarakat, menciptakan lingkungan yang berdaya, berdamai, dan berkelanjutan.',
            'mission' => "Mengembangkan program pemberdayaan masyarakat yang berfokus pada peningkatan keterampilan, kesejahteraan ekonomi, dan pendidikan.\nMendorong inovasi dan pengembangan teknologi yang ramah lingkungan untuk mendukung pembangunan berkelanjutan.\nMenjadi mitra strategis bagi pemerintah, lembaga swadaya masyarakat, dan sektor bisnis dalam mengatasi berbagai tantangan pembangunan.",
            'footer_description' => 'Loka Berdaya Amerta adalah lembaga pionir dalam pemberdayaan masyarakat yang fokus pada peningkatan keterampilan, ekonomi, pendidikan, dan keberlanjutan lingkungan melalui kolaborasi lintas sektor.',
            'about_page_badge' => 'Lebih dari 30 Tahun Berbakti',
            'about_page_title' => 'Menggali Potensi Lokal Untuk Kemajuan Sosial',
            'about_page_intro' => 'Loka Berdaya Amerta hadir sebagai respons atas kebutuhan akan perubahan sosial yang inklusif, berkelanjutan, dan berbasis potensi lokal.',
            'about_story_quote' => 'Kami percaya bahwa setiap individu dan komunitas memiliki kapasitas untuk tumbuh, berkembang, dan memberi dampak positif apabila diberi ruang dan dukungan yang tepat.',
            'about_story' => "Loka Berdaya Amerta adalah lembaga pemberdayaan masyarakat yang hadir sebagai respons atas kebutuhan akan perubahan sosial yang inklusif, berkelanjutan, dan berbasis potensi lokal. Berlandaskan semangat kolaborasi dan kemanusiaan, kami berkomitmen menjadi pionir dalam menciptakan lingkungan yang memberdayakan masyarakat dari berbagai latar belakang.\n\nMelalui program-program strategis di bidang peningkatan keterampilan, pendidikan, dan kesejahteraan ekonomi, Loka Berdaya Amerta membangun ekosistem yang mendorong kemandirian dan keberlanjutan. Kami tidak hanya fokus pada aspek pengembangan individu, tetapi juga pada penguatan komunitas secara menyeluruh. Selain itu, kami turut mendorong inovasi dan pengembangan teknologi yang ramah lingkungan sebagai solusi nyata untuk mendukung pembangunan berkelanjutan dan pelestarian lingkungan hidup.\n\nSebagai mitra strategis bagi pemerintah, lembaga swadaya masyarakat, dan sektor bisnis, kami terus memperluas jangkauan dan dampak kerja kami melalui pendekatan yang kolaboratif dan berbasis data. Dengan integritas, transparansi, dan komitmen terhadap nilai-nilai sosial dan budaya, Loka Berdaya Amerta hadir untuk menghadirkan perubahan yang bermakna dan berkelanjutan bagi masyarakat Indonesia.",
            'peternakan_fattening_description' => 'Program Fattening Domba berfokus pada penguatan usaha penggemukan untuk meningkatkan bobot dan nilai jual ternak dalam waktu yang lebih singkat. Program ini mendukung peternak melalui penyediaan bakalan, pakan berkualitas, serta pendampingan teknis agar proses penggemukan berjalan optimal dan efisien.',
            'peternakan_breeding_description' => 'Program Breeding Domba berfokus pada pengembangan pembibitan untuk meningkatkan kualitas dan ketersediaan populasi ternak secara berkelanjutan. Program ini mendorong peternak untuk menghasilkan bakalan unggul melalui manajemen reproduksi, perawatan indukan, serta pendampingan teknis yang terstruktur.',
            'logo' => '/images/logo lba.webp',
            'about_image' => '/images/halamantentang.webp',
            'about_values_image' => '/images/bgtentang.webp',
            'about_page_image' => '/images/halamantentang.webp',
        ];

        foreach ($settings as $key => $value) {
            SiteSetting::query()->updateOrCreate(
                ['key' => $key],
                ['value' => $value, 'group' => 'general'],
            );
        }
    }

    private function seedHeroSlides(): void
    {
        $slides = [
            ['image_path' => '/images/landing-umkm.webp', 'title' => 'UMKM Bangkit', 'subtitle' => 'Akses pembiayaan tanpa riba untuk usaha kecil yang berdaya.'],
            ['image_path' => '/images/landing-peternakan.webp', 'title' => 'Program Peternakan', 'subtitle' => 'Peternak berdaya melalui penguatan modal dan akses pasar.'],
            ['image_path' => '/images/agriculture.webp', 'title' => 'Program Agriculture', 'subtitle' => 'Ketahanan pangan melalui pemberdayaan petani.'],
            ['image_path' => '/images/agroforestry.webp', 'title' => 'Agroforestry dan Perkebunan', 'subtitle' => 'Mengelola lahan produktif secara berkelanjutan.'],
        ];

        foreach ($slides as $index => $slide) {
            HeroSlide::query()->updateOrCreate(
                ['image_path' => $slide['image_path']],
                [...$slide, 'sort_order' => $index, 'is_active' => true],
            );
        }
    }

    private function seedPrograms(): void
    {
        $agriculture = Program::query()->updateOrCreate(['slug' => 'agriculture'], [
            'title' => 'Program Agriculture (Pertanian)',
            'page_title' => 'Program Agriculture (Pertanian)',
            'short_description' => 'Mendorong ketahanan pangan melalui peningkatan produktivitas dan kemandirian petani secara berkelanjutan.',
            'hero_image' => '/images/agriculture.webp',
            'hero_description' => "Program Pertanian berfokus pada penguatan ketahanan pangan dan kemandirian petani melalui pengelolaan usaha tani yang berkelanjutan. Program ini mendorong peningkatan produksi sekaligus memastikan hasil panen dapat terserap secara optimal.\n\nMelalui pendampingan, penguatan kelembagaan, serta pembukaan akses pasar yang lebih luas, petani didorong untuk tidak lagi bergantung pada tengkulak. Dengan rantai distribusi yang lebih adil dan efisien, petani memperoleh harga jual yang lebih stabil dan menguntungkan.\n\nDengan demikian, program ini tidak hanya meningkatkan produktivitas, tetapi juga memperkuat posisi tawar petani, menciptakan kemandirian ekonomi, serta mendukung terwujudnya ketahanan pangan di tingkat lokal.",
            'sort_order' => 0,
            'is_active' => true,
        ]);

        $this->seedStats($agriculture, [
            ['value' => '100+', 'label' => 'Penerima Manfaat', 'icon' => 'users'],
            ['value' => '9 Kota', 'label' => 'Titik Pemberdayaan', 'icon' => 'building'],
            ['value' => '150 Ton', 'label' => 'Hasil Pertanian', 'icon' => 'wheat'],
        ]);

        $agricultureActivities = [
            [
                'city' => 'Kediri',
                'details' => [
                    'Lokasi: Desa Sukoanyar, Kecamatan Mojo, Kabupaten Kediri',
                    'Start Program: Sep 2024',
                    'Luasan Lahan: 5 Ha',
                    'Total Hasil Panen: 30 Ton Gabah',
                    'Jumlah PM: 13',
                ],
                'long_description' => <<<'TEXT'
Menguatkan Ketahanan Pangan dari Desa: Inisiatif Pertanian Padi di Kediri

Upaya membangun kemandirian ekonomi masyarakat terus didorong melalui penguatan sektor pertanian sebagai fondasi utama ketahanan pangan. Di Desa Sukoanyar, Kecamatan Mojo, Kabupaten Kediri, sebuah program pemberdayaan pertanian padi menjadi contoh nyata bagaimana potensi lokal dapat dioptimalkan untuk memberikan dampak ekonomi dan sosial secara bersamaan.

Program yang dimulai pada September 2024 ini mengelola lahan seluas 5 hektare dengan melibatkan 13 petani sebagai penerima manfaat. Melalui dukungan permodalan, pendampingan teknis, serta penguatan kelembagaan kelompok, para petani didorong untuk meningkatkan produktivitas sekaligus membangun sistem usaha tani yang lebih berkelanjutan.

Hasil yang dicapai menunjukkan perkembangan yang signifikan. Dalam satu periode panen, total produksi mencapai 30 ton gabah. Capaian ini tidak hanya mencerminkan peningkatan hasil pertanian, tetapi juga menjadi indikator penguatan kapasitas petani dalam mengelola lahan secara lebih efektif dan efisien.

Lebih dari sekadar peningkatan produksi, program ini juga memberikan dampak terhadap stabilitas ekonomi petani. Dengan adanya dukungan yang tepat, para petani mampu mengurangi beban biaya produksi serta memiliki peluang yang lebih besar untuk memperoleh pendapatan yang lebih stabil. Selain itu, kolaborasi antarpetani dalam satu kelompok turut memperkuat solidaritas dan ketahanan komunitas.

Ke depan, inisiatif seperti ini diharapkan dapat terus dikembangkan dan direplikasi di berbagai wilayah lainnya. Pendekatan berbasis potensi lokal dan pemberdayaan komunitas menjadi kunci dalam menciptakan sistem pertanian yang tidak hanya produktif, tetapi juga berkelanjutan serta mampu menjawab tantangan ketahanan pangan di masa depan.
TEXT,
                'image_path' => 'https://images.unsplash.com/photo-1592982537447-6f29922e2f5b?q=80&w=800&auto=format&fit=crop',
            ],
            [
                'city' => 'Sukoharjo',
                'details' => [
                    'Lokasi: Kelurahan Kateguhan, Kec. Tawangsari, Kab. Sukoharjo',
                    'Start Program: Des 2024',
                    'Luasan Lahan: 5,5 Ha',
                    'Total Hasil Panen: 40 Ton',
                    'Jumlah PM: 10',
                ],
                'long_description' => 'Penjelasan detail untuk program di Sukoharjo belum tersedia. Silakan hubungi admin untuk informasi lebih lanjut mengenai capaian dan dampak program di wilayah ini.',
                'image_path' => 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=800&auto=format&fit=crop',
            ],
            [
                'city' => 'Lumajang',
                'details' => [
                    'Lokasi: Desa Sidorejo, Kec. Rowokangkung, Kab. Lumajang',
                    'Start Program: Okt 2024',
                    'Luasan Lahan: 4 Ha',
                    'Total Hasil Panen: 20 Ton',
                    'Jumlah PM: 15',
                ],
                'long_description' => 'Penjelasan detail untuk program di Lumajang belum tersedia.',
                'image_path' => 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=800&auto=format&fit=crop',
            ],
            [
                'city' => 'Sidoarjo',
                'details' => [
                    'Lokasi: Desa Sarirogo, Kab. Sidoarjo',
                    'Luasan Lahan: 0,3 Ha',
                    'Total Hasil Panen: 1 Ton',
                    'Jumlah PM: 3',
                ],
                'long_description' => 'Penjelasan detail untuk program di Sidoarjo belum tersedia.',
                'image_path' => 'https://images.unsplash.com/photo-1592982537447-6f29922e2f5b?q=80&w=800&auto=format&fit=crop',
            ],
            [
                'city' => 'Mojokerto',
                'details' => [
                    'Lokasi: Desa Mlirip, Kec. Jetis, Kab. Mojokerto',
                    'Start Program: Jun 2024',
                    'Luasan Lahan: 3 Ha',
                    'Total Hasil Panen: 15 Ton',
                    'Jumlah PM: 8',
                ],
                'long_description' => 'Penjelasan detail untuk program di Mojokerto belum tersedia.',
                'image_path' => 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=800&auto=format&fit=crop',
            ],
            [
                'city' => 'Gresik',
                'details' => [
                    'Lokasi: Desa Petiyintunggal, Kec. Dukun, Kab. Gresik',
                    'Start Program: Juli 2025',
                    'Luasan Lahan: 2 Ha',
                    'Jumlah PM: 12',
                ],
                'long_description' => 'Penjelasan detail untuk program di Gresik belum tersedia.',
                'image_path' => 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=800&auto=format&fit=crop',
            ],
            [
                'city' => 'Sragen',
                'details' => [
                    'Lokasi: Desa Jatibatur, Kec. Gemolong, Kab. Gemolong',
                    'Luasan Lahan: 1,5 Ha',
                    'Total Hasil Panen: 1,55 Ton',
                    'Jumlah PM: 12',
                ],
                'long_description' => 'Penjelasan detail untuk program di Sragen belum tersedia.',
                'image_path' => 'https://images.unsplash.com/photo-1592982537447-6f29922e2f5b?q=80&w=800&auto=format&fit=crop',
            ],
            [
                'city' => 'Sukabumi',
                'details' => [
                    'Lokasi: Desa Cikangkung, Kec. Ciracas, Kab. Sukabumi',
                    'Start Program: Jun 2025',
                    'Luasan Lahan: 10 Ha',
                    'Jumlah PM: 20',
                ],
                'long_description' => 'Penjelasan detail untuk program di Sukabumi belum tersedia.',
                'image_path' => 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=800&auto=format&fit=crop',
            ],
            [
                'city' => 'Malang',
                'details' => [
                    'Lokasi: (Data belum tersedia)',
                    'Start Program: -',
                    'Luasan Lahan: -',
                    'Total Hasil Panen: -',
                    'Jumlah PM: -',
                ],
                'long_description' => 'Penjelasan detail untuk program di Malang belum tersedia.',
                'image_path' => 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=800&auto=format&fit=crop',
            ],
        ];

        $this->seedActivities($agriculture, $agricultureActivities);

        $agroforestry = Program::query()->updateOrCreate(['slug' => 'agroforestry'], [
            'title' => 'Program Agroforestry dan Perkebunan',
            'page_title' => 'Program Agroforestry dan Perkebunan',
            'short_description' => 'Meningkatkan hasil pertanian melalui integrasi tanaman hutan dan perkebunan untuk meningkatkan pendapatan sekaligus menjaga kelestarian lingkungan.',
            'hero_image' => '/images/agroforestry.webp',
            'hero_description' => "Program Agroforestry & Perkebunan merupakan model pemberdayaan berbasis kemitraan dalam pengelolaan lahan produktif secara berkelanjutan. Program ini berfokus pada optimalisasi lahan, termasuk skema alih kelola kawasan, untuk dikembangkan menjadi usaha perkebunan yang bernilai ekonomi.\n\nMelalui legalitas dan perjanjian yang jelas, program memastikan masyarakat memiliki akses kelola lahan yang aman dan berkelanjutan. Proses dilanjutkan dengan perencanaan dan eksekusi berbasis potensi lokal, mencakup integrasi tanaman kehutanan dan komoditas perkebunan.\n\nDalam implementasinya, masyarakat didampingi dalam pengelolaan usaha, termasuk aspek budidaya, pemeliharaan lingkungan, serta sistem operasional yang terstruktur. Program juga membuka akses pasar dan menerapkan skema bagi hasil yang transparan, sehingga masyarakat tidak bergantung pada tengkulak dan memiliki kepastian pendapatan.\n\nDengan pendekatan kemitraan ini, program mendorong kemandirian ekonomi masyarakat sekaligus memastikan pengelolaan lahan yang produktif, legal, dan berkelanjutan.",
            'sort_order' => 1,
            'is_active' => true,
        ]);

        $this->seedStats($agroforestry, [
            ['value' => '100+', 'label' => 'Penerima Manfaat', 'icon' => 'users'],
            ['value' => '2 Kota', 'label' => 'Titik Pemberdayaan', 'icon' => 'building'],
            ['value' => '150 Ton', 'label' => 'Hasil Pertanian', 'icon' => 'tree-pine'],
        ]);

        $this->seedActivities($agroforestry, [
            [
                'city' => 'Mojokerto',
                'details' => [
                    'Pemberdayaan perkebunan melalui komoditas penanaman Pisang & Rimpang',
                    'Lokasi : Desa Gumeng, Kec. Gondang',
                    'Luasan Lahan : 3.000 m²',
                    'Jumlah PM : 4 PM',
                ],
                'long_description' => <<<'TEXT'
Program Agroforestry & Perkebunan di Kediri merupakan model pemberdayaan berbasis kemitraan dalam pengelolaan lahan produktif secara berkelanjutan.

Program ini berfokus pada optimalisasi lahan, termasuk skema alih kelola kawasan, untuk dikembangkan menjadi usaha perkebunan yang bernilai ekonomi. Melalui legalitas dan perjanjian yang jelas, program memastikan masyarakat memiliki akses kelola lahan yang aman dan berkelanjutan.
TEXT,
                'image_path' => 'https://images.unsplash.com/photo-1592982537447-6f29922e2f5b?q=80&w=800&auto=format&fit=crop',
            ],
            [
                'city' => 'Jombang',
                'details' => [
                    'Pemberdayaan perkebunan melalui komoditas penanaman Pisang. Program ini juga didukung oleh nota kesepahaman (MoU) terkait alih kelola lahan hutan untuk kegiatan agroforestri yang produktif dan berkelanjutan',
                    'Lokasi : Desa Wonosalam',
                    'Luasan Lahan : 5.000 m²',
                    'Jumlah PM : 2 PM',
                ],
                'long_description' => <<<'TEXT'
Program Agroforestry & Perkebunan di Sukoharjo mengedepankan integrasi tanaman kehutanan dan komoditas perkebunan.

Dalam implementasinya, masyarakat didampingi dalam pengelolaan usaha, termasuk aspek budidaya, pemeliharaan lingkungan, serta sistem operasional yang terstruktur. Program juga membuka akses pasar dan menerapkan skema bagi hasil yang transparan, sehingga masyarakat tidak bergantung pada tengkulak dan memiliki kepastian pendapatan.
TEXT,
                'image_path' => 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=800&auto=format&fit=crop',
            ],
        ]);

        $peternakan = Program::query()->updateOrCreate(['slug' => 'peternakan'], [
            'title' => 'Program Peternakan',
            'page_title' => 'Program Peternakan',
            'short_description' => 'Mendorong peternak berdaya melalui penguatan modal usaha dan akses pasar yang lebih luas.',
            'hero_image' => '/images/peternakan.webp',
            'hero_description' => "Program Peternakan berfokus pada penguatan usaha ternak masyarakat melalui peningkatan kapasitas produksi dan pengelolaan usaha yang lebih terstruktur. Program ini hadir sebagai solusi atas keterbatasan modal, pengetahuan, dan akses pasar yang masih menjadi tantangan utama para peternak.\n\nMelalui dukungan modal usaha, pendampingan teknis, serta penguatan manajemen peternakan, masyarakat didorong untuk meningkatkan produktivitas dan kualitas hasil ternak. Program juga membuka akses pasar dan membangun skema kemitraan yang lebih adil dan memiliki kepastian penyerapan hasil.\n\nDengan pendekatan ini, program mendorong peningkatan pendapatan, memperkuat posisi tawar peternak, serta menciptakan usaha peternakan yang berkelanjutan dan berdaya saing.",
            'sort_order' => 2,
            'is_active' => true,
        ]);

        $this->seedStats($peternakan, [
            ['value' => '100+', 'label' => 'Penerima Manfaat', 'icon' => 'users'],
            ['value' => '4 Kota', 'label' => 'Titik Pemberdayaan', 'icon' => 'building'],
            ['value' => '150 Ton', 'label' => 'Hasil Peternakan', 'icon' => 'milk'],
        ]);

        $this->seedActivities($peternakan, [
            [
                'city' => 'Kediri',
                'category' => 'Fattening',
                'details' => [],
                'long_description' => "Program Fattening (Penggemukan) di Kediri berfokus pada penguatan usaha penggemukan untuk meningkatkan bobot dan nilai jual ternak dalam waktu yang lebih singkat.\n\nProgram ini mendukung peternak melalui penyediaan bakalan, pakan berkualitas, serta pendampingan teknis agar proses penggemukan berjalan optimal dan efisien.",
                'image_path' => 'https://images.unsplash.com/photo-1592982537447-6f29922e2f5b?q=80&w=800&auto=format&fit=crop',
            ],
            [
                'city' => 'Sukoharjo',
                'category' => 'Fattening',
                'details' => [],
                'long_description' => 'Program Fattening di Sukoharjo bertujuan untuk meningkatkan kapasitas produksi ternak melalui manajemen pakan yang tepat dan pemeliharaan yang intensif. Peternak diberikan pelatihan mengenai standar operasional penggemukan yang baik untuk menghasilkan daging berkualitas.',
                'image_path' => 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=800&auto=format&fit=crop',
            ],
            [
                'city' => 'Lumajang',
                'category' => 'Fattening',
                'details' => [],
                'long_description' => 'Di Lumajang, program Fattening diintegrasikan dengan pemanfaatan sumber daya lokal sebagai pakan ternak. Hal ini tidak hanya menekan biaya produksi tetapi juga mendukung keberlanjutan ekosistem peternakan di wilayah tersebut.',
                'image_path' => 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=800&auto=format&fit=crop',
            ],
            [
                'city' => 'Sidoarjo',
                'category' => 'Breeding',
                'details' => [],
                'long_description' => "Program Breeding (Pembibitan) di Sidoarjo berfokus pada pengembangan pembibitan untuk meningkatkan kualitas dan ketersediaan populasi ternak secara berkelanjutan.\n\nProgram ini mendorong peternak untuk menghasilkan bakalan unggul melalui manajemen reproduksi, perawatan indukan, serta pendampingan teknis yang terstruktur.",
                'image_path' => 'https://images.unsplash.com/photo-1592982537447-6f29922e2f5b?q=80&w=800&auto=format&fit=crop',
            ],
        ]);

        $umkm = Program::query()->updateOrCreate(['slug' => 'umkm'], [
            'title' => 'UMKM Bangkit',
            'page_title' => 'UMKM Bangkit',
            'short_description' => 'Hadirkan akses pembiayaan tanpa riba untuk mendorong pertumbuhan usaha kecil yang berdaya.',
            'hero_image' => '/images/umkm.webp',
            'hero_description' => "Hadirkan akses pembiayaan tanpa riba untuk mendorong pertumbuhan usaha kecil yang berdaya.\n\nProgram UMKM Bangkit merupakan program pemberdayaan ekonomi melalui penyaluran modal dan pendampingan usaha untuk para pelaku usaha dari keluarga yatim dan dhuafa, berskala mikro dan ultra mikro secara perorangan.\n\nAktivitas program ini menggunakan akad Qordhul Hasan, dengan memberikan pendampingan selama 3 bulan, meliputi pendampingan ekonomi, rohani, dan membiasakan diri dengan menabung.",
            'sort_order' => 3,
            'is_active' => true,
        ]);

        $this->seedStats($umkm, [
            ['value' => '37 PM', 'label' => 'Penerima Manfaat', 'icon' => 'users'],
            ['value' => 'Rp 74 Jt', 'label' => 'Modal Tersalurkan', 'icon' => 'wallet'],
            ['value' => '13 Wilayah', 'label' => 'Titik Pemberdayaan', 'icon' => 'map-pin'],
            ['value' => '71,65%', 'label' => 'Kenaikan Pendapatan', 'icon' => 'trending-up'],
        ]);
    }

    /**
     * @param  array<int, array{value: string, label: string, icon: string}>  $stats
     */
    private function seedStats(Program $program, array $stats): void
    {
        $program->stats()->delete();

        foreach ($stats as $index => $stat) {
            $program->stats()->create([
                ...$stat,
                'sort_order' => $index,
            ]);
        }
    }

    /**
     * @param  array<int, array<string, mixed>>  $activities
     */
    private function seedActivities(Program $program, array $activities): void
    {
        $program->activities()->delete();

        foreach ($activities as $index => $activity) {
            $data = $activity;

            if (array_key_exists('details', $data)) {
                $data['detail_items'] = $data['details'];
                unset($data['details']);
            }

            $program->activities()->create([
                ...$data,
                'sort_order' => $index,
            ]);
        }
    }

    private function seedUmkmRegions(): void
    {
        $regions = [
            [
                'city' => 'Banyuwangi',
                'description' => 'Terdapat 3 pelaku usaha yang telah mendapatkan pendampingan dan permodalan di wilayah ini.',
                'images' => ['/images/halamanumkm/masruroh.webp', '/images/halamanumkm/nurjannah.webp', '/images/halamanumkm/umaita.webp'],
                'beneficiaries' => [
                    ['name' => 'Nur Jannah', 'business' => 'Pentol Tahu'],
                    ['name' => 'Masruroh', 'business' => 'Jajanan Pasar'],
                    ['name' => 'Umaita', 'business' => 'Jajanan Pasar'],
                ],
            ],
            [
                'city' => 'Probolinggo',
                'description' => 'Terdapat 3 pelaku usaha yang telah mendapatkan pendampingan dan permodalan di wilayah ini.',
                'images' => [
                    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=800&auto=format&fit=crop',
                ],
                'beneficiaries' => [
                    ['name' => 'Kamiliya', 'business' => 'Warung snack dan minuman es'],
                    ['name' => 'Sulastri', 'business' => 'Nasi pecel dan nasi jagung'],
                    ['name' => 'Wiwin Hernawati', 'business' => 'Kue Basah'],
                ],
            ],
            [
                'city' => 'Surabaya',
                'description' => 'Terdapat 5 pelaku usaha yang telah mendapatkan pendampingan dan permodalan di wilayah ini.',
                'images' => [
                    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop',
                ],
                'beneficiaries' => [
                    ['name' => 'Dwi Lestari Fatmawati', 'business' => 'Es cup dan kue Homemade'],
                    ['name' => 'Sami', 'business' => 'Rujak, Es dan Makanan Ringan'],
                    ['name' => 'Samiah', 'business' => 'Gorengan dan Sinom'],
                    ['name' => 'Sulistiyani', 'business' => 'Es Cup'],
                    ['name' => 'Nur Fadilah', 'business' => 'Kuliner'],
                ],
            ],
            [
                'city' => 'Jombang',
                'description' => 'Terdapat 1 pelaku usaha yang telah mendapatkan pendampingan dan permodalan di wilayah ini.',
                'images' => ['https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop'],
                'beneficiaries' => [
                    ['name' => 'Marlia Rochmawatie', 'business' => 'Gorengan'],
                ],
            ],
            [
                'city' => 'Ponorogo',
                'description' => 'Terdapat 1 pelaku usaha yang telah mendapatkan pendampingan dan permodalan di wilayah ini.',
                'images' => ['https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=800&auto=format&fit=crop'],
                'beneficiaries' => [
                    ['name' => 'Sri Purwaningsih', 'business' => 'Snack box dan roti'],
                ],
            ],
            [
                'city' => 'Tuban',
                'description' => 'Terdapat 3 pelaku usaha yang telah mendapatkan pendampingan dan permodalan di wilayah ini.',
                'images' => ['https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop'],
                'beneficiaries' => [
                    ['name' => 'Ana Wiwit Sugiarto', 'business' => 'Kue Basah'],
                    ['name' => 'Debi Frendy Setiyawan', 'business' => 'Toko Kelontong'],
                    ['name' => 'Pujianto', 'business' => 'Ternak Lele'],
                ],
            ],
            [
                'city' => 'Tulungagung',
                'description' => 'Terdapat 4 pelaku usaha yang telah mendapatkan pendampingan dan permodalan di wilayah ini.',
                'images' => ['https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=800&auto=format&fit=crop'],
                'beneficiaries' => [
                    ['name' => 'Dyah Purwaningsih', 'business' => 'Nasi dan Rujak'],
                    ['name' => 'Fitrita Febriana', 'business' => 'Toko Kelontong'],
                    ['name' => 'Minggir Supriyadi', 'business' => 'Warung Kopi'],
                    ['name' => 'Siti Mualifah', 'business' => 'Pentol'],
                ],
            ],
            [
                'city' => 'Ngawi',
                'description' => 'Terdapat 1 pelaku usaha yang telah mendapatkan pendampingan dan permodalan di wilayah ini.',
                'images' => ['https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=800&auto=format&fit=crop'],
                'beneficiaries' => [
                    ['name' => 'Siti Khoriah', 'business' => 'Toko Kelontong'],
                ],
            ],
            [
                'city' => 'Solo',
                'description' => 'Terdapat 2 pelaku usaha yang telah mendapatkan pendampingan dan permodalan di wilayah ini.',
                'images' => ['https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop'],
                'beneficiaries' => [
                    ['name' => 'Santy Saputry', 'business' => 'Dimsum'],
                    ['name' => 'Tri Ratna Ningsih', 'business' => 'Cilok dan Es'],
                ],
            ],
            [
                'city' => 'Yogyakarta',
                'description' => 'Terdapat 5 pelaku usaha yang telah mendapatkan pendampingan dan permodalan di wilayah ini.',
                'images' => ['https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop'],
                'beneficiaries' => [
                    ['name' => 'Rischatorin', 'business' => 'Kopi Berkah'],
                    ['name' => 'Nur Aini Azizah', 'business' => 'Laundry'],
                    ['name' => 'Suyati', 'business' => 'Warung Makan dan Catering'],
                    ['name' => 'Muhamad Syiroji', 'business' => 'Tambal Ban'],
                    ['name' => 'Syarifah Ulfa Rohmah', 'business' => 'Wedang Uwuh'],
                ],
            ],
            [
                'city' => 'Bandung',
                'description' => 'Terdapat 3 pelaku usaha yang telah mendapatkan pendampingan dan permodalan di wilayah ini.',
                'images' => ['https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop'],
                'beneficiaries' => [
                    ['name' => 'Jajang Saepuloh', 'business' => 'Gorengan dan Kopi'],
                    ['name' => 'Lilis Saadah', 'business' => 'Gorengan'],
                    ['name' => 'Muhamad Ruhendi', 'business' => 'Gorengan'],
                ],
            ],
            [
                'city' => 'Jakarta Raya',
                'description' => 'Terdapat 4 pelaku usaha yang telah mendapatkan pendampingan dan permodalan di wilayah ini.',
                'images' => ['https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop'],
                'beneficiaries' => [
                    ['name' => 'Titin Suprihatin', 'business' => 'Warung Kopi'],
                    ['name' => 'Silfiah', 'business' => 'Nasi Uduk'],
                    ['name' => 'Supriyani', 'business' => 'Kue Basah'],
                    ['name' => 'Toijah', 'business' => 'Kue'],
                ],
            ],
            [
                'city' => 'Serang',
                'description' => 'Terdapat 2 pelaku usaha yang telah mendapatkan pendampingan dan permodalan di wilayah ini.',
                'images' => ['https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop'],
                'beneficiaries' => [
                    ['name' => 'Ahmad Fahruroji', 'business' => 'Pisang Coklat'],
                    ['name' => 'Aris Rismawati', 'business' => 'Makanan ringan'],
                ],
            ],
        ];

        foreach ($regions as $index => $data) {
            $region = UmkmRegion::query()->updateOrCreate(
                ['city' => $data['city']],
                ['description' => $data['description'], 'sort_order' => $index],
            );

            $region->images()->delete();
            $region->beneficiaries()->delete();

            foreach ($data['images'] as $imageIndex => $imagePath) {
                $region->images()->create([
                    'image_path' => $imagePath,
                    'sort_order' => $imageIndex,
                ]);
            }

            foreach ($data['beneficiaries'] as $beneficiaryIndex => $beneficiary) {
                $region->beneficiaries()->create([
                    ...$beneficiary,
                    'sort_order' => $beneficiaryIndex,
                ]);
            }
        }
    }

    private function seedBlog(): void
    {
        $categories = ['Pertanian', 'Peternakan', 'UMKM', 'Perkebunan'];

        foreach ($categories as $index => $name) {
            PostCategory::query()->updateOrCreate(
                ['name' => $name],
                ['slug' => str()->slug($name), 'sort_order' => $index],
            );
        }

        $posts = [
            [
                'category' => 'UMKM',
                'title' => 'Bantuan Gerobak Usaha untuk Pelaku UMKM di Surabaya',
                'published_at' => '2024-11-22',
                'author' => 'Yatim Mandiri',
                'excerpt' => 'Dalam upaya mendukung pelaku UMKM untuk terus berkembang, Yatim Mandiri Surabaya melalui program UMKM Bangkit menyalurkan gerobak usaha',
                'external_link' => 'https://yatimmandiri.org/news/bantuan-gerobak-usaha-untuk-pelaku-umkm-di-surabaya/',
                'image_path' => 'https://yatimmandiri.org/news/wp-content/uploads/2024/11/Bantuan-Gerobak-Usaha-untuk-Pelaku-UMKM-di-Surabaya-2048x1536.jpeg',
            ],
            [
                'category' => 'Pertanian',
                'title' => 'Petani Kediri Berdaya Melalui Program Lumbung Pangan Mandiri',
                'published_at' => '2024-10-02',
                'author' => 'Yatim Mandiri',
                'excerpt' => 'Yatim Mandiri Kediri resmi meluncurkan program pemberdayaan yakni Lumbung Pangan Mandiri untuk para petani di Desa Sukoanyar, Kecamatan Mojo, Kabupaten Kediri.',
                'external_link' => 'https://yatimmandiri.org/news/petani-kediri-berdaya-melalui-program-lumbung-pangan-mandiri/',
                'image_path' => 'https://yatimmandiri.org/news/wp-content/uploads/2024/10/Petani-Kediri-Berdaya-Melalui-Program-Lumbung-Pangan-Mandiri-2048x1152.jpeg',
            ],
            [
                'category' => 'Peternakan',
                'title' => 'Launching Program Pemberdayaan Peternak Domba di Malang',
                'published_at' => '2024-11-20',
                'author' => 'Divisi Peternakan',
                'excerpt' => 'Program pemberdayaan peternak domba ini merupakan kolaborasi antara Yatim Mandiri dan Trimodadi Farm, yang berpengalaman dalam peternakan dan penggemukan domba serta kambing.',
                'external_link' => 'https://yatimmandiri.org/news/launching-program-pemberdayaan-peternak-domba-di-malang/',
                'image_path' => 'https://yatimmandiri.org/news/wp-content/uploads/2024/11/Launching-Program-Pemberdayaan-Peternak-Domba-di-Malang-2-1024x683.jpg',
            ],
            [
                'category' => 'Perkebunan',
                'title' => 'Kunjungan Industri Mahasiswa ke Program Petani Lontar Tuban',
                'published_at' => '2025-01-14',
                'author' => 'Yatim Mandiri',
                'excerpt' => 'Program pemberdayaan ini memanfaatkan potensi pohon lontar atau siwalan yang melimpah di daerah tersebut. Melalui pendekatan berbasis kelompok, program ini bertujuan untuk meningkatkan kesejahteraan petani dan mendorong inovasi produk lokal.',
                'external_link' => 'https://yatimmandiri.org/news/kunjungan-industri-mahasiswa-ke-program-petani-lontar-tuban/',
                'image_path' => 'https://yatimmandiri.org/news/wp-content/uploads/2025/01/Kunjungan-Industri-Mahasiswa-ke-Program-Petani-Lontar-Tuban-2048x1536.jpg',
            ],
            [
                'category' => 'Pertanian',
                'title' => 'Kolaborasi UNS dan Yatim Mandiri Perkuat Petani Ngawi Melalui Pelatihan Pupuk Organik',
                'published_at' => '2026-07-07',
                'author' => 'Yatim Mandiri',
                'excerpt' => 'Melalui pelatihan intensif, mereka mengajak kelompok tani di Kecamatan Kasreman untuk beralih menggunakan pupuk organik demi memulihkan kesuburan tanah sekaligus mendongkrak produktivitas hasil panen.',
                'external_link' => 'https://yatimmandiri.org/news/kolaborasi-uns-dan-yatim-mandiri-perkuat-petani-ngawi-melalui-pelatihan-pupuk-organik/',
                'image_path' => 'https://yatimmandiri.org/news/wp-content/uploads/2026/07/Ngawi-1-3.jpg',
            ],
            [
                'category' => 'UMKM',
                'title' => 'Bantuan UMKM Ramadhan di Bandung, Dorong Usaha Berdaya',
                'published_at' => '2025-03-14',
                'author' => 'Yatim Mandiri',
                'excerpt' => 'Program ini bertujuan untuk membantu para pelaku UMKM agar dapat lebih berkembang dan mandiri, terutama dalam menghadapi momen Ramadhan yang penuh berkah.',
                'external_link' => 'https://yatimmandiri.org/news/bantuan-umkm-ramadhan-di-bandung-dorong-usaha-berdaya/',
                'image_path' => 'https://yatimmandiri.org/news/wp-content/uploads/2025/03/Bantuan-UMKM-Ramadhan-di-Bandung-Dorong-Usaha-Berdaya-2048x1506.jpg',
            ],
            [
                'category' => 'Pertanian',
                'title' => 'Bersama PLN, Yatim Mandiri Luncurkan Program Electrifying Agriculture untuk Petani Sragen',
                'published_at' => '2025-12-03',
                'author' => 'Yatim Mandiri',
                'excerpt' => 'Program ini merupakan bantuan PLN Electricity Services untuk memperkuat ketahanan pangan nasional. Program juga ditujukan untuk mengoptimalkan potensi desa guna meningkatkan kesejahteraan masyarakat.',
                'external_link' => 'https://yatimmandiri.org/news/bersama-pln-yatim-mandiri-luncurkan-program-electrifying-agriculture-untuk-petani-sragen/',
                'image_path' => 'https://yatimmandiri.org/news/wp-content/uploads/2025/12/WhatsApp-Image-2025-12-03-at-13.02.26.jpeg',
            ],
        ];

        foreach ($posts as $index => $data) {
            $category = PostCategory::query()->where('name', $data['category'])->first();

            Post::query()->updateOrCreate(
                ['title' => $data['title']],
                [
                    'post_category_id' => $category?->id,
                    'slug' => str()->slug($data['title']),
                    'author' => $data['author'],
                    'published_at' => $data['published_at'],
                    'excerpt' => $data['excerpt'],
                    'external_link' => $data['external_link'],
                    'image_path' => $data['image_path'],
                    'is_published' => true,
                    'sort_order' => $index,
                ],
            );
        }
    }

    private function seedTestimonials(): void
    {
        $testimonials = [
            [
                'quote' => 'Saya sangat merasakan dampak dari program pemberdayaan dari Loka Berdaya Amerta. Terimakasih LBA',
                'name' => 'Pak Duwi',
                'role' => 'Petani',
            ],
            [
                'quote' => 'Melalui program Gen Mandiri saya menjadi pemuda yang lebih melek akan potensi diri dan potensi lingkungan untuk bisnis',
                'name' => 'Mas Abdul',
                'role' => 'Alumni Gen Mandiri',
            ],
            [
                'quote' => 'Terimakasih LBA, dengan program kesejahteraan perempuan, Kami para perempuan bisa tetap berkarya',
                'name' => 'Ibu Setiani',
                'role' => 'PM Bunda Bisa',
            ],
        ];

        foreach ($testimonials as $index => $testimonial) {
            Testimonial::query()->updateOrCreate(
                ['name' => $testimonial['name']],
                [...$testimonial, 'sort_order' => $index, 'is_active' => true],
            );
        }
    }

    private function seedPartners(): void
    {
        foreach (range(1, 3) as $index) {
            Partner::query()->updateOrCreate(
                ['name' => "Mitra {$index}"],
                ['sort_order' => $index - 1, 'is_active' => true],
            );
        }
    }

    private function seedCoreValues(): void
    {
        $values = [
            [
                'title' => '#Berdaya',
                'description' => 'Membangun kemandirian masyarakat melalui penguatan kapasitas dan potensi lokal.',
                'icon' => 'leaf',
            ],
            [
                'title' => '#Berdampak',
                'description' => 'Menghadirkan perubahan nyata yang dirasakan langsung oleh masyarakat luas.',
                'icon' => 'heart',
            ],
            [
                'title' => '#Berkelanjutan',
                'description' => 'Memastikan setiap program memberikan manfaat jangka panjang bagi generasi mendatang.',
                'icon' => 'trending-up',
            ],
        ];

        foreach ($values as $index => $value) {
            CoreValue::query()->updateOrCreate(
                ['title' => $value['title']],
                [...$value, 'sort_order' => $index],
            );
        }
    }
}
