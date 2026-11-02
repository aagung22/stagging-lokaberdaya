import { Head } from '@inertiajs/react';
import { Phone, Mail, MapPin } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function Contact() {
    return (
        <div className="min-h-screen bg-[#f7ffda] font-sans text-gray-800">
            <Head title="Kontak Kami - Loka Berdaya Amerta" />

            {/* 1. NAVBAR */}
            <Navbar />

            {/* 2. HEADER SECTION */}
            <section className="pt-32 pb-12 text-center container mx-auto px-6 md:px-12">
                <h1 className="text-4xl md:text-5xl font-bold text-[#4b552a] mb-4">Kontak Kami</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Kami siap membantu dan menjawab pertanyaan Anda terkait program, kerja sama, maupun informasi lainnya.
                </p>
            </section>

            {/* 3. KARTU KONTAK (3 KOLOM) */}
            <section className="container mx-auto px-6 md:px-12 mb-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Kartu 1: Telepon */}
                    <div className="bg-[#4b552a] rounded-3xl p-8 text-center text-white shadow-lg hover:-translate-y-2 transition duration-300">
                        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Phone size={32} className="text-[#f7ffda]" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Telepon / WhatsApp</h3>
                        <p className="text-[#f7ffda]/80 mb-4">Senin - Jumat, 08.00 - 17.00</p>
                        <a href="tel:081330003450" className="text-lg font-semibold hover:text-white transition">
                            081 330003450
                        </a>
                    </div>

                    {/* Kartu 2: Email */}
                    <div className="bg-[#4b552a] rounded-3xl p-8 text-center text-white shadow-lg hover:-translate-y-2 transition duration-300">
                        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Mail size={32} className="text-[#f7ffda]" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Email Resmi</h3>
                        <p className="text-[#f7ffda]/80 mb-4">Kirimkan pertanyaan Anda kapan saja</p>
                        <a href="mailto:info@lokaberdaya.com" className="text-lg font-semibold hover:text-white transition">
                            info@lokaberdaya.com
                        </a>
                    </div>

                    {/* Kartu 3: Alamat */}
                    <div className="bg-[#4b552a] rounded-3xl p-8 text-center text-white shadow-lg hover:-translate-y-2 transition duration-300">
                        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <MapPin size={32} className="text-[#f7ffda]" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Alamat Kantor</h3>
                        <p className="text-[#f7ffda]/80 mb-4">Silakan berkunjung ke kantor kami</p>
                        <p className="text-sm font-medium leading-relaxed">
                            Jl. Sarirogo No.1, Sari Rogo, Kec. Sidoarjo, Kabupaten Sidoarjo, Jawa Timur 61234
                        </p>
                    </div>

                </div>
            </section>

            {/* 4. FORM PESAN */}
            <section className="container mx-auto px-6 md:px-12 mb-24">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row max-w-5xl mx-auto border border-gray-100">
                    {/* Kiri: Teks Ajak Bicara */}
                    <div className="bg-[#eff5da] w-full md:w-2/5 p-10 md:p-12 flex flex-col justify-center">
                        <h3 className="text-2xl font-bold text-[#4b552a] mb-4">Ada Pertanyaan?</h3>
                        <p className="text-gray-600 mb-8">
                            Jangan ragu untuk menghubungi kami. Tim kami akan dengan senang hati membantu Anda.
                        </p>
                    </div>

                    {/* Kanan: Form */}
                    <div className="w-full md:w-3/5 p-10 md:p-12">
                        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap *</label>
                                    <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4b552a] transition" placeholder="Masukkan nama" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                                    <input type="email" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4b552a] transition" placeholder="email@anda.com" required />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4b552a] transition" placeholder="Topik pesan" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Pesan *</label>
                                <textarea rows={4} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4b552a] transition resize-none" placeholder="Tuliskan pesan Anda di sini..." required></textarea>
                            </div>
                            <button type="submit" className="flex items-center justify-center gap-2 w-full bg-[#4b552a] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#3a4220] transition duration-300">
                                Kirim Pesan
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