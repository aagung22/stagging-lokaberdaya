import type { Auth } from '@/types/auth';
import type { SiteSettings } from '@/types/content';

declare module 'react' {
    interface InputHTMLAttributes<T> {
        passwordrules?: string;
    }
}

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            auth: Auth;
            site: SiteSettings;
            unreadMessages: number;
            sidebarOpen: boolean;
            [key: string]: unknown;
        };
    }
}
