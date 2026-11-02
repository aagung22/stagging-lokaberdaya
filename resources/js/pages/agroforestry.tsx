import { useState, useEffect, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Users, Building2, TreePine, X } from 'lucide-react'; 

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

// Data kegiatan (Sesuai gambar referensi)
const kegiatanData = [
    {
        id: 1,
        kota: "Mojokerto",
        deskripsi: [
            "Pemberdayaan perkebunan melalui komoditas penanaman Pisang & Rimpang",
            "Lokasi : Desa Gumeng, Kec. Gondang",
            "Luasan Lahan : 3.000 m²",
            "Jumlah PM : 4 PM"
        ],
        penjelasanPanjang: `Program Agroforestry & Perkebunan di Kediri merupakan model pemberdayaan berbasis kemitraan dalam pengelolaan lahan produktif secara berkelanjutan. 

Program ini berfokus pada optimalisasi lahan, termasuk skema alih kelola kawasan, untuk dikembangkan menjadi usaha perkebunan yang bernilai ekonomi. Melalui legalitas dan perjanjian yang jelas, program memastikan masyarakat memiliki akses kelola lahan yang aman dan berkelanjutan.`,
        gambar: "https://images.unsplash.com/photo-1592982537447-6f29922e2f5b?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 2,
        kota: "Jombang",
        deskripsi: [
            "Pemberdayaan perkebunan melalui komoditas penanaman Pisang. Program ini juga didukung oleh nota kesepahaman (MoU) terkait alih kelola lahan hutan untuk kegiatan agroforestri yang produktif dan berkelanjutan",
            "Lokasi : Desa Wonosalam",
            "Luasan Lahan : 5.000 m²", 
            "Jumlah PM : 2 PM"
        ],
        penjelasanPanjang: `Program Agroforestry & Perkebunan di Sukoharjo mengedepankan integrasi tanaman kehutanan dan komoditas perkebunan. 

Dalam implementasinya, masyarakat didampingi dalam pengelolaan usaha, termasuk aspek budidaya, pemeliharaan lingkungan, serta sistem operasional yang terstruktur. Program juga membuka akses pasar dan menerapkan skema bagi hasil yang transparan, sehingga masyarakat tidak bergantung pada tengkulak dan memiliki kepastian pendapatan.`,
        gambar: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=800&auto=format&fit=crop"
    }
];

export default function Agroforestry() {
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
            <Head title="Agroforestry dan Perkebunan - Loka Berdaya Amerta" />

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
                <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col-reverse md:flex-row items-center gap-12 lg:gap-20">
                    
                    {/* KIRI: Gambar Besar (Animasi Slide Right / Masuk dari Kanan) */}
                    <div className={`w-full md:w-1/2 relative ${heroLoaded ? "animate-slide-right" : "opacity-0"}`}>
                        <img 
                            src="/images/agroforestry.webp"
                            alt="Agroforestry" 
                            className="w-full h-[400px] md:h-[600px] object-cover rounded-3xl rounded-tr-[6rem] shadow-lg border-4 border-white"
                        />
                    </div>

                    {/* KANAN: Teks Penjelasan (Animasi Slide Left / Masuk dari Kiri) */}
                    <div className={`w-full md:w-1/2 flex flex-col justify-center ${heroLoaded ? "animate-slide-left" : "opacity-0"}`}>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-8">
                            Program Agroforestry dan Perkebunan
                        </h1>
                        
                        <div className="space-y-5 text-gray-600 leading-relaxed text-justify md:text-left">
                            <p>
                                Program Agroforestry & Perkebunan merupakan model pemberdayaan berbasis kemitraan dalam pengelolaan lahan produktif secara berkelanjutan. Program ini berfokus pada optimalisasi lahan, termasuk skema alih kelola kawasan, untuk dikembangkan menjadi usaha perkebunan yang bernilai ekonomi.
                            </p>
                            <p>
                                Melalui legalitas dan perjanjian yang jelas, program memastikan masyarakat memiliki akses kelola lahan yang aman dan berkelanjutan. Proses dilanjutkan dengan perencanaan dan eksekusi berbasis potensi lokal, mencakup integrasi tanaman kehutanan dan komoditas perkebunan.
                            </p>
                            <p>
                                Dalam implementasinya, masyarakat didampingi dalam pengelolaan usaha, termasuk aspek budidaya, pemeliharaan lingkungan, serta sistem operasional yang terstruktur. Program juga membuka akses pasar dan menerapkan skema bagi hasil yang transparan, sehingga masyarakat tidak bergantung pada tengkulak dan memiliki kepastian pendapatan.
                            </p>
                            <p>
                                Dengan pendekatan kemitraan ini, program mendorong kemandirian ekonomi masyarakat sekaligus memastikan pengelolaan lahan yang produktif, legal, dan berkelanjutan.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. STATS BAR (Animasi Fade Up) */}
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
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">2 Kota</h3>
                            <p className="text-sm text-gray-500 leading-tight">Titik Pemberdayaan</p>
                        </div>
                    </div>

                    <div className="hidden md:block w-px h-16 bg-gray-200"></div>
                    
                    <div className="flex items-start gap-4 w-full md:w-1/3">
                        <div className="w-16 h-16 bg-[#fce4d1] rounded-full flex items-center justify-center flex-shrink-0 text-[#d97736]">
                            <TreePine size={32} />
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
                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {kegiatanData.map((item, index) => (
                        <div 
                            key={item.id} 
                            className={`bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col hover:shadow-lg transition-all duration-300 ${gridVisible ? "animate-fade-up" : "opacity-0"}`}
                            style={{ 
                                animationDelay: gridVisible ? `${index * 0.1}s` : '0s' 
                            }}
                        >
                            
                            <div className="h-56 w-full overflow-hidden">
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
                                Agroforestry di {selectedKegiatan.kota}
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