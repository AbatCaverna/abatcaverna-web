import Image from 'next/image'
import { useRgbDataURL } from '../../hooks/useBlur';
import styles from './styles.module.css'

export function Historia() {
  
  function getBlurImg() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const img = useRgbDataURL(0, 0, 0)
    return img
  }

  return (
    <section id="historia" className={styles.historia}>
      <h2>História</h2>
      <div>

        <p>
          Somos uma república de Florestal MG, idealizada em 2016 e fundada em 2017. 
          Fomos criados não apenas para ser uma república mas uma família, amigos e irmãos.
        </p>
        <Image 
          src="/casa/casa-nova.jpeg" 
          alt="Foto da casa"
          placeholder="blur"
          blurDataURL={getBlurImg()}
          width={400} 
          height={500} 
        />
      </div>
    </section>
  )
}