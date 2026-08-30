"use client";

import { useI18n } from "../../lib/i18n";

const Footer = () => {
    const { t } = useI18n();

    return (
        <div className="w-full relative px-6 md:px-12 py-24 pb-32 z-20 bg-[#050505]">
            <div className="max-w-[1440px] mx-auto">
                <div className="flex flex-col xl:flex-row justify-between xl:items-end border-t border-white/10 pt-16 mt-20 gap-y-12">
                    <h2 className="text-4xl md:text-[4rem] leading-none font-bold uppercase tracking-tight flex gap-3 type-primary">
                        <span className="text-white">{t.footer.titleA}</span>
                        <span className="text-transparent" style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.6)' }}>{t.footer.titleB}</span>
                    </h2>

                    <div className="flex flex-wrap lg:flex-nowrap gap-6 md:gap-10 text-[9px] md:text-[10px] tracking-widest text-[#777]   font-bold type-mono">
                        <a href="mailto:berkaybal996@gmail.com" className="hover:text-white transition-colors ">berkaybal996@gmail.com</a>
                        <a href="https://www.linkedin.com/in/berkaybal99" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
                        <a href="https://www.behance.net/berkaybal99" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Behance</a>
                        <a href="https://dribbble.com/berkay-bal" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Dribbble</a>
                        <span className="text-[#444]">{t.footer.rights}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
