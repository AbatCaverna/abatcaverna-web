import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Header } from '../components/Header'
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
        <section className={styles.moradores}>
          <h2>Historia</h2>
          <div>
            <Image src="/casa/casa-nova.jpeg" alt="Foto da casa" width={400} height={500} />

            <p>
              Somos uma república de Florestal MG, idealizada em 2016 e fundada em 2017. 
              Fomos criados não apenas para ser uma república mas uma família, amigos e irmãos.
            </p>
          </div>
        </section>
        <Moradores />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/AbatCaverna"
          target="_blank"
          rel="noopener noreferrer"
        >
          Feito por{' '}
          <span className={styles.logo}>
            <Image src="/favicon-16x16.png" alt="Abat Logo" width={16} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
