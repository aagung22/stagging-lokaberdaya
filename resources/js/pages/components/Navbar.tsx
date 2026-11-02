import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown, Menu, X } from 'lucide-react';

export default function Navbar() {
    const [isProgramOpen, setIsProgramOpen] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isMobileProgramOpen, setIsMobileProgramOpen] = useState(false);

    const { url } = usePage();

    const isActive = (path: string) => {
        if (path === '/') return url === '/';
        return url.startsWith(path);
    };

    const isProgramActive = url.startsWith('/program');

    const closeMobile = () => {
        setIsMobileOpen(false);
        setIsMobileProgramOpen(false);
    };

    return (
        <nav className="w-full bg-[#4b552a] px-4 md:px-6 py-2.5 md:py-3 shadow-md fixed top-0 left-0 z-50">
            <div className="container mx-auto flex items-center justify-between">

                {/* 1. KIRI: Logo & Teks */}
                <div className="flex items-center gap-2 md:gap-3">
                    <img
                        src="/images/logo lba.webp"
                        alt="Logo LBA"
                        className="h-10 md:h-14 w-auto object-contain"
                        onError={(e) => e.currentTarget.style.display = 'none'}
                    />
                    <Link
                        href="/"
                        className="text-base md:text-xl font-bold text-white tracking-tight hover:text-[#f7ffda] transition"
                        onClick={closeMobile}
                    >
                        Loka Berdaya Amerta
                    </Link>
                </div>

                {/* 2. KANAN: Menu Desktop + Tombol Login */}
                <div className="hidden md:flex items-center gap-6 lg:gap-12">

                    {/* Menu Navigasi Desktop */}
                    <div className="flex items-center gap-5 lg:gap-7 text-[#f7ffda]/80 font-medium text-sm md:text-[15px]">
                        
                        {/* Beranda */}
                        <Link 
                            href="/" 
                            className={`hover:text-white transition ${isActive('/') ? 'text-white font-bold border-b-2 border-white pb-1' : ''}`}
                        >
                            Beranda
                        </Link>
                        
                        {/* Tentang Kami */}
                        <Link 
                            href="/tentang" 
                            className={`hover:text-white transition ${isActive('/tentang') ? 'text-white font-bold border-b-2 border-white pb-1' : ''}`}
                        >
                            Tentang Kami
                        </Link>
                        
                        {/* Blog */}
                        <Link 
                            href="/blog" 
                            className={`hover:text-white transition ${isActive('/blog') ? 'text-white font-bold border-b-2 border-white pb-1' : ''}`}
                        >
                            Blog
                        </Link>

                        {/* Dropdown Program (Desktop - hover) */}
                        <div
                            className="relative"
                            onMouseEnter={() => setIsProgramOpen(true)}
                            onMouseLeave={() => setIsProgramOpen(false)}
                        >
                            <button 
                                className={`flex items-center gap-1 hover:text-white transition py-2 focus:outline-none cursor-pointer ${
                                    isProgramActive ? 'text-white font-bold' : ''
                                }`}
                            >
                                Program Pemberdayaan
                                <ChevronDown
                                    size={15}
                                    className={`transition-transform duration-200 ${isProgramOpen ? 'rotate-180' : ''}`}
                                />
                            </button>

                            {isProgramOpen && (
                                <div className="absolute top-full left-0 mt-1 w-68 bg-white rounded-xl shadow-xl overflow-hidden py-2 text-gray-700 z-50 border border-gray-100">
                                    <Link href="/program/agriculture" className={`block px-4 py-2.5 hover:bg-[#f7ffda] hover:text-[#4b552a] transition font-medium text-sm ${isActive('/program/agriculture') ? 'bg-[#f7ffda] text-[#4b552a] border-l-4 border-[#4b552a]' : ''}`}>Program Agriculture (Pertanian)</Link>
                                    <Link href="/program/agroforestry" className={`block px-4 py-2.5 hover:bg-[#f7ffda] hover:text-[#4b552a] transition font-medium text-sm ${isActive('/program/agroforestry') ? 'bg-[#f7ffda] text-[#4b552a] border-l-4 border-[#4b552a]' : ''}`}>Program Agroforestry dan Perkebunan</Link>
                                    <Link href="/program/peternakan" className={`block px-4 py-2.5 hover:bg-[#f7ffda] hover:text-[#4b552a] transition font-medium text-sm ${isActive('/program/peternakan') ? 'bg-[#f7ffda] text-[#4b552a] border-l-4 border-[#4b552a]' : ''}`}>Program Peternakan</Link>
                                    <Link href="/program/umkm" className={`block px-4 py-2.5 hover:bg-[#f7ffda] hover:text-[#4b552a] transition font-medium text-sm ${isActive('/program/umkm') ? 'bg-[#f7ffda] text-[#4b552a] border-l-4 border-[#4b552a]' : ''}`}>Program UMKM Bangkit</Link>
                                </div>
                            )}
                        </div>

                        {/* Kontak */}
                        <Link 
                            href="/kontak" 
                            className={`hover:text-white transition ${isActive('/kontak') ? 'text-white font-bold border-b-2 border-white pb-1' : ''}`}
                        >
                            Hubungi Kami
                        </Link>
                    </div>

                    {/* Tombol Login & Register (Desktop) */}
                    <div className="flex items-center gap-4">
                        <Link href="/login" className="text-white font-medium text-sm md:text-[15px] hover:text-[#f7ffda] transition">
                            Log in
                        </Link>
                        <Link href="/register" className="bg-[#f7ffda] text-[#4b552a] px-4 py-2 rounded-md font-bold text-sm md:text-[15px] hover:bg-white transition shadow-sm">
                            Register
                        </Link>
                    </div>
                </div>

                {/* 3. TOMBOL HAMBURGER (Mobile saja) */}
                <button
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    className="md:hidden text-white p-2 -mr-2 focus:outline-none"
                    aria-label="Toggle menu"
                >
                    {isMobileOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>

            {/* 4. MOBILE DRAWER MENU */}
            <div
                className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                    isMobileOpen ? 'max-h-[600px]' : 'max-h-0'
                }`}
            >
                <div className="container mx-auto pt-3 pb-2 flex flex-col gap-1 text-[#f7ffda]/90 font-medium">

                    <Link href="/" onClick={closeMobile} className={`py-2.5 px-2 border-b border-white/10 hover:text-white transition ${isActive('/') ? 'text-white font-bold bg-white/10 rounded-t-md' : ''}`}>
                        Beranda
                    </Link>
                    <Link href="/tentang" onClick={closeMobile} className={`py-2.5 px-2 border-b border-white/10 hover:text-white transition ${isActive('/tentang') ? 'text-white font-bold bg-white/10' : ''}`}>
                        Tentang Kami
                    </Link>
                    <Link href="/blog" onClick={closeMobile} className={`py-2.5 px-2 border-b border-white/10 hover:text-white transition ${isActive('/blog') ? 'text-white font-bold bg-white/10' : ''}`}>
                        Blog
                    </Link>

                    {/* Dropdown Program (Mobile - klik) */}
                    <div className="border-b border-white/10">
                        <button
                            onClick={() => setIsMobileProgramOpen(!isMobileProgramOpen)}
                            className={`w-full flex items-center justify-between py-2.5 px-2 hover:text-white transition ${isProgramActive ? 'text-white font-bold' : ''}`}
                        >
                            Program Pemberdayaan
                            <ChevronDown
                                size={17}
                                className={`transition-transform duration-200 ${isMobileProgramOpen ? 'rotate-180' : ''}`}
                            />
                        </button>
                        <div
                            className={`overflow-hidden transition-[max-height] duration-300 ${
                                isMobileProgramOpen ? 'max-h-96' : 'max-h-0'
                            }`}
                        >
                            <div className="flex flex-col bg-black/10 rounded-lg mb-2 text-sm">
                                <Link href="/program/agriculture" onClick={closeMobile} className={`py-2 px-4 hover:text-white transition ${isActive('/program/agriculture') ? 'text-white font-bold' : ''}`}>Agriculture (Pertanian)</Link>
                                <Link href="/program/agroforestry" onClick={closeMobile} className={`py-2 px-4 hover:text-white transition ${isActive('/program/agroforestry') ? 'text-white font-bold' : ''}`}>Agroforestry dan Perkebunan</Link>
                                <Link href="/program/peternakan" onClick={closeMobile} className={`py-2 px-4 hover:text-white transition ${isActive('/program/peternakan') ? 'text-white font-bold' : ''}`}>Peternakan</Link>
                                <Link href="/program/umkm" onClick={closeMobile} className={`py-2 px-4 hover:text-white transition ${isActive('/program/umkm') ? 'text-white font-bold' : ''}`}>UMKM Bangkit</Link>
                            </div>
                        </div>
                    </div>

                    <Link href="/kontak" onClick={closeMobile} className={`py-2.5 px-2 border-b border-white/10 hover:text-white transition ${isActive('/kontak') ? 'text-white font-bold bg-white/10 rounded-b-md' : ''}`}>
                        Hubungi Kami
                    </Link>

                    {/* Login & Register Mobile */}
                    <div className="flex items-center gap-3 pt-3 pb-2">
                        <Link
                            href="/login"
                            onClick={closeMobile}
                            className="flex-1 text-center text-white font-medium border border-white/30 py-2 rounded-md hover:bg-white/10 transition"
                        >
                            Log in
                        </Link>
                        <Link
                            href="/register"
                            onClick={closeMobile}
                            className="flex-1 text-center bg-[#f7ffda] text-[#4b552a] py-2 rounded-md font-bold hover:bg-white transition"
                        >
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}