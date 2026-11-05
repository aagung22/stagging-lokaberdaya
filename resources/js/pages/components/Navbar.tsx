import { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { ChevronDown, LayoutDashboard, LogOut, Menu, X } from 'lucide-react';
import { useLiveRefresh } from '@/hooks/use-live-refresh';
import { logout } from '@/routes';

const links = [
    { label: 'Beranda', href: '/', match: '/' },
    { label: 'Tentang Kami', href: '/tentang', match: '/tentang' },
    { label: 'Blog', href: '/blog', match: '/blog' },
];

const programs = [
    {
        label: 'Program Agriculture (Pertanian)',
        short: 'Agriculture (Pertanian)',
        href: '/program/agriculture',
    },
    {
        label: 'Program Agroforestry dan Perkebunan',
        short: 'Agroforestry dan Perkebunan',
        href: '/program/agroforestry',
    },
    {
        label: 'Program Peternakan',
        short: 'Peternakan',
        href: '/program/peternakan',
    },
    {
        label: 'Program UMKM Bangkit',
        short: 'UMKM Bangkit',
        href: '/program/umkm',
    },
];

export default function Navbar() {
    // Halaman publik/user ikut memperbarui data secara otomatis.
    useLiveRefresh(10000);

    const [isProgramOpen, setIsProgramOpen] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isMobileProgramOpen, setIsMobileProgramOpen] = useState(false);

    const { url, props } = usePage();
    const site = props.site ?? {};
    const user = props.auth?.user;

    const isActive = (path: string) => {
        if (path === '/') {
            return url === '/';
        }

        return url.startsWith(path);
    };

    const isProgramActive = url.startsWith('/program');

    const closeMobile = () => {
        setIsMobileOpen(false);
        setIsMobileProgramOpen(false);
    };

    const handleLogout = () => {
        closeMobile();
        router.post(logout());
    };

    const logoSrc = site.logo ?? '/images/logo lba.webp';
    const siteName = site.site_name ?? 'Loka Berdaya Amerta';

    return (
        <nav className="fixed top-0 left-0 z-50 w-full bg-[#4b552a] px-4 py-2.5 shadow-md md:px-6 md:py-3">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center gap-2 md:gap-3">
                    <img
                        src={logoSrc}
                        alt={`Logo ${siteName}`}
                        className="h-10 w-auto object-contain md:h-14"
                        onError={(e) =>
                            (e.currentTarget.style.display = 'none')
                        }
                    />
                    <Link
                        href="/"
                        className="text-base font-bold tracking-tight text-white transition hover:text-[#f7ffda] md:text-xl"
                        onClick={closeMobile}
                    >
                        {siteName}
                    </Link>
                </div>

                <div className="hidden items-center gap-6 md:flex lg:gap-10">
                    <div className="flex items-center gap-5 text-sm font-medium text-[#f7ffda]/80 md:text-[15px] lg:gap-7">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`transition hover:text-white ${
                                    isActive(link.match)
                                        ? 'border-b-2 border-white pb-1 font-bold text-white'
                                        : ''
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}

                        <div
                            className="relative"
                            onMouseEnter={() => setIsProgramOpen(true)}
                            onMouseLeave={() => setIsProgramOpen(false)}
                        >
                            <button
                                className={`flex cursor-pointer items-center gap-1 py-2 transition hover:text-white focus:outline-none ${
                                    isProgramActive
                                        ? 'font-bold text-white'
                                        : ''
                                }`}
                            >
                                Program Pemberdayaan
                                <ChevronDown
                                    size={15}
                                    className={`transition-transform duration-200 ${
                                        isProgramOpen ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>

                            {isProgramOpen && (
                                <div className="absolute top-full left-0 z-50 mt-1 w-72 overflow-hidden rounded-xl border border-gray-100 bg-white py-2 text-gray-700 shadow-xl">
                                    {programs.map((program) => (
                                        <Link
                                            key={program.href}
                                            href={program.href}
                                            className={`block px-4 py-2.5 text-sm font-medium transition hover:bg-[#f7ffda] hover:text-[#4b552a] ${
                                                isActive(program.href)
                                                    ? 'border-l-4 border-[#4b552a] bg-[#f7ffda] text-[#4b552a]'
                                                    : ''
                                            }`}
                                        >
                                            {program.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        <Link
                            href="/kontak"
                            className={`transition hover:text-white ${
                                isActive('/kontak')
                                    ? 'border-b-2 border-white pb-1 font-bold text-white'
                                    : ''
                            }`}
                        >
                            Hubungi Kami
                        </Link>
                    </div>

                    <div className="flex items-center gap-3">
                        {user ? (
                            <>
                                {user.is_admin && (
                                    <Link
                                        href="/admin"
                                        className="flex items-center gap-2 rounded-md bg-[#f7ffda] px-4 py-2 text-sm font-bold text-[#4b552a] shadow-sm transition hover:bg-white"
                                    >
                                        <LayoutDashboard size={16} />
                                        Dashboard
                                    </Link>
                                )}
                                {!user.is_admin && (
                                    <span className="text-sm text-[#f7ffda]/80">
                                        Halo, {user.name.split(' ')[0]}
                                    </span>
                                )}
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="flex cursor-pointer items-center gap-2 text-sm font-medium text-white transition hover:text-[#f7ffda]"
                                >
                                    <LogOut size={16} />
                                    Keluar
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="text-sm font-medium text-white transition hover:text-[#f7ffda] md:text-[15px]"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href="/register"
                                    className="rounded-md bg-[#f7ffda] px-4 py-2 text-sm font-bold text-[#4b552a] shadow-sm transition hover:bg-white md:text-[15px]"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                <button
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    className="-mr-2 p-2 text-white focus:outline-none md:hidden"
                    aria-label="Toggle menu"
                >
                    {isMobileOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>

            <div
                className={`overflow-hidden transition-[max-height] duration-300 ease-in-out md:hidden ${
                    isMobileOpen ? 'max-h-[700px]' : 'max-h-0'
                }`}
            >
                <div className="container mx-auto flex flex-col gap-1 pt-3 pb-2 font-medium text-[#f7ffda]/90">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={closeMobile}
                            className={`border-b border-white/10 px-2 py-2.5 transition hover:text-white ${
                                isActive(link.match)
                                    ? 'bg-white/10 font-bold text-white'
                                    : ''
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}

                    <div className="border-b border-white/10">
                        <button
                            onClick={() =>
                                setIsMobileProgramOpen(!isMobileProgramOpen)
                            }
                            className={`flex w-full items-center justify-between px-2 py-2.5 transition hover:text-white ${
                                isProgramActive ? 'font-bold text-white' : ''
                            }`}
                        >
                            Program Pemberdayaan
                            <ChevronDown
                                size={17}
                                className={`transition-transform duration-200 ${
                                    isMobileProgramOpen ? 'rotate-180' : ''
                                }`}
                            />
                        </button>
                        <div
                            className={`overflow-hidden transition-[max-height] duration-300 ${
                                isMobileProgramOpen ? 'max-h-96' : 'max-h-0'
                            }`}
                        >
                            <div className="mb-2 flex flex-col rounded-lg bg-black/10 text-sm">
                                {programs.map((program) => (
                                    <Link
                                        key={program.href}
                                        href={program.href}
                                        onClick={closeMobile}
                                        className={`px-4 py-2 transition hover:text-white ${
                                            isActive(program.href)
                                                ? 'font-bold text-white'
                                                : ''
                                        }`}
                                    >
                                        {program.short}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    <Link
                        href="/kontak"
                        onClick={closeMobile}
                        className={`border-b border-white/10 px-2 py-2.5 transition hover:text-white ${
                            isActive('/kontak')
                                ? 'bg-white/10 font-bold text-white'
                                : ''
                        }`}
                    >
                        Hubungi Kami
                    </Link>

                    <div className="flex items-center gap-3 pt-3 pb-2">
                        {user ? (
                            <>
                                {user.is_admin && (
                                    <Link
                                        href="/admin"
                                        onClick={closeMobile}
                                        className="flex flex-1 items-center justify-center gap-2 rounded-md bg-[#f7ffda] py-2 font-bold text-[#4b552a] transition hover:bg-white"
                                    >
                                        <LayoutDashboard size={16} />
                                        Dashboard
                                    </Link>
                                )}
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="flex flex-1 items-center justify-center gap-2 rounded-md border border-white/30 py-2 font-medium text-white transition hover:bg-white/10"
                                >
                                    <LogOut size={16} />
                                    Keluar
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    onClick={closeMobile}
                                    className="flex-1 rounded-md border border-white/30 py-2 text-center font-medium text-white transition hover:bg-white/10"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href="/register"
                                    onClick={closeMobile}
                                    className="flex-1 rounded-md bg-[#f7ffda] py-2 text-center font-bold text-[#4b552a] transition hover:bg-white"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
