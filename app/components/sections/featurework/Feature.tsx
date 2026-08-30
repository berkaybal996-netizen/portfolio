"use client";

import NextImage from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18n } from "../../../lib/i18n";

const projects = [
    {
        id: 1,
        title: "Tesla - Car Customization Experience",
        year: "2026",
        image: "/projects/tesla-customization.png",
        href: "https://www.behance.net/gallery/240637803/Tesla-Car-Customization-Experience-%28UXUI-Concept%29",
        appreciations: 5,
        views: 86,
        featured: true,
    },
    {
        id: 2,
        title: "Cyber Security Website Template",
        year: "2025",
        image: "/projects/cyber-security-template.png",
        href: "https://www.behance.net/gallery/237227553/Cyber-Security-Website-Template-React-Tailwind-CSS",
        appreciations: 8,
        views: 191,
        featured: true,
    },
    {
        id: 3,
        title: "E-Commerce Analytics Dashboard",
        year: "2025",
        image: "/projects/ecommerce-analytics-dashboard.png",
        href: "https://www.behance.net/gallery/239175983/E-Commerce-Analytics-Dashboard-Modern-Clean-UI",
        appreciations: 2,
        views: 33,
    },
    {
        id: 4,
        title: "JCI Türkiye Web Design",
        year: "2024",
        image: "/projects/jci-turkiye-web-design.jpg",
        href: "https://www.behance.net/gallery/202312323/JCI-Tuerkiye-Web-Design",
        appreciations: 8,
        views: 62,
    },
    {
        id: 5,
        title: "Türkiye Jandarma Asayiş Vakfı",
        year: "2024",
        image: "/projects/jandarma-web-design.jpg",
        href: "https://www.behance.net/gallery/151786869/Turkiye-Jandarma-Asayis-Vakf-Web-Design",
        appreciations: 6,
        views: 75,
    },
];

const Feature = () => {
    const { t } = useI18n();
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const section = sectionRef.current;
        if (!section) return;

        const cards = section.querySelectorAll<HTMLElement>(".project-card");
        const header = section.querySelector<HTMLElement>(".project-header");

        const animations: ScrollTrigger[] = [];

        if (header) {
            const tween = gsap.fromTo(
                header,
                { y: 24 },
                {
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: { trigger: header, start: "top 82%" },
                }
            );

            if (tween.scrollTrigger) animations.push(tween.scrollTrigger);
        }

        cards.forEach((card, index) => {
            const tween = gsap.fromTo(
                card,
                { y: 32 },
                {
                    y: 0,
                    duration: 0.7,
                    delay: index * 0.04,
                    ease: "power3.out",
                    scrollTrigger: { trigger: card, start: "top 88%" },
                }
            );

            if (tween.scrollTrigger) animations.push(tween.scrollTrigger);
        });

        return () => animations.forEach((trigger) => trigger.kill());
    }, []);

    return (
        <section
            id="Featured"
            ref={sectionRef}
            className="w-full relative px-6 md:px-12 py-24 md:py-36 bg-[#050505]"
        >
            <div className="max-w-[1440px] mx-auto">
                <div className="project-header mb-14 md:mb-20">
                    <div className="mb-6 flex flex-wrap items-center gap-3 type-mono">
                        <span className="rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-white">
                            {t.feature.badge}
                        </span>
                        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#777]">
                            {t.feature.subtitle}
                        </span>
                    </div>

                    <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                        <h2 className="type-primary text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-none">
                            <span className="text-white">{t.feature.titleA}</span>
                            <span className="text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.18)]">{t.feature.titleB}</span>
                        </h2>

                        <a
                            href="https://www.behance.net/berkaybal99"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="type-mono inline-flex w-fit items-center border border-white/15 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-white hover:text-black"
                        >
                            {t.feature.viewMore}
                        </a>
                    </div>

                    <div className="mt-8 h-px w-full bg-gradient-to-r from-white via-white/35 to-transparent" />
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12">
                    {projects.map((project, index) => (
                        <a
                            key={project.id}
                            href={project.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`project-card group overflow-hidden rounded-lg border border-white/10 bg-white/[0.025] transition-colors hover:border-white/35 hover:bg-white/[0.045] ${project.featured ? "lg:col-span-6" : "lg:col-span-4"}`}
                        >
                            <div className={`relative overflow-hidden bg-[#111] ${project.featured ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
                                <NextImage
                                    src={project.image}
                                    alt={`${project.title} Behance cover`}
                                    fill
                                    sizes={project.featured ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 50vw, 33vw"}
                                    priority={index < 2}
                                    className="object-cover transition-transform duration-700 group-hover:scale-[1.045]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent opacity-70" />
                                <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/45 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur type-mono">
                                    {t.feature.categories[project.id]}
                                </div>
                            </div>

                            <div className="flex min-h-[210px] flex-col justify-between gap-8 p-5 md:p-6">
                                <div>
                                    <div className="mb-4 flex items-center justify-between gap-4 type-mono text-[10px] uppercase tracking-[0.18em] text-[#777]">
                                        <span>0{project.id}</span>
                                        <span>{project.year}</span>
                                    </div>

                                    <h3 className="type-primary text-2xl font-semibold leading-tight text-white">
                                        {project.title}
                                    </h3>
                                    <p className="mt-4 text-sm leading-7 text-[#a3a3a3] type-mono">
                                        {t.feature.summaries[project.id]}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-4 type-mono text-[10px] uppercase tracking-[0.14em] text-[#777]">
                                    <span>{t.feature.stats(project.appreciations, project.views)}</span>
                                    <span className="text-white transition-transform group-hover:translate-x-1">{t.feature.open}</span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                <div className="mt-10 flex justify-center">
                    <a
                        href="https://www.behance.net/berkaybal99"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="type-mono inline-flex min-h-11 items-center rounded-lg border border-white/15 bg-white px-5 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-black transition-colors hover:border-white hover:bg-transparent hover:text-white"
                    >
                        {t.feature.viewMore}
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Feature;
