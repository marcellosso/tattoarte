import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ClerkProvider } from '@clerk/nextjs';
import { Raleway } from 'next/font/google';
import { Source_Code_Pro } from 'next/font/google';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';

import NextNProgress from 'nextjs-progressbar';
import Script from 'next/script';
import Navbar from '@/components/navbars/navbar';
import { ptBR } from '@clerk/localizations';

const raleWay = Raleway({ subsets: ['latin'], display: 'swap', preload: true });

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider
      localization={ptBR}
      appearance={{
        elements: {
          footer: 'hidden',
        },
      }}
    >
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
          page_path: window.location.pathname,
          });
          `,
        }}
      />
      <style
        dangerouslySetInnerHTML={{
          __html: `
        :root {
          --font-raleway: ${raleWay.style.fontFamily};
          --font-source-code: ${sourceCodePro.style.fontFamily};
        }`,
        }}
      />
      <NextNProgress color="linear-gradient(90deg, #EEEEEE, #FFD369)" />

      <Navbar />
      <Component {...pageProps} />
      <ToastContainer />
    </ClerkProvider>
  );
}
