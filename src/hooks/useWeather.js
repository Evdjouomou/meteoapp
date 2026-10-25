import { useEffect, useState } from "react";
import { fetchWeather } from "../services/weatherService";

export default function useWeather(place) {
    const [weather, setWeather] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect (() => {
        let cancelled = false

        async function load() {
            setLoading(true)
            setError("")
            try {
                const data = await fetchWeather(place.latitude, place.longitude)
                if (!cancelled) setWeather(data)
            } catch (err) {
                if (!cancelled) setError(err.message || "Impossible de charger la meteo.")
            } finally {
                if (!cancelled) setLoading(false)
            }
        }

        load()

        return () => {
            cancelled = true
        }
    }, [place])

    return { weather, loading, error }
}