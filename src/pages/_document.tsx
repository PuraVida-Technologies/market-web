import { Html, Head, Main, NextScript } from 'next/document';
import { dm_sans } from './_app';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className={`${dm_sans.variable} font-sans`}>
        <Main />
        <NextScript />/
      </body>
    </Html>
  );
}
