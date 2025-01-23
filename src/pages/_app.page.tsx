import { css } from '@/styles/css';
import '../styles/globals.css';
import type { AppProps } from "next/app";
import localFont from 'next/font/local';
import { Nav } from '@/components/nav';
// import { useRouter } from 'next/router';

const font = localFont({
  src: '../assets/fonts/GeistVF.woff',
  display: 'swap',
})

export default function App({ Component, pageProps }: AppProps) {
  return <main className={`${css({ px: '20', py: '6rem' })} ${font.className}`}>
    <Nav />
    <Component {...pageProps} />
  </main>
}
