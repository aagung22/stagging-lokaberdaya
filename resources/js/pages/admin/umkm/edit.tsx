import { type FormEvent, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { UmkmRegion } from '@/types/content';

type Props = {
    region: UmkmRegion | null;
};

type BeneficiaryInput = {
    name: string;
    business: string;
};

const labelClass = 'mb-1.5 block';
const fieldClass =
    'w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-[#4b552a] focus:ring-2 focus:ring-[#4b552a]/30 focus:outline-none';

export default function AdminUmkmEdit({ region }: Props) {
    const isEditing = region !== null;
    const [newImages, setNewImages] = useState<File[]>([]);
    const [removedImages, setRemovedImages] = useState<number[]>([]);

    const form = useForm({
        city: region?.city ?? '',
        description: region?.description ?? '',
        sort_order: region?.sort_order ?? 0,
        beneficiaries: (region?.beneficiaries ?? []).map<BeneficiaryInput>(
            (beneficiary) => ({
                name: beneficiary.name,
                business: beneficiary.business,
            }),
        ),
    });

    const toggleRemoveImage = (imageId: number) => {
        setRemovedImages((current) =>
            current.includes(imageId)
                ? current.filter((id) => id !== imageId)
                : [...current, imageId],
        );
    };

    const updateBeneficiary = (
        index: number,
        key: keyof BeneficiaryInput,
        value: string,
    ) => {
        const beneficiaries = form.data.beneficiaries.map(
            (beneficiary, beneficiaryIndex) =>
                beneficiaryIndex === index
                    ? { ...beneficiary, [key]: value }
                    : beneficiary,
        );

        form.setData('beneficiaries', beneficiaries);
    };

    const addBeneficiary = () => {
        form.setData('beneficiaries', [
            ...form.data.beneficiaries,
            { name: '', business: '' },
        ]);
    };

    const removeBeneficiary = (index: number) => {
        form.setData(
            'beneficiaries',
            form.data.beneficiaries.filter(
                (_, beneficiaryIndex) => beneficiaryIndex !== index,
            ),
        );
    };

    const submit = (event: FormEvent) => {
        event.preventDefault();

        const options = {
            forceFormData: true,
            preserveScroll: true,
        };

        const payload = {
            ...form.data,
            images: newImages,
            remove_images: removedImages,
        } as unknown as typeof form.data;

        if (isEditing) {
            form.transform(() => payload);
            form.put(`/admin/umkm/${region.id}`, options);

            return;
        }

        form.transform(() => payload);
        form.post('/admin/umkm', options);
    };

    return (
        <>
            <Head
                title={
                    isEditing
                        ? `Edit Wilayah - ${region.city}`
                        : 'Tambah Wilayah UMKM'
                }
            />

            <form onSubmit={submit} className="space-y-6 p-4 md:p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <Link
                            href="/admin/umkm"
                            className="mb-2 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#4b552a]"
                        >
                            <ArrowLeft className="h-4 w-4" /> Kembali ke daftar
                            wilayah
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {isEditing
                                ? `Edit Wilayah: ${region.city}`
                                : 'Tambah Wilayah UMKM'}
                        </h1>
                    </div>
                    <Button type="submit" disabled={form.processing}>
                        {isEditing ? 'Simpan Perubahan' : 'Simpan Wilayah'}
                    </Button>
                </div>

                <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <h2 className="mb-4 border-b border-gray-100 pb-3 text-lg font-semibold text-gray-900">
                        Informasi Wilayah
                    </h2>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <Label className={labelClass}>
                                Kota / Wilayah *
                            </Label>
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
                            <Label className={labelClass}>Deskripsi</Label>
                            <textarea
                                value={form.data.description}
                                onChange={(event) =>
                                    form.setData(
                                        'description',
                                        event.target.value,
                                    )
                                }
                                rows={4}
                                className={fieldClass}
                            />
                        </div>
                    </div>
                </section>

                <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <h2 className="mb-4 border-b border-gray-100 pb-3 text-lg font-semibold text-gray-900">
                        Galeri Gambar
                    </h2>

                    {isEditing && region.images.length > 0 && (
                        <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-4">
                            {region.images.map((image) => {
                                const willRemove = removedImages.includes(
                                    image.id,
                                );

                                return (
                                    <div
                                        key={image.id}
                                        className={`relative overflow-hidden rounded-lg border ${
                                            willRemove
                                                ? 'border-red-400 opacity-40'
                                                : 'border-gray-200'
                                        }`}
                                    >
                                        {image.image_url && (
                                            <img
                                                src={image.image_url}
                                                alt={`Gambar ${region.city}`}
                                                className="h-28 w-full object-cover"
                                            />
                                        )}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                toggleRemoveImage(image.id)
                                            }
                                            className="absolute top-1 right-1 rounded bg-black/60 px-2 py-1 text-xs font-medium text-white hover:bg-red-600"
                                        >
                                            {willRemove ? 'Batal' : 'Hapus'}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    <Label className={labelClass}>Tambah Gambar Baru</Label>
                    <Input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(event) =>
                            setNewImages(Array.from(event.target.files ?? []))
                        }
                        className="bg-white"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                        Bisa memilih lebih dari satu gambar. Gambar baru akan
                        ditambahkan ke galeri.
                    </p>
                    {newImages.length > 0 && (
                        <p className="mt-2 text-xs font-medium text-[#4b552a]">
                            {newImages.length} gambar dipilih.
                        </p>
                    )}
                </section>

                <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-3">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Penerima Manfaat
                        </h2>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={addBeneficiary}
                        >
                            <Plus className="mr-1 h-4 w-4" /> Tambah
                        </Button>
                    </div>

                    {form.data.beneficiaries.length === 0 ? (
                        <p className="text-sm text-gray-500">
                            Belum ada penerima manfaat. Klik "Tambah".
                        </p>
                    ) : (
                        <div className="space-y-3">
                            {form.data.beneficiaries.map(
                                (beneficiary, index) => (
                                    <div
                                        key={index}
                                        className="grid grid-cols-1 gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3 md:grid-cols-12"
                                    >
                                        <div className="md:col-span-5">
                                            <Label className={labelClass}>
                                                Nama
                                            </Label>
                                            <Input
                                                value={beneficiary.name}
                                                onChange={(event) =>
                                                    updateBeneficiary(
                                                        index,
                                                        'name',
                                                        event.target.value,
                                                    )
                                                }
                                                className="bg-white"
                                            />
                                        </div>
                                        <div className="md:col-span-5">
                                            <Label className={labelClass}>
                                                Bidang Usaha
                                            </Label>
                                            <Input
                                                value={beneficiary.business}
                                                onChange={(event) =>
                                                    updateBeneficiary(
                                                        index,
                                                        'business',
                                                        event.target.value,
                                                    )
                                                }
                                                className="bg-white"
                                            />
                                        </div>
                                        <div className="flex items-end md:col-span-2">
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                className="w-full"
                                                onClick={() =>
                                                    removeBeneficiary(index)
                                                }
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ),
                            )}
                        </div>
                    )}
                </section>

                <div className="flex justify-end">
                    <Button type="submit" disabled={form.processing}>
                        {isEditing ? 'Simpan Perubahan' : 'Simpan Wilayah'}
                    </Button>
                </div>
            </form>
        </>
    );
}
