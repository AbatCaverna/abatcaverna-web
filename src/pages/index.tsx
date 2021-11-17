import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Header } from '../components/Header'
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

          <Image src="/Republica.svg" alt="Banner republica" width={1440} height={900} />

        </section>
        <section className={styles.moradores}>
          <h2>Historia</h2>
          <div>
            <Image src="/casa.jpg" alt="Foto da casa" width={400} height={400} />

            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste quasi cumque inventore, iure eum vitae sapiente. Ea dicta exercitationem maiores quo adipisci eius, rem maxime aspernatur deleniti voluptas accusantium numquam quis tenetur excepturi? Voluptate doloribus autem similique cumque necessitatibus quas at dolor numquam laborum voluptatibus.</p>
          </div>
        </section>
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
