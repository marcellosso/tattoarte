import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Source_Code_Pro } from 'next/font/google';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';

const sourceCodePro = Source_Code_Pro({ subsets: ['latin'], display: 'swap' });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <style jsx global>{`
        html {
          font-family: ${sourceCodePro.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
      <Analytics />
      <ToastContainer />
    </UserProvider>
  );
}
