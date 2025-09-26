import {useState, useEffect} from 'react';
import { usersApi } from '@/services/usersApi';
import { useAuth } from '@/hooks/useAuth';
import { calculateWeekNumber } from '@/utils/dateUtils';

export const useCurrentWeek = () => {
    const [currentWeek, setCurrentWeek] = useState(5);
    const [isLoading, setIsLoading] = useState(true);
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        const fetchCurrentWeek = async () => {
            try {
                if (isAuthenticated) {
                    const userData = await usersApi.getCurrentUser();
                    const weekNumber = calculateWeekNumber(userData.dueDate);
                    setCurrentWeek(weekNumber);
                } else {
                    setCurrentWeek(5); 
                }
            } catch (error) {
                console.error('Failed to fetch current week:', error);
                setCurrentWeek(5); 
            } finally {
                setIsLoading(false);
            }
        };
        fetchCurrentWeek();
    }, [isAuthenticated]);

    return {currentWeek, isLoading };
}