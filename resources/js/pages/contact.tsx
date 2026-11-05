import { Head, useForm, usePage } from '@inertiajs/react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function Contact() {
    const site = usePage().props.site ?? {};

    const phone = site.phone ?? '081 330003450';
    const email = site.email ?? 'info@lokaberdaya.com';
    const address =
        site.address ??
        'Jl. Sarirogo No.1, Sari Rogo, Kec. Sidoarjo, Kabupaten Sidoarjo, Jawa Timur 61234';

    const form = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        form.post('/kontak', {
            preserveScroll: true,
            onSuccess: () => form.reset(),
        });
    };

    return (
        <div className="min-h-screen bg-[#f7ffda] font-sans text-gray-800">
            <Head title="Kontak Kami - Loka Berdaya Amerta" />

            {/* 1. NAVBAR */}
            <Navbar />

            {/* 2. HEADER SECTION */}
            <section className="container mx-auto px-6 pt-32 pb-12 text-center md:px-12">
                <h1 className="mb-4 text-4xl font-bold text-[#4b552a] md:text-5xl">
                    Kontak Kami
                </h1>
                <p className="mx-auto max-w-2xl text-lg text-gray-600">
                    Kami siap membantu dan menjawab pertanyaan Anda terkait
                    program, kerja sama, maupun informasi lainnya.
                </p>
            </section>

            {/* 3. KARTU KONTAK (3 KOLOM) */}
            <section className="container mx-auto mb-20 px-6 md:px-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {/* Kartu 1: Telepon */}
                    <div className="rounded-3xl bg-[#4b552a] p-8 text-center text-white shadow-lg transition duration-300 hover:-translate-y-2">
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
                            <Phone size={32} className="text-[#f7ffda]" />
                        </div>
                        <h3 className="mb-2 text-xl font-bold">
                            Telepon / WhatsApp
                        </h3>
                        <p className="mb-4 text-[#f7ffda]/80">
                            Senin - Jumat, 08.00 - 17.00
                        </p>
                        <a
                            href={`tel:${phone.replace(/\s+/g, '')}`}
                            className="text-lg font-semibold transition hover:text-white"
                        >
                            {phone}
                        </a>
                    </div>

                    {/* Kartu 2: Email */}
                    <div className="rounded-3xl bg-[#4b552a] p-8 text-center text-white shadow-lg transition duration-300 hover:-translate-y-2">
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
                            <Mail size={32} className="text-[#f7ffda]" />
                        </div>
                        <h3 className="mb-2 text-xl font-bold">Email Resmi</h3>
                        <p className="mb-4 text-[#f7ffda]/80">
                            Kirimkan pertanyaan Anda kapan saja
                        </p>
                        <a
                            href={`mailto:${email}`}
                            className="text-lg font-semibold transition hover:text-white"
                        >
                            {email}
                        </a>
                    </div>

                    {/* Kartu 3: Alamat */}
                    <div className="rounded-3xl bg-[#4b552a] p-8 text-center text-white shadow-lg transition duration-300 hover:-translate-y-2">
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
                            <MapPin size={32} className="text-[#f7ffda]" />
                        </div>
                        <h3 className="mb-2 text-xl font-bold">
                            Alamat Kantor
                        </h3>
                        <p className="mb-4 text-[#f7ffda]/80">
                            Silakan berkunjung ke kantor kami
                        </p>
                        <p className="text-sm leading-relaxed font-medium">
                            {address}
                        </p>
                    </div>
                </div>
            </section>

            {/* 4. FORM PESAN */}
            <section className="container mx-auto mb-24 px-6 md:px-12">
                <div className="mx-auto flex max-w-5xl flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl md:flex-row">
                    {/* Kiri: Teks Ajak Bicara */}
                    <div className="flex w-full flex-col justify-center bg-[#eff5da] p-10 md:w-2/5 md:p-12">
                        <h3 className="mb-4 text-2xl font-bold text-[#4b552a]">
                            Ada Pertanyaan?
                        </h3>
                        <p className="mb-8 text-gray-600">
                            Jangan ragu untuk menghubungi kami. Tim kami akan
                            dengan senang hati membantu Anda.
                        </p>
                    </div>

                    {/* Kanan: Form */}
                    <div className="w-full p-10 md:w-3/5 md:p-12">
                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Nama Lengkap *
                                    </label>
                                    <input
                                        type="text"
                                        value={form.data.name}
                                        onChange={(event) =>
                                            form.setData(
                                                'name',
                                                event.target.value,
                                            )
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:ring-2 focus:ring-[#4b552a] focus:outline-none"
                                        placeholder="Masukkan nama"
                                        required
                                    />
                                    {form.errors.name && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {form.errors.name}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        value={form.data.email}
                                        onChange={(event) =>
                                            form.setData(
                                                'email',
                                                event.target.value,
                                            )
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:ring-2 focus:ring-[#4b552a] focus:outline-none"
                                        placeholder="email@anda.com"
                                        required
                                    />
                                    {form.errors.email && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {form.errors.email}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    value={form.data.subject}
                                    onChange={(event) =>
                                        form.setData(
                                            'subject',
                                            event.target.value,
                                        )
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:ring-2 focus:ring-[#4b552a] focus:outline-none"
                                    placeholder="Topik pesan"
                                />
                                {form.errors.subject && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {form.errors.subject}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Pesan *
                                </label>
                                <textarea
                                    rows={4}
                                    value={form.data.message}
                                    onChange={(event) =>
                                        form.setData(
                                            'message',
                                            event.target.value,
                                        )
                                    }
                                    className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2 transition focus:ring-2 focus:ring-[#4b552a] focus:outline-none"
                                    placeholder="Tuliskan pesan Anda di sini..."
                                    required
                                ></textarea>
                                {form.errors.message && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {form.errors.message}
                                    </p>
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={form.processing}
                                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#4b552a] px-6 py-3 font-bold text-white transition duration-300 hover:bg-[#3a4220] disabled:opacity-60"
                            >
                                <Send size={18} />
                                {form.processing
                                    ? 'Mengirim...'
                                    : 'Kirim Pesan'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* 5. FOOTER */}
            <Footer />
        </div>
    );
}
