import { useState, useEffect } from 'react';
import { usersApi } from '@/services/usersApi';
import { useAuth } from '@/hooks/useAuth';
import { calculateWeekNumber } from '@/utils/dateUtils';

export const useCurrentWeek = () => {
    const [currentWeek, setCurrentWeek] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        const fetchCurrentWeek = async () => {
            try {
                setIsLoading(true);
                setError(null);
                
                if (isAuthenticated) {
                    const userData = await usersApi.getCurrentUser();
                   
                    
                    if (userData?.dueDate) {
                        try {
                            const weekNumber = calculateWeekNumber(userData.dueDate);
                            setCurrentWeek(weekNumber);
                        } catch (calcError) {
                            console.error('Error calculating week number:', calcError);
                            setCurrentWeek(null);
                        }
                    } else {
                        setCurrentWeek(null);
                    }
                } else {
                    setCurrentWeek(null);
                }
            } catch (error) {
                console.error('Failed to fetch current week:', error);
                setError('Не вдалося завантажити дані');
                setCurrentWeek(null);
            } finally {
                setIsLoading(false);
            }
        };

        if (isAuthenticated) {
            fetchCurrentWeek();
        } else {
            setIsLoading(false);
            setCurrentWeek(null);
        }
    }, [isAuthenticated]);

    return { currentWeek, isLoading, error };
}