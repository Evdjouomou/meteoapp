import { useEffect, useRef } from "react";
import "../styles/ParticleCanvas.css";

const COUNTS = { rain: 170, snow: 90 };

function createParticle(type, width, height) {
    if (type === "rain") {
        return {
            x: Math.random() * width,
            y: Math.random() * height,
            length: 10 + Math.random() * 14,
            speed: 700 + Math.random() * 500,
            opacity: 0.25 + Math.random() * 0.4,
        };
    }

    return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 1 + Math.random() * 3,
        speed: 30 + Math.random() * 60,
        phase: Math.random() * Math.PI * 2,
        opacity: 0.55 + Math.random() * 0.4,
    };
}

export default function ParticleCanvas({ type }) {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        let width = 0;
        let height = 0;
        let particles = [];
        let lastTime = 0;
        let frameId = 0;

        function resize() {
            const ratio = window.devicePixelRatio || 1;
            width = canvas.clientWidth;
            height = canvas.clientHeight;
            canvas.width = width * ratio;
            canvas.height = height * ratio;
            ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
            particles = Array.from({ length: COUNTS[type] }, () =>
                createParticle(type, width, height)
            );
        }

        function drawRain(p, dt) {
            p.y += p.speed * dt;
            p.x -= p.speed * 0.12 * dt;
            if (p.y > height) {
                p.y = -20;
                p.x = Math.random() * (width + 120);
            }
            ctx.strokeStyle = `rgba(210, 225, 245, ${p.opacity})`;
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x - p.length * 0.12, p.y + p.length);
            ctx.stroke();
        }

        function drawSnow(p, dt) {
            p.y += p.speed * dt;
            p.phase += dt;
            p.x += Math.sin(p.phase) * 18 * dt;
            if (p.y > height + 6) {
                p.y = -8;
                p.x = Math.random() * width;
            }
            ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
        }

        function animate(time) {
            const dt = reduceMotion ? 0 : Math.min((time - lastTime) / 1000, 0.05);
            lastTime = time;

            ctx.clearRect(0, 0, width, height);
            particles.forEach((p) => (type === "rain" ? drawRain(p, dt) : drawSnow(p, dt)));

            frameId = requestAnimationFrame(animate);
        }

    resize();
    window.addEventListener("resize", resize);
    frameId = requestAnimationFrame(animate);

    return () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener("resize", resize);
    };
    }, [type]);

    return <canvas ref={canvasRef} className="particle-canvas" aria-hidden="true" />
}