"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useSyncExternalStore,
} from "react";

export type Lang = "tr" | "en";

export const LANGS: Lang[] = ["tr", "en"];

const STORAGE_KEY = "berkaybal.lang";
const DEFAULT_LANG: Lang = "en";

type Dict = {
    nav: { work: string; featured: string; contact: string };
    langToggle: { aria: string };
    hero: { apps: string };
    drag: { messages: string[] };
    intro: {
        titleA: string;
        titleB: string;
        subtitle: string;
        partner: string;
        sector: string;
        sectors: Record<string, string>;
    };
    feature: {
        badge: string;
        subtitle: string;
        titleA: string;
        titleB: string;
        viewMore: string;
        open: string;
        stats: (appreciations: number, views: number) => string;
        categories: Record<number, string>;
        summaries: Record<number, string>;
    };
    tools: { titleA: string; titleB: string; descs: Record<number, string> };
    contact: {
        eyebrow: string;
        headline: string;
        body: string;
        cta: string;
        linkedin: string;
    };
    footer: { titleA: string; titleB: string; rights: string };
};

const en: Dict = {
    nav: { work: "Resume", featured: "Projects", contact: "Contact" },
    langToggle: { aria: "Switch language" },
    hero: { apps: "My Apps" },
    drag: {
        messages: [
            "View-only access.",
            "This layer is locked.",
            "Alignment broken.",
            "Drag permission denied.",
            "Outside the design system.",
            "Changes were not saved.",
        ],
    },
    intro: {
        // trailing space separates the two <span>s of the heading
        titleA: "MY ",
        titleB: "RESUME",
        subtitle: "Public, healthcare and e-commerce projects",
        partner: "Partner",
        sector: "Sector",
        sectors: {
            jandarma: "PUBLIC SECTOR UX/UI",
            "ankara-kent-konseyi": "CIVIC WEB EXPERIENCE",
            "jci-europe": "GLOBAL ORGANIZATION",
            "lokman-hekim": "HEALTHCARE INTERFACES",
            medicana: "HEALTHCARE WEB DESIGN",
            avfoni: "E-COMMERCE & SEO",
        },
    },
    feature: {
        badge: "Behance Projects",
        subtitle: "Selected UI/UX and frontend work",
        titleA: "PROJECT ",
        titleB: "WORK",
        viewMore: "View More",
        open: "Open",
        stats: (a, v) => `${a} appreciations / ${v} views`,
        categories: {
            1: "UX/UI Concept",
            2: "React & Tailwind CSS",
            3: "Dashboard UI",
            4: "Corporate Web Design",
            5: "Public Institution Web",
        },
        summaries: {
            1: "Premium car configuration flow with model, body, paint and service options arranged for fast visual comparison.",
            2: "Responsive cybersecurity landing page template built around a clean SaaS-style presentation and frontend-ready layout.",
            3: "Modern analytics surface for sales, revenue and operational insights with dense but readable dashboard composition.",
            4: "Institutional web interface for JCI Türkiye, shaped around community, events and organizational information.",
            5: "Accessible public-sector web design work focused on clear navigation and trustworthy institutional presentation.",
        },
    },
    tools: {
        titleA: "MY",
        titleB: "TOOLKIT",
        descs: {
            1: "UX/UI design systems",
            2: "Frontend interfaces",
            3: "Modern web apps",
            4: "Interactive products",
            5: "Development workflow",
            6: "E-commerce growth",
            7: "Vector and brand assets",
            8: "Visual editing",
            9: "Responsive UI styling",
            10: "Semantic web layout",
        },
    },
    contact: {
        eyebrow: "Available for product and web projects",
        headline: "UX/UI design and frontend development for modern web products.",
        body: "I combine 6+ years of Figma and Adobe experience with React and Next.js to create accessible, high-performance interfaces for public institutions, agencies and e-commerce brands.",
        cta: "Explore Portfolio",
        linkedin: "Connect on LinkedIn",
    },
    footer: {
        titleA: "LET’S",
        titleB: "TALK.",
        rights: "(c) 2026 Berkay Bal. All rights reserved.",
    },
};

const tr: Dict = {
    nav: {
        work: "Özgeçmiş",
        featured: "Projeler",
        contact: "İletişim",
    },
    langToggle: { aria: "Dili değiştir" },
    hero: { apps: "Uygulamalarım" },
    drag: {
        messages: [
            "Görüntüleme izniniz var.",
            "Bu katman kilitli.",
            "Hizalama bozuldu.",
            "Sürükleme yetkiniz yok.",
            "Tasarım sistemine aykırı.",
            "Değişiklik kaydedilmedi.",
        ],
    },
    intro: {
        titleA: "ÖZ",
        titleB: "GEÇMİŞ",
        subtitle: "Kamu, sağlık ve e-ticaret projeleri",
        partner: "Kurum",
        sector: "Sektör",
        sectors: {
            jandarma: "KAMU SEKTÖRÜ UX/UI",
            "ankara-kent-konseyi": "KENT WEB DENEYİMİ",
            "jci-europe": "KÜRESEL ORGANİZASYON",
            "lokman-hekim": "SAĞLIK ARAYÜZLERİ",
            medicana: "SAĞLIK WEB TASARIMI",
            avfoni: "E-TİCARET & SEO",
        },
    },
    feature: {
        badge: "Behance Projeleri",
        subtitle: "Seçilmiş UI/UX ve frontend çalışmaları",
        titleA: "PROJE ",
        titleB: "ÇALIŞMALARIM",
        viewMore: "Tümünü Gör",
        open: "İncele",
        stats: (a, v) => `${a} beğeni / ${v} görüntülenme`,
        categories: {
            1: "UX/UI Konsept",
            2: "React & Tailwind CSS",
            3: "Panel Arayüzü",
            4: "Kurumsal Web Tasarımı",
            5: "Kamu Kurumu Web",
        },
        summaries: {
            1: "Model, kasa, renk ve servis seçeneklerini hızlı görsel karşılaştırma için düzenleyen premium araç yapılandırma akışı.",
            2: "Sade bir SaaS sunumu ve frontend'e hazır düzen üzerine kurulu, responsive siber güvenlik açılış sayfası şablonu.",
            3: "Satış, gelir ve operasyon içgörüleri için yoğun ama okunabilir kompozisyona sahip modern analiz paneli.",
            4: "JCI Türkiye için topluluk, etkinlik ve kurum bilgisi etrafında şekillenen kurumsal web arayüzü.",
            5: "Net gezinme ve güven veren kurumsal sunum odaklı, erişilebilir kamu sektörü web tasarımı çalışması.",
        },
    },
    tools: {
        titleA: "KULLANDIĞIM",
        titleB: "ARAÇLAR",
        descs: {
            1: "UX/UI tasarım sistemleri",
            2: "Frontend arayüzleri",
            3: "Modern web uygulamaları",
            4: "Etkileşimli ürünler",
            5: "Geliştirme akışı",
            6: "E-ticaret büyümesi",
            7: "Vektör ve marka varlıkları",
            8: "Görsel düzenleme",
            9: "Responsive arayüz stili",
            10: "Semantik web düzeni",
        },
    },
    contact: {
        eyebrow: "Ürün ve web projeleri için müsaitim",
        headline: "Modern web ürünleri için UX/UI tasarımı ve frontend geliştirme.",
        body: "6+ yıllık Figma ve Adobe deneyimimi React ve Next.js ile birleştirerek kamu kurumları, ajanslar ve e-ticaret markaları için erişilebilir, yüksek performanslı arayüzler üretiyorum.",
        cta: "Portfolyoyu İncele",
        linkedin: "LinkedIn'de Bağlantı Kur",
    },
    footer: {
        titleA: "HADİ",
        titleB: "KONUŞALIM.",
        rights: "(c) 2026 Berkay Bal. Tüm hakları saklıdır.",
    },
};

const dictionaries: Record<Lang, Dict> = { tr, en };

type I18nValue = {
    lang: Lang;
    setLang: (next: Lang) => void;
    toggle: () => void;
    t: Dict;
};

const I18nContext = createContext<I18nValue | null>(null);

const isLang = (value: unknown): value is Lang =>
    value === "tr" || value === "en";

/**
 * The language lives in a tiny external store rather than component state, so
 * the first client render can already read localStorage while the server (and
 * the hydration pass) keeps rendering DEFAULT_LANG.
 */
let currentLang: Lang | null = null;
const listeners = new Set<() => void>();

const readStoredLang = (): Lang => {
    try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (isLang(stored)) return stored;
    } catch {
        /* storage unavailable (private mode) */
    }

    const browser = window.navigator.language?.toLowerCase() ?? "";
    return browser.startsWith("tr") ? "tr" : DEFAULT_LANG;
};

const getSnapshot = (): Lang => {
    if (currentLang === null) currentLang = readStoredLang();
    return currentLang;
};

const getServerSnapshot = (): Lang => DEFAULT_LANG;

const subscribe = (onChange: () => void) => {
    listeners.add(onChange);
    return () => {
        listeners.delete(onChange);
    };
};

const writeLang = (next: Lang) => {
    if (currentLang === next) return;
    currentLang = next;

    try {
        window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
        /* storage unavailable - keep the in-memory value */
    }

    listeners.forEach((listener) => listener());
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

    useEffect(() => {
        document.documentElement.lang = lang;
    }, [lang]);

    const setLang = useCallback((next: Lang) => writeLang(next), []);

    const toggle = useCallback(() => {
        writeLang(getSnapshot() === "tr" ? "en" : "tr");
    }, []);

    const value = useMemo<I18nValue>(
        () => ({ lang, setLang, toggle, t: dictionaries[lang] }),
        [lang, setLang, toggle]
    );

    return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
    const ctx = useContext(I18nContext);
    if (!ctx) throw new Error("useI18n must be used inside <LanguageProvider>");
    return ctx;
}
