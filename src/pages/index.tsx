import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { getPlaiceholder } from 'plaiceholder'
import { Footer } from '../components/Footer'

import { Historia } from '../components/Historia'
import { Moradores } from '../components/Moradores'
import NossaCasa from '../components/NossaCasa'
import { useRgbDataURL } from '../hooks/useBlur'
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

interface MoradorProps {
  moradores: Array<Morador>
}


export const getStaticProps: GetStaticProps<MoradorProps> = async () => {
  const moradores = [
    {
      nome: 'Selina',
      apelido: 'Selina',
      dataEntrada: 2019,
      curso: 'Mascote',
      image: '/moradores/selina.jpeg',
      base64: ''
    },
    {
      nome: 'Matheus S',
      apelido: 'Teta',
      dataEntrada: 2016,
      curso: 'Ciência da Computação',
      image: '/moradores/teta.jpeg',
      instagram: 'https://www.instagram.com/bu.matheus/',
      base64: ''
    },
    {
      nome: 'Lucas Takeshi',
      apelido: 'Coleira',
      dataEntrada: 2016,
      curso: 'Ciência da Computação',
      image: '/moradores/coleira.jpeg',
      instagram: 'https://www.instagram.com/lucastakeshii/',
      base64: ''
    },
    {
      nome: 'Victor Hugo',
      apelido: 'Cocorico',
      dataEntrada: 2018,
      curso: 'Ciência da Computação',
      image: '/moradores/cocorico.jpeg',
      instagram: 'https://www.instagram.com/victorhugo_99/',
      base64: ''
    },
    {
      nome: 'Vinicius T',
      apelido: 'Chapoca',
      dataEntrada: 2019,
      curso: 'Ciência da Computação',
      image: '/moradores/chapoca.jpeg',
      instagram: 'https://www.instagram.com/vinciust/',
      base64: ''
    },
    {
      nome: 'Rubens',
      apelido: 'Alan',
      dataEntrada: 2021,
      curso: 'Agronomia',
      image: '/moradores/alan.jpeg',
      instagram: 'https://www.instagram.com/rubens5664/',
      base64: ''
    },
    {
      nome: 'Heron',
      apelido: '?',
      dataEntrada: 2021,
      curso: 'Ciência da Computação',
      image: '/moradores/heron.jpeg',
      instagram: 'https://www.instagram.com/heron_f4/',
      base64: ''
    },
    {
      nome: 'Matheus R',
      apelido: 'Pão',
      dataEntrada: 2021,
      curso: 'Engenharia de Alimentos',
      image: '/moradores/pao.jpeg',
      instagram: '',
      base64: ''
    }
  ]

  for (const morador of moradores) {
    const { base64 } = await getPlaiceholder(morador.image);
    morador.base64 = base64
  }


  return {
    props: {
      moradores
    },
  };
};

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ moradores }) => {
  
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
            src="/abat-banner.png" 
            alt="Banner republica" 
            placeholder="blur"
            blurDataURL={useRgbDataURL(0, 0, 0)}
            width={1440} 
            height={850} 
          />

        </section>
        <Historia />
        <Moradores moradores={moradores} />
        <NossaCasa />
      </main>

      <Footer/>
    </div>  
  )
}

export default Home
