import { useState, useEffect, useRef, useMemo } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import type { Post, PostCategory } from '@/types/content';
import { Calendar, ArrowUpRight, Search, X, Inbox } from 'lucide-react';

/* ---------- HOOKS ---------- */
function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.1) {
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

function formatDate(value: string | null, variant: 'short' | 'long' = 'long'): string {
    if (!value) return '';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return d.toLocaleDateString('id-ID', variant === 'short'
        ? { day: '2-digit', month: 'short', year: 'numeric' }
        : { day: 'numeric', month: 'long', year: 'numeric' });
}

function readingTime(text: string | null | undefined): string {
    if (!text) return '1 menit';
    const words = text.trim().split(/\s+/).length;
    const mins = Math.max(1, Math.round(words / 200));
    return `${mins} menit baca`;
}

type Props = { posts: Post[]; categories: PostCategory[] };

export default function Blog({ posts, categories }: Props) {
    const site = usePage().props.site ?? {};
    const [activeCategory, setActiveCategory] = useState<number | 'all'>('all');
    const [query, setQuery] = useState('');
    const [searchOpen, setSearchOpen] = useState(false);
    const searchRef = useRef<HTMLInputElement>(null);
    const ITEMS_PER_PAGE = 6;
    const [page, setPage] = useState(1);

    /* Filtered list */
    const filtered = useMemo(() => {
        let r = posts;
        if (activeCategory !== 'all') r = r.filter((p) => p.post_category_id === activeCategory);
        if (query.trim()) {
            const q = query.toLowerCase();
            r = r.filter((p) =>
                p.title.toLowerCase().includes(q) ||
                (p.excerpt ?? '').toLowerCase().includes(q),
            );
        }
        return r;
    }, [posts, activeCategory, query]);

    useEffect(() => { setPage(1); }, [activeCategory, query]);

    /* Featured = newest post in filtered set */
    const featured = filtered[0];
    const rest = filtered.slice(1);
    const totalPages = Math.ceil(rest.length / ITEMS_PER_PAGE);
    const paginated = rest.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    /* Focus search input when opened */
    useEffect(() => {
        if (searchOpen) setTimeout(() => searchRef.current?.focus(), 50);
    }, [searchOpen]);

    /* Filter pill indicator position */
    const pillsRef = useRef<HTMLDivElement>(null);
    const [indicator, setIndicator] = useState({ left: 0, width: 0 });
    const activeBtnRef = useRef<HTMLButtonElement | null>(null);
    useEffect(() => {
        const btn = activeBtnRef.current;
        const wrap = pillsRef.current;
        if (!btn || !wrap) return;
        const r = btn.getBoundingClientRect();
        const wr = wrap.getBoundingClientRect();
        setIndicator({ left: r.left - wr.left, width: r.width });
    }, [activeCategory, categories]);

    const categoryFilters = [
        { id: 'all' as const, name: 'Semua' },
        ...categories.map((c) => ({ id: c.id, name: c.name })),
    ];

    const [gridRef, gridVis] = useReveal();

    return (
        <div className="min-h-screen bg-[#fafaf7] font-sans text-gray-800 selection:bg-[#4b552a] selection:text-[#f7ffda]">
            <Head title="Blog & Publikasi - Loka Berdaya Amerta" />

            <style>{`
                @keyframes fadeUp { from { opacity:0; transform: translateY(20px);} to {opacity:1;transform:translateY(0);} }
                @keyframes cardIn { from { opacity:0; transform: translateY(24px) scale(.98);} to {opacity:1;transform:translateY(0) scale(1);} }
                .card-in { animation: cardIn .6s cubic-bezier(.22,.61,.36,1) both; }
                .line-clamp-2 { display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
                .line-clamp-3 { display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; }
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { scrollbar-width: none; }
            `}</style>

            <Navbar />

            {/* ============ HEADER ============ */}
            <section className="relative pt-28 pb-12 md:pt-36 md:pb-16">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
                        <div>
                            <div className="mb-4 flex items-center gap-3 text-[11px] font-bold tracking-[0.3em] text-[#9c8e4d] uppercase">
                                <span className="h-px w-8 bg-[#9c8e4d]" />
                                Kabar & Publikasi
                            </div>
                            <h1 className="text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] font-bold tracking-tight text-[#4b552a]">
                                Cerita dari
                                <br />
                                <span className="italic text-[#9c8e4d]">lapangan</span>
                            </h1>
                            <p className="mt-5 max-w-lg text-base text-gray-600">
                                Ikuti perkembangan terbaru, kisah inspiratif, dan kabar dari
                                program pemberdayaan kami.
                            </p>
                        </div>

                        {/* Search */}
                        <div className="relative w-full md:w-72">
                            <div
                                className={`flex items-center gap-2 border-b-2 transition-all duration-500 ${
                                    searchOpen ? 'border-[#4b552a]' : 'border-gray-300'
                                }`}
                            >
                                <Search size={18} className="text-gray-400" />
                                <input
                                    ref={searchRef}
                                    type="text"
                                    value={query}
                                    onFocus={() => setSearchOpen(true)}
                                    onBlur={() => { if (!query) setSearchOpen(false); }}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Cari artikel…"
                                    className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-gray-400"
                                />
                                {query && (
                                    <button
                                        onClick={() => { setQuery(''); setSearchOpen(false); }}
                                        className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                                        aria-label="Hapus pencarian"
                                    >
                                        <X size={14} />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ FILTER PILLS ============ */}
            <section className="sticky top-16 z-30 border-y border-gray-200/70 bg-[#fafaf7]/90 backdrop-blur-md">
                <div className="container mx-auto px-6 md:px-12">
                    <div
                        ref={pillsRef}
                        className="no-scrollbar relative flex gap-1 overflow-x-auto py-4"
                    >
                        {/* Animated underline */}
                        <span
                            className="pointer-events-none absolute bottom-3 h-0.5 rounded-full bg-[#4b552a] transition-all duration-400"
                            style={{
                                left: indicator.left,
                                width: indicator.width,
                                transitionTimingFunction: 'cubic-bezier(.22,.61,.36,1)',
                            }}
                        />
                        {categoryFilters.map((cat) => (
                            <button
                                key={cat.id}
                                ref={activeCategory === cat.id ? activeBtnRef : null}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors ${
                                    activeCategory === cat.id
                                        ? 'text-[#4b552a]'
                                        : 'text-gray-500 hover:text-gray-900'
                                }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============ CONTENT ============ */}
            <section ref={gridRef} className="container mx-auto px-6 py-12 md:px-12 md:py-16">
                {filtered.length === 0 ? (
                    <EmptyState query={query} />
                ) : (
                    <>
                        {/* ---- FEATURED POST ---- */}
                        {featured && (
                            <Link
                                href={featured.external_link ?? `/blog/${featured.slug ?? featured.id}`}
                                target={featured.external_link ? '_blank' : undefined}
                                rel={featured.external_link ? 'noopener noreferrer' : undefined}
                                className="group mb-16 grid grid-cols-1 overflow-hidden rounded-[1.75rem] bg-white shadow-sm ring-1 ring-gray-100 md:grid-cols-12"
                                style={{ animation: 'fadeUp .8s ease both' }}
                            >
                                <div className="relative md:col-span-7 md:order-2">
                                    <div className="aspect-[16/10] h-full overflow-hidden md:aspect-auto md:h-[440px]">
                                        <img
                                            src={featured.image_url ?? '/images/placeholder.webp'}
                                            alt={featured.title}
                                            className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                                        />
                                    </div>
                                    {featured.category && (
                                        <div className="absolute top-5 left-5 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold tracking-widest text-[#4b552a] uppercase backdrop-blur">
                                            {featured.category.name}
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col justify-between p-8 md:col-span-5 md:order-1 md:p-12">
                                    <div>
                                        <div className="mb-4 flex items-center gap-3 text-[11px] font-bold tracking-widest text-[#9c8e4d] uppercase">
                                            <span className="h-px w-6 bg-[#9c8e4d]" />
                                            Artikel Utama
                                        </div>
                                        <h2 className="mb-4 text-2xl leading-tight font-bold text-gray-900 transition-colors group-hover:text-[#4b552a] md:text-[1.75rem]">
                                            {featured.title}
                                        </h2>
                                        <p className="line-clamp-3 text-sm leading-relaxed text-gray-600">
                                            {featured.excerpt ?? ''}
                                        </p>
                                    </div>
                                    <div className="mt-8">
                                        <div className="mb-5 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                                            <span className="flex items-center gap-1.5">
                                                <Calendar size={13} />
                                                {formatDate(featured.published_at)}
                                            </span>
                                            <span className="h-1 w-1 rounded-full bg-gray-300" />
                                            <span>{featured.author}</span>
                                            <span className="h-1 w-1 rounded-full bg-gray-300" />
                                            <span>{readingTime(featured.excerpt)}</span>
                                        </div>
                                        <span className="inline-flex items-center gap-2 text-sm font-bold text-[#4b552a]">
                                            Baca artikel
                                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#4b552a] text-white transition-transform group-hover:rotate-45">
                                                <ArrowUpRight size={14} />
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        )}

                        {/* ---- GRID ---- */}
                        {paginated.length > 0 && (
                            <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                                {paginated.map((post, i) => (
                                    <PostCard key={post.id} post={post} index={i} visible={gridVis} />
                                ))}
                            </div>
                        )}

                        {/* ---- PAGINATION ---- */}
                        {totalPages > 1 && (
                            <Pagination
                                current={page}
                                total={totalPages}
                                onChange={(p) => {
                                    setPage(p);
                                    window.scrollTo({ top: 320, behavior: 'smooth' });
                                }}
                            />
                        )}

                        {/* ---- Count ---- */}
                        <div className="mt-12 text-center text-xs font-medium tracking-widest text-gray-400 uppercase">
                            {filtered.length} artikel ditemukan
                        </div>
                    </>
                )}
            </section>

            <Footer />
        </div>
    );
}

/* ========== POST CARD ========== */
function PostCard({ post, index, visible }: { post: Post; index: number; visible: boolean }) {
    const href = post.external_link ?? `/blog/${post.slug ?? post.id}`;
    const isExternal = Boolean(post.external_link);
    return (
        <Link
            href={href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className={`group relative flex flex-col ${visible ? 'card-in' : 'opacity-0'}`}
            style={{ animationDelay: `${index * 0.08}s` }}
        >
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100">
                <img
                    src={post.image_url ?? '/images/placeholder.webp'}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                />
                {post.category && (
                    <span className="absolute top-3 left-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold tracking-widest text-[#4b552a] uppercase backdrop-blur">
                        {post.category.name}
                    </span>
                )}
            </div>

            {/* Meta */}
            <div className="mt-5 flex items-center gap-2 text-[11px] font-bold tracking-widest text-[#9c8e4d] uppercase">
                <Calendar size={11} />
                {formatDate(post.published_at, 'short')}
                <span className="h-1 w-1 rounded-full bg-gray-300" />
                <span className="text-gray-400 normal-case tracking-normal">
                    {readingTime(post.excerpt)}
                </span>
            </div>

            {/* Title */}
            <h3 className="mt-2 line-clamp-2 text-lg leading-snug font-bold text-gray-900 transition-colors group-hover:text-[#4b552a]">
                {post.title}
            </h3>

            {/* Excerpt */}
            <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-gray-600">
                {post.excerpt ?? ''}
            </p>

            {/* Read more */}
            <div className="mt-4 flex items-center gap-1.5 text-xs font-bold tracking-wide text-[#4b552a] uppercase">
                <span className="relative">
                    Baca
                    <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-[#4b552a] transition-transform duration-300 group-hover:scale-x-100" />
                </span>
                <ArrowUpRight size={13} className="transition-transform group-hover:rotate-45" />
            </div>
        </Link>
    );
}

/* ========== PAGINATION ========== */
function Pagination({ current, total, onChange }: { current: number; total: number; onChange: (p: number) => void }) {
    const pages = useMemo(() => {
        if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
        if (current <= 3) return [1, 2, 3, 4, '…', total] as const;
        if (current >= total - 2) return [1, '…', total - 3, total - 2, total - 1, total] as const;
        return [1, '…', current - 1, current, current + 1, '…', total] as const;
    }, [current, total]);

    return (
        <div className="mt-20 flex items-center justify-center gap-1">
            <button
                onClick={() => onChange(Math.max(1, current - 1))}
                disabled={current === 1}
                className="flex h-9 items-center gap-1 rounded-full px-4 text-sm font-semibold text-[#4b552a] transition hover:bg-[#eff5da] disabled:opacity-30 disabled:hover:bg-transparent"
                aria-label="Halaman sebelumnya"
            >
                ← Sebelumnya
            </button>
            <div className="mx-2 flex items-center gap-1">
                {pages.map((p, i) => (
                    <button
                        key={i}
                        onClick={() => typeof p === 'number' && onChange(p)}
                        disabled={p === '…'}
                        className={`h-9 min-w-9 rounded-full px-3 text-sm font-bold transition-all ${
                            p === current
                                ? 'bg-[#4b552a] text-white'
                                : p === '…'
                                    ? 'cursor-default text-gray-400'
                                    : 'text-gray-600 hover:bg-[#eff5da] hover:text-[#4b552a]'
                        }`}
                    >
                        {p}
                    </button>
                ))}
            </div>
            <button
                onClick={() => onChange(Math.min(total, current + 1))}
                disabled={current === total}
                className="flex h-9 items-center gap-1 rounded-full px-4 text-sm font-semibold text-[#4b552a] transition hover:bg-[#eff5da] disabled:opacity-30 disabled:hover:bg-transparent"
                aria-label="Halaman berikutnya"
            >
                Berikutnya →
            </button>
        </div>
    );
}

/* ========== EMPTY STATE ========== */
function EmptyState({ query }: { query: string }) {
    return (
        <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#eff5da] text-[#4b552a]">
                <Inbox size={28} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold text-gray-800">
                {query ? `Tidak ada hasil untuk "${query}"` : 'Belum ada publikasi'}
            </h3>
            <p className="mt-2 max-w-sm text-sm text-gray-500">
                {query
                    ? 'Coba kata kunci lain atau jelajahi semua kategori.'
                    : 'Publikasi untuk kategori ini belum tersedia. Kembali lagi nanti.'}
            </p>
        </div>
    );
}