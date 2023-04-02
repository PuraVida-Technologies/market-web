import { DefaultSeoProps } from "next-seo";
import config from "@/config/environments";

export const defaultSEOConfig: DefaultSeoProps = {
    openGraph: {
        title: 'Pura Vida',
        type: 'website',
        locale: 'en_IE',
        description: 'Pura Vida, Bringing a complete Bitcoin economic solution to Costa Rica.',
        url: config.marketFrontendUrl,
        siteName: 'Pura Vida',
    },
    twitter: {
        handle: '@handle',
        site: '@site',
        cardType: 'summary_large_image',
    },
    canonical: config.marketFrontendUrl,
};