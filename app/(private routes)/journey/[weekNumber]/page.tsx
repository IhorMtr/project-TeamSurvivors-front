'use client';

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import WeekSelector from "@/components/WeekSelector/WeekSelector";
import JourneyDetails from "@/components/JourneyDetails/JourneyDetails";
import styles from "./page.module.css";
import { useCurrentWeek } from "@/hooks/useCurrentWeek";
import { useAuth } from "@/hooks/useAuth";
import { PuffLoader } from "react-spinners";

export default function JourneyPage() {
    const params = useParams();
    const router = useRouter();
    const { currentWeek, isLoading: weekLoading } = useCurrentWeek();
    const { isAuthenticated, isLoading: authLoading } = useAuth();
    
    const weekNumber = parseInt(params.weekNumber as string) || 1;

    useEffect(() => {
        if (!authLoading && !weekLoading) {
            
            if (!isAuthenticated) {
                router.replace('/auth/login');
                return;
            }
            
            
            if (currentWeek === null) {
                router.replace('/profile/edit');
                return;
            }
            
           
            if (weekNumber > currentWeek) {
                router.replace(`/journey/${currentWeek}`);
                return;
            }
        }
    }, [isAuthenticated, currentWeek, weekNumber, authLoading, weekLoading, router]);

   
    if (authLoading || weekLoading || !isAuthenticated || currentWeek === null || weekNumber > currentWeek) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <PuffLoader color="#36d7b7" />
                <p className="mt-4 text-gray-600">Завантаження...</p>
            </div>
        );
    }

    return (
        <div className={styles.journeyPage}>
            <div className={styles.journeyPage__content}> 
                <WeekSelector currentWeek={weekNumber} maxWeek={currentWeek} />
                <JourneyDetails weekNumber={weekNumber} />
            </div>
        </div>
    );
}