import Head from 'next/head'
import styles from '../styles/Assistente.module.css'
import { SiHomeassistant } from 'react-icons/si'
import { RiDoorLockLine } from 'react-icons/ri'

export default function AssistentePage() {
  function handleOpenGateButton() {
    alert('Abrir portao')
  }

  return (
    <div>
      <Head>
        <title>ABat Assistente | ABatCaverna</title>
        <meta name="description" content="Home assistent da republica ABatCaverna" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>
          <SiHomeassistant /> ABat Assistente</h1>
        <button 
          type="button" 
          onClick={handleOpenGateButton}
          className={styles.button}
        >
          <RiDoorLockLine size="2rem"/> Abrir portao</button>
      </main>
    </div>
  )
}