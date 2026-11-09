import { Head, useForm, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import {
    Phone, Mail, MapPin, Send, Copy, Check, ArrowUpRight,
    Clock, MessageCircle, AlertCircle, ArrowRight,
} from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function Contact() {
    const site = usePage().props.site ?? {};

    const phone = site.phone ?? '081 330003450';
    const email = site.email ?? 'info@lokaberdaya.com';
    const address = site.address ??
        'Jl. Sarirogo No.1, Sari Rogo, Kec. Sidoarjo, Kabupaten Sidoarjo, Jawa Timur 61234';
    const mapsUrl = site.maps_embed_url ??
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.307548570149!2d112.67889967357418!3d-7.431179073205722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7e132a4632891%3A0x4058849ad5fd97eb!2sYatim%20Mandiri%20Sidoarjo!5e0!3m2!1sid!2sid!4v1793240614969!5m2!1sid!2sid';

    const form = useForm({ name: '', email: '', subject: '', message: '' });
    const [sent, setSent] = useState(false);
    const [copied, setCopied] = useState<'phone' | 'email' | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post('/kontak', {
            preserveScroll: true,
            onSuccess: () => {
                form.reset();
                setSent(true);
                setTimeout(() => setSent(false), 5000);
            },
        });
    };

    const copy = async (text: string, kind: 'phone' | 'email') => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(kind);
            setTimeout(() => setCopied(null), 1800);
        } catch { /* noop */ }
    };

    return (
        <div className="min-h-screen bg-[#fafaf7] font-sans text-gray-800 selection:bg-[#4b552a] selection:text-[#f7ffda]">
            <Head title="Kontak Kami - Loka Berdaya Amerta" />

            <style>{`
                @keyframes fadeUp { from { opacity:0; transform: translateY(20px);} to {opacity:1;transform:translateY(0);} }
                @keyframes drawLine { from { transform: scaleX(0);} to { transform: scaleX(1);} }
                @keyframes checkPop { 0%{transform:scale(0)} 60%{transform:scale(1.15)} 100%{transform:scale(1)} }
                .check-pop { animation: checkPop .4s cubic-bezier(.22,.61,.36,1) both; }
                .contact-row { transition: background .3s ease, padding .3s ease; }
                .contact-row:hover { background: #eff5da; }
                .contact-row:hover .row-arrow { opacity: 1; transform: translateX(0); }
                .row-arrow { opacity: 0; transform: translateX(-4px); transition: all .3s ease; }
            `}</style>

            <Navbar />

            {/* ============ HERO ============ */}
            <section className="relative pt-28 pb-12 md:pt-36 md:pb-16">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-12">
                        <div className="md:col-span-8">
                            <div className="mb-4 flex items-center gap-3 text-[11px] font-bold tracking-[0.3em] text-[#9c8e4d] uppercase">
                                <span className="h-px w-8 bg-[#9c8e4d]" />
                                Hubungi Kami
                            </div>
                            <h1 className="text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] font-bold tracking-tight text-[#4b552a]">
                                Mari
                                <span className="italic text-[#9c8e4d]"> berbicara</span>
                            </h1>
                            <p className="mt-5 max-w-lg text-base leading-relaxed text-gray-600">
                                Kami siap membantu dan menjawab pertanyaan Anda terkait program, kerja sama,
                                maupun informasi lainnya.
                            </p>
                        </div>
                        <div className="md:col-span-4">
                            <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-5 py-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eff5da] text-[#4b552a]">
                                    <Clock size={18} />
                                </div>
                                <div>
                                    <div className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Jam Operasional</div>
                                    <div className="text-sm font-semibold text-gray-900">Senin – Jumat, 08.00 – 17.00</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ MAIN: CONTACT LIST + FORM ============ */}
            <section className="container mx-auto px-6 pb-20 md:px-12 md:pb-24">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-14">
                    {/* LEFT — Contact rows */}
                    <div className="md:col-span-5">
                        <div className="mb-8 flex items-baseline justify-between">
                            <h2 className="text-lg font-bold text-gray-900">Kontak Langsung</h2>
                            <span className="text-[11px] font-mono text-gray-400 uppercase tracking-widest">01 — Direct</span>
                        </div>

                        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                            {/* Phone row */}
                            <div className="contact-row group flex items-center gap-4 border-b border-gray-100 px-5 py-5">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eff5da] text-[#4b552a]">
                                    <Phone size={18} />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Telepon / WhatsApp</div>
                                    <a
                                        href={`tel:${phone.replace(/\s+/g, '')}`}
                                        className="block truncate text-sm font-bold text-gray-900 hover:text-[#4b552a]"
                                    >
                                        {phone}
                                    </a>
                                </div>
                                <button
                                    onClick={() => copy(phone, 'phone')}
                                    className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-white hover:text-[#4b552a]"
                                    aria-label="Salin nomor telepon"
                                >
                                    {copied === 'phone' ? <Check size={15} className="check-pop text-[#4b552a]" /> : <Copy size={15} />}
                                </button>
                                <a
                                    href={`https://wa.me/${phone.replace(/\D/g, '').replace(/^0/, '62')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-white hover:text-[#4b552a]"
                                    aria-label="Chat via WhatsApp"
                                >
                                    <MessageCircle size={15} />
                                </a>
                            </div>

                            {/* Email row */}
                            <div className="contact-row group flex items-center gap-4 border-b border-gray-100 px-5 py-5">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eff5da] text-[#4b552a]">
                                    <Mail size={18} />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Email</div>
                                    <a
                                        href={`mailto:${email}`}
                                        className="block truncate text-sm font-bold text-gray-900 hover:text-[#4b552a]"
                                    >
                                        {email}
                                    </a>
                                </div>
                                <button
                                    onClick={() => copy(email, 'email')}
                                    className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-white hover:text-[#4b552a]"
                                    aria-label="Salin email"
                                >
                                    {copied === 'email' ? <Check size={15} className="check-pop text-[#4b552a]" /> : <Copy size={15} />}
                                </button>
                            </div>

                            {/* Address row */}
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="contact-row group flex items-start gap-4 px-5 py-5"
                            >
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eff5da] text-[#4b552a]">
                                    <MapPin size={18} />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Alamat Kantor</div>
                                    <div className="text-sm leading-relaxed font-medium text-gray-900">{address}</div>
                                </div>
                                <ArrowRight size={16} className="row-arrow mt-3 shrink-0 text-[#4b552a]" />
                            </a>
                        </div>

                        {/* Map preview — hover expand */}
                        <div className="group mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white">
                            <div className="relative h-[220px] overflow-hidden transition-all duration-500 group-hover:h-[260px]">
                                <iframe
                                    src={mapsUrl}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, filter: 'grayscale(0.15)' }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Lokasi Loka Berdaya Amerta"
                                />
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#4b552a] shadow-sm backdrop-blur transition hover:bg-white"
                                >
                                    Buka di Maps <ArrowUpRight size={12} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT — Form */}
                    <div className="md:col-span-7">
                        <div className="mb-8 flex items-baseline justify-between">
                            <h2 className="text-lg font-bold text-gray-900">Kirim Pesan</h2>
                            <span className="text-[11px] font-mono text-gray-400 uppercase tracking-widest">02 — Form</span>
                        </div>

                        <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-10">
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                {/* Name + Email */}
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <FloatingField
                                        label="Nama lengkap"
                                        type="text"
                                        value={form.data.name}
                                        onChange={(v) => form.setData('name', v)}
                                        error={form.errors.name}
                                        required
                                        autoComplete="name"
                                    />
                                    <FloatingField
                                        label="Email"
                                        type="email"
                                        value={form.data.email}
                                        onChange={(v) => form.setData('email', v)}
                                        error={form.errors.email}
                                        required
                                        autoComplete="email"
                                    />
                                </div>

                                {/* Subject */}
                                <FloatingField
                                    label="Subjek (opsional)"
                                    type="text"
                                    value={form.data.subject}
                                    onChange={(v) => form.setData('subject', v)}
                                    error={form.errors.subject}
                                />

                                {/* Message */}
                                <FloatingField
                                    label="Pesan"
                                    type="textarea"
                                    value={form.data.message}
                                    onChange={(v) => form.setData('message', v)}
                                    error={form.errors.message}
                                    required
                                    rows={5}
                                />

                                {/* Submit row */}
                                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 pt-6">
                                    <p className="text-xs text-gray-500">
                                        Kami akan merespons dalam <span className="font-semibold text-gray-700">1×24 jam kerja</span>.
                                    </p>
                                    <button
                                        type="submit"
                                        disabled={form.processing || sent}
                                        className="group inline-flex items-center gap-2 rounded-full bg-[#4b552a] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#3a4220] disabled:opacity-60"
                                    >
                                        {sent ? (
                                            <>
                                                <span className="check-pop flex h-4 w-4 items-center justify-center">
                                                    <Check size={14} />
                                                </span>
                                                Terkirim
                                            </>
                                        ) : form.processing ? (
                                            <>
                                                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                                Mengirim…
                                            </>
                                        ) : (
                                            <>
                                                Kirim Pesan
                                                <Send size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                            </>
                                        )}
                                    </button>
                                </div>

                                {/* Success banner */}
                                {sent && (
                                    <div
                                        className="flex items-start gap-3 rounded-xl border border-[#c3d49a] bg-[#eff5da] p-4 text-sm text-[#4b552a]"
                                        style={{ animation: 'fadeUp .5s ease both' }}
                                    >
                                        <Check size={18} className="mt-0.5 shrink-0" />
                                        <div>
                                            <div className="font-bold">Pesan terkirim!</div>
                                            <div className="mt-0.5 text-xs text-[#4b552a]/80">
                                                Terima kasih. Kami akan menghubungi Anda kembali secepatnya.
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ FOOTER ============ */}
            <Footer />
        </div>
    );
}

/* ========== FLOATING FIELD ========== */
function FloatingField({
    label, type, value, onChange, error, required, rows = 3, autoComplete,
}: {
    label: string;
    type: 'text' | 'email' | 'textarea';
    value: string;
    onChange: (v: string) => void;
    error?: string;
    required?: boolean;
    rows?: number;
    autoComplete?: string;
}) {
    const [focused, setFocused] = useState(false);
    const filled = value.length > 0;
    const active = focused || filled;
    const hasError = Boolean(error);

    const baseInput = `w-full border-b-2 bg-transparent px-0 pt-6 pb-2 text-sm text-gray-900 outline-none transition-colors ${
        hasError ? 'border-red-400' : active ? 'border-[#4b552a]' : 'border-gray-300'
    }`;

    return (
        <div className="relative">
            <label
                className={`pointer-events-none absolute left-0 transition-all duration-200 ${
                    active
                        ? 'top-0 text-[10px] font-bold tracking-widest uppercase'
                        : 'top-5 text-sm text-gray-400'
                } ${hasError ? 'text-red-500' : active ? 'text-[#4b552a]' : ''}`}
            >
                {label}{required && <span className="ml-0.5">*</span>}
            </label>

            {type === 'textarea' ? (
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    required={required}
                    rows={rows}
                    className={`${baseInput} resize-none`}
                />
            ) : (
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    required={required}
                    autoComplete={autoComplete}
                    className={baseInput}
                />
            )}

            {hasError && (
                <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500" style={{ animation: 'fadeUp .3s ease both' }}>
                    <AlertCircle size={12} />
                    {error}
                </p>
            )}
        </div>
    );
}