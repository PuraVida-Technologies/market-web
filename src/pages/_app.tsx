import MainLayout from '@/layouts/AppLayout';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { DM_Sans } from 'next/font/google';
import { DefaultSeo } from 'next-seo';
import { defaultSEOConfig } from '@/utils/next-seo.config';



export const dm_sans = DM_Sans({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-dm-sans',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...defaultSEOConfig} />
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </>

  );
}
