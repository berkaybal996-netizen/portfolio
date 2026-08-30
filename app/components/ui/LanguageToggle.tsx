"use client";

import { LANGS, useI18n } from "../../lib/i18n";

export default function LanguageToggle({ className = "" }: { className?: string }) {
    const { lang, setLang, t } = useI18n();

    return (
        <div
            role="group"
            aria-label={t.langToggle.aria}
            className={`type-mono inline-flex items-center overflow-hidden rounded-md border border-white/10 text-[11px] font-bold uppercase tracking-[0.12em] ${className}`}
        >
            {LANGS.map((code) => {
                const active = code === lang;

                return (
                    <button
                        key={code}
                        type="button"
                        onClick={() => setLang(code)}
                        aria-pressed={active}
                        className={`min-h-9 px-2.5 py-1.5 transition-colors md:px-3 ${active
                            ? "bg-white text-black"
                            : "bg-transparent text-[#a3a3a3] hover:bg-white/10 hover:text-white"
                            }`}
                    >
                        {code.toUpperCase()}
                    </button>
                );
            })}
        </div>
    );
}
