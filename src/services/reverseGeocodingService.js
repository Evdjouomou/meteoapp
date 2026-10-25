import { LANGUAGE, REVERSE_GEOCODING_URL } from "../config/api"

export async function fetchPlaceName(latitude, longitude) {
    const params = new URLSearchParams({
        latitude: latitude,
        longitude: longitude,
        localityLanguage: LANGUAGE,
    });

    const response = await fetch(`${REVERSE_GEOCODING_URL}?${params}`, {
        signal: AbortSignal.timeout(4000),
    });

    if (!response.ok) {
        throw new Error("Impossible de retrouver le nom du lieu.");
    }

    const data = await response.json();

    return {
        name: data.city || data.locality || data.principalSubdivision || "",
        country: data.countryName || "",
    }
}