import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Pencil, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Program, ProgramActivity } from '@/types/content';

type Props = {
    program: Program;
    activities: ProgramActivity[];
};

export default function AdminProgramActivities({ program, activities }: Props) {
    const remove = (activity: ProgramActivity) => {
        if (
            !window.confirm(
                `Hapus kegiatan "${activity.city}"? Tindakan ini tidak dapat dibatalkan.`,
            )
        ) {
            return;
        }

        router.delete(
            `/admin/programs/${program.id}/activities/${activity.id}`,
            { preserveScroll: true },
        );
    };

    return (
        <>
            <Head title={`Kegiatan ${program.title}`} />

            <div className="space-y-6 p-4 md:p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <Link
                            href="/admin/programs"
                            className="mb-2 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#4b552a]"
                        >
                            <ArrowLeft className="h-4 w-4" /> Kembali ke daftar
                            program
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Kegiatan {program.title}
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Kelola kegiatan yang tampil di halaman program.
                        </p>
                    </div>
                    <Link
                        href={`/admin/programs/${program.id}/activities/create`}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#4b552a] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#3a4220]"
                    >
                        <Plus className="h-4 w-4" /> Tambah Kegiatan
                    </Link>
                </div>

                {activities.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-sm text-gray-500">
                        Belum ada kegiatan untuk program ini.
                    </div>
                ) : (
                    <div className="space-y-3">
                        {activities.map((activity) => (
                            <div
                                key={activity.id}
                                className="flex flex-wrap items-start justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                            >
                                <div className="flex min-w-0 items-start gap-4">
                                    {activity.image_url && (
                                        <img
                                            src={activity.image_url}
                                            alt={activity.city}
                                            className="h-16 w-24 rounded-lg object-cover"
                                        />
                                    )}
                                    <div className="min-w-0">
                                        <p className="font-semibold text-gray-900">
                                            {activity.city}
                                        </p>
                                        {activity.category && (
                                            <span className="mt-1 inline-block rounded-full bg-[#eff5da] px-2 py-0.5 text-xs font-medium text-[#4b552a]">
                                                {activity.category}
                                            </span>
                                        )}
                                        <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                                            {(activity.detail_items ?? []).join(
                                                ' · ',
                                            )}
                                        </p>
                                        <p className="mt-1 text-xs text-gray-400">
                                            Urutan {activity.sort_order}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex shrink-0 items-center gap-2">
                                    <Link
                                        href={`/admin/programs/${program.id}/activities/${activity.id}/edit`}
                                        className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 px-3.5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                                    >
                                        <Pencil className="h-4 w-4" /> Edit
                                    </Link>
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => remove(activity)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
