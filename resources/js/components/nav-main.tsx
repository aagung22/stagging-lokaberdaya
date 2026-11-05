import { Link } from '@inertiajs/react';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useCurrentUrl } from '@/hooks/use-current-url';
import type { NavItem } from '@/types';

export function NavMain({
    items,
    label = 'Platform',
}: {
    items: NavItem[];
    label?: string;
}) {
    const { isCurrentUrl } = useCurrentUrl();

    return (
        <SidebarGroup className="px-2 py-1">
            {/* Label grup dibuat abu-abu kecil & uppercase ala dashboard */}
            <SidebarGroupLabel className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase mb-1">
                {label}
            </SidebarGroupLabel>
            <SidebarMenu className="gap-1">
                {items.map((item) => {
                    const active = isCurrentUrl(item.href);
                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                isActive={active}
                                tooltip={{ children: item.title }}
                                // Paksa warna default abu gelap, aktif/hover hijau
                                className={`
                                    rounded-lg transition-all duration-200
                                    ${active 
                                        ? '!bg-[#eff5da] !text-[#4b552a] font-semibold shadow-sm' 
                                        : 'text-gray-600 hover:!bg-[#f7f9f0] hover:!text-[#4b552a]'
                                    }
                                `}
                            >
                                <Link
                                    href={item.href}
                                    prefetch
                                    className="flex w-full items-center gap-2"
                                >
                                    {item.icon && (
                                        <item.icon className="h-4 w-4 shrink-0" />
                                    )}
                                    <span>{item.title}</span>
                                    {typeof item.badge === 'number' &&
                                        item.badge > 0 && (
                                            <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white">
                                                {item.badge > 99
                                                    ? '99+'
                                                    : item.badge}
                                            </span>
                                        )}
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}