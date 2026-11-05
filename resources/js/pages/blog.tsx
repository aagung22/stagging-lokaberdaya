import { useState, useEffect, useRef } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import type { Post, PostCategory } from '@/types/content';
import { Calendar, User, ArrowRight } from 'lucide-react';

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

function formatDate(value: string | null): string {
    if (!value) return '';

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return value;

    return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

type Props = {
    posts: Post[];
    categories: PostCategory[];
};

export default function Blog({ posts, categories }: Props) {
    const [activeCategory, setActiveCategory] = useState<number | 'all'>('all');

    const categoryFilters = [
        { id: 'all' as const, name: 'Semua Berita' },
        ...categories.map((category) => ({
            id: category.id,
            name: category.name,
        })),
    ];

    // Logika untuk memfilter berita berdasarkan kategori
    const filteredBlog =
        activeCategory === 'all'
            ? posts
            : posts.filter((post) => post.post_category_id === activeCategory);

    // --- ANIMATION STATE & REFS ---
    const [heroLoaded, setHeroLoaded] = useState(false);
    const [filterRef, filterVisible] = useReveal();
    const [gridRef, gridVisible] = useReveal();

    useEffect(() => {
        const t = setTimeout(() => setHeroLoaded(true), 100);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className="min-h-screen overflow-hidden bg-[#f7ffda] font-sans text-gray-800">
            <Head title="Blog & Publikasi - Loka Berdaya Amerta" />

            {/* GLOBAL KEYFRAMES UNTUK ANIMASI */}
            <style>{`
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-up { animation: fadeUp 0.8s cubic-bezier(.22,.61,.36,1) both; }
                .delay-100 { animation-delay: .1s; }
                .delay-200 { animation-delay: .2s; }
                .delay-300 { animation-delay: .3s; }
            `}</style>

            {/* 1. NAVBAR */}
            <Navbar />

            {/* 2. HEADER SECTION */}
            <section className="container mx-auto px-6 pt-32 pb-12 text-center md:px-12">
                <h1
                    className={`mb-4 text-4xl font-bold text-[#4b552a] md:text-5xl ${heroLoaded ? 'animate-fade-up' : 'opacity-0'}`}
                >
                    Blog & Publikasi
                </h1>
                <p
                    className={`mx-auto max-w-2xl text-lg text-gray-600 ${heroLoaded ? 'animate-fade-up delay-100' : 'opacity-0'}`}
                >
                    Ikuti perkembangan terbaru, kisah inspiratif, dan kabar
                    terbaru dari program pemberdayaan Loka Berdaya Amerta.
                </p>
            </section>

            {/* 3. FILTER KATEGORI */}
            <section
                ref={filterRef}
                className="container mx-auto mb-12 px-6 md:px-12"
            >
                <div
                    className={`flex flex-wrap justify-center gap-3 ${filterVisible ? 'animate-fade-up' : 'opacity-0'}`}
                >
                    {categoryFilters.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`cursor-pointer rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${
                                activeCategory === cat.id
                                    ? 'bg-[#4b552a] text-white shadow-md'
                                    : 'border border-gray-200 bg-white text-gray-600 hover:border-[#4b552a] hover:bg-gray-50'
                            }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </section>

            {/* 4. GRID BLOG */}
            <section
                ref={gridRef}
                className="container mx-auto min-h-[400px] px-6 pb-24 md:px-12"
            >
                {filteredBlog.length === 0 ? (
                    <div className="py-10 text-center text-gray-500">
                        Belum ada berita untuk kategori ini.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {filteredBlog.map((blog, index) => (
                            <div
                                key={blog.id}
                                className={`group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${gridVisible ? 'animate-fade-up' : 'opacity-0'}`}
                                style={{
                                    animationDelay: gridVisible
                                        ? `${index * 0.1}s`
                                        : '0s',
                                }}
                            >
                                {/* Gambar Cover */}
                                <div className="relative h-56 w-full overflow-hidden">
                                    <img
                                        src={blog.image_url ?? ''}
                                        alt={blog.title}
                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                    />
                                    {/* Badge Kategori */}
                                    {blog.category && (
                                        <div className="absolute top-4 left-4 rounded-md bg-[#4b552a]/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                                            {blog.category.name}
                                        </div>
                                    )}
                                </div>

                                {/* Konten Kartu */}
                                <div className="flex flex-grow flex-col p-6">
                                    {/* Meta Info */}
                                    <div className="mb-3 flex items-center gap-4 text-xs text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <Calendar size={14} />
                                            <span>
                                                {formatDate(blog.published_at)}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <User size={14} />
                                            <span>{blog.author}</span>
                                        </div>
                                    </div>

                                    {/* Judul Berita */}
                                    <h3 className="mb-3 line-clamp-2 text-xl leading-snug font-bold text-gray-900 transition group-hover:text-[#4b552a]">
                                        {blog.title}
                                    </h3>

                                    {/* Ringkasan */}
                                    <p className="mb-6 line-clamp-3 flex-grow text-sm leading-relaxed text-gray-600">
                                        {blog.excerpt}
                                    </p>

                                    {/* Tombol Selengkapnya: eksternal jika ada link */}
                                    {blog.external_link ? (
                                        <a
                                            href={blog.external_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group/btn flex w-full items-center justify-between rounded-lg bg-[#f7ffda] px-4 py-3 text-sm font-bold text-[#4b552a] transition hover:bg-[#4b552a] hover:text-white"
                                        >
                                            Baca Selengkapnya
                                            <ArrowRight
                                                size={16}
                                                className="transform transition group-hover/btn:translate-x-1"
                                            />
                                        </a>
                                    ) : (
                                        <div className="flex w-full items-center justify-between rounded-lg bg-[#f7ffda] px-4 py-3 text-sm font-bold text-[#4b552a]">
                                            Baca Selengkapnya
                                            <ArrowRight size={16} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination Placeholder */}
                <div
                    className={`mt-16 flex justify-center ${gridVisible ? 'animate-fade-up delay-300' : 'opacity-0'}`}
                >
                    <div className="flex gap-2">
                        <button className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg bg-[#4b552a] font-bold text-white">
                            1
                        </button>
                    </div>
                </div>
            </section>

            {/* 5. FOOTER */}
            <Footer />
        </div>
    );
}
