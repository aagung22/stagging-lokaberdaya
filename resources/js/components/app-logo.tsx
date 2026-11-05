import { usePage } from '@inertiajs/react';

export default function AppLogo() {
    const { name } = usePage().props;
    const brandName = name || 'Loka Berdaya Amerta';

    return (
        <>
            <div className="flex aspect-square size-10 shrink-0 items-center justify-center rounded-lg bg-[#4b552a] p-1.5 shadow-sm transition-all group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:shadow-none">
                <img
                    src="/images/logo lba.webp" 
                    alt={brandName}
                    className="h-full w-full scale-125 object-contain transition-transform group-data-[collapsible=icon]:scale-100"
                />
            </div>
            
            {/* Teks otomatis tersembunyi oleh sistem Sidebar bawaan */}
            <div className="ml-3 grid flex-1 text-left text-base group-data-[collapsible=icon]:hidden">
                <span className="mb-0.5 truncate leading-tight font-bold text-gray-900">
                    {brandName}
                </span>
            </div>
        </>
    );
}