import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useState, useEffect, useRef, useCallback } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import type { HeroSlide, Partner, Program, Testimonial } from '@/types/content';
import {
    Users, Leaf, Building2, MapPin, Phone, Mail, Send, User,
    ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Quote,
} from 'lucide-react';

type LandingStat = { value: string; label: string; icon: string };
type Props = {
    heroSlides: HeroSlide[];
    programs: Program[];
    testimonials: Testimonial[];
    partners: Partner[];
    landingStats: LandingStat[];
};

const statIcons = { users: Users, leaf: Leaf, building: Building2 } as const;

/* ---------- HOOKS ---------- */
function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.18) {
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

function useScrollProgress() {
    const [y, setY] = useState(0);
    useEffect(() => {
        const onScroll = () => setY(window.scrollY);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);
    return y;
}

/* ---------- MAGNETIC BUTTON ---------- */
function Magnetic({ children, strength = 18 }: { children: React.ReactNode; strength?: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const [t, setT] = useState({ x: 0, y: 0 });
    return (
        <div
            ref={ref}
            onMouseMove={(e) => {
                const r = ref.current!.getBoundingClientRect();
                setT({
                    x: ((e.clientX - r.left - r.width / 2) / r.width) * strength,
                    y: ((e.clientY - r.top - r.height / 2) / r.height) * strength,
                });
            }}
            onMouseLeave={() => setT({ x: 0, y: 0 })}
            style={{ transform: `translate(${t.x}px, ${t.y}px)`, transition: 'transform .25s cubic-bezier(.22,.61,.36,1)' }}
        >
            {children}
        </div>
    );
}

/* ---------- SPLIT TEXT ---------- */
function SplitText({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) {
    return (
        <span className={className} aria-label={text}>
            {text.split(' ').map((w, i) => (
                <span key={i} className="inline-block overflow-hidden align-bottom">
                    <span
                        className="inline-block will-change-transform"
                        style={{
                            animation: `wordUp .9s cubic-bezier(.22,.61,.36,1) ${delay + i * 0.06}s both`,
                        }}
                    >
                        {w}&nbsp;
                    </span>
                </span>
            ))}
        </span>
    );
}

/* ---------- COUNTER with ring ---------- */
function RingCounter({ end, label, Icon }: { end: number; label: string; Icon: any }) {
    const [val, setVal] = useState(0);
    const [ref, visible] = useReveal<HTMLDivElement>(0.4);
    useEffect(() => {
        if (!visible) return;
        let start: number | null = null;
        const dur = 1600;
        const step = (ts: number) => {
            if (!start) start = ts;
            const p = Math.min((ts - start) / dur, 1);
            setVal(Math.floor((1 - Math.pow(1 - p, 3)) * end));
            if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [visible, end]);
    const pct = visible ? Math.min((val / Math.max(end, 1)) * 100, 100) : 0;
    return (
        <div ref={ref} className="group flex items-center gap-4">
            <div className="relative h-14 w-14 shrink-0">
                <svg viewBox="0 0 40 40" className="h-full w-full -rotate-90">
                    <circle cx="20" cy="20" r="17" fill="none" stroke="#e8ecd8" strokeWidth="3" />
                    <circle
                        cx="20" cy="20" r="17" fill="none" stroke="#4b552a" strokeWidth="3"
                        strokeLinecap="round" strokeDasharray={2 * Math.PI * 17}
                        strokeDashoffset={2 * Math.PI * 17 * (1 - pct / 100)}
                        style={{ transition: 'stroke-dashoffset .1s linear' }}
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-[#4b552a]">
                    <Icon size={18} />
                </div>
            </div>
            <div>
                <div className="text-2xl font-bold tabular-nums text-gray-900">{val}+</div>
                <div className="text-xs font-medium text-gray-500">{label}</div>
            </div>
        </div>
    );
}

/* ---------- MAIN ---------- */
export default function Landing({ heroSlides, programs, testimonials, partners, landingStats }: Props) {
    const site = usePage().props.site ?? {};
    const scrollY = useScrollProgress();

    const heroImages = heroSlides.map((s) => s.image_url).filter((x): x is string => Boolean(x));
    const images = heroImages.length ? heroImages : [
        '/images/landing-umkm.webp', '/images/landing-peternakan.webp',
        '/images/agriculture.webp', '/images/agroforestry.webp',
    ];
    const [idx, setIdx] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setIdx((p) => (p + 1) % images.length), 6000);
        return () => clearInterval(t);
    }, [images.length]);

    const contactForm = useForm({ name: '', email: '', phone: '', subject: '', message: '' });
    const [sent, setSent] = useState(false);

    const [aboutRef, aboutVis] = useReveal();
    const [visiRef, visiVis] = useReveal();
    const [progRef, progVis] = useReveal();
    const [testiRef, testiVis] = useReveal();

    /* Program carousel */
    const trackRef = useRef<HTMLDivElement>(null);
    const [canLeft, setCanLeft] = useState(false);
    const [canRight, setCanRight] = useState(true);
    const [prog, setProg] = useState(0);
    const updateTrack = useCallback(() => {
        const el = trackRef.current;
        if (!el) return;
        setCanLeft(el.scrollLeft > 8);
        setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
        setProg(el.scrollLeft / Math.max(el.scrollWidth - el.clientWidth, 1));
    }, []);
    const scrollTrack = (dir: number) => {
        const el = trackRef.current!;
        el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: 'smooth' });
    };

    /* Testimonial rotate */
    const [tIdx, setTIdx] = useState(0);
    useEffect(() => {
        if (!testiVis || testimonials.length <= 1) return;
        const t = setInterval(() => setTIdx((p) => (p + 1) % testimonials.length), 7000);
        return () => clearInterval(t);
    }, [testiVis, testimonials.length]);
    const activeTesti = testimonials[tIdx];

    /* Hero parallax */
    const heroOffset = Math.min(scrollY * 0.35, 260);
    const heroFade = Math.max(1 - scrollY / 600, 0);

    return (
        <div className="min-h-screen bg-[#fafaf7] font-sans text-gray-800 selection:bg-[#4b552a] selection:text-[#f7ffda]">
            <Head title="Loka Berdaya Amerta" />

            <style>{`
                @keyframes wordUp { from { transform: translateY(110%); } to { transform: translateY(0); } }
                @keyframes drawLine { from { transform: scaleX(0); } to { transform: scaleX(1); } }
                @keyframes fadeUp { from { opacity:0; transform: translateY(30px);} to {opacity:1;transform:translateY(0);} }
                @keyframes floaty { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
                @keyframes marquee { from { transform: translateX(0);} to { transform: translateX(-50%);} }
                .animate-floaty { animation: floaty 5s ease-in-out infinite; }
                .marquee-track { animation: marquee 30s linear infinite; }
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { scrollbar-width: none; }
                .tilt-card { transition: transform .4s cubic-bezier(.22,.61,.36,1), box-shadow .4s; }
                .tilt-card:hover { transform: translateY(-6px) rotate(-0.4deg); }
            `}</style>

            <Navbar />

            {/* ============ HERO ============ */}
            <section className="relative h-[100svh] w-full overflow-hidden">
                <div
                    className="absolute inset-0 will-change-transform"
                    style={{ transform: `translate3d(0,${heroOffset}px,0) scale(1.05)`, opacity: heroFade }}
                >
                    {images.map((img, i) => (
                        <img
                            key={i}
                            src={img}
                            alt=""
                            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-out ${
                                i === idx ? 'opacity-100' : 'opacity-0'
                            }`}
                            style={{ transform: i === idx ? 'scale(1.06)' : 'scale(1)', transition: 'opacity 1.4s ease, transform 7s ease-out' }}
                        />
                    ))}
                </div>

                <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/70" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(75,85,42,0.35),transparent_60%)]" />

                <div className="relative z-10 container mx-auto flex h-full flex-col justify-end px-6 pb-20 md:px-12 md:pb-28">
                    <div className="mb-6 flex items-center gap-3 text-[11px] font-semibold tracking-[0.3em] text-[#f7ffda]/80 uppercase" style={{ animation: 'fadeUp .8s ease both' }}>
                        <span className="h-px w-10 origin-left bg-[#f7ffda]" style={{ animation: 'drawLine 1s .2s cubic-bezier(.22,.61,.36,1) both' }} />
                        Pemberdayaan Berkelanjutan
                    </div>

                    <h1 className="max-w-4xl text-[clamp(2rem,5.5vw,4.5rem)] leading-[1.02] font-bold text-white">
                        <SplitText text={site.hero_title ?? 'Tumbuhkan Kesejahteraan'} className="block" />
                        <SplitText
                            text={site.hero_title_accent ?? 'dengan Pemberdayaan'}
                            className="block italic text-[#f7ffda]"
                            delay={0.3}
                        />
                    </h1>

                    <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/80 md:text-base" style={{ animation: 'fadeUp 1s .7s both' }}>
                        {site.hero_subtitle ?? site.site_tagline ?? ''}
                    </p>

                    <div className="mt-10 flex flex-wrap items-center gap-4" style={{ animation: 'fadeUp 1s .9s both' }}>
                        <Magnetic>
                            <Link
                                href="/program"
                                className="group inline-flex items-center gap-3 rounded-full bg-[#f7ffda] px-7 py-3.5 text-sm font-bold text-[#4b552a] transition-colors hover:bg-white"
                            >
                                Jelajahi Program
                                <ArrowUpRight size={18} className="transition-transform group-hover:rotate-45" />
                            </Link>
                        </Magnetic>
                        <Link href="/tentang" className="group inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white">
                            <span className="border-b border-white/40 pb-0.5 transition group-hover:border-white">Tentang Kami</span>
                            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>

                    {/* Slide dots + counter */}
                    <div className="mt-14 flex items-end justify-between">
                        <div className="flex items-center gap-2">
                            {images.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setIdx(i)}
                                    aria-label={`Slide ${i + 1}`}
                                    className="group relative h-1 overflow-hidden rounded-full bg-white/25 transition-all"
                                    style={{ width: i === idx ? 56 : 24 }}
                                >
                                    {i === idx && (
                                        <span
                                            key={idx}
                                            className="absolute inset-y-0 left-0 bg-[#f7ffda]"
                                            style={{ animation: 'drawLine 6s linear both', width: '100%', transformOrigin: 'left' }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                        <div className="hidden items-center gap-2 text-xs font-mono text-white/50 md:flex">
                            <span className="text-white">0{idx + 1}</span>
                            <span>/</span>
                            <span>0{images.length}</span>
                        </div>
                    </div>
                </div>

                {/* scroll cue */}
                <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 md:block">
                    <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/30 p-1">
                        <span className="h-1.5 w-1 animate-floaty rounded-full bg-white/70" />
                    </div>
                </div>
            </section>

            {/* ============ MARQUEE TAGLINE ============ */}
            <div className="overflow-hidden border-y border-gray-200 bg-[#f7ffda] py-4">
                <div className="marquee-track flex w-max gap-8 whitespace-nowrap text-sm font-semibold tracking-wider text-[#4b552a]/70 uppercase">
                    {Array.from({ length: 2 }).map((_, r) => (
                        <div key={r} className="flex gap-8">
                            {['Pemberdayaan Ekonomi', 'Pertanian Berkelanjutan', 'Peternakan Rakyat', 'UMKM Naik Kelas', 'Kolaborasi Komunitas'].map((t) => (
                                <span key={t} className="flex items-center gap-8">
                                    {t} <Leaf size={14} className="opacity-50" />
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* ============ STATS ============ */}
            <section className="container mx-auto px-6 py-16 md:px-12 md:py-20">
                <div className="grid grid-cols-1 gap-8 border-b border-gray-200 pb-14 sm:grid-cols-3 md:gap-16">
                    {landingStats.map((stat, i) => {
                        const Icon = statIcons[stat.icon as keyof typeof statIcons] ?? Users;
                        const n = Number.parseInt(stat.value.replace(/\D/g, ''), 10) || 0;
                        return <RingCounter key={`${stat.label}-${i}`} end={n} label={stat.label} Icon={Icon} />;
                    })}
                </div>
            </section>

            {/* ============ TENTANG ============ */}
            <section className="container mx-auto px-6 py-16 md:px-12 md:py-24">
                <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-12">
                    <div ref={aboutRef} className="relative md:col-span-5">
                        <div className="overflow-hidden rounded-[1.75rem]">
                            <img
                                src={site.about_image ?? '/images/halamantentang.webp'}
                                alt="Tentang"
                                className="h-[420px] w-full object-cover md:h-[540px]"
                                style={{
                                    transform: aboutVis ? 'scale(1)' : 'scale(1.12)',
                                    transition: 'transform 1.4s cubic-bezier(.22,.61,.36,1)',
                                }}
                            />
                        </div>
                        <div className="animate-floaty absolute -bottom-6 -right-4 flex items-center gap-4 rounded-2xl bg-[#4b552a] px-6 py-5 text-white shadow-xl md:-right-8">
                            <div className="text-3xl font-bold tabular-nums">{site.about_years ?? '30'}</div>
                            <div className="max-w-[80px] text-[11px] leading-tight font-medium text-[#f7ffda]/80">
                                {(site.about_years_label ?? 'Tahun Berkarya').toUpperCase()}
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-7 md:pl-10">
                        <span className="mb-4 flex items-center gap-2 text-[11px] font-bold tracking-[0.25em] text-[#9c8e4d] uppercase">
                            <span className="h-px w-6 bg-[#9c8e4d]" /> {site.about_eyebrow ?? 'Tentang Kami'}
                        </span>
                        <h2 className="mb-6 text-3xl leading-[1.1] font-bold text-gray-900 md:text-[2.75rem]">
                            {site.about_title ?? 'Sekilas Tentang Loka Berdaya Amerta'}
                        </h2>
                        <p className="max-w-xl text-base leading-relaxed text-gray-600">
                            {site.about_text ?? ''}
                        </p>
                        <Link
                            href="/tentang"
                            className="group mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#4b552a]"
                        >
                            <span className="relative">
                                Pelajari Lebih Lanjut
                                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[#4b552a] transition-transform duration-300 group-hover:scale-x-100" />
                            </span>
                            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ============ VISI MISI ============ */}
            <section ref={visiRef} className="container mx-auto px-6 pb-16 md:px-12 md:pb-24">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div
                        className="relative overflow-hidden rounded-[1.75rem] bg-[#4b552a] p-9 text-white md:p-12"
                        style={{ opacity: visiVis ? 1 : 0, transform: visiVis ? 'none' : 'translateY(30px)', transition: 'all .9s cubic-bezier(.22,.61,.36,1)' }}
                    >
                        <span className="pointer-events-none absolute -top-10 -right-4 font-serif text-[180px] leading-none text-white/[0.04] select-none">V</span>
                        <h3 className="mb-6 flex items-center gap-3 text-xl font-bold">Visi</h3>
                        <p className="relative max-w-md text-base leading-relaxed text-[#f7ffda]/90">
                            {site.vision ?? ''}
                        </p>
                    </div>
                    <div
                        className="relative overflow-hidden rounded-[1.75rem] border border-[#dce5c0] bg-[#eff5da] p-9 md:p-12"
                        style={{ opacity: visiVis ? 1 : 0, transform: visiVis ? 'none' : 'translateY(30px)', transition: 'all .9s .15s cubic-bezier(.22,.61,.36,1)' }}
                    >
                        <span className="pointer-events-none absolute -top-10 -right-4 font-serif text-[180px] leading-none text-[#4b552a]/[0.05] select-none">M</span>
                        <h3 className="mb-6 flex items-center gap-3 text-xl font-bold text-[#4b552a]">Misi</h3>
                        <ul className="relative space-y-3">
                            {(site.mission ?? '').split('\n').filter((x: string) => x.trim()).map((m: string, i: number) => (
                                <li key={i} className="flex gap-3 text-sm leading-relaxed text-gray-700 md:text-base">
                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#4b552a]" />
                                    {m}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* ============ PROGRAM CAROUSEL ============ */}
            <section ref={progRef} className="py-16 md:py-24">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
                        <div>
                            <span className="mb-2 block text-[11px] font-bold tracking-[0.25em] text-[#9c8e4d] uppercase">Apa Yang Kami Lakukan</span>
                            <h2 className="max-w-xl text-3xl leading-tight font-bold text-gray-900 md:text-[2.75rem]">
                                Program Pemberdayaan
                            </h2>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => scrollTrack(-1)}
                                disabled={!canLeft}
                                aria-label="Sebelumnya"
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 text-gray-700 transition hover:border-[#4b552a] hover:bg-[#4b552a] hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-700"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <button
                                onClick={() => scrollTrack(1)}
                                disabled={!canRight}
                                aria-label="Berikutnya"
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 text-gray-700 transition hover:border-[#4b552a] hover:bg-[#4b552a] hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-700"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>

                    <div
                        ref={trackRef}
                        onScroll={updateTrack}
                        className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 md:mx-0 md:px-0"
                    >
                        {programs.map((program, i) => (
                            <Link
                                key={program.id}
                                href={`/program/${program.slug}`}
                                className="tilt-card group w-[85%] shrink-0 snap-start overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 sm:w-[380px]"
                            >
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={program.hero_image_url ?? '/images/agriculture.webp'}
                                        alt={program.title}
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold tracking-wider text-[#4b552a] uppercase backdrop-blur">
                                        Program {String(i + 1).padStart(2, '0')}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="mb-2 text-lg font-bold text-gray-900">{program.title}</h3>
                                    <p className="line-clamp-2 text-sm leading-relaxed text-gray-600">
                                        {program.short_description ?? ''}
                                    </p>
                                    <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold tracking-wide text-[#4b552a] uppercase">
                                        Selengkapnya
                                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* progress bar */}
                    <div className="mt-4 h-px w-full overflow-hidden bg-gray-200">
                        <div className="h-full bg-[#4b552a] transition-[width] duration-200" style={{ width: `${Math.max(prog * 100, 12)}%` }} />
                    </div>
                </div>
            </section>

            {/* ============ MAP ============ */}
            <section className="container mx-auto px-6 py-16 md:px-12 md:py-20">
                <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                    <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">Temukan Kami</h2>
                    <p className="max-w-sm text-sm text-gray-500">
                        {site.address ?? 'Sidoarjo, Jawa Timur'}
                    </p>
                </div>
                <div className="h-[320px] w-full overflow-hidden rounded-2xl bg-gray-100 md:h-[420px]">
                    <iframe
                        src={site.maps_embed_url ?? 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.307548570149!2d112.67889967357418!3d-7.431179073205722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7e132a4632891%3A0x4058849ad5fd97eb!2sYatim%20Mandiri%20Sidoarjo!5e0!3m2!1sid!2sid!4v1793240614969!5m2!1sid!2sid'}
                        width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </section>

            {/* ============ TESTIMONI ROTATOR ============ */}
            <section ref={testiRef} className="border-y border-gray-200 bg-[#f7ffda]/40 py-16 md:py-24">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
                        <div className="md:col-span-4">
                            <span className="mb-3 inline-block rounded-full bg-[#9c8e4d]/10 px-3 py-1 text-[11px] font-bold tracking-[0.2em] text-[#9c8e4d] uppercase">
                                Testimoni
                            </span>
                            <h2 className="text-3xl leading-tight font-bold text-gray-900 md:text-[2.5rem]">
                                Kata Mereka
                            </h2>
                            <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-600">
                                Cerita nyata dari penerima manfaat program pemberdayaan.
                            </p>

                            <div className="mt-8 flex items-center gap-2">
                                {testimonials.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setTIdx(i)}
                                        className="h-1.5 rounded-full transition-all"
                                        style={{
                                            width: i === tIdx ? 32 : 12,
                                            background: i === tIdx ? '#4b552a' : '#d1d5db',
                                        }}
                                        aria-label={`Testimoni ${i + 1}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {activeTesti && (
                            <div className="md:col-span-8">
                                <div className="relative rounded-[1.75rem] bg-white p-8 shadow-sm ring-1 ring-gray-100 md:p-12">
                                    <Quote size={40} className="mb-4 text-[#4b552a]/20" />
                                    <blockquote key={activeTesti.id} className="text-xl leading-relaxed font-medium text-gray-800 md:text-2xl" style={{ animation: 'fadeUp .6s ease both' }}>
                                        {activeTesti.quote}
                                    </blockquote>
                                    <div className="mt-8 flex items-center gap-4 border-t border-gray-100 pt-6">
                                        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-[#eff5da] text-[#4b552a]">
                                            {activeTesti.photo_url ? (
                                                <img src={activeTesti.photo_url} alt={activeTesti.name} className="h-full w-full object-cover" />
                                            ) : <User size={22} />}
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-900">{activeTesti.name}</div>
                                            <div className="text-xs text-gray-500">{activeTesti.role ?? ''}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* ============ MITRA ============ */}
            <section className="container mx-auto px-6 py-14 md:px-12">
                <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
                    <p className="text-[11px] font-bold tracking-[0.25em] text-gray-400 uppercase">Berkolaborasi dengan</p>
                    <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
                        {partners.map((p) => (
                            <a
                                key={p.id}
                                href={p.url ?? undefined}
                                target={p.url ? '_blank' : undefined}
                                rel={p.url ? 'noopener noreferrer' : undefined}
                                className="group flex h-12 items-center opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                            >
                                {p.logo_url ? (
                                    <img src={p.logo_url} alt={p.name} className="max-h-full max-w-[120px] object-contain" />
                                ) : (
                                    <span className="text-sm font-bold text-[#4b552a]">{p.name}</span>
                                )}
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============ KONTAK ============ */}
            <section className="container mx-auto px-6 pb-20 md:px-12 md:pb-28">
                <div className="overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-gray-100 md:grid md:grid-cols-5">
                    {/* LEFT — info */}
                    <div className="bg-[#4b552a] p-8 text-white md:col-span-2 md:p-12">
                        <h2 className="text-2xl font-bold md:text-3xl">Mari Berkolaborasi</h2>
                        <p className="mt-2 text-sm text-[#f7ffda]/70">
                            Punya pertanyaan atau ingin bermitra? Hubungi kami.
                        </p>

                        <div className="mt-10 space-y-6">
                            {[
                                { Icon: Phone, label: 'Telepon / WhatsApp', value: site.phone ?? '081 330003450' },
                                { Icon: Mail, label: 'Email', value: site.email ?? 'info@lokaberdaya.com' },
                                { Icon: MapPin, label: 'Alamat Kantor', value: site.address ?? 'Sidoarjo, Jawa Timur' },
                            ].map(({ Icon, label, value }) => (
                                <div key={label} className="flex gap-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                                        <Icon size={18} />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-bold tracking-widest text-[#f7ffda]/60 uppercase">{label}</div>
                                        <div className="mt-0.5 text-sm leading-relaxed">{value}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT — form */}
                    <div className="p-8 md:col-span-3 md:p-12">
                        <h3 className="text-xl font-bold text-gray-900">Kirim Pesan</h3>
                        <p className="mt-1 mb-8 text-sm text-gray-500">Kami akan merespons dalam 1×24 jam kerja.</p>

                        <form
                            className="space-y-6"
                            onSubmit={(e) => {
                                e.preventDefault();
                                contactForm.post('/kontak', {
                                    preserveScroll: true,
                                    onSuccess: () => {
                                        contactForm.reset();
                                        setSent(true);
                                        setTimeout(() => setSent(false), 4000);
                                    },
                                });
                            }}
                        >
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                {[
                                    { name: 'name', label: 'Nama', type: 'text', required: true },
                                    { name: 'email', label: 'Email', type: 'email', required: true },
                                ].map(({ name, label, type, required }) => (
                                    <label key={name} className="group relative block">
                                        <input
                                            type={type}
                                            name={name}
                                            value={(contactForm.data as any)[name]}
                                            onChange={(e) => contactForm.setData(name as any, e.target.value)}
                                            placeholder=" "
                                            required={required}
                                            className="peer w-full border-b border-gray-300 bg-transparent pt-5 pb-2 text-sm text-gray-900 outline-none transition focus:border-[#4b552a]"
                                        />
                                        <span className="pointer-events-none absolute top-5 left-0 text-sm text-gray-400 transition-all peer-focus:top-0 peer-focus:text-[10px] peer-focus:font-bold peer-focus:tracking-widest peer-focus:text-[#4b552a] peer-focus:uppercase peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:font-bold peer-[:not(:placeholder-shown)]:tracking-widest peer-[:not(:placeholder-shown)]:uppercase">
                                            {label}{required && ' *'}
                                        </span>
                                    </label>
                                ))}
                            </div>
                            <label className="group relative block">
                                <input
                                    type="tel"
                                    name="phone"
                                    value={contactForm.data.phone}
                                    onChange={(e) => contactForm.setData('phone', e.target.value)}
                                    placeholder=" "
                                    className="peer w-full border-b border-gray-300 bg-transparent pt-5 pb-2 text-sm outline-none transition focus:border-[#4b552a]"
                                />
                                <span className="pointer-events-none absolute top-5 left-0 text-sm text-gray-400 transition-all peer-focus:top-0 peer-focus:text-[10px] peer-focus:font-bold peer-focus:tracking-widest peer-focus:text-[#4b552a] peer-focus:uppercase peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:font-bold peer-[:not(:placeholder-shown)]:tracking-widest peer-[:not(:placeholder-shown)]:uppercase">
                                    No. Telepon
                                </span>
                            </label>
                            <label className="group relative block">
                                <textarea
                                    name="message"
                                    rows={3}
                                    value={contactForm.data.message}
                                    onChange={(e) => contactForm.setData('message', e.target.value)}
                                    placeholder=" "
                                    required
                                    className="peer w-full resize-none border-b border-gray-300 bg-transparent pt-5 pb-2 text-sm outline-none transition focus:border-[#4b552a]"
                                />
                                <span className="pointer-events-none absolute top-5 left-0 text-sm text-gray-400 transition-all peer-focus:top-0 peer-focus:text-[10px] peer-focus:font-bold peer-focus:tracking-widest peer-focus:text-[#4b552a] peer-focus:uppercase peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:font-bold peer-[:not(:placeholder-shown)]:tracking-widest peer-[:not(:placeholder-shown)]:uppercase">
                                    Pesan *
                                </span>
                            </label>

                            <div className="flex items-center justify-between gap-4 pt-2">
                                <Magnetic strength={10}>
                                    <button
                                        type="submit"
                                        disabled={contactForm.processing}
                                        className="group inline-flex items-center gap-2 rounded-full bg-[#4b552a] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#3a4220] disabled:opacity-60"
                                    >
                                        {contactForm.processing ? 'Mengirim…' : 'Kirim Pesan'}
                                        <Send size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                    </button>
                                </Magnetic>
                                {sent && (
                                    <span className="text-xs font-semibold text-[#4b552a]" style={{ animation: 'fadeUp .4s ease both' }}>
                                        ✓ Pesan terkirim
                                    </span>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}