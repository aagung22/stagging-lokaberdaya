import { Head, Link } from '@inertiajs/react';
import {
    Building2,
    CalendarDays,
    Handshake,
    Image as ImageIcon,
    Mail,
    MessageSquareQuote,
    Newspaper,
    Sprout,
    ArrowUpRight,
    Inbox,
} from 'lucide-react';
import type { ContactMessage } from '@/types/content';

type Stats = {
    programs: number;
    activities: number;
    umkm_regions: number;
    posts: number;
    testimonials: number;
    partners: number;
    hero_slides: number;
    unread_messages: number;
};

type Props = {
    stats: Stats;
    recentMessages: ContactMessage[];
};

const cards = [
    {
        key: 'programs',
        label: 'Program',
        icon: Sprout,
        href: '/admin/programs',
    },
    {
        key: 'activities',
        label: 'Kegiatan Program',
        icon: CalendarDays,
        href: '/admin/programs',
    },
    {
        key: 'umkm_regions',
        label: 'Wilayah UMKM',
        icon: Building2,
        href: '/admin/umkm',
    },
    {
        key: 'posts',
        label: 'Artikel Blog',
        icon: Newspaper,
        href: '/admin/posts',
    },
    {
        key: 'testimonials',
        label: 'Testimoni',
        icon: MessageSquareQuote,
        href: '/admin/testimonials',
    },
    {
        key: 'partners',
        label: 'Mitra',
        icon: Handshake,
        href: '/admin/partners',
    },
    {
        key: 'hero_slides',
        label: 'Slide Hero',
        icon: ImageIcon,
        href: '/admin/hero-slides',
    },
    {
        key: 'unread_messages',
        label: 'Pesan Belum Dibaca',
        icon: Mail,
        href: '/admin/messages',
    },
] as const;

export default function AdminDashboard({ stats, recentMessages }: Props) {
    return (
        <>
            <Head title="Dashboard Admin" />

            <div className="min-h-screen bg-gradient-to-b from-[#f7f9f0] to-white">
                <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 md:px-8 md:py-10">
                    {/* Header */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eff5da] px-3 py-1 text-xs font-semibold text-[#4b552a]">
                                <Sprout className="h-3.5 w-3.5" />
                                Overview
                            </span>
                            <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900">
                                Dashboard Admin
                            </h1>
                            <p className="mt-1.5 max-w-xl text-sm text-gray-500">
                                Ringkasan konten dan aktivitas situs{' '}
                                <span className="font-medium text-gray-700">
                                    Loka Berdaya Amerta
                                </span>
                                .
                            </p>
                        </div>
                    </div>

                    {/* Stat Cards */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {cards.map((card) => (
                            <Link
                                key={card.key}
                                href={card.href}
                                className="group relative overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm ring-1 ring-transparent transition-all duration-200 hover:-translate-y-0.5 hover:border-[#cfdcae] hover:shadow-lg hover:ring-[#eff5da]"
                            >
                                {/* subtle accent blob */}
                                <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-[#eff5da] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                <div className="relative flex items-start justify-between">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eff5da] text-[#4b552a] transition-colors duration-200 group-hover:bg-[#4b552a] group-hover:text-[#eff5da]">
                                        <card.icon className="h-5 w-5" />
                                    </div>
                                    <ArrowUpRight className="h-4 w-4 text-gray-300 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#4b552a]" />
                                </div>

                                <p className="relative mt-5 text-3xl font-bold tracking-tight text-gray-900">
                                    {stats[card.key]}
                                </p>
                                <p className="relative mt-1 text-sm font-medium text-gray-500 group-hover:text-[#4b552a]">
                                    {card.label}
                                </p>
                            </Link>
                        ))}
                    </div>

                    {/* Recent Messages */}
                    <div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm">
                        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 md:px-6">
                            <div className="flex items-center gap-2.5">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#eff5da] text-[#4b552a]">
                                    <Inbox className="h-4 w-4" />
                                </div>
                                <div>
                                    <h2 className="text-sm font-semibold text-gray-900">
                                        Pesan Terbaru
                                    </h2>
                                    <p className="text-xs text-gray-400">
                                        {recentMessages.length} pesan ditampilkan
                                    </p>
                                </div>
                            </div>
                            <Link
                                href="/admin/messages"
                                className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-sm font-medium text-[#4b552a] transition-colors hover:bg-[#eff5da]"
                            >
                                Lihat semua
                                <ArrowUpRight className="h-3.5 w-3.5" />
                            </Link>
                        </div>

                        {recentMessages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center gap-2 px-6 py-14 text-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 text-gray-300">
                                    <Mail className="h-5 w-5" />
                                </div>
                                <p className="text-sm text-gray-500">
                                    Belum ada pesan masuk.
                                </p>
                            </div>
                        ) : (
                            <ul className="divide-y divide-gray-100">
                                {recentMessages.map((message) => (
                                    <li
                                        key={message.id}
                                        className="flex flex-col gap-2 px-5 py-4 transition-colors hover:bg-[#fafcf5] sm:flex-row sm:items-center sm:justify-between md:px-6"
                                    >
                                        <div className="min-w-0">
                                            <p className="flex items-center gap-2 truncate font-medium text-gray-900">
                                                <span className="truncate">
                                                    {message.subject ||
                                                        'Tanpa subjek'}
                                                </span>
                                                {!message.is_read && (
                                                    <span className="shrink-0 rounded-full bg-[#4b552a] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                                                        Baru
                                                    </span>
                                                )}
                                            </p>
                                            <p className="mt-0.5 truncate text-sm text-gray-500">
                                                {message.name}
                                                <span className="mx-1.5 text-gray-300">
                                                    ·
                                                </span>
                                                {message.email}
                                            </p>
                                        </div>
                                        <span className="shrink-0 text-xs font-medium text-gray-400">
                                            {new Date(
                                                message.created_at,
                                            ).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric',
                                            })}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}