


export const getDays = (start_date, end_date) => {
    const start = new Date(start_date);
    const end = new Date(end_date);

    return (end - start) / (1000 * 3600 * 24);
}