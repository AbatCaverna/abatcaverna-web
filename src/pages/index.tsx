import { useEffect, useRef, useState } from 'react'
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { getPlaiceholder } from 'plaiceholder'
import { TiArrowUpOutline } from 'react-icons/ti'

import {
  Footer,
  Historia,
  Moradores,
  NossaCasa,
  NossaLoja
} from 'domain/Home'
import useSessionToStorage from 'hooks/useSessionToStorage'
import { Data } from 'utils/homePageData'
import styles from 'styles/Home.module.css'

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
  const [showBackToTopBtn, setShowBackToTopBtn] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null)

  function handleBackToTopBtn() {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries
      setShowBackToTopBtn(!entry.isIntersecting)

    })
    if (headerRef.current) {
      observer.observe(headerRef.current)
    }

  }, [headerRef])

  useSessionToStorage()

  return (
    <div className={styles.container}>
      <Head>
        <title>AbatCaverna</title>
        <meta name="description" content="Website da republica AbatCaverna de Florestal MG" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <main className={styles.main}>
        <section className={styles.image} ref={headerRef}>

          <Image
            src={bannerUrl.img}
            alt="Banner republica"
            placeholder="blur"
            blurDataURL={bannerUrl.imgBase64}
            width={1440}
            height={850}
          />

        </section>
        <Historia images={historyImages} />
        <Moradores moradores={moradores} />
        <NossaCasa />
        <NossaLoja />
        {showBackToTopBtn && (
          <button className={styles.back_top_btn} title="Voltar para o topo" onClick={handleBackToTopBtn}>
            <TiArrowUpOutline color="eaeaea" />
          </button>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default Home
