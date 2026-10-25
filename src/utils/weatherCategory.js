export function getWeatherCategory(code) {
    if (code >= 95) return "storm";
    if ((code >= 71 && code <= 77) || code === 85 || code === 86) return "snow";
    if ((code >= 51 && code <= 67) || code === 80 && code <= 82) return "rain";
    if (code <= 1) return "sun";
    return "clouds";
}