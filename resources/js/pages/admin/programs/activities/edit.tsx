import { type FormEvent } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Program, ProgramActivity } from '@/types/content';

type Props = {
    program: Program;
    activity: ProgramActivity | null;
};

const labelClass = 'mb-1.5 block';
const textareaClass =
    'w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-[#4b552a] focus:ring-2 focus:ring-[#4b552a]/30 focus:outline-none';

export default function AdminProgramActivityEdit({ program, activity }: Props) {
    const isEditing = activity !== null;

    const form = useForm({
        city: activity?.city ?? '',
        category: activity?.category ?? '',
        details: (activity?.detail_items ?? []).join('\n'),
        long_description: activity?.long_description ?? '',
        sort_order: activity?.sort_order ?? 0,
        image: null as File | null,
    });

    const submit = (event: FormEvent) => {
        event.preventDefault();

        if (isEditing) {
            form.put(
                `/admin/programs/${program.id}/activities/${activity.id}`,
                { forceFormData: true, preserveScroll: true },
            );

            return;
        }

        form.post(`/admin/programs/${program.id}/activities`, {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head
                title={
                    isEditing
                        ? `Edit Kegiatan - ${activity.city}`
                        : `Tambah Kegiatan - ${program.title}`
                }
            />

            <form onSubmit={submit} className="space-y-6 p-4 md:p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <Link
                            href={`/admin/programs/${program.id}/activities`}
                            className="mb-2 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#4b552a]"
                        >
                            <ArrowLeft className="h-4 w-4" /> Kembali ke daftar
                            kegiatan
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {isEditing
                                ? `Edit Kegiatan: ${activity.city}`
                                : 'Tambah Kegiatan'}
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Program {program.title}
                        </p>
                    </div>
                    <Button type="submit" disabled={form.processing}>
                        {isEditing ? 'Simpan Perubahan' : 'Simpan Kegiatan'}
                    </Button>
                </div>

                <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <Label className={labelClass}>Kota / Wilayah</Label>
                            <Input
                                value={form.data.city}
                                onChange={(event) =>
                                    form.setData('city', event.target.value)
                                }
                                className="bg-white"
                                required
                            />
                            {form.errors.city && (
                                <p className="mt-1 text-sm text-red-500">
                                    {form.errors.city}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label className={labelClass}>Kategori</Label>
                            <Input
                                value={form.data.category}
                                onChange={(event) =>
                                    form.setData('category', event.target.value)
                                }
                                placeholder="Contoh: Fattening / Breeding"
                                className="bg-white"
                            />
                            <p className="mt-1 text-xs text-gray-500">
                                Dipakai untuk memisahkan kegiatan peternakan.
                            </p>
                        </div>

                        <div>
                            <Label className={labelClass}>Urutan</Label>
                            <Input
                                type="number"
                                value={form.data.sort_order}
                                onChange={(event) =>
                                    form.setData(
                                        'sort_order',
                                        Number(event.target.value),
                                    )
                                }
                                className="bg-white"
                            />
                        </div>

                        <div>
                            <Label className={labelClass}>
                                Gambar Kegiatan
                            </Label>
                            {activity?.image_url && (
                                <img
                                    src={activity.image_url}
                                    alt={activity.city}
                                    className="mb-2 h-24 w-auto rounded border border-gray-200 object-cover"
                                />
                            )}
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(event) =>
                                    form.setData(
                                        'image',
                                        event.target.files?.[0] ?? null,
                                    )
                                }
                                className="bg-white"
                            />
                            <p className="mt-1 text-xs text-gray-500">
                                Kosongkan jika tidak ingin mengubah gambar.
                            </p>
                        </div>

                        <div className="md:col-span-2">
                            <Label className={labelClass}>
                                Poin Detail (satu poin per baris)
                            </Label>
                            <textarea
                                value={form.data.details}
                                onChange={(event) =>
                                    form.setData('details', event.target.value)
                                }
                                rows={5}
                                className={textareaClass}
                                placeholder={
                                    'Lokasi: Desa ...\nLuasan Lahan: 5 Ha\nJumlah PM: 13'
                                }
                            />
                        </div>

                        <div className="md:col-span-2">
                            <Label className={labelClass}>
                                Penjelasan Lengkap
                            </Label>
                            <textarea
                                value={form.data.long_description}
                                onChange={(event) =>
                                    form.setData(
                                        'long_description',
                                        event.target.value,
                                    )
                                }
                                rows={10}
                                className={textareaClass}
                                placeholder="Pisahkan paragraf dengan baris kosong."
                            />
                        </div>
                    </div>
                </section>

                <div className="flex justify-end">
                    <Button type="submit" disabled={form.processing}>
                        {isEditing ? 'Simpan Perubahan' : 'Simpan Kegiatan'}
                    </Button>
                </div>
            </form>
        </>
    );
}
