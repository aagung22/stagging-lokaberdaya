import { type FormEvent, type ReactNode, useState } from 'react';
import { router, useForm } from '@inertiajs/react';
import { Pencil, Plus, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export type CrudField = {
    name: string;
    label: string;
    type?: 'text' | 'textarea' | 'number' | 'checkbox' | 'file' | 'select';
    placeholder?: string;
    required?: boolean;
    options?: { value: string; label: string }[];
    help?: string;
    full?: boolean;
};

type Item = Record<string, any>;

type Props<T extends Item> = {
    title: string;
    description?: string;
    storeUrl: string;
    items: T[];
    fields: CrudField[];
    createFields?: CrudField[];
    updateUrl: (item: T) => string;
    deleteUrl: (item: T) => string;
    renderItem: (item: T) => ReactNode;
    itemTitle: (item: T) => string;
    createButtonLabel?: string;
    emptyMessage?: string;
};

function initialData(fields: CrudField[], item?: Item): Item {
    return fields.reduce<Item>((data, field) => {
        if (field.type === 'checkbox') {
            data[field.name] = item
                ? Boolean(item[field.name])
                : field.name === 'is_active';
        } else if (field.type === 'file') {
            data[field.name] = null;
        } else {
            data[field.name] = item?.[field.name] ?? '';
        }

        return data;
    }, {});
}

function FieldInput({
    field,
    value,
    error,
    onChange,
}: {
    field: CrudField;
    value: any;
    error?: string;
    onChange: (value: any) => void;
}) {
    if (field.type === 'checkbox') {
        return (
            <div className="flex items-center gap-2 pt-6">
                <input
                    id={field.name}
                    type="checkbox"
                    checked={Boolean(value)}
                    onChange={(event) => onChange(event.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-[#4b552a] focus:ring-[#4b552a]"
                />
                <Label htmlFor={field.name} className="cursor-pointer">
                    {field.label}
                </Label>
            </div>
        );
    }

    return (
        <div className={field.full ? 'md:col-span-2' : undefined}>
            <Label htmlFor={field.name} className="mb-1.5 block">
                {field.label}
                {field.required && <span className="text-red-500"> *</span>}
            </Label>

            {field.type === 'textarea' ? (
                <textarea
                    id={field.name}
                    value={value ?? ''}
                    onChange={(event) => onChange(event.target.value)}
                    placeholder={field.placeholder}
                    rows={4}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-[#4b552a] focus:ring-2 focus:ring-[#4b552a]/30 focus:outline-none"
                />
            ) : field.type === 'select' ? (
                <select
                    id={field.name}
                    value={value ?? ''}
                    onChange={(event) => onChange(event.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-[#4b552a] focus:ring-2 focus:ring-[#4b552a]/30 focus:outline-none"
                >
                    <option value="">Pilih...</option>
                    {field.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            ) : field.type === 'file' ? (
                <Input
                    id={field.name}
                    type="file"
                    accept="image/*"
                    onChange={(event) =>
                        onChange(event.target.files?.[0] ?? null)
                    }
                    className="bg-white"
                />
            ) : (
                <Input
                    id={field.name}
                    type={field.type === 'number' ? 'number' : 'text'}
                    value={value ?? ''}
                    onChange={(event) => onChange(event.target.value)}
                    placeholder={field.placeholder}
                    className="bg-white"
                />
            )}

            {field.help && (
                <p className="mt-1 text-xs text-gray-500">{field.help}</p>
            )}
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
}

function CrudRow<T extends Item>({
    item,
    fields,
    updateUrl,
    deleteUrl,
    itemTitle,
    renderItem,
}: {
    item: T;
    fields: CrudField[];
    updateUrl: string;
    deleteUrl: string;
    itemTitle: string;
    renderItem: (item: T) => ReactNode;
}) {
    const [editing, setEditing] = useState(false);
    const form = useForm<Item>(initialData(fields, item));

    const submit = (event: FormEvent) => {
        event.preventDefault();

        form.put(updateUrl, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => setEditing(false),
        });
    };

    const remove = () => {
        if (
            !window.confirm(
                `Hapus "${itemTitle}"? Tindakan ini tidak dapat dibatalkan.`,
            )
        ) {
            return;
        }

        router.delete(deleteUrl, { preserveScroll: true });
    };

    return (
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3 p-4">
                <div className="min-w-0 flex-1">
                    {editing ? (
                        <p className="text-sm font-semibold text-[#4b552a]">
                            Mengubah: {itemTitle}
                        </p>
                    ) : (
                        renderItem(item)
                    )}
                </div>

                <div className="flex shrink-0 items-center gap-2">
                    {editing ? (
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setEditing(false)}
                        >
                            <X className="mr-1 h-4 w-4" /> Batal
                        </Button>
                    ) : (
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setEditing(true)}
                        >
                            <Pencil className="mr-1 h-4 w-4" /> Edit
                        </Button>
                    )}
                    <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={remove}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {editing && (
                <form
                    onSubmit={submit}
                    className="border-t border-gray-100 bg-gray-50/60 p-4"
                >
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {fields.map((field) => (
                            <FieldInput
                                key={field.name}
                                field={field}
                                value={form.data[field.name]}
                                error={
                                    form.errors[field.name] as
                                        | string
                                        | undefined
                                }
                                onChange={(value) =>
                                    form.setData(field.name, value)
                                }
                            />
                        ))}
                    </div>

                    <div className="mt-4 flex justify-end">
                        <Button type="submit" disabled={form.processing}>
                            Simpan Perubahan
                        </Button>
                    </div>
                </form>
            )}
        </div>
    );
}

export function CrudManager<T extends Item>({
    title,
    description,
    storeUrl,
    items,
    fields,
    createFields,
    updateUrl,
    deleteUrl,
    renderItem,
    itemTitle,
    createButtonLabel = 'Tambah',
    emptyMessage = 'Belum ada data.',
}: Props<T>) {
    const [showCreate, setShowCreate] = useState(false);
    const createForm = useForm<Item>(initialData(createFields ?? fields));

    const submitCreate = (event: FormEvent) => {
        event.preventDefault();

        createForm.post(storeUrl, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                createForm.reset();
                setShowCreate(false);
            },
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        {title}
                    </h1>
                    {description && (
                        <p className="mt-1 text-sm text-gray-500">
                            {description}
                        </p>
                    )}
                </div>
                <Button type="button" onClick={() => setShowCreate((v) => !v)}>
                    {showCreate ? (
                        <>
                            <X className="mr-1 h-4 w-4" /> Tutup Form
                        </>
                    ) : (
                        <>
                            <Plus className="mr-1 h-4 w-4" />{' '}
                            {createButtonLabel}
                        </>
                    )}
                </Button>
            </div>

            {showCreate && (
                <form
                    onSubmit={submitCreate}
                    className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                >
                    <h2 className="mb-4 text-lg font-semibold text-gray-900">
                        {createButtonLabel}
                    </h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {(createFields ?? fields).map((field) => (
                            <FieldInput
                                key={field.name}
                                field={field}
                                value={createForm.data[field.name]}
                                error={
                                    createForm.errors[field.name] as
                                        | string
                                        | undefined
                                }
                                onChange={(value) =>
                                    createForm.setData(field.name, value)
                                }
                            />
                        ))}
                    </div>
                    <div className="mt-4 flex justify-end">
                        <Button type="submit" disabled={createForm.processing}>
                            Simpan
                        </Button>
                    </div>
                </form>
            )}

            <div className="space-y-3">
                {items.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-sm text-gray-500">
                        {emptyMessage}
                    </div>
                ) : (
                    items.map((item) => (
                        <CrudRow
                            key={item.id}
                            item={item}
                            fields={fields}
                            updateUrl={updateUrl(item)}
                            deleteUrl={deleteUrl(item)}
                            itemTitle={itemTitle(item)}
                            renderItem={renderItem}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
