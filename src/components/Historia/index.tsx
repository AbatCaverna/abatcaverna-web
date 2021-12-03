import Image from 'next/image'
import { useRgbDataURL } from '../../hooks/useBlur';
import ImageSlideView from '../ImageSlideView';
import styles from './styles.module.css'

export function Historia() {
  const images = [
    '/casa/casa-nova.jpeg',
    '/historia/conexoes.jpeg',
    '/casa/1.jpg',
    '/casa/golo-golo.jpeg',
    '/casa/trote.jpg',
    '/casa/galera.jpg',
    '/casa/festa.jpg'
  ];

  return (
    <section id="historia" className={styles.historia}>
      <h2>História</h2>
      <div>

        <p>
          Somos uma república de Florestal MG, idealizada em 2016 e fundada em 2017. 
          Fomos criados não apenas para ser uma república mas uma família, amigos e irmãos.
        </p>
        <ImageSlideView
          images={images}
        />
      </div>
    </section>
  )
}