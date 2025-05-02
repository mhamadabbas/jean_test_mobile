/**
 * Format a date to a stirng
 *
 * @param date - The date to format
 * @returns The formatted date
 */
export const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

/**
 * Format a date to be compliant with what the server expects
 * (YYYY-MM-DD)
 *
 * @param date - The date to format
 * @returns The formatted date
 */
export const formatDateForServer = (date: string | Date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Check if two dates are the same day
 *
 * @param date1 - The first date
 * @param date2 - The second date
 * @returns True if the dates are the same day, false otherwise
 */
export const isSameDate = (date1?: string | Date | null, date2?: string | Date | null) => {
    if (!date1 || !date2) return false;
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
}