// Adresse du service qui trouve une ville a partie de son nom
export const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";

// Adresse du service qui donne la meteo a partir d'un point sur la carte
export const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

export const REVERSE_GEOCODING_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

// langue des resultats de recherche
export const LANGUAGE = "fr";

// Nombre maximum de villes proposees apres une recherche
export const MAX_SUGGESTIONS = 5;

// Lieu affiche au premier chargement du site
export const DEFAULT_PLACE = {
    name: "Douala",
    country: "Cameroun",
    latitude: 4.0511,
    longitude: 9.7679,
};