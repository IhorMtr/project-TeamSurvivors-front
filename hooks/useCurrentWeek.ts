import {useState, useEffect} from 'react';

export const useCurrentWeek = () => {
    const [currentWeek, setCurrentWeek] = useState(1);

        useEffect(() => {
            const fetchCurrentWeek = async () => {
                try {
                    setCurrentWeek(16);
                } catch (error) {
                    console.error('Failed to fetch current week:', error);
                }
            }
            fetchCurrentWeek();
        }, []);

        return currentWeek;



}