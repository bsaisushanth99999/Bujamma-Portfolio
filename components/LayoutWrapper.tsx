'use client';

import { usePathname } from 'next/navigation';
import SidebarNavigation from './SidebarNavigation';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isStudioRoute = pathname?.startsWith('/studio');

    return (
        <>
            {!isStudioRoute && <SidebarNavigation />}
            {children}
        </>
    );
} 