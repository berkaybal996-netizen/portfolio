"use client";

import { useEffect } from "react";
import gsap from "gsap";

export default function CursorController() {
    useEffect(() => {
        const cursor = document.getElementById("user-cursor");
        if (!cursor) return;

        const move = (e: MouseEvent) => {
            gsap.set(cursor, {
                x: e.clientX,
                y: e.clientY,
            });
        };

        window.addEventListener("mousemove", move);

        return () => {
            window.removeEventListener("mousemove", move);
        };
    }, []);

    return null;
}
