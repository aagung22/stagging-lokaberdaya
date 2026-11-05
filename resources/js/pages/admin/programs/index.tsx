import { Head, Link } from '@inertiajs/react';
import { CalendarDays, Pencil, Plus, Users } from 'lucide-react';
import type { Program } from '@/types/content';

type Props = {
    programs: Program[];
};

export default function AdminPrograms({ programs }: Props) {
    return (
        <>
            <Head title="Program Pemberdayaan" />

            <div className="space-y-6 p-4 md:p-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Program Pemberdayaan
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Kelola konten halaman program: judul, deskripsi,
                        statistik, dan kegiatan.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {programs.map((program) => (
                        <div
                            key={program.id}
                            className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
                        >
                            {program.hero_image_url && (
                                <img
                                    src={program.hero_image_url}
                                    alt={program.title}
                                    className="h-40 w-full object-cover"
                                />
                            )}

                            <div className="p-5">
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <h2 className="text-lg font-bold text-gray-900">
                                            {program.title}
                                        </h2>
                                        <p className="text-xs text-gray-400">
                                            /program/{program.slug} · Urutan{' '}
                                            {program.sort_order}
                                        </p>
                                    </div>
                                    <span
                                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                                            program.is_active
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-red-100 text-red-600'
                                        }`}
                                    >
                                        {program.is_active
                                            ? 'Aktif'
                                            : 'Nonaktif'}
                                    </span>
                                </div>

                                <p className="mt-3 line-clamp-3 text-sm text-gray-600">
                                    {program.short_description}
                                </p>

                                <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
                                    <span className="flex items-center gap-1">
                                        <Users className="h-4 w-4" />
                                        {program.stats_count ?? 0} statistik
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <CalendarDays className="h-4 w-4" />
                                        {program.activities_count ?? 0} kegiatan
                                    </span>
                                </div>

                                <div className="mt-5 flex flex-wrap gap-2">
                                    <Link
                                        href={`/admin/programs/${program.id}/edit`}
                                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#4b552a] px-3.5 py-2 text-sm font-medium text-white transition hover:bg-[#3a4220]"
                                    >
                                        <Pencil className="h-4 w-4" /> Edit
                                        Program
                                    </Link>
                                    <Link
                                        href={`/admin/programs/${program.id}/activities`}
                                        className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 px-3.5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                                    >
                                        <CalendarDays className="h-4 w-4" />{' '}
                                        Kelola Kegiatan
                                    </Link>
                                    <Link
                                        href={`/admin/programs/${program.id}/activities/create`}
                                        className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 px-3.5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                                    >
                                        <Plus className="h-4 w-4" /> Tambah
                                        Kegiatan
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
