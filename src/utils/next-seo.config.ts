import { DefaultSeoProps } from "next-seo";

export const defaultSEOConfig: DefaultSeoProps = {
    openGraph: {
        title: 'Pura Vida',
        type: 'website',
        locale: 'en_IE',
        description: 'Pura Vida, Bringing a complete Bitcoin economic solution to Costa Rica.',
        url: process.env.NEXT_WEBSITE_URL,
        siteName: 'Pura Vida',
    },
    twitter: {
        handle: '@handle',
        site: '@site',
        cardType: 'summary_large_image',
    },
    canonical: process.env.NEXT_WEBSITE_URL,
};