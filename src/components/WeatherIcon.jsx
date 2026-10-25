import { getWeatherCategory } from "../utils/weatherCategory"
import "../styles/WeatherIcon.css";

const ICONS = {
    sun: (
        <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </>
    ),
    moon: <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />,
    clouds: (
        <path d="M7 18a4 4 0 0 1-.5-7.97A5.5 5.5 0 0 1 17 9.5a4.25 4.25 0 0 1 .5 8.5z" />
    ),
    rain: (
        <>
            <path d="M7 16a4 4 0 0 1-.5-7.97A5.5 5.5 0 0 1 17 7.5a4.25 4.25 0 0 1 .5 8.5z" />
            <path d="M9 20l1-2M13 20l1-2M17 20l1-2" />    
        </>
    ),
    snow: (
        <>
            <path d="M7 16a4 4 0 0 1-.5-7.97A5.5 5.5 0 0 1 17 7.5a4.25 4.25 0 0 1 .5 8.5z" />
            <path d="M9 19h.01M13 20.5h.01M17 19h.01" />
        </>
    ),
    storm: (
        <>
            <path d="M7 14a4 4 0 0 1-.5-7.97A5.5 5.5 0 0 1 17 5.5a4.25 4.25 0 0 1 .5 8.5z" />
            <path d="M12.5 14l-3 4.5h4L11 23" />
        </>
    ),
};

export default function weatherIcon({ code, isDay = true, size = 24 }) {
    const category = getWeatherCategory(code);
    const name = category === "sun" && !isDay ? "moon" : category;

    return (
        <svg 
            className={`weather-icon weather-icon--${name}`}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            {ICONS[name]}
        </svg>
    );
}