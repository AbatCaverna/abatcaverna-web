import { useEffect, useState } from 'react';
import LogRocket from 'logrocket';
import Head from 'next/head';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { IconContext } from 'react-icons';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import { Header } from 'components/Shared/Header'
import Loading from 'components/Shared/Loading'
import AlertProvider from 'contexts/alert'
import CartProvider from 'contexts/carrinho'

import 'styles/global.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter()

  const [queryClient] = useState(() => new QueryClient())
  const [loading, setLoading] = useState(false)

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

  if (process.env.NODE_ENV === 'production') LogRocket.init('ygdgye/dashboard-web-h0qcb');

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <AlertProvider>
          <SessionProvider session={session}>
            <CartProvider>
              <Head>
                <meta
                  name='viewport'
                  content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
                />
              </Head>
              <IconContext.Provider value={{ color: '#FFC74A' }}>
                <Header />
                <Component {...pageProps} />
                {loading && (
                  <div className="page_loader">
                    <Loading />
                  </div>
                )}
              </IconContext.Provider>
            </CartProvider>
          </SessionProvider>
        </AlertProvider>
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default MyApp
