"use client";

import React from 'react'
import { BehanceLogo, GithubLogo, GooglePlayLogo, GooglePlayLogoIcon, LinkedinLogo } from "@phosphor-icons/react"
import DragText from '../../ui/DragText'
import { useI18n } from '../../../lib/i18n'

// TODO: replace with the real Google Play developer/app URL before publishing.
const GOOGLE_PLAY_URL = "https://play.google.com/store/apps/developer?id=Berkay+Bal";

const socialLinks = [
    { label: "Behance", href: "https://www.behance.net/berkaybal99", icon: BehanceLogo },
    { label: "GitHub", href: "https://github.com/berkaybal996-netizen/", icon: GithubLogo },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/berkaybal99", icon: LinkedinLogo },
  

];

const HeroSection = () => {
    const { t } = useI18n();

    return (
        <div className="relative z-10 flex h-full flex-col items-center justify-center gap-4 px-4 text-center">
            <div className="flex flex-col items-center gap-4">
                <DragText text="BERKAY" data-type="andy" />
                <DragText text="BAL" outline />
            </div>
            <span className="text-white type-primary"> Product Designer | Frontend Developer</span>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-3 type-mono">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                    <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/15 bg-black/35 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur transition-colors hover:border-white/35 hover:bg-white hover:text-black sm:px-4"
                    >
                        <Icon weight="duotone" className="h-4 w-4 shrink-0" />
                        <span>{label}</span>
                    </a>
                ))}

                <a
                    href={"https://play.google.com/store/apps/developer?id=Berkay+BAL"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/35 bg-white px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-black transition-colors hover:border-white/35 hover:bg-black/35 hover:text-white sm:px-4"
                >
                    <GooglePlayLogo weight="duotone" className="h-4 w-4 shrink-0" />
                    <span>{t.hero.apps}</span>
                </a>
            </div>
        </div>
    )
}

export default HeroSection
