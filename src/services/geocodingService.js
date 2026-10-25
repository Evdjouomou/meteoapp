import { GEOCODING_URL, LANGUAGE, MAX_SUGGESTIONS } from "../config/api";

export async function searchCities(name) {
    const params = new URLSearchParams({
        name: name,
        count: MAX_SUGGESTIONS,
        language:LANGUAGE,
    });
    const response = await fetch(`${GEOCODING_URL}?${params}`);
    if(!response.ok) {
        throw new Error("La recherche de la ville a echoue.");
    }

    const data = await response.json();
    const results = data.results ?? [];
    return results.map((city) => ({
        id: city.id,
        name: city.name,
        region: city.admin1 ?? "",
        country: city.country ?? "",
        latitude: city.latitude,
        longitude: city.longitude,
    }));
}