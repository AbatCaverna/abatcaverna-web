import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { getPlaiceholder } from 'plaiceholder'
import { Footer } from '../components/Footer'
import { Data } from '../utils/homePageData'
import { Historia } from '../components/Historia'
import { Moradores } from '../components/Moradores'
import NossaCasa from '../components/NossaCasa'
import styles from '../styles/Home.module.css'

type Morador = {
  nome: string;
  apelido: string;
  dataEntrada: number;
  curso: string;
  image: string;
  base64: string;
  instagram?: string;
}

type Image = {
  img: string;
  imgBase64: string;
}


interface MoradorProps {
  moradores: Array<Morador>
  historyImages: Array<Image>
  bannerUrl: Image
}


export const getStaticProps: GetStaticProps<MoradorProps> = async () => {
  const { moradores, historyImages } = Data;
  const banner = {
    img: "/abat-banner.png",
    imgBase64: ''
  }

  const { base64 } = await getPlaiceholder(banner.img);
  banner.imgBase64 = base64

  // itera sob o tamanho dos array de images = 7
  // for (let i = 0; i < 7; i+=1) {
  //   const palceholder = await getPlaiceholder(moradores[i].image);
  //   moradores[i].base64 = palceholder.base64;
  //   const { base64: base64History } = await getPlaiceholder(historyImages[i].img);

  //   historyImages[i].imgBase64 = base64History
  // }

  for (const morador of moradores) {
    const { base64 } = await getPlaiceholder(morador.image);
    morador.base64 = base64
  }

  for (const image of historyImages) {
    const { base64 } = await getPlaiceholder(image.img);
    image.imgBase64 = base64
  }


  return {
    props: {
      moradores,
      historyImages,
      bannerUrl: banner
    },
  };
};

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ 
  moradores,
  historyImages,
  bannerUrl
}) => {
  console.log(historyImages)
  return (
    <div className={styles.container}>
      <Head>
        <title>AbatCaverna</title>
        <meta name="description" content="Website da republica AbatCaverna de Florestal MG" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      
      <main className={styles.main}>
        <section className={styles.image}>

          <Image 
            src={bannerUrl.img}
            alt="Banner republica" 
            placeholder="blur"
            blurDataURL={bannerUrl.imgBase64}
            width={1440} 
            height={850} 
          />

        </section>
        <Historia images={historyImages}/>
        <Moradores moradores={moradores} />
        <NossaCasa />
      </main>

      <Footer/>
    </div>  
  )
}

export default Home
