import { useState, useEffect, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Users, Building2, Wheat, X } from 'lucide-react';

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

// Data dummy untuk 9 kota/kegiatan
const kegiatanData = [
    {
        id: 1,
        kota: "Kediri",
        deskripsi: [
            "Lokasi: Desa Sukoanyar, Kecamatan Mojo, Kabupaten Kediri",
            "Start Program: Sep 2024",
            "Luasan Lahan: 5 Ha",
            "Total Hasil Panen: 30 Ton Gabah",
            "Jumlah PM: 13"
        ],
        penjelasanPanjang: `Menguatkan Ketahanan Pangan dari Desa: Inisiatif Pertanian Padi di Kediri

Upaya membangun kemandirian ekonomi masyarakat terus didorong melalui penguatan sektor pertanian sebagai fondasi utama ketahanan pangan. Di Desa Sukoanyar, Kecamatan Mojo, Kabupaten Kediri, sebuah program pemberdayaan pertanian padi menjadi contoh nyata bagaimana potensi lokal dapat dioptimalkan untuk memberikan dampak ekonomi dan sosial secara bersamaan.

Program yang dimulai pada September 2024 ini mengelola lahan seluas 5 hektare dengan melibatkan 13 petani sebagai penerima manfaat. Melalui dukungan permodalan, pendampingan teknis, serta penguatan kelembagaan kelompok, para petani didorong untuk meningkatkan produktivitas sekaligus membangun sistem usaha tani yang lebih berkelanjutan.

Hasil yang dicapai menunjukkan perkembangan yang signifikan. Dalam satu periode panen, total produksi mencapai 30 ton gabah. Capaian ini tidak hanya mencerminkan peningkatan hasil pertanian, tetapi juga menjadi indikator penguatan kapasitas petani dalam mengelola lahan secara lebih efektif dan efisien.

Lebih dari sekadar peningkatan produksi, program ini juga memberikan dampak terhadap stabilitas ekonomi petani. Dengan adanya dukungan yang tepat, para petani mampu mengurangi beban biaya produksi serta memiliki peluang yang lebih besar untuk memperoleh pendapatan yang lebih stabil. Selain itu, kolaborasi antarpetani dalam satu kelompok turut memperkuat solidaritas dan ketahanan komunitas.

Ke depan, inisiatif seperti ini diharapkan dapat terus dikembangkan dan direplikasi di berbagai wilayah lainnya. Pendekatan berbasis potensi lokal dan pemberdayaan komunitas menjadi kunci dalam menciptakan sistem pertanian yang tidak hanya produktif, tetapi juga berkelanjutan serta mampu menjawab tantangan ketahanan pangan di masa depan.`,
        gambar: "https://images.unsplash.com/photo-1592982537447-6f29922e2f5b?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 2,
        kota: "Sukoharjo",
        deskripsi: [
            "Lokasi: Kelurahan Kateguhan, Kec. Tawangsari, Kab. Sukoharjo",
            "Start Program: Des 2024",
            "Luasan Lahan: 5,5 Ha",
            "Total Hasil Panen: 40 Ton",
            "Jumlah PM: 10"
        ],
        penjelasanPanjang: "Penjelasan detail untuk program di Sukoharjo belum tersedia. Silakan hubungi admin untuk informasi lebih lanjut mengenai capaian dan dampak program di wilayah ini.",
        gambar: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 3,
        kota: "Lumajang",
        deskripsi: [
            "Lokasi: Desa Sidorejo, Kec. Rowokangkung, Kab. Lumajang",
            "Start Program: Okt 2024",
            "Luasan Lahan: 4 Ha",
            "Total Hasil Panen: 20 Ton",
            "Jumlah PM: 15"
        ],
        penjelasanPanjang: "Penjelasan detail untuk program di Lumajang belum tersedia.",
        gambar: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 4,
        kota: "Sidoarjo",
        deskripsi: [
            "Lokasi: Desa Sarirogo, Kab. Sidoarjo",
            "Luasan Lahan: 0,3 Ha",
            "Total Hasil Panen: 1 Ton",
            "Jumlah PM: 3"
        ],
        penjelasanPanjang: "Penjelasan detail untuk program di Sidoarjo belum tersedia.",
        gambar: "https://images.unsplash.com/photo-1592982537447-6f29922e2f5b?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 5,
        kota: "Mojokerto",
        deskripsi: [
            "Lokasi: Desa Mlirip, Kec. Jetis, Kab. Mojokerto",
            "Start Program: Jun 2024",
            "Luasan Lahan: 3 Ha",
            "Total Hasil Panen: 15 Ton",
            "Jumlah PM: 8"
        ],
        penjelasanPanjang: "Penjelasan detail untuk program di Mojokerto belum tersedia.",
        gambar: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 6,
        kota: "Gresik",
        deskripsi: [
            "Lokasi: Desa Petiyintunggal, Kec. Dukun, Kab. Gresik",
            "Start Program: Juli 2025",
            "Luasan Lahan: 2 Ha",
            "Jumlah PM: 12"
        ],
        penjelasanPanjang: "Penjelasan detail untuk program di Gresik belum tersedia.",
        gambar: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 7,
        kota: "Sragen",
        deskripsi: [
            "Lokasi: Desa Jatibatur, Kec. Gemolong, Kab. Gemolong",
            "Luasan Lahan: 1,5 Ha",
            "Total Hasil Panen: 1,55 Ton",
            "Jumlah PM: 12"
        ],
        penjelasanPanjang: "Penjelasan detail untuk program di Sragen belum tersedia.",
        gambar: "https://images.unsplash.com/photo-1592982537447-6f29922e2f5b?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 8,
        kota: "Sukabumi",
        deskripsi: [
            "Lokasi: Desa Cikangkung, Kec. Ciracas, Kab. Sukabumi",
            "Start Program: Jun 2025",
            "Luasan Lahan: 10 Ha",
            "Jumlah PM: 20"
        ],
        penjelasanPanjang: "Penjelasan detail untuk program di Sukabumi belum tersedia.",
        gambar: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 9,
        kota: "Malang",
        deskripsi: [
            "Lokasi: (Data belum tersedia)",
            "Start Program: -",
            "Luasan Lahan: -",
            "Total Hasil Panen: -",
            "Jumlah PM: -"
        ],
        penjelasanPanjang: "Penjelasan detail untuk program di Malang belum tersedia.",
        gambar: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=800&auto=format&fit=crop"
    }
];

export default function Agriculture() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedKegiatan, setSelectedKegiatan] = useState<any>(null);

    const handleOpenModal = (item: any) => {
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
    const [headerRef, headerVisible] = useReveal();
    const [gridRef, gridVisible] = useReveal();

    useEffect(() => {
        const t = setTimeout(() => setHeroLoaded(true), 100);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className="min-h-screen bg-[#f7ffda] font-sans text-gray-800 overflow-hidden relative">
            <Head title="Program Agriculture - Loka Berdaya Amerta" />

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
            <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-[#f7ffda]">
                <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                    
                    {/* KIRI: Gambar Besar (Animasi Slide Right / Masuk dari Kanan) */}
                    <div className={`w-full md:w-1/2 relative ${heroLoaded ? "animate-slide-right" : "opacity-0"}`}>
                        <img 
                            src="/images/agriculture.webp"
                            alt="Program Pertanian" 
                            className="w-full h-[400px] md:h-[600px] object-cover rounded-3xl rounded-tr-[6rem] shadow-lg border-4 border-white"
                        />
                    </div>

                    {/* KANAN: Teks Penjelasan (Animasi Slide Left / Masuk dari Kiri) */}
                    <div className={`w-full md:w-1/2 flex flex-col justify-center ${heroLoaded ? "animate-slide-left" : "opacity-0"}`}>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-8">
                            Program Agriculture<br className="hidden md:block"/> (Pertanian)
                        </h1>
                        
                        <div className="space-y-5 text-gray-600 leading-relaxed text-justify md:text-left">
                            <p>
                                Program Pertanian berfokus pada penguatan ketahanan pangan dan kemandirian petani melalui pengelolaan usaha tani yang berkelanjutan. Program ini mendorong peningkatan produksi sekaligus memastikan hasil panen dapat terserap secara optimal.                            
                            </p>
                            <p>
                                Melalui pendampingan, penguatan kelembagaan, serta pembukaan akses pasar yang lebih luas, petani didorong untuk tidak lagi bergantung pada tengkulak. Dengan rantai distribusi yang lebih adil dan efisien, petani memperoleh harga jual yang lebih stabil dan menguntungkan.
                            </p>
                            <p>
                                Dengan demikian, program ini tidak hanya meningkatkan produktivitas, tetapi juga memperkuat posisi tawar petani, menciptakan kemandirian ekonomi, serta mendukung terwujudnya ketahanan pangan di tingkat lokal.                            
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. STATS BAR (Animasi Fade Up dengan jeda) */}
            <div ref={statsRef} className="container mx-auto px-6 md:px-12 relative z-20 -mt-20 md:-mt-24">
                <div className={`bg-white rounded-3xl shadow-xl p-8 md:p-10 flex flex-col md:flex-row justify-between items-center gap-8 border border-gray-100 ${statsVisible ? "animate-fade-up delay-200" : "opacity-0"}`}>
                    
                    <div className="flex items-start gap-4 w-full md:w-1/3">
                        <div className="w-16 h-16 bg-[#fce4d1] rounded-full flex items-center justify-center flex-shrink-0 text-[#d97736]">
                            <Users size={32} />
                        </div>
                        <div>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">100+</h3>
                            <p className="text-sm text-gray-500 leading-tight">Penerima Manfaat</p>
                        </div>
                    </div>
                    
                    <div className="hidden md:block w-px h-16 bg-gray-200"></div>
                    
                    <div className="flex items-start gap-4 w-full md:w-1/3">
                        <div className="w-16 h-16 bg-[#fce4d1] rounded-full flex items-center justify-center flex-shrink-0 text-[#d97736]">
                            <Building2 size={32} />
                        </div>
                        <div>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">9 Kota</h3>
                            <p className="text-sm text-gray-500 leading-tight">Titik Pemberdayaan</p>
                        </div>
                    </div>

                    <div className="hidden md:block w-px h-16 bg-gray-200"></div>
                    
                    <div className="flex items-start gap-4 w-full md:w-1/3">
                        <div className="w-16 h-16 bg-[#fce4d1] rounded-full flex items-center justify-center flex-shrink-0 text-[#d97736]">
                            <Wheat size={32} />
                        </div>
                        <div>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">150 Ton</h3>
                            <p className="text-sm text-gray-500 leading-tight">Hasil Pertanian</p>
                        </div>
                    </div>

                </div>
            </div>

            {/* 4. KEGIATAN KAMI SECTION */}
            <section className="container mx-auto px-6 md:px-12 py-24 mt-12">
                {/* Header dengan Animasi */}
                <div ref={headerRef} className="text-center mb-16">
                    <h2 className={`text-3xl md:text-4xl font-bold text-[#4b552a] ${headerVisible ? "animate-fade-up" : "opacity-0"}`}>
                        Kegiatan Kami
                    </h2>
                </div>

                {/* Grid Card Kegiatan dengan Staggered Animation */}
                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {kegiatanData.map((item, index) => (
                        <div 
                            key={item.id} 
                            className={`bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col hover:shadow-lg transition-all duration-300 ${gridVisible ? "animate-fade-up" : "opacity-0"}`}
                            style={{ 
                                animationDelay: gridVisible ? `${index * 0.1}s` : '0s' 
                            }}
                        >
                            
                            <div className="h-48 w-full overflow-hidden">
                                <img 
                                    src={item.gambar} 
                                    alt={`Kegiatan di ${item.kota}`} 
                                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                                />
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.kota}</h3>
                                
                                <div className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                                    <ul className="list-disc pl-4 space-y-2 marker:text-[#4b552a]">
                                        {item.deskripsi.map((desc, i) => (
                                            <li key={i}>{desc}</li>
                                        ))}
                                    </ul>
                                </div>

                                <button 
                                    onClick={() => handleOpenModal(item)}
                                    className="w-full bg-[#4b552a] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#3a4220] transition mt-auto cursor-pointer"
                                >
                                    Selengkapnya
                                </button>
                            </div>
                            
                        </div>
                    ))}
                </div>
            </section>

            {/* 5. MODAL / POP-UP PENJELASAN */}
            {isModalOpen && selectedKegiatan && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
                        
                        {/* Header Modal */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-[#f7ffda]">
                            <h3 className="text-2xl font-bold text-[#4b552a]">
                                Program Pertanian di {selectedKegiatan.kota}
                            </h3>
                            
                            <button 
                                onClick={handleCloseModal}
                                className="p-2 bg-white rounded-full text-gray-500 hover:text-red-500 hover:bg-red-50 transition shadow-sm cursor-pointer"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Konten Modal */}
                        <div className="p-8 overflow-y-auto text-gray-700 leading-relaxed text-justify whitespace-pre-wrap">
                            {selectedKegiatan.penjelasanPanjang}
                        </div>

                        {/* Footer Modal */}
                        <div className="p-4 border-t border-gray-100 flex justify-end bg-gray-50">
                            <button 
                                onClick={handleCloseModal}
                                className="bg-[#4b552a] text-white px-8 py-2.5 rounded-lg font-medium hover:bg-[#3a4220] transition cursor-pointer"
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