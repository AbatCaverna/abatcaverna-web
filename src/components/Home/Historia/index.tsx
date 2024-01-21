import { ImageSlideView } from 'components/Home'

type Image = {
  img: string;
  imgBase64: string;
}

interface HistoriaProps {
  images: Array<Image>;
}

export default function Historia({ images }: HistoriaProps) {

  return (
    <section id="historia" className="prose w-full max-w-full">
      <h2 className="text-yellow-500">História</h2>
      <div className="flex items-center justify-between text-white">
        <p className="max-w-lg">
          Somos uma república de Florestal MG, idealizada em 2016 e fundada em 2017.
          Fomos criados não apenas para ser uma república mas uma família, amigos e irmãos.
        </p>

        {images && (
          <ImageSlideView
            images={images}
          />
        )}
      </div>
    </section>
  )
}
