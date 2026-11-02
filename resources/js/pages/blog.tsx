import { useState, useEffect, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Calendar, User, ArrowRight } from 'lucide-react';

// Kategori Filter
const categories = ["Semua Berita", "Pertanian", "Peternakan", "UMKM", "Perkebunan"];

// Data Dummy Berita Blog
const blogData = [
    {
        id: 1,
        kategori: "UMKM",
        judul: "Bantuan Gerobak Usaha untuk Pelaku UMKM di Surabaya",
        tanggal: "22 November 2024",
        penulis: "Yatim Mandiri",
        gambar: "https://yatimmandiri.org/news/wp-content/uploads/2024/11/Bantuan-Gerobak-Usaha-untuk-Pelaku-UMKM-di-Surabaya-2048x1536.jpeg",
        ringkasan: "Dalam upaya mendukung pelaku UMKM untuk terus berkembang, Yatim Mandiri Surabaya melalui program UMKM Bangkit menyalurkan gerobak usaha",
        link: "https://yatimmandiri.org/news/bantuan-gerobak-usaha-untuk-pelaku-umkm-di-surabaya/"
    },
    {
        id: 2,
        kategori: "Pertanian",
        judul: "Petani Kediri Berdaya Melalui Program Lumbung Pangan Mandiri",
        tanggal: "2 Oktober 2024",
        penulis: "Yatim Mandiri",
        gambar: "https://yatimmandiri.org/news/wp-content/uploads/2024/10/Petani-Kediri-Berdaya-Melalui-Program-Lumbung-Pangan-Mandiri-2048x1152.jpeg",
        ringkasan: "Yatim Mandiri Kediri resmi meluncurkan program pemberdayaan yakni Lumbung Pangan Mandiri untuk para petani di Desa Sukoanyar, Kecamatan Mojo, Kabupaten Kediri. ",
        link: "https://yatimmandiri.org/news/petani-kediri-berdaya-melalui-program-lumbung-pangan-mandiri/"
    },
    {
        id: 3,
        kategori: "Peternakan",
        judul: "Launching Program Pemberdayaan Peternak Domba di Malang",
        tanggal: "20 November 2024",
        penulis: "Divisi Peternakan",
        gambar: "https://yatimmandiri.org/news/wp-content/uploads/2024/11/Launching-Program-Pemberdayaan-Peternak-Domba-di-Malang-2-1024x683.jpg",
        ringkasan: "Program pemberdayaan peternak domba ini merupakan kolaborasi antara Yatim Mandiri dan Trimodadi Farm, yang berpengalaman dalam peternakan dan penggemukan domba serta kambing.",
        link: "https://yatimmandiri.org/news/launching-program-pemberdayaan-peternak-domba-di-malang/"
    },
    {
        id: 4,
        kategori: "Perkebunan",
        judul: "Kunjungan Industri Mahasiswa ke Program Petani Lontar Tuban",
        tanggal: "14 Januari 2025",
        penulis: "Yatim Mandiri",
        gambar: "https://yatimmandiri.org/news/wp-content/uploads/2025/01/Kunjungan-Industri-Mahasiswa-ke-Program-Petani-Lontar-Tuban-2048x1536.jpg",
        ringkasan: "Program pemberdayaan ini memanfaatkan potensi pohon lontar atau siwalan yang melimpah di daerah tersebut. Melalui pendekatan berbasis kelompok, program ini bertujuan untuk meningkatkan kesejahteraan petani dan mendorong inovasi produk lokal.",
        link: "https://yatimmandiri.org/news/kunjungan-industri-mahasiswa-ke-program-petani-lontar-tuban/"
    },
    {
        id: 5,
        kategori: "Pertanian",
        judul: "Kolaborasi UNS dan Yatim Mandiri Perkuat Petani Ngawi Melalui Pelatihan Pupuk Organik",
        tanggal: "07 Juli 2026",
        penulis: "Yatim Mandiri",
        gambar: "https://yatimmandiri.org/news/wp-content/uploads/2026/07/Ngawi-1-3.jpg",
        ringkasan: "Melalui pelatihan intensif, mereka mengajak kelompok tani di Kecamatan Kasreman untuk beralih menggunakan pupuk organik demi memulihkan kesuburan tanah sekaligus mendongkrak produktivitas hasil panen. ",
        link: "https://yatimmandiri.org/news/kolaborasi-uns-dan-yatim-mandiri-perkuat-petani-ngawi-melalui-pelatihan-pupuk-organik/"
    },
    {
        id: 6,
        kategori: "UMKM",
        judul: "Bantuan UMKM Ramadhan di Bandung, Dorong Usaha Berdaya",
        tanggal: "14 Maret 2025",
        penulis: "Yatim Mandiri",
        gambar: "https://yatimmandiri.org/news/wp-content/uploads/2025/03/Bantuan-UMKM-Ramadhan-di-Bandung-Dorong-Usaha-Berdaya-2048x1506.jpg",
        ringkasan: " Program ini bertujuan untuk membantu para pelaku UMKM agar dapat lebih berkembang dan mandiri, terutama dalam menghadapi momen Ramadhan yang penuh berkah.",
        link: "https://yatimmandiri.org/news/bantuan-umkm-ramadhan-di-bandung-dorong-usaha-berdaya/"
    },
    {
        id: 7,
        kategori: "Pertanian",
        judul: "Bersama PLN, Yatim Mandiri Luncurkan Program Electrifying Agriculture untuk Petani Sragen",
        tanggal: "3 Desember 2025",
        penulis: "Yatim Mandiri",
        gambar: "https://yatimmandiri.org/news/wp-content/uploads/2025/12/WhatsApp-Image-2025-12-03-at-13.02.26.jpeg",
        ringkasan: "Program ini merupakan bantuan PLN Electricity Services untuk memperkuat ketahanan pangan nasional. Program juga ditujukan untuk mengoptimalkan potensi desa guna meningkatkan kesejahteraan masyarakat.",
        link: "https://yatimmandiri.org/news/bersama-pln-yatim-mandiri-luncurkan-program-electrifying-agriculture-untuk-petani-sragen/"
    }
];

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

export default function Blog() {
    const [activeCategory, setActiveCategory] = useState("Semua Berita");

    // Logika untuk memfilter berita berdasarkan kategori
    const filteredBlog = activeCategory === "Semua Berita" 
        ? blogData 
        : blogData.filter(blog => blog.kategori === activeCategory);

    // --- ANIMATION STATE & REFS ---
    const [heroLoaded, setHeroLoaded] = useState(false);
    const [filterRef, filterVisible] = useReveal();
    const [gridRef, gridVisible] = useReveal();

    useEffect(() => {
        const t = setTimeout(() => setHeroLoaded(true), 100);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className="min-h-screen bg-[#f7ffda] font-sans text-gray-800 overflow-hidden">
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
            <section className="pt-32 pb-12 text-center container mx-auto px-6 md:px-12">
                <h1 className={`text-4xl md:text-5xl font-bold text-[#4b552a] mb-4 ${heroLoaded ? "animate-fade-up" : "opacity-0"}`}>
                    Blog & Publikasi
                </h1>
                <p className={`text-lg text-gray-600 max-w-2xl mx-auto ${heroLoaded ? "animate-fade-up delay-100" : "opacity-0"}`}>
                    Ikuti perkembangan terbaru, kisah inspiratif, dan kabar terbaru dari program pemberdayaan Loka Berdaya Amerta.
                </p>
            </section>

            {/* 3. FILTER KATEGORI */}
            <section ref={filterRef} className="container mx-auto px-6 md:px-12 mb-12">
                <div className={`flex flex-wrap justify-center gap-3 ${filterVisible ? "animate-fade-up" : "opacity-0"}`}>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
                                activeCategory === cat
                                    ? 'bg-[#4b552a] text-white shadow-md'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-[#4b552a]'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            {/* 4. GRID BLOG */}
            <section ref={gridRef} className="container mx-auto px-6 md:px-12 pb-24 min-h-[400px]">
                {filteredBlog.length === 0 ? (
                    <div className="text-center text-gray-500 py-10">Belum ada berita untuk kategori ini.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredBlog.map((blog, index) => (
                            <div 
                                key={blog.id} 
                                className={`bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group ${gridVisible ? "animate-fade-up" : "opacity-0"}`}
                                style={{ 
                                    animationDelay: gridVisible ? `${index * 0.1}s` : '0s' 
                                }}
                            >
                                
                                {/* Gambar Cover */}
                                <div className="h-56 w-full overflow-hidden relative">
                                    <img 
                                        src={blog.gambar} 
                                        alt={blog.judul} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                    />
                                    {/* Badge Kategori */}
                                    <div className="absolute top-4 left-4 bg-[#4b552a]/90 backdrop-blur-sm text-white px-3 py-1 rounded-md text-xs font-semibold">
                                        {blog.kategori}
                                    </div>
                                </div>

                                {/* Konten Kartu */}
                                <div className="p-6 flex flex-col flex-grow">
                                    {/* Meta Info */}
                                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                                        <div className="flex items-center gap-1">
                                            <Calendar size={14} />
                                            <span>{blog.tanggal}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <User size={14} />
                                            <span>{blog.penulis}</span>
                                        </div>
                                    </div>

                                    {/* Judul Berita */}
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug line-clamp-2 group-hover:text-[#4b552a] transition">
                                        {blog.judul}
                                    </h3>
                                    
                                    {/* Ringkasan */}
                                    <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                                        {blog.ringkasan}
                                    </p>

                                    {/* Tombol Selengkapnya: eksternal jika ada link, internal jika tidak */}
                                    {blog.link ? (
                                        <a
                                            href={blog.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between w-full bg-[#f7ffda] text-[#4b552a] px-4 py-3 rounded-lg text-sm font-bold hover:bg-[#4b552a] hover:text-white transition group/btn"
                                        >
                                            Baca Selengkapnya
                                            <ArrowRight size={16} className="transform group-hover/btn:translate-x-1 transition" />
                                        </a>
                                    ) : (
                                        <Link 
                                            href="#" 
                                            className="flex items-center justify-between w-full bg-[#f7ffda] text-[#4b552a] px-4 py-3 rounded-lg text-sm font-bold hover:bg-[#4b552a] hover:text-white transition group/btn"
                                        >
                                            Baca Selengkapnya
                                            <ArrowRight size={16} className="transform group-hover/btn:translate-x-1 transition" />
                                        </Link>
                                    )}
                                </div>
                                
                            </div>
                        ))}
                    </div>
                )}
                
                {/* Pagination Placeholder */}
                <div className={`flex justify-center mt-16 ${gridVisible ? "animate-fade-up delay-300" : "opacity-0"}`}>
                    <div className="flex gap-2">
                        <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#4b552a] text-white font-bold cursor-pointer">1</button>
                    </div>
                </div>
            </section>

            {/* 5. FOOTER */}
            <Footer />
        </div>
    );
}