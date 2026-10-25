import WeatherIcon from "./WeatherIcon";
import { formatHour, roundNumber } from "../utils/formatters";
import "../styles/HourlyForecast.css";

function HourlyForecast({ hours }) {
    return (
        <section className="card hourly-forecast">
            <h2 className="card__title">Previsions horaires</h2>
            <ul>
                {hours.map((hour, index) => (
                    <li key={hour.time}>
                        <span className="hourly-forecast__time">
                            {index === 0 ? "Maint." : formatHour(hour.time)}
                        </span>
                        <WeatherIcon code={hour.code} isDay={hour.isDay} />
                        <span className="hourly-forecast__temp">
                            {roundNumber(hour.temperature)}°
                        </span>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default HourlyForecast