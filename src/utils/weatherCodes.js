const WEATHER_LABELS = {
    0: "Ciel degage",
    1: "Plutot degage",
    2: "Partiellement nuageux",
    3: "Couvert",
    45: "Brouillard",
    48: "Brouillard givrant",
    51: "Bruine legere",
    53: "Bruine",
    55: "Bruine forte",
    61: "Pluie faible",
    63: "Pluie",
    65: "Pluie forte",
    71: "Neige faible",
    73: "Neige",
    75: "Neige forte",
    80: "Averses faibles",
    81: "Averses",
    82: "Averses violentes",
    95: "Orage",
    96: "Orage avec grele",
    99: "Orage violent avec grele",
};

export function getWeatherLabel(code) {
    return WEATHER_LABELS[code] ?? "Conditions inconnues";
}