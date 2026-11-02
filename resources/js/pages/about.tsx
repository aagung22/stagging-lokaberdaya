import { Head, Link } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Leaf, Heart, TrendingUp, ArrowRight } from 'lucide-react';

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
            { threshold: 0.15, ...options },
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return [ref, visible] as const;
}

export default function About() {
    // --- REVEAL REFS ---
    const [storyRef, storyVisible] = useReveal();
    const [valuesTextRef, valuesTextVisible] = useReveal();
    const [valuesImgRef, valuesImgVisible] = useReveal();

    // --- HERO ANIMATION STATE ---
    const [heroLoaded, setHeroLoaded] = useState(false);
    useEffect(() => {
        const t = setTimeout(() => setHeroLoaded(true), 100);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className="min-h-screen bg-white font-sans text-gray-800 overflow-hidden">
            <Head title="Tentang Kami - Loka Berdaya Amerta" />

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
                @keyframes growWidth {
                    from { width: 0; }
                    to { width: 6rem; }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-fade-up { animation: fadeUp 0.8s cubic-bezier(.22,.61,.36,1) both; }
                .animate-slide-left { animation: slideInLeft 1s cubic-bezier(.22,.61,.36,1) both; }
                .animate-slide-right { animation: slideInRight 1s cubic-bezier(.22,.61,.36,1) both; }
                .animate-grow { animation: growWidth 0.8s ease both; }
                .animate-float { animation: float 4s ease-in-out infinite; }
                .delay-100 { animation-delay: .1s; }
                .delay-200 { animation-delay: .2s; }
                .delay-300 { animation-delay: .3s; }
                .delay-400 { animation-delay: .4s; }
            `}</style>

            {/* 1. NAVBAR */}
            <Navbar />

            {/* 2. HERO SECTION */}
            <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-[#f7ffda]">
                {/* Ornamen Latar Belakang */}
                <div className="absolute top-20 -left-20 w-72 h-72 bg-[#eff5da] rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
                <div className="absolute top-40 -right-20 w-72 h-72 bg-[#e5edcb] rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>

                <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row items-center gap-12">
                    {/* Kiri: Teks (Animasi Slide Left) */}
                    <div className={`w-full md:w-1/2 ${heroLoaded ? "animate-slide-left" : "opacity-0"}`}>
                        <span className="inline-block bg-[#4b552a] text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-6 shadow-sm">
                            Lebih dari 30 Tahun Berbakti
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#4b552a] leading-tight mb-6">
                            Menggali Potensi Lokal <br />
                            Untuk Kemajuan Sosial
                        </h1>
                        <p className="text-lg text-gray-600 leading-relaxed mb-8">
                            Loka Berdaya Amerta hadir sebagai respons atas kebutuhan akan perubahan sosial yang inklusif, berkelanjutan, dan berbasis potensi lokal.
                        </p>
                        <Link 
                            href="/kontak" 
                            className="inline-flex items-center gap-2 bg-[#4b552a] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#3a4220] transition shadow-lg"
                        >
                            Bergabung Bersama Kami <ArrowRight size={18} />
                        </Link>
                    </div>

                    {/* Kanan: Gambar (Animasi Slide Right) */}
                    <div className={`w-full md:w-1/2 relative ${heroLoaded ? "animate-slide-right" : "opacity-0"}`}>
                        <div className="absolute inset-0 bg-[#9c8e4d] rounded-3xl transform translate-x-4 translate-y-4 opacity-20"></div>
                        <img 
                            src="/images/halamantentang.webp" 
                            alt="Tentang Loka Berdaya Amerta" 
                            className="relative z-10 w-full h-[400px] object-cover rounded-3xl shadow-xl"
                        />
                    </div>
                </div>
            </section>

            {/* 3. KONTEN CERITA (Animasi Fade Up) */}
            <section ref={storyRef} className="container mx-auto px-6 md:px-12 py-20 max-w-5xl">
                <div className={`text-center mb-12 ${storyVisible ? "animate-fade-up" : "opacity-0"}`}>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Cerita Kami</h2>
                    <div className={`h-1 bg-[#4b552a] mx-auto rounded-full ${storyVisible ? "animate-grow" : "w-0"}`}></div>
                </div>

                <div className="space-y-8 text-gray-600 leading-relaxed text-lg">
                    <p className={`border-l-4 border-[#4b552a] pl-6 italic text-gray-700 bg-gray-50 py-4 pr-4 rounded-r-lg ${storyVisible ? "animate-fade-up delay-100" : "opacity-0"}`}>
                        "Kami percaya bahwa setiap individu dan komunitas memiliki kapasitas untuk tumbuh, berkembang, dan memberi dampak positif apabila diberi ruang dan dukungan yang tepat."
                    </p>
                    <p className={`${storyVisible ? "animate-fade-up delay-200" : "opacity-0"}`}>
                        Loka Berdaya Amerta adalah lembaga pemberdayaan masyarakat yang hadir sebagai respons atas kebutuhan akan perubahan sosial yang inklusif, berkelanjutan, dan berbasis potensi lokal. Berlandaskan semangat kolaborasi dan kemanusiaan, kami berkomitmen menjadi pionir dalam menciptakan lingkungan yang memberdayakan masyarakat dari berbagai latar belakang.
                    </p>
                    <p className={`${storyVisible ? "animate-fade-up delay-300" : "opacity-0"}`}>
                        Melalui program-program strategis di bidang peningkatan keterampilan, pendidikan, dan kesejahteraan ekonomi, Loka Berdaya Amerta membangun ekosistem yang mendorong kemandirian dan keberlanjutan. Kami tidak hanya fokus pada aspek pengembangan individu, tetapi juga pada penguatan komunitas secara menyeluruh. Selain itu, kami turut mendorong inovasi dan pengembangan teknologi yang ramah lingkungan sebagai solusi nyata untuk mendukung pembangunan berkelanjutan dan pelestarian lingkungan hidup.
                    </p>
                    <p className={`${storyVisible ? "animate-fade-up delay-400" : "opacity-0"}`}>
                        Sebagai mitra strategis bagi pemerintah, lembaga swadaya masyarakat, dan sektor bisnis, kami terus memperluas jangkauan dan dampak kerja kami melalui pendekatan yang kolaboratif dan berbasis data. Dengan integritas, transparansi, dan komitmen terhadap nilai-nilai sosial dan budaya, Loka Berdaya Amerta hadir untuk menghadirkan perubahan yang bermakna dan berkelanjutan bagi masyarakat Indonesia.
                    </p>
                </div>
            </section>

            {/* 4. NILAI-NILAI (Teks Slide Kiri, Gambar Slide Kanan) */}
            <section className="bg-[#f7ffda] py-24 overflow-hidden">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        
                        {/* KIRI: Teks dan Kartu Nilai */}
                        <div 
                            ref={valuesTextRef}
                            className={`w-full lg:w-1/2 ${valuesTextVisible ? "animate-slide-left" : "opacity-0"}`}
                        >
                            <div className="mb-10">
                                <h2 className="text-3xl md:text-4xl font-bold text-[#4b552a] mb-4">Nilai Perjuangan Kami</h2>
                                <p className="text-gray-600 text-lg">Pondasi dari setiap langkah yang kami ambil.</p>
                            </div>

                            <div className="flex flex-col gap-6">
                                {/* Kartu 1 */}
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-6 hover:-translate-y-1 transition duration-300">
                                    <div className="w-14 h-14 bg-[#eff5da] rounded-full flex-shrink-0 flex items-center justify-center text-[#4b552a]">
                                        <Leaf size={28} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">#Berdaya</h3>
                                        <p className="text-gray-600 leading-relaxed">Membangun kemandirian masyarakat melalui penguatan kapasitas dan potensi lokal.</p>
                                    </div>
                                </div>
                                {/* Kartu 2 */}
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-6 hover:-translate-y-1 transition duration-300">
                                    <div className="w-14 h-14 bg-[#eff5da] rounded-full flex-shrink-0 flex items-center justify-center text-[#4b552a]">
                                        <Heart size={28} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">#Berdampak</h3>
                                        <p className="text-gray-600 leading-relaxed">Menghadirkan perubahan nyata yang dirasakan langsung oleh masyarakat luas.</p>
                                    </div>
                                </div>
                                {/* Kartu 3 */}
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-6 hover:-translate-y-1 transition duration-300">
                                    <div className="w-14 h-14 bg-[#eff5da] rounded-full flex-shrink-0 flex items-center justify-center text-[#4b552a]">
                                        <TrendingUp size={28} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">#Berkelanjutan</h3>
                                        <p className="text-gray-600 leading-relaxed">Memastikan setiap program memberikan manfaat jangka panjang bagi generasi mendatang.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* KANAN: Gambar Transparan */}
                        <div 
                            ref={valuesImgRef}
                            className={`w-full lg:w-1/2 relative flex justify-center mt-12 lg:mt-0 ${valuesImgVisible ? "animate-slide-right" : "opacity-0"}`}
                        >
                            
                            {/* Ornamen lingkaran di belakang gambar */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[450px] md:h-[450px] bg-[#eff5da] rounded-full z-0 opacity-60"></div>

                            <img 
                                src="/images/bgtentang.webp"
                                alt="Perempuan Berdaya Loka Berdaya Amerta" 
                                className={`relative z-10 w-full max-w-full h-auto object-contain ${valuesImgVisible ? 'animate-float' : ''}`}
                                style={{
                                    /* Trik CSS Masking: Membuat pinggiran gambar memudar dan menyatu dengan background */
                                    maskImage: 'radial-gradient(circle at center, black 50%, transparent 85%)',
                                    WebkitMaskImage: 'radial-gradient(circle at center, black 50%, transparent 85%)'
                                }}
                            />
                        </div>

                    </div>
                </div>
            </section>

            {/* 5. FOOTER */}
            <Footer />
        </div>
    );
}