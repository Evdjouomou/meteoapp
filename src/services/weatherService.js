import { WEATHER_URL } from "../config/api";

export async function fetchWeather(latitude, longitude) {
    const params = new URLSearchParams({
        latitude: latitude,
        longitude: longitude,
        current: "temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,is_day,pressure_msl",
        hourly: "temperature_2m,weather_code,is_day",
        daily: "weather_code,temperature_2m_max,temperature_2m_min",
        timezone:"auto",
    });

    const response = await fetch(`${WEATHER_URL}?${params}`);

    if (!response.ok) {
        throw new Error("Le service meteo ne repond pas.");
    }

    const data = await response.json();

    const days = data.daily.time.map((date, index) => ({
        date: date,
        code: data.daily.weather_code[index],
        min: data.daily.temperature_2m_min[index],
        max: data.daily.temperature_2m_max[index],
    }));

    const currentHour = data.current.time.slice(0, 13)
    const startIndex = data.hourly.time.findIndex(
        (time) => time.slice(0, 13) >= currentHour
    )

    const hours = data.hourly.time
        .slice(startIndex, startIndex + 24)
        .map((time, index) => ({
            time: time,
            temperature: data.hourly.temperature_2m[startIndex + index],
            code: data.hourly.weather_code[startIndex + index],
            isDay: data.hourly.is_day[startIndex + index] === 1,
        }))

    return {
        current: {
            temperature: data.current.temperature_2m,
            humidity: data.current.relative_humidity_2m,
            wind: data.current.wind_speed_10m,
            code: data.current.weather_code,
            isDay: data.current.is_day === 1,
            pressure: data.current.pressure_ms1,
        },
        hours : hours,
        days: days,
    };
}