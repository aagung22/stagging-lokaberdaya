import { useState, useEffect, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Users, Wallet, MapPin, TrendingUp, X } from 'lucide-react';

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

// Data diambil dari naskah UMKM.docx + Tambahan Gambar Cover (Array untuk Slider)
const umkmData = [
    {
        id: 1,
        kota: "Banyuwangi",
        jumlahPM: 3,
        // Menggunakan gambar lokal
        gambar: [
            "/images/halamanumkm/masruroh.webp",
            "/images/halamanumkm/nurjannah.webp",
            "/images/halamanumkm/umaita.webp"
        ],
        penerimaManfaat: [
            { nama: "Nur Jannah", usaha: "Pentol Tahu" },
            { nama: "Masruroh", usaha: "Jajanan Pasar" },
            { nama: "Umaita", usaha: "Jajanan Pasar" }
        ]
    },
    {
        id: 2,
        kota: "Probolinggo",
        jumlahPM: 3,
        gambar: [
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=800&auto=format&fit=crop"
        ],
        penerimaManfaat: [
            { nama: "Kamiliya", usaha: "Warung snack dan minuman es" },
            { nama: "Sulastri", usaha: "Nasi pecel dan nasi jagung" },
            { nama: "Wiwin Hernawati", usaha: "Kue Basah" }
        ]
    },
    {
        id: 3,
        kota: "Surabaya",
        jumlahPM: 5,
        gambar: [
            "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop"
        ],
        penerimaManfaat: [
            { nama: "Dwi Lestari Fatmawati", usaha: "Es cup dan kue Homemade" },
            { nama: "Sami", usaha: "Rujak, Es dan Makanan Ringan" },
            { nama: "Samiah", usaha: "Gorengan dan Sinom" },
            { nama: "Sulistiyani", usaha: "Es Cup" },
            { nama: "Nur Fadilah", usaha: "Kuliner" }
        ]
    },
    {
        id: 4,
        kota: "Jombang",
        jumlahPM: 1,
        gambar: ["https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop"],
        penerimaManfaat: [{ nama: "Marlia Rochmawatie", usaha: "Gorengan" }]
    },
    {
        id: 5,
        kota: "Ponorogo",
        jumlahPM: 1,
        gambar: ["https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=800&auto=format&fit=crop"],
        penerimaManfaat: [{ nama: "Sri Purwaningsih", usaha: "Snack box dan roti" }]
    },
    {
        id: 6,
        kota: "Tuban",
        jumlahPM: 3,
        gambar: ["https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop"],
        penerimaManfaat: [
            { nama: "Ana Wiwit Sugiarto", usaha: "Kue Basah" },
            { nama: "Debi Frendy Setiyawan", usaha: "Toko Kelontong" },
            { nama: "Pujianto", usaha: "Ternak Lele" }
        ]
    },
    {
        id: 7,
        kota: "Tulungagung",
        jumlahPM: 4,
        gambar: ["https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=800&auto=format&fit=crop"],
        penerimaManfaat: [
            { nama: "Dyah Purwaningsih", usaha: "Nasi dan Rujak" },
            { nama: "Fitrita Febriana", usaha: "Toko Kelontong" },
            { nama: "Minggir Supriyadi", usaha: "Warung Kopi" },
            { nama: "Siti Mualifah", usaha: "Pentol" }
        ]
    },
    {
        id: 8,
        kota: "Ngawi",
        jumlahPM: 1,
        gambar: ["https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=800&auto=format&fit=crop"],
        penerimaManfaat: [{ nama: "Siti Khoriah", usaha: "Toko Kelontong" }]
    },
    {
        id: 9,
        kota: "Solo",
        jumlahPM: 2,
        gambar: ["https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop"],
        penerimaManfaat: [
            { nama: "Santy Saputry", usaha: "Dimsum" },
            { nama: "Tri Ratna Ningsih", usaha: "Cilok dan Es" }
        ]
    },
    {
        id: 10,
        kota: "Yogyakarta",
        jumlahPM: 5,
        gambar: ["https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop"],
        penerimaManfaat: [
            { nama: "Rischatorin", usaha: "Kopi Berkah" },
            { nama: "Nur Aini Azizah", usaha: "Laundry" },
            { nama: "Suyati", usaha: "Warung Makan dan Catering" },
            { nama: "Muhamad Syiroji", usaha: "Tambal Ban" },
            { nama: "Syarifah Ulfa Rohmah", usaha: "Wedang Uwuh" }
        ]
    },
    {
        id: 11,
        kota: "Bandung",
        jumlahPM: 3,
        gambar: ["https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop"],
        penerimaManfaat: [
            { nama: "Jajang Saepuloh", usaha: "Gorengan dan Kopi" },
            { nama: "Lilis Saadah", usaha: "Gorengan" },
            { nama: "Muhamad Ruhendi", usaha: "Gorengan" }
        ]
    },
    {
        id: 12,
        kota: "Jakarta Raya",
        jumlahPM: 4,
        gambar: ["https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop"],
        penerimaManfaat: [
            { nama: "Titin Suprihatin", usaha: "Warung Kopi" },
            { nama: "Silfiah", usaha: "Nasi Uduk" },
            { nama: "Supriyani", usaha: "Kue Basah" },
            { nama: "Toijah", usaha: "Kue" }
        ]
    },
    {
        id: 13,
        kota: "Serang",
        jumlahPM: 2,
        gambar: ["https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop"],
        penerimaManfaat: [
            { nama: "Ahmad Fahruroji", usaha: "Pisang Coklat" },
            { nama: "Aris Rismawati", usaha: "Makanan ringan" }
        ]
    }
];

// --- KOMPONEN KARTU DENGAN SLIDER OTOMATIS ---
function UmkmCard({ item, index, visible, onOpenModal }: { item: any, index: number, visible: boolean, onOpenModal: any }) {
    const [currentImgIndex, setCurrentImgIndex] = useState(0);

    // Logika Slide Otomatis
    useEffect(() => {
        if (!item.gambar || item.gambar.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentImgIndex((prevIndex) => (prevIndex + 1) % item.gambar.length);
        }, 3000); // 3 detik

        return () => clearInterval(interval);
    }, [item.gambar]);

    return (
        <div 
            className={`bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col hover:shadow-lg transition-all duration-300 ${visible ? "animate-fade-up" : "opacity-0"}`}
            style={{ animationDelay: visible ? `${index * 0.1}s` : '0s' }}
        >
            
            {/* PERUBAHAN: h-48 menjadi h-60, dan ditambahkan object-top */}
            <div className="h-60 w-full relative overflow-hidden bg-gray-200">
                {item.gambar.map((img: string, i: number) => (
                    <img 
                        key={i}
                        src={img} 
                        alt={`UMKM di ${item.kota} - ${i + 1}`} 
                        className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-1000 ease-in-out ${
                            i === currentImgIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                        }`}
                    />
                ))}

                {/* Badge Jumlah PM */}
                <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm text-[#4b552a] px-3 py-1 rounded-full text-sm font-bold shadow-sm">
                    {item.jumlahPM} PM
                </div>

                {/* Indikator Titik (Dots) di bagian bawah gambar */}
                {item.gambar.length > 1 && (
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
                        {item.gambar.map((_: any, i: number) => (
                            <div 
                                key={i} 
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                    i === currentImgIndex ? "w-6 bg-white" : "w-1.5 bg-white/50"
                                }`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Konten Kartu */}
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.kota}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                    Terdapat {item.jumlahPM} pelaku usaha yang telah mendapatkan pendampingan dan permodalan di wilayah ini.
                </p>
                <button 
                    onClick={() => onOpenModal(item)}
                    className="w-full bg-[#4b552a] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#3a4220] transition mt-auto cursor-pointer"
                >
                    Lihat Penerima Manfaat
                </button>
            </div>
        </div>
    );
}


export default function Umkm() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedKota, setSelectedKota] = useState<any>(null);

    const handleOpenModal = (item: any) => {
        setSelectedKota(item);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedKota(null);
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
            <Head title="Program UMKM Bangkit - Loka Berdaya Amerta" />

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
            `}</style>

            {/* 1. NAVBAR */}
            <Navbar />

            {/* 2. HERO SECTION */}
            <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-[#f7ffda]">
                <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col-reverse md:flex-row items-center gap-12 lg:gap-20">
                    
                    <div className={`w-full md:w-1/2 relative ${heroLoaded ? "animate-slide-right" : "opacity-0"}`}>
                        <img 
                            src="/images/umkm.webp" 
                            alt="Program UMKM Bangkit" 
                            className="w-full h-[400px] md:h-[600px] object-cover rounded-3xl rounded-tr-[6rem] shadow-lg border-4 border-white"
                        />
                    </div>

                    <div className={`w-full md:w-1/2 flex flex-col justify-center ${heroLoaded ? "animate-slide-left" : "opacity-0"}`}>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#4b552a] leading-tight mb-6">
                            UMKM Bangkit
                        </h1>
                        
                        <p className="text-xl text-gray-700 leading-relaxed font-medium mb-6">
                            Hadirkan akses pembiayaan tanpa riba untuk mendorong pertumbuhan usaha kecil yang berdaya.
                        </p>

                        <div className="space-y-4 text-gray-600 leading-relaxed text-justify md:text-left">
                            <p>
                                Program UMKM Bangkit merupakan program pemberdayaan ekonomi melalui penyaluran modal dan pendampingan usaha untuk para pelaku usaha dari keluarga yatim dan dhuafa, berskala mikro dan ultra mikro secara perorangan.
                            </p>
                            <p>
                                Aktivitas program ini menggunakan akad <strong>Qordhul Hasan</strong>, dengan memberikan pendampingan selama 3 bulan, meliputi pendampingan ekonomi, rohani, dan membiasakan diri dengan menabung.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. STATS BAR */}
            <div ref={statsRef} className="container mx-auto px-6 md:px-12 relative z-20 -mt-20 md:-mt-24">
                <div className={`bg-white rounded-3xl shadow-xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 border border-gray-100 ${statsVisible ? "animate-fade-up delay-200" : "opacity-0"}`}>
                    
                    <div className="flex items-center gap-4 w-full md:w-1/4">
                        <div className="w-14 h-14 bg-[#fce4d1] rounded-full flex items-center justify-center flex-shrink-0 text-[#d97736]">
                            <Users size={28} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">37 PM</h3>
                            <p className="text-xs text-gray-500 leading-tight">Penerima Manfaat</p>
                        </div>
                    </div>
                    
                    <div className="hidden md:block w-px h-12 bg-gray-200"></div>
                    
                    <div className="flex items-center gap-4 w-full md:w-1/4">
                        <div className="w-14 h-14 bg-[#fce4d1] rounded-full flex items-center justify-center flex-shrink-0 text-[#d97736]">
                            <Wallet size={28} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">Rp 74 Jt</h3>
                            <p className="text-xs text-gray-500 leading-tight">Modal Tersalurkan</p>
                        </div>
                    </div>

                    <div className="hidden md:block w-px h-12 bg-gray-200"></div>
                    
                    <div className="flex items-center gap-4 w-full md:w-1/4">
                        <div className="w-14 h-14 bg-[#fce4d1] rounded-full flex items-center justify-center flex-shrink-0 text-[#d97736]">
                            <MapPin size={28} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">13 Wilayah</h3>
                            <p className="text-xs text-gray-500 leading-tight">Titik Pemberdayaan</p>
                        </div>
                    </div>

                    <div className="hidden md:block w-px h-12 bg-gray-200"></div>

                    <div className="flex items-center gap-4 w-full md:w-1/4">
                        <div className="w-14 h-14 bg-[#fce4d1] rounded-full flex items-center justify-center flex-shrink-0 text-[#d97736]">
                            <TrendingUp size={28} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">71,65%</h3>
                            <p className="text-xs text-gray-500 leading-tight">Kenaikan Pendapatan</p>
                        </div>
                    </div>

                </div>
            </div>

            {/* 4. SEBARAN PENERIMA MANFAAT SECTION */}
            <section className="container mx-auto px-6 md:px-12 py-24 mt-12">
                <div ref={headerRef} className="text-center mb-16">
                    <h2 className={`text-3xl md:text-4xl font-bold text-[#4b552a] mb-4 ${headerVisible ? "animate-fade-up" : "opacity-0"}`}>
                        Sebaran Penerima Manfaat
                    </h2>
                    <p className={`text-gray-600 max-w-2xl mx-auto ${headerVisible ? "animate-fade-up delay-100" : "opacity-0"}`}>
                        Program UMKM Bangkit telah menjangkau pelaku usaha mikro dan ultra mikro di berbagai wilayah di Indonesia.
                    </p>
                </div>

                {/* Grid Card dengan Komponen UmkmCard */}
                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {umkmData.map((item, index) => (
                        <UmkmCard 
                            key={item.id} 
                            item={item} 
                            index={index} 
                            visible={gridVisible} 
                            onOpenModal={handleOpenModal} 
                        />
                    ))}
                </div>
            </section>

            {/* 5. MODAL / POP-UP DAFTAR PENERIMA MANFAAT */}
            {isModalOpen && selectedKota && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
                        
                        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-[#f7ffda]">
                            <div>
                                <h3 className="text-2xl font-bold text-[#4b552a]">
                                    Penerima Manfaat
                                </h3>
                                <p className="text-sm text-gray-600">Wilayah {selectedKota.kota}</p>
                            </div>
                            <button 
                                onClick={handleCloseModal}
                                className="p-2 bg-white rounded-full text-gray-500 hover:text-red-500 hover:bg-red-50 transition shadow-sm cursor-pointer"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 text-gray-700">
                                            <th className="p-3 border-b-2 border-gray-200 font-semibold rounded-tl-lg">No</th>
                                            <th className="p-3 border-b-2 border-gray-200 font-semibold">Nama</th>
                                            <th className="p-3 border-b-2 border-gray-200 font-semibold rounded-tr-lg">Bidang Usaha</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedKota.penerimaManfaat.map((pm: any, index: number) => (
                                            <tr key={index} className="hover:bg-[#f7ffda]/50 transition">
                                                <td className="p-3 border-b border-gray-100 text-gray-500">{index + 1}</td>
                                                <td className="p-3 border-b border-gray-100 font-medium text-gray-800">{pm.nama}</td>
                                                <td className="p-3 border-b border-gray-100 text-gray-600">{pm.usaha}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
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

            {/* 6. FOOTER */}
            <Footer />
        </div>
    );
}