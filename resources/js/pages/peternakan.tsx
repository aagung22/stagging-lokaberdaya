import { useState, useEffect, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Users, Building2, Milk, X } from 'lucide-react'; 

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

// Data untuk section Fattening (Penggemukan)
const fatteningData = [
    {
        id: 1,
        kota: "Kediri",
        deskripsi: "Mendorong ketahanan pangan melalui peningkatan produktivitas dan kemandirian petani secara berkelanjutan.",
        penjelasanPanjang: `Program Fattening (Penggemukan) di Kediri berfokus pada penguatan usaha penggemukan untuk meningkatkan bobot dan nilai jual ternak dalam waktu yang lebih singkat. 

Program ini mendukung peternak melalui penyediaan bakalan, pakan berkualitas, serta pendampingan teknis agar proses penggemukan berjalan optimal dan efisien.`,
        gambar: "https://images.unsplash.com/photo-1592982537447-6f29922e2f5b?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 2,
        kota: "Sukoharjo",
        deskripsi: "Mendorong ketahanan pangan melalui peningkatan produktivitas dan kemandirian petani secara berkelanjutan.",
        penjelasanPanjang: `Program Fattening di Sukoharjo bertujuan untuk meningkatkan kapasitas produksi ternak melalui manajemen pakan yang tepat dan pemeliharaan yang intensif. Peternak diberikan pelatihan mengenai standar operasional penggemukan yang baik untuk menghasilkan daging berkualitas.`,
        gambar: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 3,
        kota: "Lumajang",
        deskripsi: "Mendorong ketahanan pangan melalui peningkatan produktivitas dan kemandirian petani secara berkelanjutan.",
        penjelasanPanjang: `Di Lumajang, program Fattening diintegrasikan dengan pemanfaatan sumber daya lokal sebagai pakan ternak. Hal ini tidak hanya menekan biaya produksi tetapi juga mendukung keberlanjutan ekosistem peternakan di wilayah tersebut.`,
        gambar: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=800&auto=format&fit=crop"
    }
];

// Data untuk section Breeding (Pembibitan)
const breedingData = [
    {
        id: 4,
        kota: "Sidoarjo",
        deskripsi: "Mendorong ketahanan pangan melalui peningkatan produktivitas dan kemandirian petani secara berkelanjutan.",
        penjelasanPanjang: `Program Breeding (Pembibitan) di Sidoarjo berfokus pada pengembangan pembibitan untuk meningkatkan kualitas dan ketersediaan populasi ternak secara berkelanjutan. 

Program ini mendorong peternak untuk menghasilkan bakalan unggul melalui manajemen reproduksi, perawatan indukan, serta pendampingan teknis yang terstruktur.`,
        gambar: "https://images.unsplash.com/photo-1592982537447-6f29922e2f5b?q=80&w=800&auto=format&fit=crop"
    }
];

export default function Peternakan() {
    // State untuk Modal
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
    const [fatteningHeaderRef, fatteningHeaderVisible] = useReveal();
    const [fatteningGridRef, fatteningGridVisible] = useReveal();
    const [breedingHeaderRef, breedingHeaderVisible] = useReveal();
    const [breedingGridRef, breedingGridVisible] = useReveal();

    useEffect(() => {
        const t = setTimeout(() => setHeroLoaded(true), 100);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className="min-h-screen bg-[#f7ffda] font-sans text-gray-800 overflow-hidden relative">
            <Head title="Program Peternakan - Loka Berdaya Amerta" />

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
                    
                    {/* KIRI: Gambar Besar (Animasi Slide Right) */}
                    <div className={`w-full md:w-1/2 relative ${heroLoaded ? "animate-slide-right" : "opacity-0"}`}>
                        <img 
                            src="/images/peternakan.webp" 
                            alt="Program Peternakan" 
                            className="w-full h-[400px] md:h-[600px] object-cover rounded-3xl rounded-tr-[6rem] shadow-lg border-4 border-white"
                        />
                    </div>

                    {/* KANAN: Teks Penjelasan (Animasi Slide Left) */}
                    <div className={`w-full md:w-1/2 flex flex-col justify-center ${heroLoaded ? "animate-slide-left" : "opacity-0"}`}>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-8">
                            Program Peternakan
                        </h1>
                        
                        <div className="space-y-5 text-gray-600 leading-relaxed text-justify md:text-left">
                            <p>
                                Program Peternakan berfokus pada penguatan usaha ternak masyarakat melalui peningkatan kapasitas produksi dan pengelolaan usaha yang lebih terstruktur. Program ini hadir sebagai solusi atas keterbatasan modal, pengetahuan, dan akses pasar yang masih menjadi tantangan utama para peternak.
                            </p>
                            <p>
                                Melalui dukungan modal usaha, pendampingan teknis, serta penguatan manajemen peternakan, masyarakat didorong untuk meningkatkan produktivitas dan kualitas hasil ternak. Program juga membuka akses pasar dan membangun skema kemitraan yang lebih adil dan memiliki kepastian penyerapan hasil.
                            </p>
                            <p>
                                Dengan pendekatan ini, program mendorong peningkatan pendapatan, memperkuat posisi tawar peternak, serta menciptakan usaha peternakan yang berkelanjutan dan berdaya saing.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. STATS BAR (Animasi Fade Up) */}
            <div ref={statsRef} className="container mx-auto px-6 md:px-12 relative z-20 -mt-20 md:-mt-24">
                <div className={`bg-white rounded-3xl shadow-xl p-8 md:p-10 flex flex-col md:flex-row justify-between items-center gap-8 border border-gray-100 ${statsVisible ? "animate-fade-up delay-200" : "opacity-0"}`}>
                    
                    {/* Stat 1 */}
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
                    
                    {/* Stat 2 */}
                    <div className="flex items-start gap-4 w-full md:w-1/3">
                        <div className="w-16 h-16 bg-[#fce4d1] rounded-full flex items-center justify-center flex-shrink-0 text-[#d97736]">
                            <Building2 size={32} />
                        </div>
                        <div>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">4 Kota</h3>
                            <p className="text-sm text-gray-500 leading-tight">Titik Pemberdayaan</p>
                        </div>
                    </div>

                    <div className="hidden md:block w-px h-16 bg-gray-200"></div>
                    
                    {/* Stat 3 */}
                    <div className="flex items-start gap-4 w-full md:w-1/3">
                        <div className="w-16 h-16 bg-[#fce4d1] rounded-full flex items-center justify-center flex-shrink-0 text-[#d97736]">
                            <Milk size={32} />
                        </div>
                        <div>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">150 Ton</h3>
                            <p className="text-sm text-gray-500 leading-tight">Hasil Peternakan</p>
                        </div>
                    </div>

                </div>
            </div>

            {/* 4. SECTION FATTENING */}
            <section className="container mx-auto px-6 md:px-12 py-16 mt-12">
                <div ref={fatteningHeaderRef} className={`mb-10 ${fatteningHeaderVisible ? "animate-fade-up" : "opacity-0"}`}>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#4b552a] mb-4">Fattening</h2>
                    <p className="text-gray-700 leading-relaxed max-w-4xl">
                        Program Fattening Domba berfokus pada penguatan usaha penggemukan untuk meningkatkan bobot dan nilai jual ternak dalam waktu yang lebih singkat. Program ini mendukung peternak melalui penyediaan bakalan, pakan berkualitas, serta pendampingan teknis agar proses penggemukan berjalan optimal dan efisien.
                    </p>
                </div>

                <div ref={fatteningGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {fatteningData.map((item, index) => (
                        <div 
                            key={item.id} 
                            className={`bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col hover:shadow-lg transition-all duration-300 ${fatteningGridVisible ? "animate-fade-up" : "opacity-0"}`}
                            style={{ animationDelay: fatteningGridVisible ? `${index * 0.1}s` : '0s' }}
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
                                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                                    {item.deskripsi}
                                </p>
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

            {/* 5. SECTION BREEDING */}
            <section className="container mx-auto px-6 md:px-12 pb-24">
                <div ref={breedingHeaderRef} className={`mb-10 ${breedingHeaderVisible ? "animate-fade-up" : "opacity-0"}`}>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#4b552a] mb-4">Breeding</h2>
                    <p className="text-gray-700 leading-relaxed max-w-4xl">
                        Program Breeding Domba berfokus pada pengembangan pembibitan untuk meningkatkan kualitas dan ketersediaan populasi ternak secara berkelanjutan. Program ini mendorong peternak untuk menghasilkan bakalan unggul melalui manajemen reproduksi, perawatan indukan, serta pendampingan teknis yang terstruktur.
                    </p>
                </div>

                {/* Grid 3 Kolom */}
                <div ref={breedingGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {breedingData.map((item, index) => (
                        <div 
                            key={item.id} 
                            className={`bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col hover:shadow-lg transition-all duration-300 ${breedingGridVisible ? "animate-fade-up" : "opacity-0"}`}
                            style={{ animationDelay: breedingGridVisible ? `${index * 0.1}s` : '0s' }}
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
                                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                                    {item.deskripsi}
                                </p>
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

            {/* 6. MODAL / POP-UP PENJELASAN */}
            {isModalOpen && selectedKegiatan && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
                        
                        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-[#f7ffda]">
                            <h3 className="text-2xl font-bold text-[#4b552a]">
                                Peternakan di {selectedKegiatan.kota}
                            </h3>
                            <button 
                                onClick={handleCloseModal}
                                className="p-2 bg-white rounded-full text-gray-500 hover:text-red-500 hover:bg-red-50 transition shadow-sm cursor-pointer"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-8 overflow-y-auto text-gray-700 leading-relaxed text-justify whitespace-pre-wrap">
                            {selectedKegiatan.penjelasanPanjang}
                        </div>

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

            {/* 7. FOOTER */}
            <Footer />
        </div>
    );
}