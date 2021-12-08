import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Footer } from '../components/Footer'

import { Historia } from '../components/Historia'
import { Moradores } from '../components/Moradores'
import NossaCasa from '../components/NossaCasa'
import { useRgbDataURL } from '../hooks/useBlur'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  
  return (
    <div className={styles.container}>
      <Head>
        <title>AbatCaverna</title>
        <meta name="description" content="Website da republica AbatCaverna de Florestal MG" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      
      <main className={styles.main}>
        <section className={styles.image}>

          <Image 
            src="/abat banner.svg" 
            alt="Banner republica" 
            placeholder="blur"
            blurDataURL={useRgbDataURL(0, 0, 0)}
            width={1440} 
            height={900} 
          />

        </section>
        <Historia />
        <Moradores />
        <NossaCasa />
      </main>

      <Footer/>
    </div>  
  )
}

export default Home
