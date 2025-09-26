export const calculateWeekNumber = (dueDate: string): number => {
    const today = new Date();
    const due = new Date(dueDate);
    const pregnancyStart = new Date(due);
    pregnancyStart.setDate(due.getDate() - 280); 
    
    const diffTime = today.getTime() - pregnancyStart.getTime();
    const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
    
    return Math.max(1, Math.min(40, diffWeeks));
};