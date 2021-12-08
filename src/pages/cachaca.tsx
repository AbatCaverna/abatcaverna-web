import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Cachaca.module.css'

export default function Cachaca() {
  return (
    <div>
      <Head>
        <title>Quadro de Cachaça | ABatCaverna</title>
        <meta name="description" content="Quadro de Cachaça da republica ABatCaverna" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className={styles.container}>
        <header className={styles.header}>
          <Image src="/images/header-quadro-cachaca.svg" alt="Garrafa 51" width="400px" height="97px"/>
        </header>
        <div>
          
        </div>
      </main>
    </div>
  )
}