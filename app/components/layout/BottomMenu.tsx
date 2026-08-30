"use client"
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Link from 'next/link'
import { BehanceLogo, GithubLogo, LinkedinLogo } from "@phosphor-icons/react"

const menuItems = [
    { id: "github", label: "GitHub", href: "https://github.com/berkaybal99", icon: <GithubLogo weight="duotone" style={{ width: '100%', height: '100%' }} /> },
    { id: "behance", label: "Behance", href: "https://www.behance.net/berkaybal99", icon: <BehanceLogo weight="duotone" style={{ width: '100%', height: '100%' }} /> },
    { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/berkaybal99", icon: <LinkedinLogo weight="duotone" style={{ width: '100%', height: '100%' }} /> },
];

const BottomMenu = () => {
    const dockRef = useRef<HTMLUListElement>(null);
    const iconsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const dock = dockRef.current;
        const icons = iconsRef.current.filter(Boolean);
        const firstIcon = icons[0];

        if (!dock || icons.length === 0 || !firstIcon) return;

        const min = 48; // 40 + margin
        const max = 120;
        const bound = min * Math.PI;

        gsap.set(icons, {
            transformOrigin: "50% 100%",
            height: 40,
            width: 40
        });

        gsap.set(dock, {
            position: "relative",
            height: 60
        });

        const updateIcons = (pointer: number) => {
            for (let i = 0; i < icons.length; i++) {
                const icon = icons[i];
                if (!icon) continue;

                const distance = (i * min + min / 2) - pointer;
                let x = 0;
                let scale = 1;

                if (-bound < distance && distance < bound) {
                    const rad = distance / min * 0.5;
                    scale = 1 + (max / min - 1) * Math.cos(rad);
                    x = 2 * (max - min) * Math.sin(rad);
                } else {
                    x = (-bound < distance ? 2 : -2) * (max - min);
                }

                gsap.to(icon, {
                    duration: 0.3,
                    x: x,
                    scale: scale
                });
            }
        };

        const handleMouseMove = (event: MouseEvent) => {
            const offset = dock.getBoundingClientRect().left + firstIcon.offsetLeft;
            updateIcons(event.clientX - offset);
        };

        const handleMouseLeave = () => {
            gsap.to(icons, {
                duration: 0.3,
                scale: 1,
                x: 0
            });
        };

        const handleTouchEnd = () => {
            handleMouseLeave();
        };

        dock.addEventListener("mousemove", handleMouseMove);
        dock.addEventListener("mouseleave", handleMouseLeave);
        dock.addEventListener("touchend", handleTouchEnd);

        // Touch dragging support for mobile
        let isDragging = false;
        let startX = 0;
        let currentTranslate = 0;
        let initialTranslate = 0;

        const onTouchStart = (e: TouchEvent) => {
            isDragging = true;
            startX = e.touches[0].clientX;
            const style = window.getComputedStyle(dock);
            const matrix = new DOMMatrixReadOnly(style.transform === 'none' ? undefined : style.transform);
            currentTranslate = matrix.m41; // get tx
            initialTranslate = currentTranslate;
        };

        const onTouchMove = (e: TouchEvent) => {
            if (!isDragging) return;
            const deltaX = e.touches[0].clientX - startX;
            let newX = initialTranslate + deltaX;

            const wrapperWidth = window.innerWidth;
            const dockWidth = dock.scrollWidth;

            if (dockWidth > wrapperWidth) {
                const padding = 20;
                const minDrag = wrapperWidth - dockWidth - padding;
                const maxDrag = padding;

                if (newX > maxDrag) newX = maxDrag;
                if (newX < minDrag) newX = minDrag;

                gsap.set(dock, { x: newX });
            }
        };

        const onTouchEndDrag = () => {
            isDragging = false;
        };

        dock.addEventListener("touchstart", onTouchStart, { passive: true });
        window.addEventListener("touchmove", onTouchMove, { passive: true });
        window.addEventListener("touchend", onTouchEndDrag);

        return () => {
            dock.removeEventListener("mousemove", handleMouseMove);
            dock.removeEventListener("mouseleave", handleMouseLeave);
            dock.removeEventListener("touchend", handleTouchEnd);

            dock.removeEventListener("touchstart", onTouchStart);
            window.removeEventListener("touchmove", onTouchMove);
            window.removeEventListener("touchend", onTouchEndDrag);
        };
    }, []);

    return (
        <div style={{ position: 'fixed', bottom: '12px', left: '50%', transform: 'translateX(-50%)', zIndex: 99999, pointerEvents: 'none', display: 'flex', justifyContent: 'center', width: '100%' }}>
            <ul
                ref={dockRef}
                className="
                pointer-events-auto
                flex items-center gap-1
                bg-[#131313] 
                border border-white/5
                rounded-2xl
                px-2 py-1.5
                shadow-[0_20px_40px_rgba(0,0,0,0.6)]
                w-max
            ">
                {menuItems.map((item, i) => (
                    <li key={i} className="shrink-0 flex items-center justify-center">
                        <Link
                            href={item.href}
                            style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            className="
                                group relative
                                rounded-[10px]
                                hover:bg-white/5
                                transition-colors duration-300
                            "
                            title={item.label}
                            target={item.href.startsWith('https://') ? '_blank' : undefined}
                            rel={item.href.startsWith('https://') ? 'noopener noreferrer' : undefined}
                        >
                            {/* ICONS */}
                            <div
                                ref={(el: HTMLDivElement | null) => { iconsRef.current[i] = el; }}
                                style={{ width: '28px', height: '28px', color: '#e5e5e5' }}
                                className="
                                    flex items-center justify-center
                                    origin-bottom
                                    will-change-transform
                                "
                            >
                                {item.icon}
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default BottomMenu
