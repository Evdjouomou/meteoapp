import { getWeatherCategory } from "./weatherCategory"

const SKIES = {
    sun: {
        day: ["#1d63b5", "#4a93da", "#8fc4ee"],
        night: ["#050b1f", "#0d1c3d", "#1a3260"]
    },
    clouds: {
        day: ["#4f6b8a", "#7893b0", "#a9bdd0"],
        night: ["#0c121c", "#18222f", "#27323f"],
    },
    rain: {
        day: ["#2c3a4c", "#3f5166", "#5b6f84"],
        night: ["#0a0f18", "#141c28", "#1f2937"],
    },
    snow: {
        day: ["#6a7f96", "#93a6b9", "#bccad8"],
        night: ["#1a2433", "#2a3748", "#3d4c5e"],
    },
    storm: {
        day: ["#161c2a", "#262f42", "#3a4659"],
        night: ["#070a12", "#10151f", "#1a212e"],
    },
};

const CLOUDS = {
    sun: [
        { frequency: "0.005 0.012", seed: 3, contrast: 1.9, offset: -1.0, color: [1, 1, 1], opacity: 0.9, duration: 95, top: "-4%" },
        { frequency: "0.008 0.016", seed: 8, contrast: 1.9, offset: -1.08, color: [1, 1, 1], opacity: 0.75, duration: 70, top: "8%" },
    ],
    clouds: [
        { frequency: "0.005 0.011", seed: 5, contrast: 2, offset: -0.55, color: [0.92, 0.95, 0.98], opacity: 0.95, duration: 110, top: "-4%" },
        { frequency: "0.008 0.015", seed: 11, contrast: 2, offset: -0.6, color: [0.84, 0.88, 0.93], opacity: 0.9, duration: 80, top: "6%" },
        { frequency: "0.012 0.02", seed: 2, contrast: 2, offset: -0.72, color: [1, 1, 1], opacity: 0.7, duration: 55, top: "12%" },
    ],
    rain: [
        { frequency: "0.005 0.011", seed: 7, contrast: 2.2, offset: -0.6, color: [0.2, 0.25, 0.31], opacity: 0.95, duration: 100, top: "-4%" },
        { frequency: "0.009 0.016", seed: 13, contrast: 2.2, offset: -0.66, color: [0.28, 0.33, 0.4], opacity: 0.85, duration: 70, top: "7%" },
    ],
    snow: [
        { frequency: "0.005 0.011", seed: 9, contrast: 2, offset: -0.6, color: [0.86, 0.89, 0.93], opacity: 0.9, duration: 105, top: "-4%" },
        { frequency: "0.009 0.016", seed: 4, contrast: 2, offset: -0.68, color: [0.95, 0.96, 0.98], opacity: 0.7, duration: 75, top: "8%" },
    ],
    storm: [
        { frequency: "0.005 0.011", seed: 6, contrast: 2.3, offset: -0.62, color: [0.1, 0.12, 0.18], opacity: 0.98, duration: 90, top: "-4%" },
        { frequency: "0.009 0.016", seed: 15, contrast: 2.3, offset: -0.68, color: [0.19, 0.21, 0.29], opacity: 0.9, duration: 65, top: "7%" },
    ],
}

const PARTICLES = {
    rain: "rain",
    storm: "rain",
    snow: "snow",
};

export function getWeatherTheme(code, isDay) {
    const category = getWeatherCategory(code);
    const dim = isDay ? 1 : 0.35;

    return {
        category: category,
        sky: SKIES[category][isDay ? "day" : "night"],
        clouds: CLOUDS[category].map((layer) => ({
            ...layer,
            color: layer.color.map((value) => value * dim),
        })),
        sun: category === "sun" && isDay,
        stars: category === "sun" && !isDay,
        particles: PARTICLES[category] ?? null,
        lightning: category === "storm",
    };
}