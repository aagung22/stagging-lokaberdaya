import { Head, Link, usePage } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import type { CoreValue } from '@/types/content';
import { Leaf, Heart, TrendingUp, ArrowRight } from 'lucide-react';

// --- HOOK: reveal on scroll ---
function useReveal(options = {}) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.unobserve(el);
                }
            },
            { threshold: 0.15, ...options },
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return [ref, visible] as const;
}

const valueIcons = {
    leaf: Leaf,
    heart: Heart,
    'trending-up': TrendingUp,
} as const;

type Props = {
    coreValues: CoreValue[];
    storyParagraphs: string[];
};

export default function About({ coreValues, storyParagraphs }: Props) {
    const site = usePage().props.site ?? {};

    // --- REVEAL REFS ---
    const [storyRef, storyVisible] = useReveal();
    const [valuesTextRef, valuesTextVisible] = useReveal();
    const [valuesImgRef, valuesImgVisible] = useReveal();

    // --- HERO ANIMATION STATE ---
    const [heroLoaded, setHeroLoaded] = useState(false);
    useEffect(() => {
        const t = setTimeout(() => setHeroLoaded(true), 100);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className="min-h-screen overflow-hidden bg-white font-sans text-gray-800">
            <Head title="Tentang Kami - Loka Berdaya Amerta" />

            {/* GLOBAL KEYFRAMES UNTUK ANIMASI */}
            <style>{`
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideInLeft {
                    from { opacity: 0; transform: translateX(-60px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes slideInRight {
                    from { opacity: 0; transform: translateX(60px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes growWidth {
                    from { width: 0; }
                    to { width: 6rem; }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-fade-up { animation: fadeUp 0.8s cubic-bezier(.22,.61,.36,1) both; }
                .animate-slide-left { animation: slideInLeft 1s cubic-bezier(.22,.61,.36,1) both; }
                .animate-slide-right { animation: slideInRight 1s cubic-bezier(.22,.61,.36,1) both; }
                .animate-grow { animation: growWidth 0.8s ease both; }
                .animate-float { animation: float 4s ease-in-out infinite; }
                .delay-100 { animation-delay: .1s; }
                .delay-200 { animation-delay: .2s; }
                .delay-300 { animation-delay: .3s; }
                .delay-400 { animation-delay: .4s; }
            `}</style>

            {/* 1. NAVBAR */}
            <Navbar />

            {/* 2. HERO SECTION */}
            <section className="relative bg-[#f7ffda] pt-32 pb-20 md:pt-40 md:pb-28">
                {/* Ornamen Latar Belakang */}
                <div className="absolute top-20 -left-20 h-72 w-72 rounded-full bg-[#eff5da] opacity-70 mix-blend-multiply blur-3xl filter"></div>
                <div className="absolute top-40 -right-20 h-72 w-72 rounded-full bg-[#e5edcb] opacity-70 mix-blend-multiply blur-3xl filter"></div>

                <div className="relative z-10 container mx-auto flex flex-col items-center gap-12 px-6 md:flex-row md:px-12">
                    {/* Kiri: Teks (Animasi Slide Left) */}
                    <div
                        className={`w-full md:w-1/2 ${heroLoaded ? 'animate-slide-left' : 'opacity-0'}`}
                    >
                        <span className="mb-6 inline-block rounded-full bg-[#4b552a] px-4 py-1.5 text-sm font-semibold text-white shadow-sm">
                            {site.about_page_badge ??
                                'Lebih dari 30 Tahun Berbakti'}
                        </span>
                        <h1 className="mb-6 text-4xl leading-tight font-bold text-[#4b552a] md:text-5xl lg:text-6xl">
                            {site.about_page_title ??
                                'Menggali Potensi Lokal Untuk Kemajuan Sosial'}
                        </h1>
                        <p className="mb-8 text-lg leading-relaxed text-gray-600">
                            {site.about_page_intro ??
                                'Loka Berdaya Amerta hadir sebagai respons atas kebutuhan akan perubahan sosial yang inklusif, berkelanjutan, dan berbasis potensi lokal.'}
                        </p>
                        <Link
                            href="/kontak"
                            className="inline-flex items-center gap-2 rounded-lg bg-[#4b552a] px-6 py-3 font-bold text-white shadow-lg transition hover:bg-[#3a4220]"
                        >
                            Bergabung Bersama Kami <ArrowRight size={18} />
                        </Link>
                    </div>

                    {/* Kanan: Gambar (Animasi Slide Right) */}
                    <div
                        className={`relative w-full md:w-1/2 ${heroLoaded ? 'animate-slide-right' : 'opacity-0'}`}
                    >
                        <div className="absolute inset-0 translate-x-4 translate-y-4 transform rounded-3xl bg-[#9c8e4d] opacity-20"></div>
                        <img
                            src={
                                site.about_page_image ??
                                '/images/halamantentang.webp'
                            }
                            alt="Tentang Loka Berdaya Amerta"
                            className="relative z-10 h-[400px] w-full rounded-3xl object-cover shadow-xl"
                        />
                    </div>
                </div>
            </section>

            {/* 3. KONTEN CERITA (Animasi Fade Up) */}
            <section
                ref={storyRef}
                className="container mx-auto max-w-5xl px-6 py-20 md:px-12"
            >
                <div
                    className={`mb-12 text-center ${storyVisible ? 'animate-fade-up' : 'opacity-0'}`}
                >
                    <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                        Cerita Kami
                    </h2>
                    <div
                        className={`mx-auto h-1 rounded-full bg-[#4b552a] ${storyVisible ? 'animate-grow' : 'w-0'}`}
                    ></div>
                </div>

                <div className="space-y-8 text-lg leading-relaxed text-gray-600">
                    {site.about_story_quote && (
                        <p
                            className={`rounded-r-lg border-l-4 border-[#4b552a] bg-gray-50 py-4 pr-4 pl-6 text-gray-700 italic ${storyVisible ? 'animate-fade-up delay-100' : 'opacity-0'}`}
                        >
                            "{site.about_story_quote}"
                        </p>
                    )}
                    {storyParagraphs.map((paragraph, index) => (
                        <p
                            key={index}
                            className={`${
                                storyVisible
                                    ? `animate-fade-up delay-${Math.min((index + 2) * 100, 400)}`
                                    : 'opacity-0'
                            }`}
                        >
                            {paragraph}
                        </p>
                    ))}
                </div>
            </section>

            {/* 4. NILAI-NILAI (Teks Slide Kiri, Gambar Slide Kanan) */}
            <section className="overflow-hidden bg-[#f7ffda] py-24">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="flex flex-col items-center gap-16 lg:flex-row">
                        {/* KIRI: Teks dan Kartu Nilai */}
                        <div
                            ref={valuesTextRef}
                            className={`w-full lg:w-1/2 ${valuesTextVisible ? 'animate-slide-left' : 'opacity-0'}`}
                        >
                            <div className="mb-10">
                                <h2 className="mb-4 text-3xl font-bold text-[#4b552a] md:text-4xl">
                                    Nilai Perjuangan Kami
                                </h2>
                                <p className="text-lg text-gray-600">
                                    Pondasi dari setiap langkah yang kami ambil.
                                </p>
                            </div>

                            <div className="flex flex-col gap-6">
                                {coreValues.map((value) => {
                                    const Icon =
                                        valueIcons[
                                            value.icon as keyof typeof valueIcons
                                        ] ?? Leaf;

                                    return (
                                        <div
                                            key={value.id}
                                            className="flex items-start gap-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1"
                                        >
                                            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-[#eff5da] text-[#4b552a]">
                                                <Icon size={28} />
                                            </div>
                                            <div>
                                                <h3 className="mb-2 text-xl font-bold text-gray-900">
                                                    {value.title}
                                                </h3>
                                                <p className="leading-relaxed text-gray-600">
                                                    {value.description}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* KANAN: Gambar Transparan */}
                        <div
                            ref={valuesImgRef}
                            className={`relative mt-12 flex w-full justify-center lg:mt-0 lg:w-1/2 ${valuesImgVisible ? 'animate-slide-right' : 'opacity-0'}`}
                        >
                            {/* Ornamen lingkaran di belakang gambar */}
                            <div className="absolute top-1/2 left-1/2 z-0 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#eff5da] opacity-60 md:h-[450px] md:w-[450px]"></div>

                            <img
                                src={
                                    site.about_values_image ??
                                    '/images/bgtentang.webp'
                                }
                                alt="Perempuan Berdaya Loka Berdaya Amerta"
                                className={`relative z-10 h-auto w-full max-w-full object-contain ${valuesImgVisible ? 'animate-float' : ''}`}
                                style={{
                                    /* Trik CSS Masking: Membuat pinggiran gambar memudar dan menyatu dengan background */
                                    maskImage:
                                        'radial-gradient(circle at center, black 50%, transparent 85%)',
                                    WebkitMaskImage:
                                        'radial-gradient(circle at center, black 50%, transparent 85%)',
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. FOOTER */}
            <Footer />
        </div>
    );
}
