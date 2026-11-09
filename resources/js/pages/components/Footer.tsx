// resources/js/components/Footer.tsx
import { useEffect, useRef, useState } from 'react';
import { usePage, Link } from '@inertiajs/react';
import { MapPin, Phone, Mail } from 'lucide-react';

const footerStyles = `
@keyframes footerFadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
}
@keyframes footerSlideLeft {
    from { opacity: 0; transform: translateX(-50px); }
    to   { opacity: 1; transform: translateX(0); }
}
@keyframes footerSlideRight {
    from { opacity: 0; transform: translateX(50px); }
    to   { opacity: 1; transform: translateX(0); }
}

.footer-animate { opacity: 0; }

.footer-visible .footer-animate {
    animation-duration: 0.7s;
    animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
    animation-fill-mode: forwards;
}
.footer-visible .footer-animate--up    { animation-name: footerFadeUp; }
.footer-visible .footer-animate--left  { animation-name: footerSlideLeft; }
.footer-visible .footer-animate--right { animation-name: footerSlideRight; }

.footer-animate--delay-1 { animation-delay: 0.1s; }
.footer-animate--delay-2 { animation-delay: 0.2s; }
.footer-animate--delay-3 { animation-delay: 0.3s; }
.footer-animate--delay-4 { animation-delay: 0.4s; }
.footer-animate--delay-5 { animation-delay: 0.5s; }
.footer-animate--delay-6 { animation-delay: 0.6s; }

.footer-contact-item {
    transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.footer-contact-item:hover { transform: translateX(6px); }

.footer-contact-item .footer-icon {
    transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.footer-contact-item:hover .footer-icon {
    transform: scale(1.1) rotate(6deg);
}

.footer-contact-item p { transition: color 0.3s ease; }
.footer-contact-item:hover p { color: #ffffff; }

.footer-logo {
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.footer-logo:hover { transform: scale(1.05) rotate(-2deg); }

.footer-link {
    position: relative;
    display: inline-block;
    transition: color 0.3s ease;
}
.footer-link::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -4px;
    height: 1px;
    width: 0;
    background: #ffffff;
    transition: width 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.footer-link:hover::after { width: 100%; }

@media (prefers-reduced-motion: reduce) {
    .footer-visible .footer-animate {
        animation: none !important;
        opacity: 1 !important;
        transform: none !important;
    }
}
`;

type NavItem = { label: string; href: string };

export default function Footer() {
    const footerRef = useRef<HTMLElement>(null);
    const [visible, setVisible] = useState(false);
    const site = usePage().props.site ?? {};

    useEffect(() => {
        const el = footerRef.current;
        if (!el) return;

        if (typeof IntersectionObserver === 'undefined') {
            setVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisible(true);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2 },
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const contacts = [
        { icon: Phone, text: site.phone ?? '081 330003450' },
        { icon: Mail, text: site.email ?? 'info@lokaberdaya.com' },
        {
            icon: MapPin,
            text:
                site.address ??
                'Jl. Sarirogo No.1, Sari Rogo, Kec. Sidoarjo, Kabupaten Sidoarjo, Jawa Timur 61234',
        },
    ];

    // Navigasi Utama
    const navigationLinks: NavItem[] = [
        { label: 'Beranda', href: '/' },
        { label: 'Tentang Kami', href: '/tentang' },
        { label: 'Blog & Artikel', href: '/blog' },
        { label: 'Kontak', href: '/kontak' },
    ];

    // Diubah dari "Link Cepat" menjadi "Program Kami"
    const programLinks: NavItem[] = [
        { label: 'Pertanian (Agriculture)', href: '/program/agriculture' },
        { label: 'Peternakan', href: '/program/peternakan' },
        { label: 'Perkebunan & Agroforestry', href: '/program/agroforestry' },
        { label: 'UMKM Bangkit', href: '/program/umkm' },
    ];

    const siteName = site.site_name ?? 'Loka Berdaya Amerta';

    // Helper untuk mencegah error class CSS jika index terlalu besar
    const getDelayClass = (index: number) => {
        const safeIndex = (index % 5) + 1;
        return `footer-animate--delay-${safeIndex}`;
    };

    return (
        <>
            <style>{footerStyles}</style>

            <footer
                ref={footerRef}
                className={`overflow-hidden rounded-t-[3rem] bg-[#4b552a] pt-16 pb-8 text-white ${
                    visible ? 'footer-visible' : ''
                }`}
            >
                <div className="container mx-auto px-6 md:px-12">
                    {/* Grid diubah agar proporsinya lebih rapi (4 : 2 : 2 : 3) */}
                    <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
                        
                        {/* Kolom 1: Logo & Deskripsi (Lebih Lebar) */}
                        <div className="lg:col-span-4">
                            <div className="flex items-center">
                                <img
                                    src={site.logo ?? '/images/logo lba.webp'}
                                    alt={`Logo ${siteName}`}
                                    className="footer-logo footer-animate footer-animate--left h-16 w-auto object-contain md:h-24"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                            </div>

                            <p className="footer-animate footer-animate--up footer-animate--delay-1 mt-4 mb-6 max-w-sm leading-relaxed text-gray-300">
                                {site.footer_description ??
                                    'Loka Berdaya Amerta adalah lembaga pionir dalam pemberdayaan masyarakat yang fokus pada peningkatan keterampilan, ekonomi, pendidikan, dan keberlanjutan lingkungan melalui kolaborasi lintas sektor.'}
                            </p>
                        </div>

                        {/* Kolom 2: Navigasi */}
                        <div className="lg:col-span-2">
                            <h3 className="footer-animate footer-animate--up footer-animate--delay-2 mb-5 text-lg font-semibold text-[#f7ffda]">
                                Navigasi
                            </h3>
                            <ul className="space-y-3">
                                {navigationLinks.map((item, i) => (
                                    <li
                                        key={item.href}
                                        className={`footer-animate footer-animate--up ${getDelayClass(i + 2)}`}
                                    >
                                        <Link
                                            href={item.href}
                                            className="footer-link text-gray-300 hover:text-white"
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Kolom 3: Program Kami */}
                        <div className="lg:col-span-3">
                            <h3 className="footer-animate footer-animate--up footer-animate--delay-3 mb-5 text-lg font-semibold text-[#f7ffda]">
                                Program Kami
                            </h3>
                            <ul className="space-y-3">
                                {programLinks.map((item, i) => (
                                    <li
                                        key={item.href}
                                        className={`footer-animate footer-animate--up ${getDelayClass(i + 3)}`}
                                    >
                                        <Link
                                            href={item.href}
                                            className="footer-link text-gray-300 hover:text-white"
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Kolom 4: Kontak */}
                        <div className="flex flex-col gap-4 lg:col-span-3">
                            <h3 className="footer-animate footer-animate--up footer-animate--delay-3 mb-1 text-lg font-semibold text-[#f7ffda]">
                                Kontak
                            </h3>
                            {contacts.map((item, i) => {
                                const Icon = item.icon;
                                return (
                                    <div
                                        key={i}
                                        className={`footer-contact-item footer-animate footer-animate--right ${getDelayClass(i + 4)} flex items-start gap-3`}
                                    >
                                        <Icon
                                            className="footer-icon mt-1 shrink-0 text-[#f7ffda]"
                                            size={20}
                                        />
                                        <p className="text-gray-300 text-sm leading-relaxed">
                                            {item.text}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Garis Bawah & Copyright */}
                    <div className="footer-animate footer-animate--up footer-animate--delay-6 flex flex-col items-center justify-between gap-4 border-t border-white/20 pt-8 md:flex-row">
                        <p className="text-sm text-gray-400">
                            © {new Date().getFullYear()} {siteName}. All rights reserved.
                        </p>
                        <div className="flex gap-4 text-sm text-gray-400">
                            <Link
                                href="/privacy-policy"
                                className="footer-link hover:text-white"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="/terms-of-service"
                                className="footer-link hover:text-white"
                            >
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}