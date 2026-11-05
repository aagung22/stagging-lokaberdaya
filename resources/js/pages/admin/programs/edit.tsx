import { type FormEvent } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Program } from '@/types/content';

type Props = {
    program: Program;
};

type StatInput = {
    label: string;
    value: string;
    icon: string;
    sort_order: number;
};

const iconOptions = [
    { value: 'users', label: 'Pengguna (users)' },
    { value: 'building', label: 'Gedung (building)' },
    { value: 'wheat', label: 'Gandum (wheat)' },
    { value: 'tree-pine', label: 'Pohon (tree-pine)' },
    { value: 'milk', label: 'Susu (milk)' },
    { value: 'wallet', label: 'Dompet (wallet)' },
    { value: 'map-pin', label: 'Lokasi (map-pin)' },
    { value: 'trending-up', label: 'Grafik (trending-up)' },
];

const labelClass = 'mb-1.5 block';
const textareaClass =
    'w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-[#4b552a] focus:ring-2 focus:ring-[#4b552a]/30 focus:outline-none';

export default function AdminProgramEdit({ program }: Props) {
    const form = useForm({
        title: program.title,
        slug: program.slug,
        page_title: program.page_title ?? '',
        short_description: program.short_description ?? '',
        hero_description: program.hero_description ?? '',
        sort_order: program.sort_order,
        is_active: program.is_active,
        hero_image: null as File | null,
        stats: (program.stats ?? []).map<StatInput>((stat) => ({
            label: stat.label,
            value: stat.value,
            icon: stat.icon ?? 'users',
            sort_order: stat.sort_order,
        })),
    });

    const submit = (event: FormEvent) => {
        event.preventDefault();

        form.put(`/admin/programs/${program.id}`, {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    const updateStat = (
        index: number,
        key: keyof StatInput,
        value: string | number,
    ) => {
        const stats = form.data.stats.map((stat, statIndex) =>
            statIndex === index ? { ...stat, [key]: value } : stat,
        );

        form.setData('stats', stats);
    };

    const addStat = () => {
        form.setData('stats', [
            ...form.data.stats,
            {
                label: '',
                value: '',
                icon: 'users',
                sort_order: form.data.stats.length,
            },
        ]);
    };

    const removeStat = (index: number) => {
        form.setData(
            'stats',
            form.data.stats.filter((_, statIndex) => statIndex !== index),
        );
    };

    return (
        <>
            <Head title={`Edit Program - ${program.title}`} />

            <form onSubmit={submit} className="space-y-6 p-4 md:p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <Link
                            href="/admin/programs"
                            className="mb-2 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#4b552a]"
                        >
                            <ArrowLeft className="h-4 w-4" /> Kembali ke daftar
                            program
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Edit Program: {program.title}
                        </h1>
                    </div>
                    <Button type="submit" disabled={form.processing}>
                        Simpan Program
                    </Button>
                </div>

                <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <h2 className="mb-4 border-b border-gray-100 pb-3 text-lg font-semibold text-gray-900">
                        Informasi Program
                    </h2>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <Label className={labelClass}>Judul Program</Label>
                            <Input
                                value={form.data.title}
                                onChange={(event) =>
                                    form.setData('title', event.target.value)
                                }
                                className="bg-white"
                            />
                            {form.errors.title && (
                                <p className="mt-1 text-sm text-red-500">
                                    {form.errors.title}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label className={labelClass}>Slug URL</Label>
                            <Input
                                value={form.data.slug}
                                onChange={(event) =>
                                    form.setData('slug', event.target.value)
                                }
                                className="bg-white"
                            />
                            {form.errors.slug && (
                                <p className="mt-1 text-sm text-red-500">
                                    {form.errors.slug}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label className={labelClass}>Judul Halaman</Label>
                            <Input
                                value={form.data.page_title}
                                onChange={(event) =>
                                    form.setData(
                                        'page_title',
                                        event.target.value,
                                    )
                                }
                                className="bg-white"
                            />
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

                        <div className="md:col-span-2">
                            <Label className={labelClass}>
                                Deskripsi Singkat
                            </Label>
                            <textarea
                                value={form.data.short_description}
                                onChange={(event) =>
                                    form.setData(
                                        'short_description',
                                        event.target.value,
                                    )
                                }
                                rows={2}
                                className={textareaClass}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <Label className={labelClass}>
                                Deskripsi Halaman (pisahkan paragraf dengan
                                baris kosong)
                            </Label>
                            <textarea
                                value={form.data.hero_description}
                                onChange={(event) =>
                                    form.setData(
                                        'hero_description',
                                        event.target.value,
                                    )
                                }
                                rows={8}
                                className={textareaClass}
                            />
                        </div>

                        <div>
                            <Label className={labelClass}>Gambar Hero</Label>
                            {program.hero_image_url && (
                                <img
                                    src={program.hero_image_url}
                                    alt={program.title}
                                    className="mb-2 h-24 w-auto rounded border border-gray-200 object-cover"
                                />
                            )}
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(event) =>
                                    form.setData(
                                        'hero_image',
                                        event.target.files?.[0] ?? null,
                                    )
                                }
                                className="bg-white"
                            />
                            <p className="mt-1 text-xs text-gray-500">
                                Kosongkan jika tidak ingin mengubah gambar.
                            </p>
                        </div>

                        <div className="flex items-center gap-2 pt-6">
                            <input
                                id="is_active"
                                type="checkbox"
                                checked={form.data.is_active}
                                onChange={(event) =>
                                    form.setData(
                                        'is_active',
                                        event.target.checked,
                                    )
                                }
                                className="h-4 w-4 rounded border-gray-300 text-[#4b552a] focus:ring-[#4b552a]"
                            />
                            <Label
                                htmlFor="is_active"
                                className="cursor-pointer"
                            >
                                Tampilkan program di landing page
                            </Label>
                        </div>
                    </div>
                </section>

                <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-3">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Statistik Program
                        </h2>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={addStat}
                        >
                            <Plus className="mr-1 h-4 w-4" /> Tambah Statistik
                        </Button>
                    </div>

                    {form.data.stats.length === 0 ? (
                        <p className="text-sm text-gray-500">
                            Belum ada statistik. Klik "Tambah Statistik".
                        </p>
                    ) : (
                        <div className="space-y-3">
                            {form.data.stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className="grid grid-cols-1 gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3 md:grid-cols-12"
                                >
                                    <div className="md:col-span-3">
                                        <Label className={labelClass}>
                                            Nilai
                                        </Label>
                                        <Input
                                            value={stat.value}
                                            onChange={(event) =>
                                                updateStat(
                                                    index,
                                                    'value',
                                                    event.target.value,
                                                )
                                            }
                                            placeholder="100+"
                                            className="bg-white"
                                        />
                                    </div>
                                    <div className="md:col-span-4">
                                        <Label className={labelClass}>
                                            Label
                                        </Label>
                                        <Input
                                            value={stat.label}
                                            onChange={(event) =>
                                                updateStat(
                                                    index,
                                                    'label',
                                                    event.target.value,
                                                )
                                            }
                                            placeholder="Penerima Manfaat"
                                            className="bg-white"
                                        />
                                    </div>
                                    <div className="md:col-span-3">
                                        <Label className={labelClass}>
                                            Ikon
                                        </Label>
                                        <select
                                            value={stat.icon}
                                            onChange={(event) =>
                                                updateStat(
                                                    index,
                                                    'icon',
                                                    event.target.value,
                                                )
                                            }
                                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-[#4b552a] focus:outline-none"
                                        >
                                            {iconOptions.map((option) => (
                                                <option
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex items-end md:col-span-2">
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="sm"
                                            className="w-full"
                                            onClick={() => removeStat(index)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                <div className="flex justify-end">
                    <Button type="submit" disabled={form.processing}>
                        Simpan Program
                    </Button>
                </div>
            </form>
        </>
    );
}
