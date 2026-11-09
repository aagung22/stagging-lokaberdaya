import { Head, Link, usePage } from '@inertiajs/react';
import { useState, useEffect, useRef, useCallback } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import type { CoreValue } from '@/types/content';
import { Leaf, Heart, TrendingUp, ArrowRight, ArrowUpRight, Quote } from 'lucide-react';

/* ---------- HOOKS ---------- */
function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
    const ref = useRef<T>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
            { threshold },
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);
    return [ref, visible] as const;
}

function useScrollY() {
    const [y, setY] = useState(0);
    useEffect(() => {
        const on = () => setY(window.scrollY);
        window.addEventListener('scroll', on, { passive: true });
        return () => window.removeEventListener('scroll', on);
    }, []);
    return y;
}

function useMouse() {
    const [m, setM] = useState({ x: 0.5, y: 0.5 });
    useEffect(() => {
        const on = (e: MouseEvent) => setM({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
        window.addEventListener('mousemove', on, { passive: true });
        return () => window.removeEventListener('mousemove', on);
    }, []);
    return m;
}

const valueIcons = { leaf: Leaf, heart: Heart, 'trending-up': TrendingUp } as const;

type Props = { coreValues: CoreValue[]; storyParagraphs: string[] };

/* ---------- SPLIT WORD ---------- */
function SplitWords({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) {
    return (
        <span className={className} aria-label={text}>
            {text.split(' ').map((w, i) => (
                <span key={i} className="inline-block overflow-hidden align-bottom">
                    <span
                        className="inline-block will-change-transform"
                        style={{ animation: `wordUp .9s cubic-bezier(.22,.61,.36,1) ${delay + i * 0.045}s both` }}
                    >
                        {w}&nbsp;
                    </span>
                </span>
            ))}
        </span>
    );
}

export default function About({ coreValues, storyParagraphs }: Props) {
    const site = usePage().props.site ?? {};
    const scrollY = useScrollY();
    const mouse = useMouse();

    const [storyRef, storyVis] = useReveal();
    const [valuesRef, valuesVis] = useReveal();

    const heroParallax = Math.min(scrollY * 0.25, 160);
    const heroFade = Math.max(1 - scrollY / 500, 0);

    /* Mouse-follow glow position */
    const glowX = mouse.x * 100;
    const glowY = mouse.y * 100;

    /* Sticky index of paragraph in view */
    const paraRefs = useRef<(HTMLParagraphElement | null)[]>([]);
    const [activePara, setActivePara] = useState(0);
    useEffect(() => {
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        const i = paraRefs.current.indexOf(e.target as HTMLParagraphElement);
                        if (i >= 0) setActivePara(i);
                    }
                });
            },
            { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
        );
        paraRefs.current.forEach((el) => el && obs.observe(el));
        return () => obs.disconnect();
    }, [storyParagraphs.length]);

    return (
        <div className="min-h-screen bg-[#fafaf7] font-sans text-gray-800 selection:bg-[#4b552a] selection:text-[#f7ffda]">
            <Head title="Tentang Kami - Loka Berdaya Amerta" />

            <style>{`
                @keyframes wordUp { from { transform: translateY(110%);} to { transform: translateY(0);} }
                @keyframes drawLine { from { transform: scaleX(0);} to { transform: scaleX(1);} }
                @keyframes fadeUp { from {opacity:0;transform:translateY(24px);} to {opacity:1;transform:translateY(0);} }
                @keyframes floaty { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
                @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
                .animate-floaty { animation: floaty 6s ease-in-out infinite; }
                .story-para { transition: opacity .6s ease, color .6s ease; }
                .value-row { transition: background .5s ease, padding .5s ease; }
                .value-row:hover { background: #ffffff; }
                .value-row:hover .value-icon { transform: rotate(-6deg) scale(1.08); }
                .value-row:hover .value-title { color: #4b552a; }
            `}</style>

            <Navbar />

            {/* ============ HERO ============ */}
            <section className="relative overflow-hidden pt-28 pb-24 md:pt-36 md:pb-32">
                {/* Gradient wash + mouse spotlight */}
                <div
                    className="pointer-events-none absolute inset-0 z-0"
                    style={{
                        background: `radial-gradient(600px circle at ${glowX}% ${glowY}%, rgba(75,85,42,0.08), transparent 60%)`,
                    }}
                />
                <div
                    className="pointer-events-none absolute inset-0 z-0 bg-[#f7ffda]/60"
                    style={{ transform: `translateY(${heroParallax}px)`, opacity: heroFade }}
                />

                {/* Oversized backdrop word */}
                <div
                    className="pointer-events-none absolute inset-x-0 top-16 z-0 text-center leading-none font-black tracking-tighter text-[#4b552a]/[0.04] select-none"
                    style={{ fontSize: 'clamp(6rem, 22vw, 22rem)' }}
                >
                    BERCERITA
                </div>

                <div className="relative z-10 container mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 items-end gap-12 md:grid-cols-12">
                        {/* Text column */}
                        <div className="md:col-span-7">
                            <div
                                className="mb-8 inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.3em] text-[#4b552a]/80 uppercase"
                                style={{ animation: 'fadeUp .7s ease both' }}
                            >
                                <span
                                    className="h-px w-10 origin-left bg-[#4b552a]"
                                    style={{ animation: 'drawLine 1s .2s cubic-bezier(.22,.61,.36,1) both' }}
                                />
                                {site.about_page_badge ?? 'Lebih dari 30 Tahun Berbakti'}
                            </div>

                            <h1 className="mb-8 text-[clamp(2.25rem,5.5vw,4.75rem)] leading-[1.02] font-bold tracking-tight text-[#4b552a]">
                                <SplitWords text={site.about_page_title ?? 'Menggali Potensi Lokal'} />
                                <SplitWords
                                    text="Untuk Kemajuan Sosial"
                                    delay={0.35}
                                    className="block italic text-[#9c8e4d]"
                                />
                            </h1>

                            <p
                                className="max-w-xl text-base leading-relaxed text-gray-600 md:text-lg"
                                style={{ animation: 'fadeUp 1s .8s both' }}
                            >
                                {site.about_page_intro ??
                                    'Loka Berdaya Amerta hadir sebagai respons atas kebutuhan akan perubahan sosial yang inklusif, berkelanjutan, dan berbasis potensi lokal.'}
                            </p>

                            <div className="mt-10 flex flex-wrap items-center gap-6" style={{ animation: 'fadeUp 1s 1s both' }}>
                                <Link
                                    href="/kontak"
                                    className="group inline-flex items-center gap-3 rounded-full bg-[#4b552a] px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#3a4220]"
                                >
                                    Bergabung Bersama Kami
                                    <ArrowUpRight size={18} className="transition-transform group-hover:rotate-45" />
                                </Link>
                                <a
                                    href="#cerita"
                                    className="group inline-flex items-center gap-2 text-sm font-semibold text-[#4b552a]"
                                >
                                    <span className="border-b border-[#4b552a]/30 pb-0.5 transition group-hover:border-[#4b552a]">
                                        Baca cerita kami
                                    </span>
                                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                                </a>
                            </div>
                        </div>

                        {/* Image column */}
                        <div className="md:col-span-5">
                            <div
                                className="relative overflow-hidden rounded-[1.75rem]"
                                style={{
                                    transform: `translateY(${heroParallax * 0.3}px)`,
                                }}
                            >
                                <img
                                    src={site.about_page_image ?? '/images/halamantentang.webp'}
                                    alt="Tentang Loka Berdaya Amerta"
                                    className="h-[420px] w-full object-cover md:h-[540px]"
                                    style={{ animation: 'fadeUp 1.1s .4s cubic-bezier(.22,.61,.36,1) both' }}
                                />
                                {/* Floating badge */}
                                <div className="absolute right-4 bottom-4 rounded-2xl bg-white/90 px-5 py-4 shadow-lg backdrop-blur">
                                    <div className="text-[10px] font-bold tracking-widest text-[#9c8e4d] uppercase">Sejak</div>
                                    <div className="text-2xl font-bold text-[#4b552a] tabular-nums">
                                        {site.about_years ?? '1994'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ CERITA ============ */}
            <section
                id="cerita"
                ref={storyRef}
                className="border-t border-gray-200/70 bg-white py-20 md:py-28"
            >
                <div className="container mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
                        {/* Sticky side label */}
                        <div className="md:col-span-3">
                            <div className="sticky top-28">
                                <div className="mb-2 text-[11px] font-bold tracking-[0.25em] text-[#9c8e4d] uppercase">
                                    01 — Cerita
                                </div>
                                <h2 className="text-2xl leading-tight font-bold text-gray-900">
                                    Perjalanan
                                    <br />
                                    Kami
                                </h2>
                                {/* Progress dots */}
                                <div className="mt-8 hidden flex-col gap-2 md:flex">
                                    {storyParagraphs.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => paraRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                                            className="group flex items-center gap-3 text-left"
                                            aria-label={`Bagian ${i + 1}`}
                                        >
                                            <span
                                                className="h-px transition-all duration-300"
                                                style={{
                                                    width: i === activePara ? 28 : 14,
                                                    background: i === activePara ? '#4b552a' : '#d1d5db',
                                                }}
                                            />
                                            <span
                                                className="text-[11px] font-mono transition-colors"
                                                style={{ color: i === activePara ? '#4b552a' : '#9ca3af' }}
                                            >
                                                {String(i + 1).padStart(2, '0')}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Main content */}
                        <div className="md:col-span-9">
                            {site.about_story_quote && (
                                <figure className="relative mb-16 border-l-2 border-[#4b552a] pl-6 md:pl-8">
                                    <Quote className="absolute -top-3 -left-1 h-7 w-7 rotate-180 text-[#4b552a]" />
                                    <blockquote className="text-xl leading-snug font-medium text-[#4b552a] italic md:text-2xl">
                                        {site.about_story_quote}
                                    </blockquote>
                                </figure>
                            )}

                            <div className="space-y-8">
                                {storyParagraphs.map((paragraph, i) => (
                                    <p
                                        key={i}
                                        ref={(el) => { paraRefs.current[i] = el; }}
                                        className="story-para text-base leading-[1.8] md:text-lg"
                                        style={{
                                            opacity: storyVis ? (i === activePara ? 1 : 0.55) : 0,
                                            color: i === activePara ? '#1f2937' : '#6b7280',
                                        }}
                                    >
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ NILAI-NILAI ============ */}
            <section ref={valuesRef} className="relative overflow-hidden bg-[#f7ffda] py-20 md:py-28">
                {/* subtle grid pattern */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage:
                            'linear-gradient(#4b552a 1px, transparent 1px), linear-gradient(90deg, #4b552a 1px, transparent 1px)',
                        backgroundSize: '48px 48px',
                    }}
                />

                <div className="relative z-10 container mx-auto px-6 md:px-12">
                    <div className="mb-16 max-w-2xl">
                        <div className="mb-3 text-[11px] font-bold tracking-[0.25em] text-[#9c8e4d] uppercase">
                            02 — Nilai
                        </div>
                        <h2 className="text-3xl leading-tight font-bold text-[#4b552a] md:text-[2.75rem]">
                            Nilai Perjuangan Kami
                        </h2>
                        <p className="mt-4 max-w-lg text-base text-gray-600">
                            Pondasi dari setiap langkah dan keputusan yang kami ambil untuk masyarakat.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
                        {/* Values list */}
                        <div className="md:col-span-7">
                            <div className="divide-y divide-[#4b552a]/15 border-y border-[#4b552a]/15">
                                {coreValues.map((value, i) => {
                                    const Icon = valueIcons[value.icon as keyof typeof valueIcons] ?? Leaf;
                                    return (
                                        <div
                                            key={value.id}
                                            className="value-row group relative flex gap-6 px-4 py-7"
                                            style={{
                                                opacity: valuesVis ? 1 : 0,
                                                transform: valuesVis ? 'none' : 'translateY(20px)',
                                                transition: `opacity .7s ${i * 0.1}s ease, transform .7s ${i * 0.1}s cubic-bezier(.22,.61,.36,1)`,
                                            }}
                                        >
                                            <div className="value-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-[#4b552a] shadow-sm transition-transform duration-400">
                                                <Icon size={22} strokeWidth={1.75} />
                                            </div>
                                            <div className="flex-1">
                                                <div className="mb-1 flex items-baseline justify-between gap-4">
                                                    <h3 className="value-title text-lg font-bold text-gray-900 transition-colors">
                                                        {value.title}
                                                    </h3>
                                                    <span className="text-[11px] font-mono text-[#4b552a]/40">
                                                        {String(i + 1).padStart(2, '0')}
                                                    </span>
                                                </div>
                                                <p className="text-sm leading-relaxed text-gray-600">
                                                    {value.description}
                                                </p>
                                            </div>
                                            <ArrowRight
                                                size={18}
                                                className="mt-3 shrink-0 text-[#4b552a] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Image */}
                        <div className="md:col-span-5">
                            <div className="sticky top-28 flex h-full items-start justify-center">
                                <div className="relative w-full">
                                    <div className="absolute inset-0 scale-90 rounded-full bg-[#eff5da] blur-2xl" />
                                    <img
                                        src={site.about_values_image ?? '/images/bgtentang.webp'}
                                        alt="Nilai Loka Berdaya Amerta"
                                        className="animate-floaty relative z-10 w-full object-contain"
                                        style={{
                                            maskImage: 'radial-gradient(circle at center, black 55%, transparent 88%)',
                                            WebkitMaskImage: 'radial-gradient(circle at center, black 55%, transparent 88%)',
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ CTA ============ */}
            <section className="bg-white py-20 md:py-24">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="flex flex-col items-start justify-between gap-8 rounded-[2rem] bg-[#4b552a] px-8 py-12 text-white md:flex-row md:items-center md:px-14 md:py-16">
                        <div>
                            <h2 className="max-w-md text-2xl leading-tight font-bold md:text-3xl">
                                Siap tumbuh bersama kami?
                            </h2>
                            <p className="mt-2 max-w-md text-sm text-[#f7ffda]/70">
                                Bergabunglah dalam program pemberdayaan yang berdampak.
                            </p>
                        </div>
                        <Link
                            href="/kontak"
                            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-[#f7ffda] px-6 py-3 text-sm font-bold text-[#4b552a] transition-colors hover:bg-white"
                        >
                            Hubungi Kami
                            <ArrowUpRight size={16} className="transition-transform group-hover:rotate-45" />
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}