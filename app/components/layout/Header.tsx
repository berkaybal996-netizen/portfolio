"use client";

import { useEffect, useState } from "react";
import LanguageToggle from "../ui/LanguageToggle";
import { useI18n } from "../../lib/i18n";

const Header = () => {
    const { t } = useI18n();
    const [time, setTime] = useState("");
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 8);
        };

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });

        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const updateDate = () => {
            const now = new Date();
            const options: Intl.DateTimeFormatOptions = {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            };

            setTime(now.toLocaleTimeString("en-US", options));
        };

        updateDate();
        const interval = setInterval(updateDate, 1000);

        return () => clearInterval(interval);
    }, []);

    const navItems = [
        { href: "#Work", label: t.nav.work },
        { href: "#Featured", label: t.nav.featured },
        { href: "#contact", label: t.nav.contact },
    ];

    const navLinkClass =
        "header-text whitespace-nowrap border border-white/10 px-3 py-2 hover:bg-white/10 transition-colors";

    return (
        <div
            data-scrolled={scrolled ? "true" : "false"}
            className={`site-header fixed top-0 left-0 w-full px-5 z-50 transition-[background-color,backdrop-filter,border-color] duration-300 ease-out ${scrolled
                ? "bg-[#050505]/55 backdrop-blur-xl border-b border-white/10"
                : "bg-transparent border-b border-transparent"
                }`}
        >

            <div className="relative max-w-[1440px] mx-auto py-3 md:py-4 text-sm type-mono text-[#f0f0f0]">

                {/* three tracks on desktop so the clock can never collide with the nav */}
                <div className="flex items-center justify-between gap-3 md:grid md:grid-cols-[1fr_auto_1fr]">
                    <div className="text-lg md:text-xl type-primary font-semibold tracking-tight md:justify-self-start">
                        Berkay Bal
                    </div>

                    <div className="hidden text-xl md:block md:justify-self-center">
                        {time}
                    </div>

                    <div className="flex items-center gap-2 md:justify-self-end">
                        <nav className="hidden items-center gap-2 text-sm md:flex lg:text-base">
                            {navItems.map((item) => (
                                <a key={item.href} href={item.href} className={navLinkClass}>
                                    {item.label}
                                </a>
                            ))}
                        </nav>

                        <LanguageToggle />
                    </div>
                </div>

                {/* below md the nav drops to its own scrollable row so nothing clips */}
                <nav className="no-scrollbar -mx-5 mt-2 flex gap-2 overflow-x-auto px-5 text-xs md:hidden">
                    {navItems.map((item) => (
                        <a key={item.href} href={item.href} className={navLinkClass}>
                            {item.label}
                        </a>
                    ))}
                </nav>

            </div>

        </div>
    );
};

export default Header;
