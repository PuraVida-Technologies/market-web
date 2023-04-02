import { DefaultSeoProps } from "next-seo";
import config from "@/config/environments";

export const defaultSEOConfig: DefaultSeoProps = {
    title: "Pura Vida",
    titleTemplate: "Pura Vida",
    defaultTitle: "Pura Vida",
    description: "Pura Vida, Bringing a complete Bitcoin economic solution to Costa Rica.",
    canonical: config.marketFrontendUrl,
    openGraph: {
        title: 'Pura Vida',
        type: 'website',
        locale: 'en_IE',
        description: 'Pura Vida, Bringing a complete Bitcoin economic solution to Costa Rica.',
        url: config.marketFrontendUrl,
        siteName: 'Pura Vida',
        images: [{
            url: '/assets/logo.png',
            width: 800,
            height: 600,
            alt: 'logo',
        }]
    },
    twitter: {
        handle: '@PuraVidaBTC',
        site: '@PuraVidaBTC',
        cardType: 'summary_large_image',
    },
};