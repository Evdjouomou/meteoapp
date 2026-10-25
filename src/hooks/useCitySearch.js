import { useState } from "react";
import { searchCities } from "../services/geocodingService";

export default function useCitySearch() {
    const [query, setQuery] = useState("")
    const [suggestions, setSuggestions] = useState([])
    const [error, setError] = useState("")

    async function search () {
        const name = query.trim()
        if(name === "") return;

        setError("");
        try {
            const cities = await searchCities(name);
            if (cities.length === 0) {
                setSuggestions([])
                setError(`Aucune ville trouvee pour "${name}".`)
            } else {
                setSuggestions(cities)
            }
        } catch {
            setSuggestions([])
            setError("La recherche a echoue. Verifie ta connexion internet.")
        }
    }

    function clear() {
        setSuggestions([])
        setQuery("")
    }

    return { query, setQuery, suggestions, error, search, clear }
}