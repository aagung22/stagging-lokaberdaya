import { useState, useEffect, useRef } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import type { Program, UmkmRegion } from '@/types/content';
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

// --- KOMPONEN KARTU DENGAN SLIDER OTOMATIS ---
function UmkmCard({
    item,
    index,
    visible,
    onOpenModal,
}: {
    item: UmkmRegion;
    index: number;
    visible: boolean;
    onOpenModal: (item: UmkmRegion) => void;
}) {
    const [currentImgIndex, setCurrentImgIndex] = useState(0);

    const images = item.images
        .map((image) => image.image_url)
        .filter((image): image is string => Boolean(image));

    // Logika Slide Otomatis
    useEffect(() => {
        if (images.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentImgIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // 3 detik

        return () => clearInterval(interval);
    }, [images.length]);

    const beneficiaryCount = item.beneficiaries.length;

    return (
        <div
            className={`flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg ${visible ? 'animate-fade-up' : 'opacity-0'}`}
            style={{ animationDelay: visible ? `${index * 0.1}s` : '0s' }}
        >
            {/* PERUBAHAN: h-48 menjadi h-60, dan ditambahkan object-top */}
            <div className="relative h-60 w-full overflow-hidden bg-gray-200">
                {images.map((img, i) => (
                    <img
                        key={i}
                        src={img}
                        alt={`UMKM di ${item.city} - ${i + 1}`}
                        className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-1000 ease-in-out ${
                            i === currentImgIndex
                                ? 'z-10 opacity-100'
                                : 'z-0 opacity-0'
                        }`}
                    />
                ))}

                {/* Badge Jumlah PM */}
                <div className="absolute top-4 right-4 z-20 rounded-full bg-white/90 px-3 py-1 text-sm font-bold text-[#4b552a] shadow-sm backdrop-blur-sm">
                    {beneficiaryCount} PM
                </div>

                {/* Indikator Titik (Dots) di bagian bawah gambar */}
                {images.length > 1 && (
                    <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
                        {images.map((_, i) => (
                            <div
                                key={i}
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                    i === currentImgIndex
                                        ? 'w-6 bg-white'
                                        : 'w-1.5 bg-white/50'
                                }`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Konten Kartu */}
            <div className="flex flex-grow flex-col p-6">
                <h3 className="mb-3 text-2xl font-bold text-gray-900">
                    {item.city}
                </h3>
                <p className="mb-6 flex-grow text-sm leading-relaxed text-gray-600">
                    {item.description ??
                        `Terdapat ${beneficiaryCount} pelaku usaha yang telah mendapatkan pendampingan dan permodalan di wilayah ini.`}
                </p>
                <button
                    onClick={() => onOpenModal(item)}
                    className="mt-auto w-full cursor-pointer rounded-lg bg-[#4b552a] py-2.5 text-sm font-medium text-white transition hover:bg-[#3a4220]"
                >
                    Lihat Penerima Manfaat
                </button>
            </div>
        </div>
    );
}

type Props = {
    program: Program;
    regions: UmkmRegion[];
};

export default function Umkm({ program, regions }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedKota, setSelectedKota] = useState<UmkmRegion | null>(null);

    const handleOpenModal = (item: UmkmRegion) => {
        setSelectedKota(item);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedKota(null);
    };

    // --- ANIMATION STATE & REFS ---
    const [heroLoaded, setHeroLoaded] = useState(false);
    const [statsRef, statsVisible] = useReveal();
    const [headerRef, headerVisible] = useReveal();
    const [gridRef, gridVisible] = useReveal();

    useEffect(() => {
        const t = setTimeout(() => setHeroLoaded(true), 100);
        return () => clearTimeout(t);
    }, []);

    const descriptionParagraphs = (program.hero_description ?? '')
        .split(/\n{2,}/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);

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
            `}</style>

            {/* 1. NAVBAR */}
            <Navbar />

            {/* 2. HERO SECTION */}
            <section className="relative bg-[#f7ffda] pt-32 pb-24 md:pt-40 md:pb-32">
                <div className="relative z-10 container mx-auto flex flex-col-reverse items-center gap-12 px-6 md:flex-row md:px-12 lg:gap-20">
                    <div
                        className={`relative w-full md:w-1/2 ${heroLoaded ? 'animate-slide-right' : 'opacity-0'}`}
                    >
                        <img
                            src={program.hero_image_url ?? '/images/umkm.webp'}
                            alt={program.title}
                            className="h-[400px] w-full rounded-3xl rounded-tr-[6rem] border-4 border-white object-cover shadow-lg md:h-[600px]"
                        />
                    </div>

                    <div
                        className={`flex w-full flex-col justify-center md:w-1/2 ${heroLoaded ? 'animate-slide-left' : 'opacity-0'}`}
                    >
                        <h1 className="mb-6 text-4xl leading-tight font-bold text-[#4b552a] md:text-5xl lg:text-6xl">
                            {program.page_title ?? program.title}
                        </h1>

                        {descriptionParagraphs.length > 0 && (
                            <p className="mb-6 text-xl leading-relaxed font-medium text-gray-700">
                                {descriptionParagraphs[0]}
                            </p>
                        )}

                        <div className="space-y-4 text-justify leading-relaxed text-gray-600 md:text-left">
                            {descriptionParagraphs
                                .slice(1)
                                .map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. STATS BAR */}
            {(program.stats ?? []).length > 0 && (
                <div
                    ref={statsRef}
                    className="relative z-20 container mx-auto -mt-20 px-6 md:-mt-24 md:px-12"
                >
                    <div
                        className={`flex flex-col items-center justify-between gap-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-xl md:flex-row md:p-8 ${statsVisible ? 'animate-fade-up delay-200' : 'opacity-0'}`}
                    >
                        {(program.stats ?? []).map((stat, index) => {
                            const Icon =
                                statIcons[
                                    stat.icon as keyof typeof statIcons
                                ] ?? Users;

                            return (
                                <div key={stat.id} className="contents">
                                    {index > 0 && (
                                        <div className="hidden h-12 w-px bg-gray-200 md:block"></div>
                                    )}

                                    <div className="flex w-full items-center gap-4 md:w-1/4">
                                        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-[#fce4d1] text-[#d97736]">
                                            <Icon size={28} />
                                        </div>
                                        <div>
                                            <h3 className="mb-1 text-xl font-bold text-gray-900">
                                                {stat.value}
                                            </h3>
                                            <p className="text-xs leading-tight text-gray-500">
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

            {/* 4. SEBARAN PENERIMA MANFAAT SECTION */}
            <section className="container mx-auto mt-12 px-6 py-24 md:px-12">
                <div ref={headerRef} className="mb-16 text-center">
                    <h2
                        className={`mb-4 text-3xl font-bold text-[#4b552a] md:text-4xl ${headerVisible ? 'animate-fade-up' : 'opacity-0'}`}
                    >
                        Sebaran Penerima Manfaat
                    </h2>
                    <p
                        className={`mx-auto max-w-2xl text-gray-600 ${headerVisible ? 'animate-fade-up delay-100' : 'opacity-0'}`}
                    >
                        Program UMKM Bangkit telah menjangkau pelaku usaha mikro
                        dan ultra mikro di berbagai wilayah di Indonesia.
                    </p>
                </div>

                {/* Grid Card dengan Komponen UmkmCard */}
                <div
                    ref={gridRef}
                    className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
                >
                    {regions.map((item, index) => (
                        <UmkmCard
                            key={item.id}
                            item={item}
                            index={index}
                            visible={gridVisible}
                            onOpenModal={handleOpenModal}
                        />
                    ))}
                </div>
            </section>

            {/* 5. MODAL / POP-UP DAFTAR PENERIMA MANFAAT */}
            {isModalOpen && selectedKota && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
                    <div className="flex max-h-[90vh] w-full max-w-2xl animate-in flex-col overflow-hidden rounded-3xl bg-white shadow-2xl duration-300 fade-in zoom-in">
                        <div className="flex items-center justify-between border-b border-gray-100 bg-[#f7ffda] p-6">
                            <div>
                                <h3 className="text-2xl font-bold text-[#4b552a]">
                                    Penerima Manfaat
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Wilayah {selectedKota.city}
                                </p>
                            </div>
                            <button
                                onClick={handleCloseModal}
                                className="cursor-pointer rounded-full bg-white p-2 text-gray-500 shadow-sm transition hover:bg-red-50 hover:text-red-500"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="overflow-y-auto p-6">
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse text-left">
                                    <thead>
                                        <tr className="bg-gray-50 text-gray-700">
                                            <th className="rounded-tl-lg border-b-2 border-gray-200 p-3 font-semibold">
                                                No
                                            </th>
                                            <th className="border-b-2 border-gray-200 p-3 font-semibold">
                                                Nama
                                            </th>
                                            <th className="rounded-tr-lg border-b-2 border-gray-200 p-3 font-semibold">
                                                Bidang Usaha
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedKota.beneficiaries.map(
                                            (pm, index) => (
                                                <tr
                                                    key={pm.id}
                                                    className="transition hover:bg-[#f7ffda]/50"
                                                >
                                                    <td className="border-b border-gray-100 p-3 text-gray-500">
                                                        {index + 1}
                                                    </td>
                                                    <td className="border-b border-gray-100 p-3 font-medium text-gray-800">
                                                        {pm.name}
                                                    </td>
                                                    <td className="border-b border-gray-100 p-3 text-gray-600">
                                                        {pm.business}
                                                    </td>
                                                </tr>
                                            ),
                                        )}
                                    </tbody>
                                </table>
                            </div>
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

            {/* 6. FOOTER */}
            <Footer />
        </div>
    );
}
