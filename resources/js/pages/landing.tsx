import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import type { HeroSlide, Partner, Program, Testimonial } from '@/types/content';
import {
    Users,
    Leaf,
    Building2,
    MapPin,
    Phone,
    Mail,
    Send,
    User,
    ArrowRight,
} from 'lucide-react';

type LandingStat = {
    value: string;
    label: string;
    icon: string;
};

type Props = {
    heroSlides: HeroSlide[];
    programs: Program[];
    testimonials: Testimonial[];
    partners: Partner[];
    landingStats: LandingStat[];
};

const statIcons = {
    users: Users,
    leaf: Leaf,
    building: Building2,
} as const;

// --- HOOK: reveal on scroll (Dibuat Generic agar bisa dipakai di div/span) ---
function useReveal<T extends HTMLElement = HTMLDivElement>(options = {}) {
    const ref = useRef<T>(null);
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

// --- KOMPONEN: animated counter ---
function Counter({ end, duration = 1500 }: { end: number; duration?: number }) {
    const [value, setValue] = useState(0);
    const [ref, visible] = useReveal<HTMLSpanElement>();

    useEffect(() => {
        if (!visible) return;
        let start: number | null = null;
        const step = (ts: number) => {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [visible, end, duration]);

    return <span ref={ref}>{value}</span>;
}

export default function Landing({
    heroSlides,
    programs,
    testimonials,
    partners,
    landingStats,
}: Props) {
    // --- LOGIKA SLIDER HERO ---
    const site = usePage().props.site ?? {};

    const heroImages = heroSlides
        .map((slide) => slide.image_url)
        .filter((image): image is string => Boolean(image));

    const images =
        heroImages.length > 0
            ? heroImages
            : [
                  '/images/landing-umkm.webp',
                  '/images/landing-peternakan.webp',
                  '/images/agriculture.webp',
                  '/images/agroforestry.webp',
              ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1,
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);

    const contactForm = useForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    // --- REVEAL REFS ---
    const [aboutRef, aboutVisible] = useReveal();
    const [visiRef, visiVisible] = useReveal();
    const [programHeaderRef, programHeaderVisible] = useReveal();
    const [programRef, programVisible] = useReveal();
    const [testiRef, testiVisible] = useReveal();
    const [mitraRef, mitraVisible] = useReveal();
    const [kontakRef, kontakVisible] = useReveal();

    // --- HERO ANIMATION STATE ---
    const [heroLoaded, setHeroLoaded] = useState(false);
    useEffect(() => {
        const t = setTimeout(() => setHeroLoaded(true), 100);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className="min-h-screen bg-white font-sans text-gray-800">
            <Head title="Loka Berdaya Amerta" />

            {/* GLOBAL KEYFRAMES */}
            <style>{`
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
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
                    to { width: 4rem; }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                @keyframes pulseRing {
                    0% { box-shadow: 0 0 0 0 rgba(75, 85, 42, 0.4); }
                    70% { box-shadow: 0 0 0 12px rgba(75, 85, 42, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(75, 85, 42, 0); }
                }
                .animate-fade-up { animation: fadeUp 0.8s cubic-bezier(.22,.61,.36,1) both; }
                .animate-fade-in { animation: fadeIn 1s ease both; }
                .animate-slide-left { animation: slideInLeft 1s cubic-bezier(.22,.61,.36,1) both; }
                .animate-slide-right { animation: slideInRight 1s cubic-bezier(.22,.61,.36,1) both; }
                .animate-grow { animation: growWidth 0.8s ease both; }
                .animate-float { animation: float 4s ease-in-out infinite; }
                .animate-pulse-ring { animation: pulseRing 2s ease-out infinite; }
                .delay-100 { animation-delay: .1s; }
                .delay-200 { animation-delay: .2s; }
                .delay-300 { animation-delay: .3s; }
                .delay-400 { animation-delay: .4s; }
                .delay-500 { animation-delay: .5s; }
                .delay-700 { animation-delay: .7s; }
            `}</style>

            {/* 1. NAVBAR */}
            <Navbar />

            {/* 2. HERO SECTION - FULL SCREEN */}
            <section className="relative h-screen w-full overflow-hidden">
                <div className="relative h-full w-full">
                    {images.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`Hero Background ${index + 1}`}
                            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000 ease-in-out ${
                                index === currentImageIndex
                                    ? 'z-10 scale-105 opacity-100'
                                    : 'z-0 opacity-0'
                            }`}
                            style={{
                                transition:
                                    'opacity 1s ease-in-out, transform 6s ease-out',
                                transform:
                                    index === currentImageIndex
                                        ? 'scale(1.05)'
                                        : 'scale(1)',
                            }}
                        />
                    ))}

                    <div className="absolute inset-0 z-20 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>

                    <div className="absolute inset-0 z-30 container mx-auto flex h-full flex-col items-start justify-center px-6 pt-24 text-left text-white md:px-12 md:pt-28">
                        {/* Garis aksen kecil */}
                        <div
                            className={`mb-6 h-1 rounded-full bg-[#f7ffda] ${
                                heroLoaded ? 'animate-grow' : 'w-0'
                            }`}
                            style={{ width: heroLoaded ? '4rem' : '0' }}
                        ></div>

                        <h1
                            className={`mb-4 max-w-3xl text-3xl leading-tight font-bold drop-shadow-xl md:text-4xl lg:text-5xl ${
                                heroLoaded
                                    ? 'animate-fade-up delay-100'
                                    : 'opacity-0'
                            }`}
                        >
                            {site.hero_title ?? 'Tumbuhkan Kesejahteraan'}
                            <br />
                            <span className="text-[#f7ffda]">
                                {site.hero_title_accent ??
                                    'dengan Pemberdayaan'}
                            </span>
                        </h1>

                        <p
                            className={`max-w-xl text-base leading-relaxed font-normal text-gray-100 drop-shadow-md md:text-lg lg:text-xl ${
                                heroLoaded
                                    ? 'animate-fade-up delay-300'
                                    : 'opacity-0'
                            }`}
                        >
                            {site.hero_subtitle ?? site.site_tagline ?? ''}
                        </p>

                        <div
                            className={`mt-8 flex gap-3 ${
                                heroLoaded
                                    ? 'animate-fade-up delay-500'
                                    : 'opacity-0'
                            }`}
                        >
                            {images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    className={`h-3 rounded-full transition-all duration-300 ${
                                        index === currentImageIndex
                                            ? 'w-8 bg-[#f7ffda]'
                                            : 'w-3 bg-white/50 hover:bg-white'
                                    }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. STATS BAR */}
            <div
                className={`relative z-40 container mx-auto mt-12 px-6 md:mt-16 md:px-12 ${
                    heroLoaded ? 'animate-fade-up delay-700' : 'opacity-0'
                }`}
            >
                <div className="flex flex-col items-center justify-around gap-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-xl md:flex-row">
                    {landingStats.map((stat, index) => {
                        const Icon =
                            statIcons[stat.icon as keyof typeof statIcons] ??
                            Users;

                        return (
                            <div
                                key={`${stat.label}-${index}`}
                                className="contents"
                            >
                                {index > 0 && (
                                    <div className="hidden h-12 w-px bg-gray-200 md:block"></div>
                                )}
                                <div className="flex flex-col items-center gap-1 text-center transition-transform duration-300 hover:-translate-y-1">
                                    <div className="mb-1 rounded-full bg-[#f7ffda] p-3 text-[#4b552a]">
                                        <Icon size={24} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900">
                                        <Counter
                                            end={
                                                Number.parseInt(
                                                    stat.value.replace(
                                                        /\D/g,
                                                        '',
                                                    ),
                                                    10,
                                                ) || 0
                                            }
                                        />
                                    </h3>
                                    <p className="text-xs font-medium text-gray-500">
                                        {stat.label}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 4. TENTANG KAMI */}
            <section className="container mx-auto px-6 py-24 md:px-12">
                <div className="flex flex-col items-center gap-16 md:flex-row">
                    <div
                        ref={aboutRef}
                        className={`relative w-full md:w-1/2 ${
                            aboutVisible ? 'animate-slide-left' : 'opacity-0'
                        }`}
                    >
                        <div className="group relative z-10 overflow-hidden rounded-[2rem] shadow-2xl">
                            <img
                                src={
                                    site.about_image ??
                                    '/images/halamantentang.webp'
                                }
                                alt="Petani Sawah"
                                className="h-[400px] w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-[500px]"
                            />
                        </div>
                        <div className="animate-float absolute -right-8 -bottom-8 z-20 flex min-w-[120px] flex-col items-center justify-center rounded-2xl bg-[#9c8e4d] p-6 text-white shadow-xl md:min-w-[150px] md:p-8">
                            <span className="text-4xl font-bold md:text-5xl">
                                {site.about_years ?? '30'}
                            </span>
                            <span className="mt-1 text-center text-xs leading-tight font-medium md:text-sm">
                                {(site.about_years_label ?? 'Tahun Berkarya')
                                    .split(' ')
                                    .map((word, index) => (
                                        <span key={index}>
                                            {word}
                                            <br />
                                        </span>
                                    ))}
                            </span>
                        </div>
                        <div className="absolute -top-4 -left-4 z-0 h-24 w-24 rounded-tl-3xl border-t-4 border-l-4 border-[#4b552a]"></div>
                    </div>

                    <div
                        className={`mt-8 w-full md:mt-0 md:w-1/2 ${
                            aboutVisible ? 'animate-slide-right' : 'opacity-0'
                        }`}
                    >
                        <span className="mb-3 flex items-center gap-2 text-sm font-bold tracking-wider text-[#4b552a] uppercase">
                            <span className="h-[2px] w-8 bg-[#4b552a]"></span>{' '}
                            {site.about_eyebrow ?? 'Tentang Kami'}
                        </span>
                        <h2 className="mb-6 text-3xl leading-tight font-bold text-gray-900 md:text-5xl">
                            {site.about_title ??
                                'Sekilas Tentang Loka Berdaya Amerta'}
                        </h2>
                        <p className="mb-8 text-base leading-relaxed text-gray-600 md:text-lg">
                            {site.about_text ?? ''}
                        </p>
                        <Link
                            href="/tentang"
                            className="group flex w-max cursor-pointer items-center gap-2 font-bold text-[#4b552a] transition-all duration-300 hover:gap-4"
                        >
                            Pelajari Lebih Lanjut{' '}
                            <ArrowRight
                                size={20}
                                className="transition-transform duration-300 group-hover:translate-x-1"
                            />
                        </Link>
                    </div>
                </div>
            </section>

            {/* 5. VISI & MISI */}
            <section className="container mx-auto px-6 pb-24 md:px-12">
                <div
                    ref={visiRef}
                    className="grid grid-cols-1 gap-8 md:grid-cols-2"
                >
                    <div
                        className={`group relative overflow-hidden rounded-3xl bg-[#4b552a] p-8 text-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl md:p-10 ${
                            visiVisible ? 'animate-fade-up' : 'opacity-0'
                        }`}
                    >
                        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-32 w-32 rounded-bl-full bg-white/10 transition-transform group-hover:scale-125"></div>
                        <h3 className="mb-4 flex items-center gap-3 text-2xl font-bold">
                            <Leaf size={28} /> Visi
                        </h3>
                        <p className="relative z-10 text-base leading-relaxed text-gray-100 md:text-lg">
                            {site.vision ?? ''}
                        </p>
                    </div>
                    <div
                        className={`group relative overflow-hidden rounded-3xl border border-[#dce5c0] bg-[#eff5da] p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl md:p-10 ${
                            visiVisible
                                ? 'animate-fade-up delay-200'
                                : 'opacity-0'
                        }`}
                    >
                        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-32 w-32 rounded-bl-full bg-[#4b552a]/5 transition-transform group-hover:scale-125"></div>
                        <h3 className="mb-4 flex items-center gap-3 text-2xl font-bold text-[#4b552a]">
                            <Building2 size={28} /> Misi
                        </h3>
                        <ul className="relative z-10 list-disc space-y-3 pl-5 text-base leading-relaxed text-gray-700 md:text-lg">
                            {(site.mission ?? '')
                                .split('\n')
                                .filter((item) => item.trim() !== '')
                                .map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* 6. PROGRAM UTAMA */}
            <section className="bg-gray-50 py-24">
                <div className="container mx-auto px-6 md:px-12">
                    <div
                        ref={programHeaderRef}
                        className={`mb-12 flex flex-col items-end justify-between md:flex-row ${
                            programHeaderVisible
                                ? 'animate-fade-up'
                                : 'opacity-0'
                        }`}
                    >
                        <div>
                            <span className="mb-2 block text-sm font-bold tracking-wider text-[#9c8e4d] uppercase">
                                Apa Yang Kami Lakukan
                            </span>
                            <h2 className="max-w-lg text-3xl leading-tight font-bold text-gray-900 md:text-5xl">
                                Program Utama Pemberdayaan Masyarakat
                            </h2>
                        </div>
                    </div>

                    <div
                        ref={programRef}
                        className="grid grid-cols-1 gap-8 md:grid-cols-2"
                    >
                        {programs.map((program, i) => (
                            <div
                                key={program.id}
                                className={`group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl sm:flex-row ${
                                    programVisible
                                        ? 'animate-fade-up'
                                        : 'opacity-0'
                                }`}
                                style={{
                                    animationDelay: programVisible
                                        ? `${i * 0.15}s`
                                        : '0s',
                                }}
                            >
                                <div className="h-48 w-full overflow-hidden sm:h-auto sm:w-1/2">
                                    <img
                                        src={
                                            program.hero_image_url ??
                                            '/images/agriculture.webp'
                                        }
                                        alt={program.title}
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>
                                <div className="flex w-full flex-col justify-between p-6 sm:w-1/2">
                                    <div>
                                        <h3 className="mb-2 text-xl font-bold text-gray-900">
                                            {program.title}
                                        </h3>
                                        <p className="mb-4 text-sm leading-relaxed text-gray-600">
                                            {program.short_description ?? ''}
                                        </p>
                                    </div>
                                    <Link
                                        href={`/program/${program.slug}`}
                                        className="group/link mt-2 inline-flex w-max items-center gap-2 text-sm font-semibold text-[#4b552a] hover:underline"
                                    >
                                        Selengkapnya{' '}
                                        <ArrowRight
                                            size={16}
                                            className="transition-transform duration-300 group-hover/link:translate-x-1"
                                        />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. MAP SECTION */}
            <section className="container mx-auto px-6 py-24 text-center md:px-12">
                <h2 className="mb-8 text-3xl font-bold text-[#4b552a] md:text-4xl">
                    Temukan Kami di
                </h2>
                <div className="relative h-[300px] w-full overflow-hidden rounded-2xl bg-gray-200 shadow-md md:h-[400px]">
                    <iframe
                        src={
                            site.maps_embed_url ??
                            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.307548570149!2d112.67889967357418!3d-7.431179073205722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7e132a4632891%3A0x4058849ad5fd97eb!2sYatim%20Mandiri%20Sidoarjo%3A%20Lembaga%20Amil%20Zakat%20Nasional!5e0!3m2!1sid!2sid!4v1793240614969!5m2!1sid!2sid'
                        }
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="absolute inset-0"
                    ></iframe>
                </div>
            </section>

            {/* 8. TESTIMONI */}
            <section
                ref={testiRef}
                className="container mx-auto px-6 pb-24 text-center md:px-12"
            >
                <div
                    className={`mb-4 inline-block rounded-full bg-[#9c8e4d] px-4 py-1 text-sm font-semibold text-white ${
                        testiVisible ? 'animate-fade-up' : 'opacity-0'
                    }`}
                >
                    Testimoni Penerima Manfaat
                </div>
                <h2
                    className={`mb-4 text-3xl leading-tight font-bold text-[#4b552a] md:text-5xl ${
                        testiVisible ? 'animate-fade-up delay-100' : 'opacity-0'
                    }`}
                >
                    Kata Penerima Manfaat Tentang
                    <br />
                    Program Loka Berdaya Amerta
                </h2>
                <p
                    className={`mx-auto mb-16 max-w-2xl text-gray-600 ${
                        testiVisible ? 'animate-fade-up delay-200' : 'opacity-0'
                    }`}
                >
                    Cerita nyata dari peserta, relawan, dan masyarakat yang
                    telah merasakan dampak langsung dari program pemberdayaan.
                </p>

                <div className="grid grid-cols-1 gap-8 text-left md:grid-cols-3">
                    {testimonials.map((testimonial, i) => (
                        <div
                            key={testimonial.id}
                            className={`relative flex flex-col justify-between overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
                                testiVisible ? 'animate-fade-up' : 'opacity-0'
                            }`}
                            style={{
                                animationDelay: testiVisible
                                    ? `${0.3 + i * 0.15}s`
                                    : '0s',
                            }}
                        >
                            <div className="absolute top-0 right-0 -mt-4 -mr-4 h-20 w-20 rounded-bl-full bg-[#f7ffda]"></div>
                            <div className="relative z-10 mb-8">
                                <span className="absolute -top-6 -left-2 z-0 font-serif text-6xl text-[#4b552a] opacity-20">
                                    "
                                </span>
                                <p className="relative z-10 text-lg leading-relaxed text-gray-700 italic">
                                    {testimonial.quote}
                                </p>
                            </div>
                            <div className="mt-auto flex items-center gap-4">
                                <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-[#eff5da] text-[#4b552a]">
                                    {testimonial.photo_url ? (
                                        <img
                                            src={testimonial.photo_url}
                                            alt={testimonial.name}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <User size={28} />
                                    )}
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-[#4b552a]">
                                        {testimonial.name}
                                    </h4>
                                    <p className="text-sm font-medium text-gray-500">
                                        {testimonial.role ?? ''}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 9. MITRA KOLABORATOR */}
            <section
                ref={mitraRef}
                className="container mx-auto px-6 pb-24 md:px-12"
            >
                <div
                    className={`flex flex-col items-center justify-between gap-12 rounded-[3rem] border border-[#dce5c0] bg-[#f7ffda] p-8 shadow-sm md:flex-row md:p-14 ${
                        mitraVisible ? 'animate-fade-up' : 'opacity-0'
                    }`}
                >
                    <div className="w-full md:w-1/3">
                        <h2 className="mb-4 text-2xl font-bold text-[#4b552a] md:text-3xl">
                            Mitra Kolaborator
                        </h2>
                        <p className="text-sm leading-relaxed text-gray-600 md:text-base">
                            Loka Berdaya Amerta telah berkolaborasi dengan
                            berbagai mitra strategis dalam melaksanakan program
                            pemberdayaan ekonomi dan sosial.
                        </p>
                    </div>

                    <div className="flex w-full flex-wrap items-center justify-center gap-6 md:w-2/3 md:justify-end md:gap-8">
                        {partners.map((partner) => (
                            <a
                                key={partner.id}
                                href={partner.url ?? undefined}
                                target={partner.url ? '_blank' : undefined}
                                rel={
                                    partner.url
                                        ? 'noopener noreferrer'
                                        : undefined
                                }
                                className="flex h-16 w-32 items-center justify-center overflow-hidden rounded-xl border border-white bg-white/60 p-3 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:h-20 md:w-40"
                            >
                                {partner.logo_url ? (
                                    <img
                                        src={partner.logo_url}
                                        alt={partner.name}
                                        className="max-h-full max-w-full object-contain"
                                    />
                                ) : (
                                    <span className="text-center text-xs font-bold text-[#4b552a] md:text-sm">
                                        {partner.name}
                                    </span>
                                )}
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* 10. HUBUNGI KAMI SECTION */}
            <section
                ref={kontakRef}
                className="container mx-auto px-6 pb-24 md:px-12"
            >
                <div
                    className={`grid grid-cols-1 gap-0 overflow-hidden rounded-[3rem] bg-white shadow-2xl md:grid-cols-2 ${
                        kontakVisible ? 'animate-fade-up' : 'opacity-0'
                    }`}
                >
                    <div className="relative bg-[#4b552a] p-8 text-white md:p-16">
                        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-32 w-32 rounded-bl-full bg-white/5"></div>
                        <h2 className="mb-2 text-3xl font-bold md:text-4xl">
                            Hubungi Kami
                        </h2>
                        <p className="mb-10 text-[#f7ffda]/80">
                            Punya pertanyaan khusus untuk kami?
                        </p>

                        <form
                            className="space-y-6"
                            onSubmit={(event) => {
                                event.preventDefault();
                                contactForm.post('/kontak', {
                                    preserveScroll: true,
                                    onSuccess: () => contactForm.reset(),
                                });
                            }}
                        >
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <input
                                        type="text"
                                        name="name"
                                        value={contactForm.data.name}
                                        onChange={(event) =>
                                            contactForm.setData(
                                                'name',
                                                event.target.value,
                                            )
                                        }
                                        placeholder="Nama *"
                                        className="w-full rounded-none border-b border-white/30 bg-transparent px-0 py-3 text-white placeholder-white/60 transition focus:border-[#f7ffda] focus:outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={contactForm.data.email}
                                        onChange={(event) =>
                                            contactForm.setData(
                                                'email',
                                                event.target.value,
                                            )
                                        }
                                        placeholder="Email *"
                                        className="w-full rounded-none border-b border-white/30 bg-transparent px-0 py-3 text-white placeholder-white/60 transition focus:border-[#f7ffda] focus:outline-none"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={contactForm.data.phone}
                                    onChange={(event) =>
                                        contactForm.setData(
                                            'phone',
                                            event.target.value,
                                        )
                                    }
                                    placeholder="No. Telepon"
                                    className="w-full rounded-none border-b border-white/30 bg-transparent px-0 py-3 text-white placeholder-white/60 transition focus:border-[#f7ffda] focus:outline-none"
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="subject"
                                    value={contactForm.data.subject}
                                    onChange={(event) =>
                                        contactForm.setData(
                                            'subject',
                                            event.target.value,
                                        )
                                    }
                                    placeholder="Subject"
                                    className="w-full rounded-none border-b border-white/30 bg-transparent px-0 py-3 text-white placeholder-white/60 transition focus:border-[#f7ffda] focus:outline-none"
                                />
                            </div>
                            <div>
                                <textarea
                                    rows={4}
                                    name="message"
                                    value={contactForm.data.message}
                                    onChange={(event) =>
                                        contactForm.setData(
                                            'message',
                                            event.target.value,
                                        )
                                    }
                                    placeholder="Pesan"
                                    className="w-full resize-none rounded-none border-b border-white/30 bg-transparent px-0 py-3 text-white placeholder-white/60 transition focus:border-[#f7ffda] focus:outline-none"
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={contactForm.processing}
                                className="animate-pulse-ring mt-4 flex w-max items-center gap-2 rounded-full bg-[#f7ffda] px-8 py-3 font-bold text-[#4b552a] transition-all duration-300 hover:gap-3 hover:bg-white disabled:opacity-60"
                            >
                                <Send size={18} />
                                {contactForm.processing
                                    ? 'MENGIRIM...'
                                    : 'KIRIM PESAN'}
                            </button>
                        </form>
                    </div>

                    <div className="flex flex-col justify-center bg-[#fcfcfc] p-8 md:p-16">
                        <span className="mb-2 block font-semibold tracking-wider text-[#9c8e4d] uppercase">
                            Lebih Lanjut
                        </span>
                        <h2 className="mb-10 text-3xl leading-tight font-bold text-gray-900 md:text-4xl">
                            Kontak Kami
                        </h2>

                        <div className="space-y-8">
                            <div className="group flex items-start gap-5">
                                <div className="rounded-2xl bg-[#eff5da] p-3 text-[#4b552a] shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h4 className="mb-1 font-bold text-gray-900">
                                        Telepon / WhatsApp
                                    </h4>
                                    <p className="text-gray-600">
                                        {site.phone ?? '081 330003450'}
                                    </p>
                                </div>
                            </div>

                            <div className="group flex items-start gap-5">
                                <div className="rounded-2xl bg-[#eff5da] p-3 text-[#4b552a] shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h4 className="mb-1 font-bold text-gray-900">
                                        Email
                                    </h4>
                                    <p className="text-gray-600">
                                        {site.email ?? 'info@lokaberdaya.com'}
                                    </p>
                                </div>
                            </div>

                            <div className="group flex items-start gap-5">
                                <div className="rounded-2xl bg-[#eff5da] p-3 text-[#4b552a] shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4 className="mb-1 font-bold text-gray-900">
                                        Alamat Kantor
                                    </h4>
                                    <p className="leading-relaxed text-gray-600">
                                        {site.address ??
                                            'Jl. Sarirogo No. 1, Sari Rogo, Kec. Sidoarjo, Kabupaten Sidoarjo, Jawa Timur 61234'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 11. FOOTER */}
            <Footer />
        </div>
    );
}
