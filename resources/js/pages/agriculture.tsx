import { useState, useEffect, useRef, useCallback } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import type { Program, ProgramActivity } from '@/types/content';
import {
    Users, Building2, Wheat, TreePine, Milk, Wallet, MapPin, TrendingUp,
    X, ArrowUpRight, ArrowRight, MapPinned,
} from 'lucide-react';

/* ---------- HOOKS ---------- */
function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.12) {
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

const statIcons = {
    users: Users, building: Building2, wheat: Wheat, 'tree-pine': TreePine,
    milk: Milk, wallet: Wallet, 'map-pin': MapPin, 'trending-up': TrendingUp,
} as const;

type Props = { program: Program };

/* ---------- SPLIT WORD ---------- */
function SplitWords({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) {
    return (
        <span className={className} aria-label={text}>
            {text.split(' ').map((w, i) => (
                <span key={i} className="inline-block overflow-hidden align-bottom">
                    <span
                        className="inline-block will-change-transform"
                        style={{ animation: `wordUp .9s cubic-bezier(.22,.61,.36,1) ${delay + i * 0.05}s both` }}
                    >
                        {w}&nbsp;
                    </span>
                </span>
            ))}
        </span>
    );
}

/* ---------- MODAL ---------- */
function ActivityDialog({ activity, programTitle, onClose }: {
    activity: ProgramActivity | null;
    programTitle: string;
    onClose: () => void;
}) {
    const closeRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!activity) return;
        closeRef.current?.focus();
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [activity, onClose]);

    if (!activity) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-end justify-center md:items-center"
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
        >
            {/* Backdrop */}
            <button
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
                aria-label="Tutup dialog"
            />

            {/* Panel */}
            <div
                className="relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl bg-white md:rounded-2xl"
                style={{ animation: 'dialogIn .4s cubic-bezier(.22,.61,.36,1) both' }}
            >
                {/* Drag handle (mobile) */}
                <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-gray-300 md:hidden" />

                {/* Header */}
                <div className="flex items-start justify-between gap-4 border-b border-gray-100 px-6 py-5 md:px-8 md:py-6">
                    <div>
                        <div className="mb-1 flex items-center gap-2 text-[11px] font-bold tracking-widest text-[#9c8e4d] uppercase">
                            <MapPinned size={12} />
                            {activity.city}
                        </div>
                        <h3 id="dialog-title" className="text-xl font-bold text-gray-900 md:text-2xl">
                            {programTitle}
                        </h3>
                    </div>
                    <button
                        ref={closeRef}
                        onClick={onClose}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-900"
                        aria-label="Tutup"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Image */}
                {activity.image_url && (
                    <div className="relative h-48 overflow-hidden md:h-64">
                        <img
                            src={activity.image_url}
                            alt={activity.city}
                            className="h-full w-full object-cover"
                        />
                    </div>
                )}

                {/* Content */}
                <div className="overflow-y-auto px-6 py-6 md:px-8 md:py-8">
                    <p className="whitespace-pre-wrap text-base leading-relaxed text-gray-700">
                        {activity.long_description}
                    </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between gap-4 border-t border-gray-100 px-6 py-4 md:px-8">
                    <p className="text-xs text-gray-500">Tekan <kbd className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[10px] text-gray-700">Esc</kbd> untuk menutup</p>
                    <button
                        onClick={onClose}
                        className="rounded-full bg-[#4b552a] px-5 py-2 text-sm font-bold text-white transition hover:bg-[#3a4220]"
                    >
                        Tutup
                    </button>
                </div>
            </div>

            <style>{`
                @keyframes dialogIn {
                    from { opacity: 0; transform: translateY(30px) scale(.98); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
            `}</style>
        </div>
    );
}

export default function Agriculture({ program }: Props) {
    const site = usePage().props.site ?? {};
    const [selected, setSelected] = useState<ProgramActivity | null>(null);
    const scrollY = useScrollY();
    const [statsRef, statsVis] = useReveal();
    const [activitiesRef, activitiesVis] = useReveal();

    const heroParallax = Math.min(scrollY * 0.2, 120);
    const heroFade = Math.max(1 - scrollY / 500, 0);

    const descriptionParagraphs = (program.hero_description ?? '')
        .split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);

    const activities = program.activities ?? [];
    const stats = program.stats ?? [];

    return (
        <div className="min-h-screen bg-[#fafaf7] font-sans text-gray-800 selection:bg-[#4b552a] selection:text-[#f7ffda]">
            <Head title={`${program.page_title ?? program.title} - Loka Berdaya Amerta`} />

            <style>{`
                @keyframes wordUp { from { transform: translateY(110%);} to { transform: translateY(0);} }
                @keyframes fadeUp { from {opacity:0;transform:translateY(20px);} to {opacity:1;transform:translateY(0);} }
                @keyframes drawLine { from { transform: scaleX(0);} to { transform: scaleX(1);} }
                @keyframes floaty { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
                .animate-floaty { animation: floaty 6s ease-in-out infinite; }
            `}</style>

            <Navbar />

            {/* ============ HERO ============ */}
            <section className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28">
                <div className="container mx-auto px-6 md:px-12">
                    {/* Breadcrumb */}
                    <nav className="mb-8 flex items-center gap-2 text-xs text-gray-500" style={{ animation: 'fadeUp .6s ease both' }}>
                        <Link href="/" className="hover:text-[#4b552a]">Beranda</Link>
                        <span className="text-gray-300">/</span>
                        <Link href="/program" className="hover:text-[#4b552a]">Program</Link>
                        <span className="text-gray-300">/</span>
                        <span className="font-medium text-gray-900">{program.title}</span>
                    </nav>

                    <div className="grid grid-cols-1 items-end gap-10 md:grid-cols-12 md:gap-14">
                        {/* Text column */}
                        <div className="md:col-span-5">
                            <div className="mb-4 flex items-center gap-3 text-[11px] font-bold tracking-[0.3em] text-[#9c8e4d] uppercase">
                                <span
                                    className="h-px w-8 origin-left bg-[#9c8e4d]"
                                    style={{ animation: 'drawLine 1s .1s cubic-bezier(.22,.61,.36,1) both' }}
                                />
                                Program
                            </div>

                            <h1 className="mb-6 text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] font-bold tracking-tight text-[#4b552a]">
                                <SplitWords text={program.page_title ?? program.title} />
                            </h1>

                            {/* Short desc from first paragraph */}
                            {descriptionParagraphs[0] && (
                                <p
                                    className="mb-8 max-w-lg text-base leading-relaxed text-gray-600"
                                    style={{ animation: 'fadeUp 1s .4s both' }}
                                >
                                    {descriptionParagraphs[0]}
                                </p>
                            )}

                            <div className="flex flex-wrap items-center gap-3" style={{ animation: 'fadeUp 1s .6s both' }}>
                                <a
                                    href="#kegiatan"
                                    className="group inline-flex items-center gap-2 rounded-full bg-[#4b552a] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#3a4220]"
                                >
                                    Lihat Kegiatan
                                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                                </a>
                                <Link
                                    href="/kontak"
                                    className="group inline-flex items-center gap-2 text-sm font-semibold text-[#4b552a]"
                                >
                                    <span className="border-b border-[#4b552a]/30 pb-0.5 transition group-hover:border-[#4b552a]">
                                        Dukung program ini
                                    </span>
                                    <ArrowUpRight size={14} className="transition-transform group-hover:rotate-45" />
                                </Link>
                            </div>
                        </div>

                        {/* Image column */}
                        <div className="relative md:col-span-7">
                            <div
                                className="relative overflow-hidden rounded-[1.5rem]"
                                style={{ transform: `translateY(${heroParallax * 0.2}px)` }}
                            >
                                <img
                                    src={program.hero_image_url ?? '/images/agriculture.webp'}
                                    alt={program.title}
                                    className="h-[340px] w-full object-cover md:h-[520px]"
                                    style={{
                                        animation: 'fadeUp 1.2s .2s cubic-bezier(.22,.61,.36,1) both',
                                    }}
                                />
                                {/* Gradient overlay bottom */}
                                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent" />
                                {/* Index badge */}
                                <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 backdrop-blur">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#4b552a]" />
                                    <span className="text-[10px] font-bold tracking-widest text-[#4b552a] uppercase">
                                        {activities.length} kegiatan aktif
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ STATS — inline row ============ */}
            {stats.length > 0 && (
                <section ref={statsRef} className="border-y border-gray-200/70 bg-white">
                    <div className="container mx-auto px-6 md:px-12">
                        <div className="grid grid-cols-2 divide-x divide-gray-100 md:grid-cols-4">
                            {stats.map((stat, i) => {
                                const Icon = statIcons[stat.icon as keyof typeof statIcons] ?? Users;
                                return (
                                    <div
                                        key={stat.id}
                                        className="flex flex-col gap-2 px-4 py-6 first:pl-0 md:px-8 md:py-8"
                                        style={{
                                            opacity: statsVis ? 1 : 0,
                                            transform: statsVis ? 'none' : 'translateY(16px)',
                                            transition: `opacity .6s ${i * 0.08}s ease, transform .6s ${i * 0.08}s ease`,
                                        }}
                                    >
                                        <div className="flex items-center gap-2 text-[#9c8e4d]">
                                            <Icon size={14} />
                                            <span className="text-[10px] font-bold tracking-widest uppercase">Stat</span>
                                        </div>
                                        <div className="text-2xl font-bold text-gray-900 tabular-nums md:text-3xl">
                                            {stat.value}
                                        </div>
                                        <div className="text-xs leading-tight text-gray-500">{stat.label}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* ============ DESKRIPSI PROGRAM ============ */}
            {descriptionParagraphs.length > 1 && (
                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-6 md:px-12">
                        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-14">
                            <div className="md:col-span-3">
                                <div className="sticky top-28">
                                    <div className="mb-2 text-[11px] font-bold tracking-[0.25em] text-[#9c8e4d] uppercase">
                                        Tentang
                                    </div>
                                    <h2 className="text-xl leading-tight font-bold text-gray-900">
                                        Mengapa program ini penting
                                    </h2>
                                </div>
                            </div>
                            <div className="md:col-span-9">
                                <div className="space-y-6 text-base leading-[1.8] text-gray-700 md:text-lg">
                                    {descriptionParagraphs.slice(1).map((p, i) => (
                                        <p key={i}>{p}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ============ KEGIATAN ============ */}
            {activities.length > 0 && (
                <section id="kegiatan" ref={activitiesRef} className="border-t border-gray-200/70 bg-white py-16 md:py-24">
                    <div className="container mx-auto px-6 md:px-12">
                        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
                            <div>
                                <div className="mb-2 text-[11px] font-bold tracking-[0.25em] text-[#9c8e4d] uppercase">
                                    Di Lapangan
                                </div>
                                <h2 className="text-3xl leading-tight font-bold text-gray-900 md:text-[2.5rem]">
                                    Kegiatan Kami
                                </h2>
                                <p className="mt-2 max-w-md text-sm text-gray-600">
                                    Program yang sudah berjalan di berbagai wilayah dengan dampak nyata.
                                </p>
                            </div>
                            <div className="text-right">
                                <div className="text-3xl font-bold text-[#4b552a] tabular-nums">
                                    {String(activities.length).padStart(2, '0')}
                                </div>
                                <div className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                                    Lokasi
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                            {activities.map((item, i) => {
                                const excerpt = (item.detail_items ?? []).slice(0, 2);
                                const more = Math.max((item.detail_items?.length ?? 0) - 2, 0);
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => setSelected(item)}
                                        className="group flex flex-col text-left"
                                        style={{
                                            opacity: activitiesVis ? 1 : 0,
                                            transform: activitiesVis ? 'none' : 'translateY(20px)',
                                            transition: `opacity .6s ${i * 0.08}s ease, transform .6s ${i * 0.08}s cubic-bezier(.22,.61,.36,1)`,
                                        }}
                                    >
                                        {/* Image */}
                                        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100">
                                            <img
                                                src={item.image_url ?? '/images/agriculture.webp'}
                                                alt={`Kegiatan di ${item.city}`}
                                                className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
                                            />
                                            {/* Location badge */}
                                            <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 backdrop-blur">
                                                <MapPin size={11} className="text-[#4b552a]" />
                                                <span className="text-[10px] font-bold tracking-widest text-[#4b552a] uppercase">
                                                    {item.city}
                                                </span>
                                            </div>
                                            {/* Hover arrow */}
                                            <div className="absolute right-3 bottom-3 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-white text-[#4b552a] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                                <ArrowUpRight size={15} />
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="mt-4 flex-1">
                                            <h3 className="mb-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-[#4b552a]">
                                                {item.city}
                                            </h3>
                                            <ul className="space-y-1.5">
                                                {excerpt.map((d, j) => (
                                                    <li key={j} className="flex gap-2 text-sm leading-relaxed text-gray-600">
                                                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#9c8e4d]" />
                                                        <span className="line-clamp-1">{d}</span>
                                                    </li>
                                                ))}
                                                {more > 0 && (
                                                    <li className="pl-3 text-xs font-medium text-[#9c8e4d]">
                                                        +{more} kegiatan lain
                                                    </li>
                                                )}
                                            </ul>
                                        </div>

                                        {/* Read more */}
                                        <div className="mt-3 flex items-center gap-1.5 text-xs font-bold tracking-wide text-[#4b552a] uppercase">
                                            <span className="relative">
                                                Selengkapnya
                                                <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-[#4b552a] transition-transform duration-300 group-hover:scale-x-100" />
                                            </span>
                                            <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* ============ CTA ============ */}
            <section className="bg-[#fafaf7] py-16 md:py-20">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="flex flex-col items-start justify-between gap-6 rounded-[1.75rem] bg-[#4b552a] px-8 py-10 text-white md:flex-row md:items-center md:px-12 md:py-12">
                        <div>
                            <h2 className="max-w-md text-2xl leading-tight font-bold md:text-3xl">
                                Dukung program ini
                            </h2>
                            <p className="mt-2 max-w-md text-sm text-[#f7ffda]/70">
                                Setiap kontribusi membantu memperluas dampak pemberdayaan.
                            </p>
                        </div>
                        <Link
                            href="/kontak"
                            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-[#f7ffda] px-6 py-3 text-sm font-bold text-[#4b552a] transition hover:bg-white"
                        >
                            Hubungi Kami
                            <ArrowUpRight size={16} className="transition-transform group-hover:rotate-45" />
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />

            {/* MODAL */}
            <ActivityDialog
                activity={selected}
                programTitle={program.title}
                onClose={() => setSelected(null)}
            />
        </div>
    );
}