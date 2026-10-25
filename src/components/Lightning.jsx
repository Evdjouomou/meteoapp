import { useEffect, useRef } from "react";
import "../styles/Lightning.css"

export default function Lightning() {
    const flashRef = useRef(null);

    useEffect(() => {
        const reduceMotion = window.matchMedia(
            "(preders-reduced-motion: reduce)"
        ).matches;
        if (reduceMotion) return;

        const flash = flashRef.current;
        const timers = [];
        let nextBolt = 0;

        function later(ms, action) {
            timers.push(setTimeout(action, ms));
        }

        function bolt() {
            timers.length = 0;

            flash.style.opacity = "0.7";
            later(90, () => {
                flash.style.opacity = "0";
            });
            later(190, () => {
                flash.style.opacity = "0.45";
            });
            later(270, () => {
                flash.style.opacity = "0";
            });

            nextBolt = setTimeout(bolt, 3500 + Math.random() * 5000)
        }

        nextBolt = setTimeout(bolt, 1800);

        return () => {
            clearTimeout(nextBolt);
            timers.forEach(clearTimeout);
        };
    }, []);

    return <div ref={flashRef} className="lightning" aria-hidden="true" />
}