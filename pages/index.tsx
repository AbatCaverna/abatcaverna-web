import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
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
        <h1 className={styles.title}>
          <Image src="/favicon-96x96.png" alt="Abat Logo" width={45} height={45} />
          AbatCaverna
        </h1>

        <p>Website em construção...</p>
        <div className={styles.image}>

          <Image src="/undraw_building_websites_i78t.svg" alt="Contruindo website" width={340} height={300} />

        </div>
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
