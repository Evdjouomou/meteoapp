export function roundNumber(value) {
    return Math.round(value)
}

export function formatDay(dateString) {
    return new Date(dateString).toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        timeZone: "UTC",
    });
}

export function formatHour(timeString) {
    const hour = Number(timeString.slice(11, 13))
    return `${hour} h`
}