import { Head, router } from '@inertiajs/react';
import {
    Check,
    ChevronDown,
    ChevronUp,
    Clock,
    Inbox,
    Mail,
    MailOpen,
    Phone,
    Search,
    Trash2,
    X,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import type { ContactMessage } from '@/types/content';

type Props = {
    messages: ContactMessage[];
};

type ReadFilter = 'all' | 'unread' | 'read';

function formatDateTime(value: string): string {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return date.toLocaleString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

function initials(name: string): string {
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join('');
}

export default function AdminMessages({ messages }: Props) {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState<ReadFilter>('all');
    const [expandedId, setExpandedId] = useState<number | null>(null);

    const counts = useMemo(
        () => ({
            all: messages.length,
            unread: messages.filter((message) => !message.is_read).length,
            read: messages.filter((message) => message.is_read).length,
        }),
        [messages],
    );

    const filtered = useMemo(() => {
        const query = search.trim().toLowerCase();

        return messages.filter((message) => {
            if (filter === 'unread' && message.is_read) {
                return false;
            }

            if (filter === 'read' && !message.is_read) {
                return false;
            }

            if (!query) {
                return true;
            }

            return [
                message.name,
                message.email,
                message.phone ?? '',
                message.subject ?? '',
                message.message,
            ]
                .join(' ')
                .toLowerCase()
                .includes(query);
        });
    }, [messages, filter, search]);

    const toggleRead = (message: ContactMessage) => {
        router.patch(
            `/admin/messages/${message.id}/toggle-read`,
            {},
            { preserveScroll: true, preserveState: true },
        );
    };

    const remove = (message: ContactMessage) => {
        if (
            !window.confirm(
                `Hapus pesan dari "${message.name}"? Tindakan ini tidak dapat dibatalkan.`,
            )
        ) {
            return;
        }

        router.delete(`/admin/messages/${message.id}`, {
            preserveScroll: true,
            preserveState: true,
        });
    };

    const filterTabs: { key: ReadFilter; label: string; count: number }[] = [
        { key: 'all', label: 'Semua', count: counts.all },
        { key: 'unread', label: 'Belum Dibaca', count: counts.unread },
        { key: 'read', label: 'Sudah Dibaca', count: counts.read },
    ];

    const hasActiveFilter = search.trim() !== '' || filter !== 'all';

    return (
        <>
            <Head title="Pesan Masuk" />

            <div className="space-y-6 p-4 md:p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <div className="flex flex-wrap items-center gap-2.5">
                            <h1 className="text-2xl font-bold text-gray-900">
                                Pesan Masuk
                            </h1>
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eff5da] px-2.5 py-1 text-xs font-medium text-[#4b552a]">
                                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                                Diperbarui otomatis
                            </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                            Pesan yang dikirim pengunjung melalui halaman
                            Kontak. Daftar akan diperbarui otomatis tanpa perlu
                            refresh.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-center shadow-sm">
                            <p className="text-xl font-bold text-gray-900">
                                {counts.unread}
                            </p>
                            <p className="text-[11px] font-medium text-gray-500">
                                Belum dibaca
                            </p>
                        </div>
                        <div className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-center shadow-sm">
                            <p className="text-xl font-bold text-gray-900">
                                {counts.all}
                            </p>
                            <p className="text-[11px] font-medium text-gray-500">
                                Total pesan
                            </p>
                        </div>
                    </div>
                </div>

                {/* Toolbar: pencarian & filter */}
                <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                        <div className="relative flex-1 lg:max-w-md">
                            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={search}
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                                placeholder="Cari nama, email, subjek, atau isi pesan..."
                                className="h-10 w-full rounded-lg border border-gray-300 bg-white pr-9 pl-9 text-sm text-gray-900 transition outline-none focus:border-[#4b552a] focus:ring-1 focus:ring-[#4b552a]"
                            />
                            {search && (
                                <button
                                    type="button"
                                    onClick={() => setSearch('')}
                                    className="absolute top-1/2 right-2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                                    aria-label="Hapus pencarian"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            {filterTabs.map((tab) => (
                                <button
                                    key={tab.key}
                                    type="button"
                                    onClick={() => setFilter(tab.key)}
                                    className={`inline-flex h-9 items-center gap-1.5 rounded-lg border px-3 text-sm font-medium transition ${
                                        filter === tab.key
                                            ? 'border-[#4b552a] bg-[#4b552a] text-white'
                                            : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    {tab.label}
                                    <span
                                        className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                                            filter === tab.key
                                                ? 'bg-white/20 text-white'
                                                : 'bg-gray-100 text-gray-600'
                                        }`}
                                    >
                                        {tab.count}
                                    </span>
                                </button>
                            ))}

                            {hasActiveFilter && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearch('');
                                        setFilter('all');
                                    }}
                                    className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                                >
                                    <X className="h-4 w-4" /> Reset
                                </button>
                            )}
                        </div>
                    </div>

                    {hasActiveFilter && (
                        <p className="mt-3 text-xs text-gray-500">
                            Menampilkan {filtered.length} dari {counts.all}{' '}
                            pesan.
                        </p>
                    )}
                </div>

                {/* Daftar pesan */}
                {filtered.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
                        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 text-gray-300">
                            <Inbox className="h-5 w-5" />
                        </div>
                        <p className="text-sm text-gray-500">
                            {counts.all === 0
                                ? 'Belum ada pesan masuk.'
                                : 'Tidak ada pesan yang cocok dengan filter/pencarian.'}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filtered.map((message) => {
                            const expanded = expandedId === message.id;

                            return (
                                <article
                                    key={message.id}
                                    className={`rounded-xl border bg-white shadow-sm transition ${
                                        message.is_read
                                            ? 'border-gray-200'
                                            : 'border-[#cfdcae] ring-1 ring-[#eff5da]'
                                    }`}
                                >
                                    <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-start sm:justify-between">
                                        <div className="flex min-w-0 flex-1 gap-3">
                                            <div
                                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                                                    message.is_read
                                                        ? 'bg-gray-100 text-gray-500'
                                                        : 'bg-[#4b552a] text-white'
                                                }`}
                                            >
                                                {initials(message.name) || (
                                                    <Mail className="h-4 w-4" />
                                                )}
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <p className="font-semibold text-gray-900">
                                                        {message.subject ||
                                                            'Tanpa subjek'}
                                                    </p>
                                                    {!message.is_read && (
                                                        <span className="rounded-full bg-[#4b552a] px-2 py-0.5 text-[10px] font-bold tracking-wide text-white uppercase">
                                                            Baru
                                                        </span>
                                                    )}
                                                </div>

                                                <p className="mt-0.5 text-sm text-gray-500">
                                                    {message.name}
                                                    <span className="mx-1.5 text-gray-300">
                                                        ·
                                                    </span>
                                                    <a
                                                        href={`mailto:${message.email}`}
                                                        className="hover:text-[#4b552a] hover:underline"
                                                    >
                                                        {message.email}
                                                    </a>
                                                </p>

                                                {message.phone && (
                                                    <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                                                        <Phone className="h-3 w-3" />
                                                        {message.phone}
                                                    </p>
                                                )}

                                                <p
                                                    className={`mt-2 text-sm whitespace-pre-line text-gray-700 ${
                                                        expanded
                                                            ? ''
                                                            : 'line-clamp-3'
                                                    }`}
                                                >
                                                    {message.message}
                                                </p>

                                                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-400">
                                                    <span className="inline-flex items-center gap-1">
                                                        <Clock className="h-3 w-3" />
                                                        {formatDateTime(
                                                            message.created_at,
                                                        )}
                                                    </span>

                                                    {message.message.length >
                                                        180 && (
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setExpandedId(
                                                                    expanded
                                                                        ? null
                                                                        : message.id,
                                                                )
                                                            }
                                                            className="inline-flex items-center gap-1 font-medium text-[#4b552a] hover:underline"
                                                        >
                                                            {expanded ? (
                                                                <>
                                                                    <ChevronUp className="h-3.5 w-3.5" />
                                                                    Ringkas
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <ChevronDown className="h-3.5 w-3.5" />
                                                                    Selengkapnya
                                                                </>
                                                            )}
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex shrink-0 flex-wrap items-center gap-2 sm:flex-col sm:items-end">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    toggleRead(message)
                                                }
                                            >
                                                {message.is_read ? (
                                                    <>
                                                        <Mail className="mr-1 h-4 w-4" />
                                                        Tandai belum dibaca
                                                    </>
                                                ) : (
                                                    <>
                                                        <Check className="mr-1 h-4 w-4" />
                                                        Tandai dibaca
                                                    </>
                                                )}
                                            </Button>

                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => remove(message)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    {expanded && (
                                        <div className="flex flex-wrap items-center gap-4 border-t border-gray-100 bg-gray-50/60 px-4 py-3 text-xs text-gray-500">
                                            <span className="inline-flex items-center gap-1">
                                                <MailOpen className="h-3.5 w-3.5" />
                                                Status:{' '}
                                                {message.is_read
                                                    ? 'Sudah dibaca'
                                                    : 'Belum dibaca'}
                                            </span>
                                            {message.phone && (
                                                <span className="inline-flex items-center gap-1">
                                                    <Phone className="h-3.5 w-3.5" />
                                                    {message.phone}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </article>
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
}
