
import WeatherIcon from "./WeatherIcon";
import { formatDay, roundNumber } from "../utils/formatters";
import { getWeatherLabel } from "../utils/weatherCodes";
import "../styles/Forecast.css"

function Forecast({ days }) {
    return (
        <section className="card forecast">
            <h2 className="card__title">Les 7 prochains jours</h2>
            <ul>
                {days.map((day) => (
                    <li key={day.date}>
                        <WeatherIcon code={day.code} />
                        <span className="forecast__day">{formatDay(day.date)}</span>
                        <span className="forecast__label">{getWeatherLabel(day.code)}</span>
                        <span className="forecast__range">
                            {roundNumber(day.min)} / {roundNumber(day.max)}
                        </span>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default Forecast