import Image from 'next/image'
import styles from './styles.module.css'

export function Historia() {
  return (
    <section id="historia" className={styles.historia}>
      <h2>História</h2>
      <div>

        <p>
          Somos uma república de Florestal MG, idealizada em 2016 e fundada em 2017. 
          Fomos criados não apenas para ser uma república mas uma família, amigos e irmãos.
        </p>
        <Image src="/casa/casa-nova.jpeg" alt="Foto da casa" width={400} height={500} />
      </div>
    </section>
  )
}