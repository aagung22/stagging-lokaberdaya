import { Head, Link } from "@inertiajs/react";
import { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import {
    Users,
    Leaf,
    Building2,
    MapPin,
    Phone,
    Mail,
    Send,
    User,
    ArrowRight,
} from "lucide-react";

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

    return [ref, visible];
}

// --- KOMPONEN: animated counter ---
function Counter({ end, duration = 1500 }) {
    const [value, setValue] = useState(0);
    const [ref, visible] = useReveal();

    useEffect(() => {
        if (!visible) return;
        let start = null;
        const step = (ts) => {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [visible, end, duration]);

    return <span ref={ref}>{value}</span>;
}

export default function Landing() {
    // --- LOGIKA SLIDER HERO ---
    const heroImages = [
        "/images/landing-umkm.webp",
        "/images/landing-peternakan.webp",
        "/images/agriculture.webp",
        "/images/agroforestry.webp",
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1,
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [heroImages.length]);

    // --- REVEAL REFS ---
    const [aboutRef, aboutVisible] = useReveal();
    const [visiRef, visiVisible] = useReveal();
    const [programHeaderRef, programHeaderVisible] = useReveal();
    const [programRef, programVisible] = useReveal();
    const [testiRef, testiVisible] = useReveal();
    const [mitraRef, mitraVisible] = useReveal();
    const [kontakRef, kontakVisible] = useReveal();

    // --- HERO ANIMATION STATE ---
    const [heroLoaded, setHeroLoaded] = useState(false);
    useEffect(() => {
        const t = setTimeout(() => setHeroLoaded(true), 100);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className="min-h-screen bg-white font-sans text-gray-800">
            <Head title="Loka Berdaya Amerta" />

            {/* GLOBAL KEYFRAMES */}
            <style>{`
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
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
                    to { width: 4rem; }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                @keyframes pulseRing {
                    0% { box-shadow: 0 0 0 0 rgba(75, 85, 42, 0.4); }
                    70% { box-shadow: 0 0 0 12px rgba(75, 85, 42, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(75, 85, 42, 0); }
                }
                .animate-fade-up { animation: fadeUp 0.8s cubic-bezier(.22,.61,.36,1) both; }
                .animate-fade-in { animation: fadeIn 1s ease both; }
                .animate-slide-left { animation: slideInLeft 1s cubic-bezier(.22,.61,.36,1) both; }
                .animate-slide-right { animation: slideInRight 1s cubic-bezier(.22,.61,.36,1) both; }
                .animate-grow { animation: growWidth 0.8s ease both; }
                .animate-float { animation: float 4s ease-in-out infinite; }
                .animate-pulse-ring { animation: pulseRing 2s ease-out infinite; }
                .delay-100 { animation-delay: .1s; }
                .delay-200 { animation-delay: .2s; }
                .delay-300 { animation-delay: .3s; }
                .delay-400 { animation-delay: .4s; }
                .delay-500 { animation-delay: .5s; }
                .delay-700 { animation-delay: .7s; }
                .reveal { opacity: 0; transform: translateY(40px); transition: opacity .8s ease, transform .8s cubic-bezier(.22,.61,.36,1); }
                .reveal.is-visible { opacity: 1; transform: translateY(0); }
            `}</style>

            {/* 1. NAVBAR */}
            <Navbar />

            {/* 2. HERO SECTION - FULL SCREEN */}
            <section className="relative w-full h-screen overflow-hidden">
                <div className="relative w-full h-full">
                    {heroImages.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`Hero Background ${index + 1}`}
                            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${
                                index === currentImageIndex
                                    ? "opacity-100 z-10 scale-105"
                                    : "opacity-0 z-0"
                            }`}
                            style={{
                                transition:
                                    "opacity 1s ease-in-out, transform 6s ease-out",
                                transform:
                                    index === currentImageIndex
                                        ? "scale(1.05)"
                                        : "scale(1)",
                            }}
                        />
                    ))}

                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-20"></div>

                    <div className="absolute inset-0 z-30 container mx-auto px-6 md:px-12 flex flex-col items-start justify-center text-left text-white h-full pt-24 md:pt-28">
                        {/* Garis aksen kecil */}
                        <div
                            className={`h-1 bg-[#f7ffda] mb-6 rounded-full ${
                                heroLoaded ? "animate-grow" : "w-0"
                            }`}
                            style={{ width: heroLoaded ? "4rem" : "0" }}
                        ></div>

                        <h1
                            className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight max-w-3xl mb-4 drop-shadow-xl ${
                                heroLoaded
                                    ? "animate-fade-up delay-100"
                                    : "opacity-0"
                            }`}
                        >
                            Tumbuhkan Kesejahteraan
                            <br />
                            <span className="text-[#f7ffda]">
                                dengan Pemberdayaan
                            </span>
                        </h1>

                        <p
                            className={`text-base md:text-lg lg:text-xl font-normal max-w-xl text-gray-100 drop-shadow-md leading-relaxed ${
                                heroLoaded
                                    ? "animate-fade-up delay-300"
                                    : "opacity-0"
                            }`}
                        >
                            Budayakan Potensi Lokal untuk Tumbuhkan
                            Kesejahteraan
                        </p>

                        <div
                            className={`flex gap-3 mt-8 ${
                                heroLoaded
                                    ? "animate-fade-up delay-500"
                                    : "opacity-0"
                            }`}
                        >
                            {heroImages.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    className={`h-3 rounded-full transition-all duration-300 ${
                                        index === currentImageIndex
                                            ? "bg-[#f7ffda] w-8"
                                            : "bg-white/50 hover:bg-white w-3"
                                    }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. STATS BAR */}
            <div
                className={`container mx-auto px-6 md:px-12 relative z-40 mt-12 md:mt-16 ${
                    heroLoaded ? "animate-fade-up delay-700" : "opacity-0"
                }`}
            >
                <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col md:flex-row justify-around items-center gap-6 border border-gray-100">
                    <div className="flex flex-col items-center text-center gap-1 transition-transform duration-300 hover:-translate-y-1">
                        <div className="p-3 bg-[#f7ffda] rounded-full text-[#4b552a] mb-1">
                            <Users size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">
                            <Counter end={491} />
                        </h3>
                        <p className="text-xs text-gray-500 font-medium">
                            Penerima Manfaat
                        </p>
                    </div>
                    <div className="hidden md:block w-px h-12 bg-gray-200"></div>
                    <div className="flex flex-col items-center text-center gap-1 transition-transform duration-300 hover:-translate-y-1">
                        <div className="p-3 bg-[#f7ffda] rounded-full text-[#4b552a] mb-1">
                            <Leaf size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">
                            <Counter end={4} />
                        </h3>
                        <p className="text-xs text-gray-500 font-medium">
                            Program
                        </p>
                    </div>
                    <div className="hidden md:block w-px h-12 bg-gray-200"></div>
                    <div className="flex flex-col items-center text-center gap-1 transition-transform duration-300 hover:-translate-y-1">
                        <div className="p-3 bg-[#f7ffda] rounded-full text-[#4b552a] mb-1">
                            <Building2 size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">
                            <Counter end={28} />
                        </h3>
                        <p className="text-xs text-gray-500 font-medium">
                            Titik Pemberdayaan
                        </p>
                    </div>
                </div>
            </div>

            {/* 4. TENTANG KAMI */}
            <section className="container mx-auto px-6 md:px-12 py-24">
                <div className="flex flex-col md:flex-row items-center gap-16">
                    <div
                        ref={aboutRef}
                        className={`w-full md:w-1/2 relative ${
                            aboutVisible ? "animate-slide-left" : "opacity-0"
                        }`}
                    >
                        <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl group">
                            <img
                                src="/images/tentang.webp"
                                alt="Petani Sawah"
                                className="object-cover w-full h-[400px] md:h-[500px] transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="absolute -bottom-8 -right-8 bg-[#9c8e4d] text-white p-6 md:p-8 rounded-2xl shadow-xl flex flex-col items-center justify-center min-w-[120px] md:min-w-[150px] z-20 animate-float">
                            <span className="text-4xl md:text-5xl font-bold">
                                30
                            </span>
                            <span className="text-xs md:text-sm font-medium text-center leading-tight mt-1">
                                Tahun
                                <br />
                                Berkarya
                            </span>
                        </div>
                        <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-[#4b552a] rounded-tl-3xl z-0"></div>
                    </div>

                    <div
                        className={`w-full md:w-1/2 mt-8 md:mt-0 ${
                            aboutVisible ? "animate-slide-right" : "opacity-0"
                        }`}
                    >
                        <span className="text-[#4b552a] font-bold tracking-wider uppercase text-sm mb-3 flex items-center gap-2">
                            <span className="w-8 h-[2px] bg-[#4b552a]"></span>{" "}
                            Tentang Kami
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            Sekilas Tentang <br /> Loka Berdaya Amerta
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-8 text-base md:text-lg">
                            Sebuah lembaga yang berkomitmen untuk mendorong
                            pemberdayaan masyarakat, inovasi, dan pembangunan
                            berkelanjutan. Loka Berdaya Amerta adalah lembaga
                            pionir dalam pemberdayaan masyarakat yang fokus pada
                            peningkatan keterampilan, ekonomi, pendidikan, dan
                            keberlanjutan lingkungan melalui kolaborasi lintas
                            sektor.
                        </p>
                        <button className="flex items-center gap-2 text-[#4b552a] font-bold hover:gap-4 transition-all duration-300 group">
                            Pelajari Lebih Lanjut{" "}
                            <ArrowRight
                                size={20}
                                className="transition-transform duration-300 group-hover:translate-x-1"
                            />
                        </button>
                    </div>
                </div>
            </section>

            {/* 5. VISI & MISI */}
            <section className="container mx-auto px-6 md:px-12 pb-24">
                <div
                    ref={visiRef}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    <div
                        className={`bg-[#4b552a] p-8 md:p-10 rounded-3xl shadow-lg text-white relative overflow-hidden group transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                            visiVisible ? "animate-fade-up" : "opacity-0"
                        }`}
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-125"></div>
                        <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                            <Leaf size={28} /> Visi
                        </h3>
                        <p className="text-gray-100 leading-relaxed text-base md:text-lg relative z-10">
                            Menjadi lembaga pionir dalam pemberdayaan
                            masyarakat, menciptakan lingkungan yang berdaya,
                            berdamai, dan berkelanjutan.
                        </p>
                    </div>
                    <div
                        className={`bg-[#eff5da] p-8 md:p-10 rounded-3xl shadow-sm border border-[#dce5c0] relative overflow-hidden group transition-all duration-500 hover:shadow-xl hover:-translate-y-2 ${
                            visiVisible
                                ? "animate-fade-up delay-200"
                                : "opacity-0"
                        }`}
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#4b552a]/5 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-125"></div>
                        <h3 className="text-2xl font-bold text-[#4b552a] mb-4 flex items-center gap-3">
                            <Building2 size={28} /> Misi
                        </h3>
                        <ul className="text-gray-700 leading-relaxed text-base md:text-lg list-disc pl-5 space-y-3 relative z-10">
                            <li>
                                Mengembangkan program pemberdayaan masyarakat
                                yang berfokus pada peningkatan keterampilan,
                                kesejahteraan ekonomi, dan pendidikan.
                            </li>
                            <li>
                                Mendorong inovasi dan pengembangan teknologi
                                yang ramah lingkungan untuk mendukung
                                pembangunan berkelanjutan.
                            </li>
                            <li>
                                Menjadi mitra strategis bagi pemerintah, lembaga
                                swadaya masyarakat, dan sektor bisnis dalam
                                mengatasi berbagai tantangan pembangunan.
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* 6. PROGRAM UTAMA */}
            <section className="bg-gray-50 py-24">
                <div className="container mx-auto px-6 md:px-12">
                    <div
                        ref={programHeaderRef}
                        className={`flex flex-col md:flex-row justify-between items-end mb-12 ${
                            programHeaderVisible
                                ? "animate-fade-up"
                                : "opacity-0"
                        }`}
                    >
                        <div>
                            <span className="text-[#9c8e4d] font-bold tracking-wider uppercase text-sm mb-2 block">
                                Apa Yang Kami Lakukan
                            </span>
                            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 max-w-lg leading-tight">
                                Program Utama Pemberdayaan Masyarakat
                            </h2>
                        </div>
                        <Link
                            href="/program"
                            className="mt-6 md:mt-0 text-[#4b552a] font-bold flex items-center gap-2 hover:gap-3 transition-all group"
                        >
                            Lihat Semua Program{" "}
                            <ArrowRight
                                size={20}
                                className="transition-transform duration-300 group-hover:translate-x-1"
                            />
                        </Link>
                    </div>

                    <div
                        ref={programRef}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                        {[
                            {
                                img: "/images/agriculture.webp",
                                alt: "Agriculture",
                                title: "Program Agriculture",
                                desc: "Mendorong ketahanan pangan melalui peningkatan produktivitas dan kemandirian petani secara berkelanjutan.",
                                href: "/program/agriculture",
                            },
                            {
                                img: "/images/agroforestry.webp",
                                alt: "Agroforestry",
                                title: "Agroforestry dan Perkebunan",
                                desc: "Meningkatkan hasil pertanian melalui integrasi tanaman hutan dan perkebunan untuk meningkatkan pendapatan sekaligus menjaga kelestarian lingkungan.",
                                href: "/program/agroforestry",
                            },
                            {
                                img: "/images/peternakan.webp",
                                alt: "Peternakan",
                                title: "Program Peternakan",
                                desc: "Mendorong peternak berdaya melalui penguatan modal usaha dan akses pasar yang lebih luas.",
                                href: "/program/peternakan",
                            },
                            {
                                img: "/images/umkm.webp",
                                alt: "UMKM",
                                title: "UMKM Bangkit",
                                desc: "Hadirkan akses pembiayaan tanpa riba untuk mendorong pertumbuhan usaha kecil yang berdaya.",
                                href: "/program/umkm",
                            },
                        ].map((p, i) => (
                            <div
                                key={p.href}
                                className={`bg-white rounded-2xl overflow-hidden shadow-md flex flex-col sm:flex-row border border-gray-100 group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ${
                                    programVisible
                                        ? "animate-fade-up"
                                        : "opacity-0"
                                }`}
                                style={{
                                    animationDelay: programVisible
                                        ? `${i * 0.15}s`
                                        : "0s",
                                }}
                            >
                                <div className="w-full sm:w-1/2 h-48 sm:h-auto overflow-hidden">
                                    <img
                                        src={p.img}
                                        alt={p.alt}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>
                                <div className="p-6 flex flex-col justify-between w-full sm:w-1/2">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            {p.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                                            {p.desc}
                                        </p>
                                    </div>
                                    <Link
                                        href={p.href}
                                        className="inline-flex items-center gap-2 text-[#4b552a] font-semibold text-sm hover:underline mt-2 w-max group/link"
                                    >
                                        Selengkapnya{" "}
                                        <ArrowRight
                                            size={16}
                                            className="transition-transform duration-300 group-hover/link:translate-x-1"
                                        />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. MAP SECTION */}
            <section className="container mx-auto px-6 md:px-12 py-24 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-[#4b552a] mb-8">
                    Temukan Kami di
                </h2>
                <div className="w-full h-[300px] md:h-[400px] bg-gray-200 rounded-2xl overflow-hidden shadow-md relative">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.307548570149!2d112.67889967357418!3d-7.431179073205722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7e132a4632891%3A0x4058849ad5fd97eb!2sYatim%20Mandiri%20Sidoarjo%3A%20Lembaga%20Amil%20Zakat%20Nasional!5e0!3m2!1sid!2sid!4v1793240614969!5m2!1sid!2sid"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="absolute inset-0"
                    ></iframe>
                </div>
            </section>

            {/* 8. TESTIMONI */}
            <section
                ref={testiRef}
                className="container mx-auto px-6 md:px-12 pb-24 text-center"
            >
                <div
                    className={`inline-block bg-[#9c8e4d] text-white px-4 py-1 rounded-full text-sm font-semibold mb-4 ${
                        testiVisible ? "animate-fade-up" : "opacity-0"
                    }`}
                >
                    Testimoni Penerima Manfaat
                </div>
                <h2
                    className={`text-3xl md:text-5xl font-bold text-[#4b552a] mb-4 leading-tight ${
                        testiVisible ? "animate-fade-up delay-100" : "opacity-0"
                    }`}
                >
                    Kata Penerima Manfaat Tentang
                    <br />
                    Program Loka Berdaya Amerta
                </h2>
                <p
                    className={`text-gray-600 mb-16 max-w-2xl mx-auto ${
                        testiVisible ? "animate-fade-up delay-200" : "opacity-0"
                    }`}
                >
                    Cerita nyata dari peserta, relawan, dan masyarakat yang
                    telah merasakan dampak langsung dari program pemberdayaan.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                    {[
                        {
                            quote: '"Saya sangat merasakan dampak dari program pemberdayaan dari Loka Berdaya Amerta. Terimakasih LBA"',
                            name: "Pak Duwi",
                            role: "Petani",
                        },
                        {
                            quote: '"Melalui program Gen Mandiri saya menjadi pemuda yang lebih melek akan potensi diri dan potensi lingkungan untuk bisnis"',
                            name: "Mas Abdul",
                            role: "Alumni Gen Mandiri",
                        },
                        {
                            quote: '"Terimakasih LBA, dengan program kesejahteraan perempuan, Kami para perempuan bisa tetap berkarya"',
                            name: "Ibu Setiani",
                            role: "PM Bunda Bisa",
                        },
                    ].map((t, i) => (
                        <div
                            key={t.name}
                            className={`bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex flex-col justify-between hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 relative overflow-hidden ${
                                testiVisible ? "animate-fade-up" : "opacity-0"
                            }`}
                            style={{
                                animationDelay: testiVisible
                                    ? `${0.3 + i * 0.15}s`
                                    : "0s",
                            }}
                        >
                            <div className="absolute top-0 right-0 w-20 h-20 bg-[#f7ffda] rounded-bl-full -mr-4 -mt-4"></div>
                            <div className="mb-8 relative z-10">
                                <span className="text-6xl text-[#4b552a] absolute -top-6 -left-2 z-0 font-serif opacity-20">
                                    "
                                </span>
                                <p className="text-gray-700 relative z-10 text-lg leading-relaxed italic">
                                    {t.quote}
                                </p>
                            </div>
                            <div className="flex items-center gap-4 mt-auto">
                                <div className="w-14 h-14 bg-[#eff5da] rounded-full flex items-center justify-center text-[#4b552a]">
                                    <User size={28} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#4b552a] text-lg">
                                        {t.name}
                                    </h4>
                                    <p className="text-sm text-gray-500 font-medium">
                                        {t.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 9. MITRA KOLABORATOR */}
            <section
                ref={mitraRef}
                className="container mx-auto px-6 md:px-12 pb-24"
            >
                <div
                    className={`bg-[#f7ffda] p-8 md:p-14 rounded-[3rem] shadow-sm border border-[#dce5c0] flex flex-col md:flex-row items-center justify-between gap-12 ${
                        mitraVisible ? "animate-fade-up" : "opacity-0"
                    }`}
                >
                    <div className="w-full md:w-1/3">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#4b552a] mb-4">
                            Mitra Kolaborator
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                            Loka Berdaya Amerta telah berkolaborasi dengan
                            berbagai mitra strategis dalam melaksanakan program
                            pemberdayaan ekonomi dan sosial.
                        </p>
                    </div>

                    <div className="w-full md:w-2/3 flex flex-wrap items-center justify-center md:justify-end gap-6 md:gap-8">
                        {[1, 2, 3].map((n) => (
                            <div
                                key={n}
                                className="flex items-center justify-center h-16 md:h-20 w-32 md:w-40 bg-white/60 backdrop-blur-sm border border-white rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                            >
                                <span className="text-[#4b552a] font-bold text-xs md:text-sm">
                                    Logo Mitra {n}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 10. HUBUNGI KAMI SECTION */}
            <section
                ref={kontakRef}
                className="container mx-auto px-6 md:px-12 pb-24"
            >
                <div
                    className={`grid grid-cols-1 md:grid-cols-2 gap-0 rounded-[3rem] overflow-hidden shadow-2xl bg-white ${
                        kontakVisible ? "animate-fade-up" : "opacity-0"
                    }`}
                >
                    <div className="bg-[#4b552a] p-8 md:p-16 text-white relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full -mr-10 -mt-10"></div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-2">
                            Hubungi Kami
                        </h2>
                        <p className="text-[#f7ffda]/80 mb-10">
                            Punya pertanyaan khusus untuk kami?
                        </p>

                        <form
                            className="space-y-6"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Nama *"
                                        className="w-full bg-transparent border-b border-white/30 px-0 py-3 text-white placeholder-white/60 focus:outline-none focus:border-[#f7ffda] transition rounded-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        placeholder="Email *"
                                        className="w-full bg-transparent border-b border-white/30 px-0 py-3 text-white placeholder-white/60 focus:outline-none focus:border-[#f7ffda] transition rounded-none"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <input
                                    type="tel"
                                    placeholder="No. Telepon"
                                    className="w-full bg-transparent border-b border-white/30 px-0 py-3 text-white placeholder-white/60 focus:outline-none focus:border-[#f7ffda] transition rounded-none"
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Subject"
                                    className="w-full bg-transparent border-b border-white/30 px-0 py-3 text-white placeholder-white/60 focus:outline-none focus:border-[#f7ffda] transition rounded-none"
                                />
                            </div>
                            <div>
                                <textarea
                                    rows={4}
                                    placeholder="Pesan"
                                    className="w-full bg-transparent border-b border-white/30 px-0 py-3 text-white placeholder-white/60 focus:outline-none focus:border-[#f7ffda] transition resize-none rounded-none"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="mt-4 flex items-center gap-2 bg-[#f7ffda] text-[#4b552a] px-8 py-3 rounded-full font-bold hover:bg-white hover:gap-3 transition-all duration-300 w-max animate-pulse-ring"
                            >
                                <Send size={18} /> KIRIM PESAN
                            </button>
                        </form>
                    </div>

                    <div className="bg-[#fcfcfc] p-8 md:p-16 flex flex-col justify-center">
                        <span className="text-[#9c8e4d] font-semibold tracking-wider uppercase mb-2 block">
                            Lebih Lanjut
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 leading-tight">
                            Kontak Kami
                        </h2>

                        <div className="space-y-8">
                            <div className="flex items-start gap-5 group">
                                <div className="bg-[#eff5da] p-3 rounded-2xl text-[#4b552a] shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-1">
                                        Telepon / WhatsApp
                                    </h4>
                                    <p className="text-gray-600">
                                        081 330003450
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-5 group">
                                <div className="bg-[#eff5da] p-3 rounded-2xl text-[#4b552a] shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-1">
                                        Email
                                    </h4>
                                    <p className="text-gray-600">
                                        info@lokaberdaya.com
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-5 group">
                                <div className="bg-[#eff5da] p-3 rounded-2xl text-[#4b552a] shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-1">
                                        Alamat Kantor
                                    </h4>
                                    <p className="text-gray-600 leading-relaxed">
                                        Jl. Sarirogo No. 1, Sari Rogo, Kec.
                                        Sidoarjo, Kabupaten Sidoarjo, Jawa Timur
                                        61234
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 11. FOOTER */}
            <Footer />
        </div>
    );
}
