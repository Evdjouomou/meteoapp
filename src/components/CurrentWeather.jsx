import { getWeatherLabel } from "../utils/weatherCodes"
import { roundNumber } from "../utils/formatters";
import "../styles/CurrentWeather.css"

function CurrentWeather({ place, current }) {
    return (
        <section className="current-weather">
            <h1>
                {place.name}
                {place.country && <span>{place.country}</span>}
            </h1>

            <p className="current-weather__temp">
                {roundNumber(current.temperature)} °C
            </p>

            <p className="current-weather__label">
                {getWeatherLabel(current.code)}
            </p>

            <p className="current-weather__details">
                Humidite {current.humidity} % . Vent {roundNumber(current.wind)} km/h
            </p>
        </section>
    )
}

export default CurrentWeather