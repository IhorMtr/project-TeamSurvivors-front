'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrentWeek } from "@/hooks/useCurrentWeek";


export default function JourneyRedirectPage() {
    const router = useRouter();
    const currentWeek = useCurrentWeek();


    useEffect(() => {
        if (currentWeek) {
            router.replace(`/journey/${currentWeek}`);
        }
    }, [router, currentWeek]);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }}>
            <p>Перенаправлення на Ваш {currentWeek} тиждень...</p>
        </div>
    )
}