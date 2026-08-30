"use client";

import { useEffect, useRef } from "react";

export default function CanvasGrid() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const drawDots = () => {
            const gap = 25;

            for (let x = 0; x < canvas.width; x += gap) {
                for (let y = 0; y < canvas.height; y += gap) {
                    ctx.beginPath();
                    ctx.arc(x, y, 1, 0, Math.PI * 2);
                    ctx.fillStyle = "rgba(253, 246, 246, 0.12)";
                    ctx.fill();
                }
            }
        };


        const drawBlobs = () => {
            const w = canvas.width;
            const h = canvas.height;

            const cx = w / 2;
            const cy = h / 2;

            const blobs = [
                { x: cx - 250, y: cy, r: 220 },
                { x: cx + 250, y: cy, r: 260 },
                { x: cx, y: cy - 200, r: 300 },
            ];

            ctx.globalAlpha = 0.25;
            ctx.fillStyle = "#050505";
            ctx.filter = "blur(120px)";

            blobs.forEach((b) => {
                ctx.beginPath();
                ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
                ctx.fill();
            });

            ctx.filter = "none";
            ctx.globalAlpha = 1;
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            drawDots();   // 👈 DOT BACK
            drawBlobs();  // 👈 BLOBS FRONT
        };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            draw();
        };

        resize();
        window.addEventListener("resize", resize);

        return () => window.removeEventListener("resize", resize);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full z-0"
        />
    );
}