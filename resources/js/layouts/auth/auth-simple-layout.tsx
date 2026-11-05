import { Link, usePage } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    const { name, site } = usePage().props;
    const brand = site?.site_name || name || 'Loka Berdaya Amerta';

    return (
        <div className="relative flex min-h-svh flex-col items-center justify-center gap-6 overflow-hidden bg-[#f7ffda] p-6 md:p-10">
            <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#eff5da] opacity-70 blur-3xl" />
            <div className="pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-[#e5edcb] opacity-70 blur-3xl" />

            <div className="relative w-full max-w-sm">
                <div className="flex flex-col gap-8 rounded-2xl border border-[#4b552a]/10 bg-white p-6 shadow-lg md:p-8">
                    <div className="flex flex-col items-center gap-4">
                        <Link
                            href="/"
                            className="flex flex-col items-center gap-2 font-medium"
                        >
                            <div className="mb-1 flex h-14 w-14 items-center justify-center rounded-full bg-[#eff5da]">
                                <AppLogoIcon className="size-9 fill-current text-[#4b552a]" />
                            </div>
                            <span className="text-lg font-bold tracking-tight text-[#4b552a]">
                                {brand}
                            </span>
                        </Link>

                        <div className="space-y-2 text-center">
                            <h1 className="text-xl font-semibold text-gray-900">
                                {title}
                            </h1>
                            <p className="text-center text-sm text-gray-500">
                                {description}
                            </p>
                        </div>
                    </div>
                    {children}
                </div>

                <p className="mt-6 text-center text-sm text-gray-500">
                    <Link
                        href="/"
                        className="font-medium text-[#4b552a] hover:underline"
                    >
                        Kembali ke halaman utama
                    </Link>
                </p>
            </div>
        </div>
    );
}
