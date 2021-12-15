import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { IconContext } from 'react-icons';
import { Header } from '../components/Header'
import Loading from '../components/PageLoader'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
      const handleStart = (url: any) => (url !== router.asPath) && setLoading(true);
      const handleComplete = () => setLoading(false);

      router.events.on('routeChangeStart', handleStart)
      router.events.on('routeChangeComplete', handleComplete)
      router.events.on('routeChangeError', handleComplete)

      return () => {
          router.events.off('routeChangeStart', handleStart)
          router.events.off('routeChangeComplete', handleComplete)
          router.events.off('routeChangeError', handleComplete)
      }
  })

  return (
    <IconContext.Provider value={{ color: '#FFC74A' }}>
      <Header />
      <Component {...pageProps} />
      {loading && <Loading />}
    </IconContext.Provider>
  )
}

export default MyApp
