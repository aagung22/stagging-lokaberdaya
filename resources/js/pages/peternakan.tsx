import { useState, useEffect, useRef } from 'react';
import { Head, usePage } from '@inertiajs/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import type { Program, ProgramActivity } from '@/types/content';
import {
    Users,
    Building2,
    Wheat,
    TreePine,
    Milk,
    Wallet,
    MapPin,
    TrendingUp,
    X,
} from 'lucide-react';

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
            { threshold: 0.1, ...options },
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return [ref, visible] as const;
}

const statIcons = {
    users: Users,
    building: Building2,
    wheat: Wheat,
    'tree-pine': TreePine,
    milk: Milk,
    wallet: Wallet,
    'map-pin': MapPin,
    'trending-up': TrendingUp,
} as const;

type Props = {
    program: Program;
};

export default function Peternakan({ program }: Props) {
    const site = usePage().props.site ?? {};

    // State untuk Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedKegiatan, setSelectedKegiatan] =
        useState<ProgramActivity | null>(null);

    const handleOpenModal = (item: ProgramActivity) => {
        setSelectedKegiatan(item);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedKegiatan(null);
    };

    // --- ANIMATION STATE & REFS ---
    const [heroLoaded, setHeroLoaded] = useState(false);
    const [statsRef, statsVisible] = useReveal();
    const [fatteningHeaderRef, fatteningHeaderVisible] = useReveal();
    const [fatteningGridRef, fatteningGridVisible] = useReveal();
    const [breedingHeaderRef, breedingHeaderVisible] = useReveal();
    const [breedingGridRef, breedingGridVisible] = useReveal();

    useEffect(() => {
        const t = setTimeout(() => setHeroLoaded(true), 100);
        return () => clearTimeout(t);
    }, []);

    const activities = program.activities ?? [];

    const fatteningData = activities.filter(
        (activity) => (activity.category ?? '').toLowerCase() === 'fattening',
    );

    const breedingData = activities.filter(
        (activity) => (activity.category ?? '').toLowerCase() === 'breeding',
    );

    const descriptionParagraphs = (program.hero_description ?? '')
        .split(/\n{2,}/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);

    const cardDescription = (activity: ProgramActivity) =>
        (activity.long_description ?? '').split(/\n{2,}/)[0].trim();

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#f7ffda] font-sans text-gray-800">
            <Head
                title={`${program.page_title ?? program.title} - Loka Berdaya Amerta`}
            />

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
                .animate-fade-up { animation: fadeUp 0.8s cubic-bezier(.22,.61,.36,1) both; }
                .animate-slide-left { animation: slideInLeft 1s cubic-bezier(.22,.61,.36,1) both; }
                .animate-slide-right { animation: slideInRight 1s cubic-bezier(.22,.61,.36,1) both; }
                .delay-100 { animation-delay: .1s; }
                .delay-200 { animation-delay: .2s; }
                .delay-300 { animation-delay: .3s; }
                .delay-400 { animation-delay: .4s; }
                .delay-500 { animation-delay: .5s; }
            `}</style>

            {/* 1. NAVBAR */}
            <Navbar />

            {/* 2. HERO SECTION */}
            <section className="relative bg-[#f7ffda] pt-32 pb-24 md:pt-40 md:pb-32">
                <div className="relative z-10 container mx-auto flex flex-col-reverse items-center gap-12 px-6 md:flex-row md:px-12 lg:gap-20">
                    {/* KIRI: Gambar Besar (Animasi Slide Right) */}
                    <div
                        className={`relative w-full md:w-1/2 ${heroLoaded ? 'animate-slide-right' : 'opacity-0'}`}
                    >
                        <img
                            src={
                                program.hero_image_url ??
                                '/images/peternakan.webp'
                            }
                            alt={program.title}
                            className="h-[400px] w-full rounded-3xl rounded-tr-[6rem] border-4 border-white object-cover shadow-lg md:h-[600px]"
                        />
                    </div>

                    {/* KANAN: Teks Penjelasan (Animasi Slide Left) */}
                    <div
                        className={`flex w-full flex-col justify-center md:w-1/2 ${heroLoaded ? 'animate-slide-left' : 'opacity-0'}`}
                    >
                        <h1 className="mb-8 text-3xl leading-tight font-bold text-gray-900 md:text-4xl lg:text-5xl">
                            {program.page_title ?? program.title}
                        </h1>

                        <div className="space-y-5 text-justify leading-relaxed text-gray-600 md:text-left">
                            {descriptionParagraphs.map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. STATS BAR (Animasi Fade Up) */}
            {(program.stats ?? []).length > 0 && (
                <div
                    ref={statsRef}
                    className="relative z-20 container mx-auto -mt-20 px-6 md:-mt-24 md:px-12"
                >
                    <div
                        className={`flex flex-col items-center justify-between gap-8 rounded-3xl border border-gray-100 bg-white p-8 shadow-xl md:flex-row md:p-10 ${statsVisible ? 'animate-fade-up delay-200' : 'opacity-0'}`}
                    >
                        {(program.stats ?? []).map((stat, index) => {
                            const Icon =
                                statIcons[
                                    stat.icon as keyof typeof statIcons
                                ] ?? Users;

                            return (
                                <div key={stat.id} className="contents">
                                    {index > 0 && (
                                        <div className="hidden h-16 w-px bg-gray-200 md:block"></div>
                                    )}

                                    <div className="flex w-full items-start gap-4 md:w-1/3">
                                        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-[#fce4d1] text-[#d97736]">
                                            <Icon size={32} />
                                        </div>
                                        <div>
                                            <h3 className="mb-1 text-xl font-bold text-gray-900 md:text-2xl">
                                                {stat.value}
                                            </h3>
                                            <p className="text-sm leading-tight text-gray-500">
                                                {stat.label}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* 4. SECTION FATTENING */}
            <section className="container mx-auto mt-12 px-6 py-16 md:px-12">
                <div
                    ref={fatteningHeaderRef}
                    className={`mb-10 ${fatteningHeaderVisible ? 'animate-fade-up' : 'opacity-0'}`}
                >
                    <h2 className="mb-4 text-3xl font-bold text-[#4b552a] md:text-4xl">
                        Fattening
                    </h2>
                    <p className="max-w-4xl leading-relaxed text-gray-700">
                        {site.peternakan_fattening_description ??
                            'Program Fattening Domba berfokus pada penguatan usaha penggemukan untuk meningkatkan bobot dan nilai jual ternak dalam waktu yang lebih singkat. Program ini mendukung peternak melalui penyediaan bakalan, pakan berkualitas, serta pendampingan teknis agar proses penggemukan berjalan optimal dan efisien.'}
                    </p>
                </div>

                <div
                    ref={fatteningGridRef}
                    className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
                >
                    {fatteningData.map((item, index) => (
                        <div
                            key={item.id}
                            className={`flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg ${fatteningGridVisible ? 'animate-fade-up' : 'opacity-0'}`}
                            style={{
                                animationDelay: fatteningGridVisible
                                    ? `${index * 0.1}s`
                                    : '0s',
                            }}
                        >
                            <div className="h-56 w-full overflow-hidden">
                                <img
                                    src={
                                        item.image_url ??
                                        '/images/peternakan.webp'
                                    }
                                    alt={`Kegiatan di ${item.city}`}
                                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                                />
                            </div>
                            <div className="flex flex-grow flex-col p-6">
                                <h3 className="mb-3 text-xl font-bold text-gray-900">
                                    {item.city}
                                </h3>
                                <p className="mb-6 flex-grow text-sm leading-relaxed text-gray-600">
                                    {cardDescription(item)}
                                </p>
                                <button
                                    onClick={() => handleOpenModal(item)}
                                    className="mt-auto w-full cursor-pointer rounded-lg bg-[#4b552a] py-2.5 text-sm font-medium text-white transition hover:bg-[#3a4220]"
                                >
                                    Selengkapnya
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 5. SECTION BREEDING */}
            <section className="container mx-auto px-6 pb-24 md:px-12">
                <div
                    ref={breedingHeaderRef}
                    className={`mb-10 ${breedingHeaderVisible ? 'animate-fade-up' : 'opacity-0'}`}
                >
                    <h2 className="mb-4 text-3xl font-bold text-[#4b552a] md:text-4xl">
                        Breeding
                    </h2>
                    <p className="max-w-4xl leading-relaxed text-gray-700">
                        {site.peternakan_breeding_description ??
                            'Program Breeding Domba berfokus pada pengembangan pembibitan untuk meningkatkan kualitas dan ketersediaan populasi ternak secara berkelanjutan. Program ini mendorong peternak untuk menghasilkan bakalan unggul melalui manajemen reproduksi, perawatan indukan, serta pendampingan teknis yang terstruktur.'}
                    </p>
                </div>

                {/* Grid 3 Kolom */}
                <div
                    ref={breedingGridRef}
                    className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
                >
                    {breedingData.map((item, index) => (
                        <div
                            key={item.id}
                            className={`flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg ${breedingGridVisible ? 'animate-fade-up' : 'opacity-0'}`}
                            style={{
                                animationDelay: breedingGridVisible
                                    ? `${index * 0.1}s`
                                    : '0s',
                            }}
                        >
                            <div className="h-56 w-full overflow-hidden">
                                <img
                                    src={
                                        item.image_url ??
                                        '/images/peternakan.webp'
                                    }
                                    alt={`Kegiatan di ${item.city}`}
                                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                                />
                            </div>
                            <div className="flex flex-grow flex-col p-6">
                                <h3 className="mb-3 text-xl font-bold text-gray-900">
                                    {item.city}
                                </h3>
                                <p className="mb-6 flex-grow text-sm leading-relaxed text-gray-600">
                                    {cardDescription(item)}
                                </p>
                                <button
                                    onClick={() => handleOpenModal(item)}
                                    className="mt-auto w-full cursor-pointer rounded-lg bg-[#4b552a] py-2.5 text-sm font-medium text-white transition hover:bg-[#3a4220]"
                                >
                                    Selengkapnya
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 6. MODAL / POP-UP PENJELASAN */}
            {isModalOpen && selectedKegiatan && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
                    <div className="flex max-h-[90vh] w-full max-w-3xl animate-in flex-col overflow-hidden rounded-3xl bg-white shadow-2xl duration-300 fade-in zoom-in">
                        <div className="flex items-center justify-between border-b border-gray-100 bg-[#f7ffda] p-6">
                            <h3 className="text-2xl font-bold text-[#4b552a]">
                                Peternakan di {selectedKegiatan.city}
                            </h3>
                            <button
                                onClick={handleCloseModal}
                                className="cursor-pointer rounded-full bg-white p-2 text-gray-500 shadow-sm transition hover:bg-red-50 hover:text-red-500"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="overflow-y-auto p-8 text-justify leading-relaxed whitespace-pre-wrap text-gray-700">
                            {selectedKegiatan.long_description}
                        </div>

                        <div className="flex justify-end border-t border-gray-100 bg-gray-50 p-4">
                            <button
                                onClick={handleCloseModal}
                                className="cursor-pointer rounded-lg bg-[#4b552a] px-8 py-2.5 font-medium text-white transition hover:bg-[#3a4220]"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 7. FOOTER */}
            <Footer />
        </div>
    );
}
