import { usePage } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { useLiveRefresh } from '@/hooks/use-live-refresh';
import type { AppLayoutProps } from '@/types';

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
}: AppLayoutProps) {
    // Semua halaman admin ikut memperbarui data secara otomatis.
    useLiveRefresh(5000);

    const { unreadMessages } = usePage().props;
    const previousUnread = useRef(unreadMessages ?? 0);

    useEffect(() => {
        const current = unreadMessages ?? 0;

        if (current > previousUnread.current) {
            const difference = current - previousUnread.current;

            toast.success('Pesan baru masuk', {
                description: `${difference} pesan belum dibaca.`,
            });
        }

        previousUnread.current = current;
    }, [unreadMessages]);

    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar" className="min-w-0 overflow-x-clip">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
            </AppContent>
        </AppShell>
    );
}
