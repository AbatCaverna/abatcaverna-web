import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Historia } from '../components/Historia'
import { Moradores } from '../components/Moradores'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>AbatCaverna</title>
        <meta name="description" content="Website da republica AbatCaverna de Florestal MG" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className={styles.main}>
        <section className={styles.image}>

          <Image src="/abat banner.svg" alt="Banner republica" width={1440} height={900} />

        </section>
        <Historia />
        <Moradores />
      </main>

      <Footer/>
    </div>  
  )
}

export default Home
