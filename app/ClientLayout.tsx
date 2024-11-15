'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import LoadingSpinner from "@/components/LoadingSpinner";

export default function ClientLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();
    const [isNavigating, setIsNavigating] = useState(true);
    const [isContentVisible, setIsContentVisible] = useState(false);

    useEffect(() => {
        setIsNavigating(true);
        setIsContentVisible(false);

        const loadingTimer = setTimeout(() => {
            setIsNavigating(false);

            setTimeout(() => {
                setIsContentVisible(true);
            }, 100);

        }, 1000);

        return () => {
            clearTimeout(loadingTimer);
        };
    }, [pathname]);

    return (
        <div className="relative">
            {isNavigating && <LoadingSpinner />}
            <div
                className={`transition-opacity duration-300 ${isContentVisible ? 'opacity-100' : 'opacity-0'
                    }`}
            >
                {children}
            </div>
        </div>
    );
} 