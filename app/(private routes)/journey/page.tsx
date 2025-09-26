'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrentWeek } from "@/hooks/useCurrentWeek";
import { PuffLoader } from "react-spinners";

export default function JourneyRedirectPage() {
    const router = useRouter();
    const { currentWeek, isLoading } = useCurrentWeek();

    useEffect(() => {
        if (!isLoading && currentWeek) {
            router.replace(`/journey/${currentWeek}`);
        }
    }, [router, currentWeek, isLoading]);

    if (isLoading) {
        return (
            <div>
                <PuffLoader />
                <p>Визначаємо вашу текущу тиждень...</p>
            </div>
        );
    }

    return (
        <div >
            <p>Перенаправлення на {currentWeek} тиждень...</p>
        </div>
    );
}