"use client";

import { useI18n } from "../../lib/i18n";

export default function PortfolioHero() {
    const { t } = useI18n();

    return (
        <section
            id="contact"
            className="
        relative min-h-screen  mx-auto w-full bg-black overflow-hidden
        flex items-center
      "
        >
            {/* === Top gradient fade for smooth transition === */}
            <div
                className="pointer-events-none absolute top-0 left-0 right-0 z-[5]"
                style={{
                    height: "180px",
                    background: "linear-gradient(to bottom, #000000 0%, transparent 100%)",
                }}
            />

            {/* === BG Layer 1: Kareler görseli (masaüstü / mobil) === */}
            <div className="pointer-events-none absolute inset-0 z-0">
                {/* Masaüstü */}
                <img
                    src="/bg-1-desktop.png"
                    alt=""
                    aria-hidden="true"
                    className="hidden md:block w-full h-full object-cover"
                />
                {/* Mobil */}
                <img
                    src="/bg-1-mobile.png"
                    alt=""
                    aria-hidden="true"
                    className="block md:hidden w-full h-full object-cover"
                />
            </div>

            {/* === BG Layer 2: Işık süzmesi overlay (masaüstü / mobil) === */}
            <div className="pointer-events-none absolute inset-0 z-[1]">
                {/* Masaüstü */}
                <img
                    src="/bg-2-desktop.png"
                    alt=""
                    aria-hidden="true"
                    className="hidden md:block w-full h-full object-cover"
                />
                {/* Mobil */}
                <img
                    src="/bg-2-mobile.png"
                    alt=""
                    aria-hidden="true"
                    className="block md:hidden w-full h-full object-cover"
                />
            </div>

            {/* === Main content === */}
            <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-0 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-6">

                {/* Left: text */}
                <div className="max-w-xl lg:max-w-lg xl:max-w-xl animate-fade-up">
                    <p
                        className="text-white/70 text-sm sm:text-base mb-3 tracking-widest uppercase font-light type-mono"

                    >
                        {t.contact.eyebrow}
                    </p>
                    <h1
                        className="text-white font-bold leading-tight mb-6  type-primary"
                        style={{

                            fontSize: "clamp(2rem, 5vw, 3.5rem)",
                            letterSpacing: "-0.02em",
                        }}
                    >
                        {t.contact.headline}
                    </h1>
                    <p
                        className="text-white/40 text-sm sm:text-base leading-relaxed max-w-sm type-mono"

                    >
                        {t.contact.body}
                    </p>
                </div>

                {/* Right: CTA */}
                <div
                    className="flex flex-col items-start lg:items-end gap-4 animate-fade-up"
                    style={{ animationDelay: "0.15s" }}
                >
                    {/* Green outline button */}
                    <a
                        href="https://www.behance.net/berkaybal99"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
              group relative inline-flex items-center justify-center
              px-10 py-4 rounded-full
              text-green-400 font-semibold text-base tracking-wide
              transition-all duration-500
              overflow-hidden
              w-full sm:w-auto
              hover:text-white
              border border-green-500/60 hover:border-green-400
              hover:shadow-[0_0_28px_rgba(34,197,94,0.3)]
            "
                        style={{
                            fontFamily: "'DM Sans', sans-serif",
                            background: "transparent",
                            minWidth: 260,
                        }}
                    >
                        {/* Hover fill sweep */}
                        <span
                            className="
                absolute inset-0 bg-gradient-to-r from-green-600 to-green-500
                scale-x-0 group-hover:scale-x-100 origin-left
                transition-transform duration-500 ease-out
                rounded-full
              "
                        />
                        <span className="relative z-10  type-primary">{t.contact.cta}</span>
                    </a>

                    {/* LinkedIn link */}
                    <a
                        href="https://www.linkedin.com/in/berkaybal99"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
              text-green-400 text-sm font-medium
              hover:text-green-300 transition-colors duration-200
              underline underline-offset-4 decoration-green-400/40 type-mono
            "

                    >
                        {t.contact.linkedin}
                    </a>
                    
                </div>
            </div>

            {/* Inline keyframes */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;600;700&family=DM+Mono:wght@300;400&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) both;
        }
      `}</style>
        </section>
    );
}
