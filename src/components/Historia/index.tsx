import ImageSlideView from '../ImageSlideView';
import styles from './styles.module.css'

type Image = {
  img: string;
  imgBase64: string;
}

interface HistoriaProps {
  images: Array<Image>;
}

export function Historia({ images }: HistoriaProps) {
  

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