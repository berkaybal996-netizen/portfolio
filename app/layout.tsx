import type { Metadata } from "next";
import "./globals.css";
import CursorController from "./components/CursorController";
import BottomMenu from "./components/layout/BottomMenu";
import { LanguageProvider } from "./lib/i18n";





export const metadata: Metadata = {
  title: "Berkay Bal | UX/UI Designer & Frontend Developer",
  description: "UX/UI designer and frontend developer focused on accessible, high-performance React and Next.js interfaces.",
  metadataBase: new URL(
    "https://portfolio-iota-six-5ypspuk27h.vercel.app"
  ),
  keywords: [
    "Berkay Bal",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "React Native",
    "Web Developer",
  ],

  authors: [
    {
      name: "Berkay Bal",
    },
  ],
  verification: {
    google: "ealhZoxYNPKo76MMelKp2tp6tsZsww6KLNGOqPow9kE",
  },
  icons: {
    icon: [
      {
        url: "/icon.png",
        type: "image/png",
      },
    ],
    shortcut: "/icon.png",
    apple: "/icon.png",
  },



  openGraph: {
    title: "Berkay Bal | Frontend Developer",
    description:
      "React, Next.js ve React Native ile modern web ve mobil uygulamalar.",
    url: "https://portfolio-iota-six-5ypspuk27h.vercel.app",
    siteName: "Berkay Bal Portfolio",
    images: [
      {
        url: "/OG.jpg",
        width: 1200,
        height: 630,
        alt: "Berkay Bal Portfolio",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },


};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"

    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          {children}
          <BottomMenu />

          <CursorController />
          {/* User's custom cursor */}
          <div
            id="user-cursor"
            className="hidden md:flex pointer-events-none fixed top-0 left-0 z-[10000] flex-col items-start -translate-x-[2px] -translate-y-[2px]"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.45 0 .67-.54.35-.85L5.85 2.86a.5.5 0 0 0-.85.35z"
                fill="#0D99FF"
                stroke="white"
                strokeWidth="1.5"
              />
            </svg>

            <div className="ml-[14px] -mt-[6px] px-2 py-0.5 bg-[#0D99FF] text-[11px] text-white font-bold rounded-md rounded-tl-none whitespace-nowrap shadow-md">
              You
            </div>
          </div>

          {/* Fake Berkay cursor that comes later */}
          <div id="global-cursor" className="pointer-events-none fixed top-0 left-0 z-[9999] flex flex-col items-start -translate-x-[2px] -translate-y-[2px]" style={{ opacity: 0 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.45 0 .67-.54.35-.85L5.85 2.86a.5.5 0 0 0-.85.35z" fill="#F24E1E" stroke="white" strokeWidth="1.5" />
            </svg>
            <div className="ml-[14px] -mt-[6px] relative px-2 py-0.5 bg-[#F24E1E] text-[11px] text-white font-bold rounded-md rounded-tl-none whitespace-nowrap shadow-md">
              Berkay
            </div>
            {/* Speech Bubble - Explicitly separated from the nametag */}
            <div className="cursor-bubble speech-bubble" />
          </div>
        </LanguageProvider>

      </body>


    </html>
  );
}
