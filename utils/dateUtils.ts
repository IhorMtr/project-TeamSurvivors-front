export const calculateWeekNumber = (dueDate: string): number => {
    if (!dueDate) {
        throw new Error('Due date is required');
    }
    
    const due = new Date(dueDate);
    const today = new Date();
    
    if (isNaN(due.getTime())) {
        throw new Error('Invalid due date');
    }
    
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const weeksPregnant = 40 - Math.ceil(diffDays / 7);
    
    return Math.max(1, Math.min(40, weeksPregnant));
};