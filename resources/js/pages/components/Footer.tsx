// resources/js/components/Footer.tsx
import { useEffect, useRef, useState } from 'react';
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
.footer-animate--delay-2 { animation-delay: 0.25s; }
.footer-animate--delay-3 { animation-delay: 0.4s; }
.footer-animate--delay-4 { animation-delay: 0.55s; }
.footer-animate--delay-5 { animation-delay: 0.7s; }

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

export default function Footer() {
    const footerRef = useRef<HTMLElement>(null);
    const [visible, setVisible] = useState(false);

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
            { threshold: 0.2 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const contacts = [
        { icon: Phone, text: '081 330003450' },
        { icon: Mail, text: 'info@lokaberdaya.com' },
        {
            icon: MapPin,
            text: 'Jl. Sarirogo No.1, Sari Rogo, Kec. Sidoarjo, Kabupaten Sidoarjo, Jawa Timur 61234',
        },
    ];

    return (
        <>
            {/* Style animasi — di-render sekali, tidak perlu file tambahan */}
            <style>{footerStyles}</style>

            <footer
                ref={footerRef}
                className={`bg-[#4b552a] text-white pt-16 pb-8 rounded-t-[3rem] overflow-hidden ${
                    visible ? 'footer-visible' : ''
                }`}
            >
                <div className="container mx-auto px-6 md:px-12">
                    <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
                        {/* Kiri: Logo & Deskripsi */}
                        <div className="w-full md:w-1/2">
                            <div className="flex items-center">
                                <img
                                    src="/images/logo lba.webp"
                                    alt="Logo Loka Berdaya Amerta"
                                    className="footer-logo footer-animate footer-animate--left h-16 md:h-28 w-auto object-contain"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                            </div>

                            <p className="footer-animate footer-animate--up footer-animate--delay-1 text-gray-300 leading-relaxed mb-6 max-w-md -mt-2 md:-mt-4">
                                Loka Berdaya Amerta adalah lembaga pionir dalam pemberdayaan masyarakat yang fokus pada peningkatan keterampilan, ekonomi, pendidikan, dan keberlanjutan lingkungan melalui kolaborasi lintas sektor.
                            </p>
                        </div>

                        {/* Kanan: Kontak */}
                        <div className="w-full md:w-1/3 flex flex-col gap-4">
                            {contacts.map((item, i) => {
                                const Icon = item.icon;
                                return (
                                    <div
                                        key={i}
                                        className={`footer-contact-item footer-animate footer-animate--right footer-animate--delay-${i + 2} flex items-start gap-3`}
                                    >
                                        <Icon
                                            className="footer-icon mt-1 text-[#f7ffda]"
                                            size={20}
                                        />
                                        <p className="text-gray-300">{item.text}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Garis Bawah & Copyright */}
                    <div className="footer-animate footer-animate--up footer-animate--delay-5 border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-gray-400">
                            © {new Date().getFullYear()} Loka Berdaya Amerta. All rights reserved.
                        </p>
                        <div className="flex gap-4 text-sm text-gray-400">
                            <a href="#" className="footer-link hover:text-white">
                                Privacy Policy
                            </a>
                            <a href="#" className="footer-link hover:text-white">
                                Terms of Service
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}