import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { IconContext } from 'react-icons';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <IconContext.Provider value={{ color: '#FFC74A' }}>
      <Component {...pageProps} />
    </IconContext.Provider>
  )
}

export default MyApp
