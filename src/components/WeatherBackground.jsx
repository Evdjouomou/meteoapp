import { getWeatherTheme } from "../utils/weatherTheme";
import "../styles/WeatherBackground.css";
import ParticleCanvas from "./ParticleCanvas";
import Lightning from "./Lightning";

const STARS = Array.from({ length: 60}, (_, i) => ({
    left: (i * 37) % 100,
    top: (i * 53) % 60,
    size: 1 + (i % 3),
    delay: (i * 0.7) % 4,
}));

export default function WeatherBackground({ code, isDay }) {
    const theme = getWeatherTheme(code, isDay)
    const [top, middle, bottom] = theme.sky;

    const skyStyle = {
        background: `linear-gradient(180deg, ${top} 0%, ${middle} 55%, ${bottom} 100%)`,
    };

    return (
        <div className="weather-background" style={skyStyle} aria-hidden="true">
            {theme.sun && <div className="weather-background__sun" />}

            {theme.stars && 
                STARS.map((star, index) => (
                    <span 
                        key={index}
                        className="weather-background__star"
                        style={{
                            left: `${star.left}%`,
                            top: `${star.top}%`,
                            width: star.size,
                            height: star.size,
                            animationDelay: `${star.delay}s`,
                        }}
                    />
                ))
            }
            {theme.clouds.map((layer, index) => {
                const filterId = `cloud-filter-${index}`;
                const [r, g, b] = layer.color;
                const matrix = `0 0 0 0 ${r} 0 0 0 0 ${g} 0 0 0 0 ${b} 0 0 0 ${layer.contrast} ${layer.offset}`;

                return (
                    <svg
                        key={filterId}
                        className="weather-background__cloud"
                        style={{
                            top: layer.top,
                            opacity: layer.opacity,
                            animationDuration: `${layer.duration}s`,
                            animationDelay: `-${index * 17}s`,
                        }}
                        preserveAspectRatio="none"
                    >
                        <filter id={filterId} x="0" y="0" width="100%" height="100%">
                            <feTurbulence
                                type="fractalNoise"
                                baseFrequency={layer.frequency}
                                numOctaves="5"
                                seed={layer.seed}
                            />
                            <feColorMatrix type="matrix" values={matrix} />
                        </filter>
                        <rect width="100%" height="100%" filter={`url(#${filterId})`} />
                    </svg>
                )
            })}

            {theme.particles && <ParticleCanvas type={theme.particles} />}

            {theme.lightning && <Lightning />}
        </div>
    ) 
}