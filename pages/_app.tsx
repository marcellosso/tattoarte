import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import Head from 'next/head';
import { Source_Code_Pro } from 'next/font/google';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';

// const chivoMono = Chivo_Mono({ subsets: ['latin'] });
const sourceCodePro = Source_Code_Pro({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <style jsx global>{`
        html {
          font-family: ${sourceCodePro.style.fontFamily};
        }
      `}</style>
      <Head>
        <title>Artista de Tatuagem IA | TattoArte</title>
      </Head>
      <Component {...pageProps} />
      <ToastContainer />
    </UserProvider>
  );
}
