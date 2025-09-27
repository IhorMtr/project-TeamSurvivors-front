'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrentWeek } from "@/hooks/useCurrentWeek";
import { PuffLoader } from "react-spinners";
import { useAuth } from "@/hooks/useAuth";

export default function JourneyRedirectPage() {
    const router = useRouter();
    const { currentWeek, isLoading } = useCurrentWeek();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (!isLoading) {
            if (isAuthenticated && currentWeek) {
                
                router.replace(`/journey/${currentWeek}`);
            } else if (isAuthenticated && currentWeek === null) {
                
                router.replace('/profile/edit');
            } else {
                
                router.replace('/auth/login');
            }
        }
    }, [router, currentWeek, isLoading, isAuthenticated]);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <PuffLoader />
                <p className="mt-4 text-gray-600">Визначаємо вашу текущу тиждень...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <PuffLoader  />
            <p className="mt-4 text-gray-600">Перенаправлення...</p>
        </div>
    );
}