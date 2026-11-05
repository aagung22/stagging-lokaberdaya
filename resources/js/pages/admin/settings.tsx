import { type FormEvent } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Settings = Record<string, string | null>;

type Props = {
    settings: Settings;
    textKeys: string[];
    imageKeys: string[];
};

const labels: Record<string, string> = {
    site_name: 'Nama Situs',
    site_tagline: 'Tagline',
    phone: 'Nomor Telepon / WhatsApp',
    email: 'Email',
    address: 'Alamat Kantor',
    maps_embed_url: 'URL Embed Google Maps',
    hero_title: 'Judul Hero (baris 1)',
    hero_title_accent: 'Judul Hero (baris 2)',
    hero_subtitle: 'Subjudul Hero',
    landing_stat_1_value: 'Statistik 1 - Nilai',
    landing_stat_1_label: 'Statistik 1 - Label',
    landing_stat_2_value: 'Statistik 2 - Nilai',
    landing_stat_2_label: 'Statistik 2 - Label',
    landing_stat_3_value: 'Statistik 3 - Nilai',
    landing_stat_3_label: 'Statistik 3 - Label',
    about_years: 'Tentang - Angka Tahun',
    about_years_label: 'Tentang - Label Tahun',
    about_eyebrow: 'Tentang - Eyebrow',
    about_title: 'Tentang - Judul',
    about_text: 'Tentang - Deskripsi',
    vision: 'Visi',
    mission: 'Misi (satu baris per poin)',
    footer_description: 'Deskripsi Footer',
    about_page_badge: 'Halaman Tentang - Badge',
    about_page_title: 'Halaman Tentang - Judul',
    about_page_intro: 'Halaman Tentang - Intro',
    about_story_quote: 'Halaman Tentang - Kutipan Cerita',
    about_story:
        'Halaman Tentang - Cerita (pisahkan paragraf dengan baris kosong)',
    peternakan_fattening_description: 'Peternakan - Deskripsi Fattening',
    peternakan_breeding_description: 'Peternakan - Deskripsi Breeding',
};

const groups: { title: string; keys: string[]; imageKeys?: string[] }[] = [
    {
        title: 'Identitas Situs',
        keys: ['site_name', 'site_tagline'],
        imageKeys: ['logo'],
    },
    {
        title: 'Kontak',
        keys: ['phone', 'email', 'address', 'maps_embed_url'],
    },
    {
        title: 'Landing Page - Hero & Statistik',
        keys: [
            'hero_title',
            'hero_title_accent',
            'hero_subtitle',
            'landing_stat_1_value',
            'landing_stat_1_label',
            'landing_stat_2_value',
            'landing_stat_2_label',
            'landing_stat_3_value',
            'landing_stat_3_label',
        ],
    },
    {
        title: 'Landing Page - Tentang, Visi & Misi',
        keys: [
            'about_years',
            'about_years_label',
            'about_eyebrow',
            'about_title',
            'about_text',
            'vision',
            'mission',
        ],
        imageKeys: ['about_image'],
    },
    {
        title: 'Halaman Tentang Kami',
        keys: [
            'about_page_badge',
            'about_page_title',
            'about_page_intro',
            'about_story_quote',
            'about_story',
        ],
        imageKeys: ['about_page_image', 'about_values_image'],
    },
    {
        title: 'Program Peternakan',
        keys: [
            'peternakan_fattening_description',
            'peternakan_breeding_description',
        ],
    },
    {
        title: 'Footer',
        keys: ['footer_description'],
    },
];

const imageLabels: Record<string, string> = {
    logo: 'Logo Situs',
    about_image: 'Gambar Tentang (Landing)',
    about_page_image: 'Gambar Hero Halaman Tentang',
    about_values_image: 'Gambar Nilai-Nilai',
};

const longFields = new Set([
    'address',
    'maps_embed_url',
    'about_text',
    'vision',
    'mission',
    'footer_description',
    'about_page_intro',
    'about_story_quote',
    'about_story',
    'peternakan_fattening_description',
    'peternakan_breeding_description',
]);

export default function AdminSettings({
    settings,
    textKeys,
    imageKeys,
}: Props) {
    const initial: Record<string, any> = {};

    textKeys.forEach((key) => {
        initial[key] = settings[key] ?? '';
    });
    imageKeys.forEach((key) => {
        initial[key] = null;
    });

    const form = useForm(initial);

    const submit = (event: FormEvent) => {
        event.preventDefault();

        form.put('/admin/settings', {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    const usedTextKeys = new Set(groups.flatMap((group) => group.keys));
    const leftoverKeys = textKeys.filter((key) => !usedTextKeys.has(key));

    return (
        <>
            <Head title="Pengaturan Situs" />

            <form onSubmit={submit} className="space-y-6 p-4 md:p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Pengaturan Situs
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Kelola teks dan gambar yang tampil di halaman
                            publik.
                        </p>
                    </div>
                    <Button type="submit" disabled={form.processing}>
                        Simpan Pengaturan
                    </Button>
                </div>

                {groups.map((group) => (
                    <section
                        key={group.title}
                        className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                    >
                        <h2 className="mb-4 border-b border-gray-100 pb-3 text-lg font-semibold text-gray-900">
                            {group.title}
                        </h2>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {group.keys.map((key) => (
                                <div
                                    key={key}
                                    className={
                                        longFields.has(key)
                                            ? 'md:col-span-2'
                                            : undefined
                                    }
                                >
                                    <Label
                                        htmlFor={key}
                                        className="mb-1.5 block"
                                    >
                                        {labels[key] ?? key}
                                    </Label>
                                    {longFields.has(key) ? (
                                        <textarea
                                            id={key}
                                            value={form.data[key] ?? ''}
                                            onChange={(event) =>
                                                form.setData(
                                                    key,
                                                    event.target.value,
                                                )
                                            }
                                            rows={
                                                key === 'maps_embed_url' ? 3 : 4
                                            }
                                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-[#4b552a] focus:ring-2 focus:ring-[#4b552a]/30 focus:outline-none"
                                        />
                                    ) : (
                                        <Input
                                            id={key}
                                            value={form.data[key] ?? ''}
                                            onChange={(event) =>
                                                form.setData(
                                                    key,
                                                    event.target.value,
                                                )
                                            }
                                            className="bg-white"
                                        />
                                    )}
                                    {form.errors[key] && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {form.errors[key]}
                                        </p>
                                    )}
                                </div>
                            ))}

                            {(group.imageKeys ?? []).map((key) => (
                                <div key={key}>
                                    <Label
                                        htmlFor={key}
                                        className="mb-1.5 block"
                                    >
                                        {imageLabels[key] ?? key}
                                    </Label>
                                    {settings[key] && (
                                        <img
                                            src={settings[key] as string}
                                            alt={imageLabels[key] ?? key}
                                            className="mb-2 h-20 w-auto rounded border border-gray-200 object-contain p-1"
                                        />
                                    )}
                                    <Input
                                        id={key}
                                        type="file"
                                        accept="image/*"
                                        onChange={(event) =>
                                            form.setData(
                                                key,
                                                event.target.files?.[0] ?? null,
                                            )
                                        }
                                        className="bg-white"
                                    />
                                    <p className="mt-1 text-xs text-gray-500">
                                        Kosongkan jika tidak ingin mengubah
                                        gambar.
                                    </p>
                                    {form.errors[key] && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {form.errors[key]}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                ))}

                {leftoverKeys.length > 0 && (
                    <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                        <h2 className="mb-4 border-b border-gray-100 pb-3 text-lg font-semibold text-gray-900">
                            Pengaturan Lainnya
                        </h2>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {leftoverKeys.map((key) => (
                                <div key={key}>
                                    <Label
                                        htmlFor={key}
                                        className="mb-1.5 block"
                                    >
                                        {labels[key] ?? key}
                                    </Label>
                                    <Input
                                        id={key}
                                        value={form.data[key] ?? ''}
                                        onChange={(event) =>
                                            form.setData(
                                                key,
                                                event.target.value,
                                            )
                                        }
                                        className="bg-white"
                                    />
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <div className="flex justify-end">
                    <Button type="submit" disabled={form.processing}>
                        Simpan Pengaturan
                    </Button>
                </div>
            </form>
        </>
    );
}
