"use client";

import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useI18n } from '../../../lib/i18n'

const partners = [
    { id: "jandarma", name: "JANDARMA G.K." },
    { id: "ankara-kent-konseyi", name: "ANKARA KENT KONSEYI" },
    { id: "jci-europe", name: "JCI EUROPE" },
    { id: "lokman-hekim", name: "LOKMAN HEKIM" },
    { id: "medicana", name: "MEDICANA" },
    { id: "avfoni", name: "AVFONI" },
]

const PartnerRow = ({ partner, index }: { partner: typeof partners[0], index: number }) => {
    const { t } = useI18n()
    const rowRef = useRef<HTMLDivElement>(null)
    const nameRef = useRef<HTMLHeadingElement>(null)
    const sectorRef = useRef<HTMLParagraphElement>(null)
    const lineRef = useRef<HTMLDivElement>(null)
    const indexRef = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        const row = rowRef.current!
        const name = nameRef.current!
        const sector = sectorRef.current!
        const line = lineRef.current!
        const idx = indexRef.current!

        const onEnter = () => {
            gsap.to(name, {
                color: '#ffffff', // Hover durumunda metin içi tam beyaz dolacak
                duration: 0.3,
                ease: 'power2.out',
            })
            // webkit-text-stroke GSAP ile direkt animate edilemiyor,
            // class toggle ile çözüyoruz
            name.classList.add('hovered')
            gsap.fromTo(name, { skewX: -4 }, { skewX: 0, duration: 0.4, ease: 'power3.out' })
            gsap.to(sector, { color: '#ffffff', duration: 0.3 }) // Sektör yazısı da beyaza parlayacak
            gsap.to(line, { width: '100%', duration: 0.5, ease: 'power3.out' })
            gsap.to(idx, { opacity: 1, x: 0, duration: 0.25, ease: 'power2.out' })
            gsap.to(row, { backgroundColor: 'rgba(255,255,255,0.05)', duration: 0.3 })
        }

        const onLeave = () => {
            name.classList.remove('hovered')
            gsap.to(name, {
                color: 'transparent',
                duration: 0.4,
                ease: 'power2.inOut',
            })
            gsap.to(sector, { color: '#737373', duration: 0.4 }) // Geri döneceği nötr gri tonu
            gsap.to(line, { width: '0%', duration: 0.3, ease: 'power3.in' })
            gsap.to(idx, { opacity: 0, x: 8, duration: 0.2 })
            gsap.to(row, { backgroundColor: 'transparent', duration: 0.3 })
        }

        row.addEventListener('mouseenter', onEnter)
        row.addEventListener('mouseleave', onLeave)
        return () => {
            row.removeEventListener('mouseenter', onEnter)
            row.removeEventListener('mouseleave', onLeave)
        }
    }, [])

    return (
        <div
            ref={rowRef}
            className="group relative grid grid-cols-12 md:items-center border-b border-white/10 py-10 px-4 cursor-pointer overflow-hidden"
        >
            {/* Animasyonlu alt çizgi - Temiz beyaz */}
            <div
                ref={lineRef}
                className="absolute bottom-0 left-0 h-[1px] w-0 bg-white"
            />

            {/* Sıra numarası - Daha okunaklı, şık bir gri */}
            <span
                ref={indexRef}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] tracking-[0.3em] text-[#a3a3a3] font-bold opacity-0 translate-x-2"
            >
                0{index + 1}
            </span>

            {/* Partner adı */}
            <div className="col-span-12 md:col-span-7 lg:col-span-8">
                <h3
                    ref={nameRef}
                    className="partner-name text-4xl md:text-5xl lg:text-[4rem] leading-none font-bold uppercase tracking-tight text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.15)]"
                    style={{ willChange: 'transform, color' }}
                >
                    {partner.name}
                </h3>
            </div>

            {/* Sektör */}
            <div className="col-span-12 md:col-span-5 lg:col-span-4 flex items-center mt-4 md:mt-0">
                <span className="md:hidden text-[10px] tracking-[0.2em] text-[#737373] mr-4 font-bold uppercase">
                    {t.intro.sector}:
                </span>
                <p
                    ref={sectorRef}
                    className="text-[10px] sm:text-xs tracking-[0.2em] text-[#737373] font-medium uppercase"
                >
                    {t.intro.sectors[partner.id]}
                </p>
            </div>
        </div>
    )
}

const IntroSection = () => {
    const { t } = useI18n()
    const titleRef = useRef<HTMLHeadingElement>(null)
    const labelRef = useRef<HTMLDivElement>(null)
    const rowsRef = useRef<HTMLDivElement>(null)
    const headerLineRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

        // 1) Başlık + label giriş
        tl.from(titleRef.current, {
            y: 60,
            opacity: 0,
            duration: 0.9,
        })
        tl.from(labelRef.current, {
            y: 20,
            opacity: 0,
            duration: 0.6,
        }, '-=0.6')

        // 2) Header alt çizgisi soldan sağa genişler
        tl.from(headerLineRef.current, {
            scaleX: 0,
            transformOrigin: 'left center',
            duration: 0.8,
            ease: 'power2.inOut',
        }, '-=0.4')

        // 3) Satırlar stagger ile aşağıdan gelir
        tl.from(rowsRef.current!.children, {
            y: 40,
            opacity: 0,
            duration: 0.7,
            stagger: 0.1,
        }, '-=0.3')
    }, [])

    return (
        <>
            {/* webkit-text-stroke hover state için global stil - Neon yerine temiz BEYAZ yapıldı */}
            <style>{`
                .partner-name.hovered {
                    -webkit-text-stroke: 1.5px #ffffff !important;
                }
            `}</style>

            <div
                id="Work"
                className="w-full max-w-[1440px] mx-auto px-6 md:px-0 py-24 text-white"
            >
                {/* Header */}
                <div className="grid grid-cols-12 items-end pb-10 mb-8 gap-y-4">
                    <div className="col-span-12 md:col-span-7 lg:col-span-8 flex items-center">
                        <h2
                            ref={titleRef}
                            className="text-5xl md:text-5xl lg:text-6xl leading-none font-bold uppercase tracking-tight flex flex-wrap items-center"

                        >
                            <span className="text-white type-primary">{t.intro.titleA}</span>
                            <span className="  type-primary text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.7)]   ">
                                {t.intro.titleB}
                            </span>
                        </h2>
                    </div>
                    <div
                        ref={labelRef}
                        className="col-span-12 md:col-span-5 lg:col-span-4 flex md:justify-start"
                    >
                        <div className="text-[10px] sm:text-xs md:text-[11px] tracking-widest text-[#a3a3a3] font-medium uppercase md:pb-2">
                            {t.intro.subtitle}
                        </div>
                    </div>
                    {/* Animasyonlu border-bottom */}
                    <div
                        ref={headerLineRef}
                        className="col-span-12 h-[1px] bg-white/10"
                    />
                </div>

                {/* Kolon başlıkları */}
                <div className="grid grid-cols-12 items-center pb-2 mb-2 text-[9px] tracking-[0.3em] text-[#525252] uppercase font-semibold">
                    <div className="col-span-12 md:col-span-7 lg:col-span-8 px-4">{t.intro.partner}</div>
                    <div className="col-span-12 md:col-span-5 lg:col-span-4 hidden md:block">{t.intro.sector}</div>
                </div>

                {/* Satırlar */}
                <div ref={rowsRef} className="flex flex-col  type-primary">
                    {partners.map((partner, index) => (
                        <PartnerRow key={partner.id} partner={partner} index={index} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default IntroSection
