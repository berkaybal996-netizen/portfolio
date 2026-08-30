"use client";

import {
    Atom,
    Braces,
    Code2,
    FileCode2,
    ImageIcon,
    Layers,
    Paintbrush,
    PenTool,
    SearchCheck,
    Triangle,
} from "lucide-react";
import { useI18n } from "../../../lib/i18n";

const tools = [
    { id: 1, name: "Figma", icon: PenTool, color: "#F24E1E" },
    { id: 2, name: "React", icon: Atom, color: "#61DAFB" },
    { id: 3, name: "Next.js", icon: Triangle, color: "#ffffff" },
    { id: 4, name: "JavaScript", icon: Braces, color: "#F7DF1E" },
    { id: 5, name: "VS Code", icon: Code2, color: "#007ACC" },
    { id: 6, name: "SEO", icon: SearchCheck, color: "#22C55E" },
    { id: 7, name: "Illustrator", icon: Layers, color: "#FF9A00" },
    { id: 8, name: "Photoshop", icon: ImageIcon, color: "#31A8FF" },
    { id: 9, name: "Tailwind", icon: Paintbrush, color: "#38BDF8" },
    { id: 10, name: "HTML/CSS", icon: FileCode2, color: "#E34F26" },
];

const Tools = () => {
    const { t } = useI18n();

    return (
        <div className="w-full relative px-6 md:px-12 py-24 pb-32 z-20 bg-[#050505]">
            <div className="max-w-[1440px] mx-auto">
                <div className="mb-40">
                    <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight flex gap-4 type-primary mb-16">
                        <span className="text-white type-primary">{t.tools.titleA}</span>
                        <span className="text-transparent type-primary" style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.6)' }}>{t.tools.titleB}</span>
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-5">
                        {tools.map((tool) => {
                            const Icon = tool.icon;

                            return (
                                <div
                                    key={tool.id}
                                    className="group flex min-h-[180px] flex-col justify-between border border-white/10 bg-white/[0.025] p-5 md:p-6 rounded-lg transition-colors hover:bg-white/[0.055]"
                                >
                                    <div
                                        className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-black/40 transition-transform group-hover:-translate-y-1"
                                        style={{ color: tool.color }}
                                    >
                                        <Icon size={26} strokeWidth={1.8} aria-hidden="true" />
                                    </div>

                                    <div>
                                        <h4 className="text-sm md:text-base font-semibold text-white mb-2 type-primary tracking-wide">
                                            {tool.name}
                                        </h4>
                                        <p className="text-[9px] md:text-[10px] tracking-widest text-[#777] font-medium uppercase type-mono">
                                            {t.tools.descs[tool.id]}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tools;
