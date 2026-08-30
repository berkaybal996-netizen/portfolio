import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap:
      "https://portfolio-iota-six-5ypspuk27h.vercel.app/sitemap.xml",
  };
}