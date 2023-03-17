import MainLayout from '@/layouts/AppLayout';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { DM_Sans } from 'next/font/google';

const dm_sans = DM_Sans({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-dm-sans',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MainLayout className={`${dm_sans.variable} font-sans`}>
      <Component {...pageProps} />
    </MainLayout>
  );
}
