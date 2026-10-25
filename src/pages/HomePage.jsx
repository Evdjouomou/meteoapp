import { useState } from "react"

import { DEFAULT_PLACE } from "../config/api"
import useCitySearch from "../hooks/useCitySearch"
import useWeather from "../hooks/useWeather"

import CurrentWeather from "../components/CurrentWeather"
import SearchBar from "../components/SearchBar"
import SuggestionList from "../components/SuggestionList"
import ErrorMessage from "../components/ErrorMessage"
import Loader from "../components/Loader"
import Forecast from "../components/Forecast"
import HourlyForecast from "../components/HourlyForecast"

import "../styles/HomePage.css"
import WeatherBackground from "../components/WeatherBackground"
import useGeolocation from "../hooks/useGeolocation"

function HomePage(){
    const [chosenPlace, setChosenPlace] = useState(null);

    const geolocation = useGeolocation();
    const place = chosenPlace ?? geolocation.place ?? DEFAULT_PLACE;

    const citySearch = useCitySearch()
    const { weather, loading, error: weatherError } = useWeather(place)

    function handleSelectCity(city) {
        setChosenPlace(city)
        citySearch.clear()
    }

    const errorMessage = citySearch.error || weatherError

    return (
        <>
            {weather && (
                <WeatherBackground
                    code={weather.current.code}
                    isDay={weather.current.isDay}
                />
            )}
            <main className="home-page">
                <SearchBar
                    query={citySearch.query}
                    onQueryChange={citySearch.setQuery}
                    onSubmit={citySearch.search}
                />

                <SuggestionList
                    suggestions={citySearch.suggestions}
                    onSelect={handleSelectCity}
                />

                <ErrorMessage message={errorMessage} />

                {loading && <Loader />}

                {weather && !loading && (
                    <>
                        <CurrentWeather place={place} current={weather.current} />
                        <HourlyForecast hours={weather.hours} />
                        <Forecast days={weather.days} />
                    </>
                )}
            </main>
        </>
        
    )

}

export default HomePage