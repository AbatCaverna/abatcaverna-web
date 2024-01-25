import { useEffect, useRef, useState } from 'react'
import { getSession } from 'next-auth/react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { VscAdd, VscCheck } from "react-icons/vsc";

import Loading from 'domain/Shared/Loading'
import MoradoresService from 'services/MoradoresService'
import styles from 'styles/Cachaca.module.css'
import { DashboardLayout } from 'domain/Dashboard/SharedComponents'
import useMoradoresQuery from 'query/moradoresQuery'

type Morador = {
  _id: string;
  nome: string;
  apelido: string;
  ano_entrada: number;
  curso: string;
  imagem: string;
  instagram: string;
  cachaca_para_tomar: number;
  cachaca_ja_tomada: number;
}


export default function Cachaca() {
  const toDrinkRef = useRef<Array<HTMLParagraphElement | null>>([])
  const [moradoresData, setMoradoresData] = useState([] as Morador[])
  const [headerLabelOffset, setHeaderLabelOffset] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const { isFetching } = useMoradoresQuery(setMoradoresData)

  // adiciona uma cacha pra conta do morador
  async function handleSum(moradorId: string) {
    try {
      setIsLoading(true)
      await MoradoresService.setCachaca(moradorId)
      setMoradoresData(data => data.map(value => {
        if (value._id === moradorId) {
          value.cachaca_para_tomar += 1;
        }

        return value
      }))
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
    }
  }

  async function handleDrink(moradorId: string) {
    try {
      setIsLoading(true)
      await MoradoresService.drinkCachaca(moradorId)
      setMoradoresData(data => data.map(value => {
        if (value._id === moradorId && value.cachaca_para_tomar > 0) {
          value.cachaca_para_tomar -= 1;
          value.cachaca_ja_tomada += 1;
        } else if (value._id === moradorId && value.cachaca_para_tomar === 0) {
          value.cachaca_ja_tomada += 1;
        }

        return value
      }))
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
    }
  }

  // Calcula o posicionamento da tela do header 'Vou beber'
  // para ficar alinhado com o numero
  function calculateHeaderElementPlacement(value?: number) {
    if (value) {
      setHeaderLabelOffset(value)

    }
  }

  function showMedal(medalIndex: 0 | 1 | 2, moradorIndex: number, drunkCont: number): boolean {
    return (moradorIndex === medalIndex) && drunkCont > 0
  }

  useEffect(() => {
    if (toDrinkRef) {
      // pega a referencia apenas do primeiro elemento pois
      calculateHeaderElementPlacement(toDrinkRef.current[0]?.getBoundingClientRect().left)
    }

  }, [toDrinkRef])

  if (isFetching) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <DashboardLayout mainClassName={styles.container}>
      <Head>
        <title>Quadro de Cachaça | ABatCaverna</title>
        <meta name="description" content="Quadro de Cachaça da republica ABatCaverna" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <Image src="/images/header-quadro-cachaca.svg" alt="Garrafa 51" width={400} height={97} />
      </header>
      <div className={styles.table_content}>

        <div className={styles.table_head}>
          <p
            className={styles.position_absolute}
            style={{ left: headerLabelOffset - 15 }}
          ></p>
          <p>Já bebeu</p>
        </div>

        <div className={styles.table_list}>
          {moradoresData.map((morador, index) => (
            <div key={morador._id} className={styles.table_card}>
              <div className={styles.table_image}>
                <Image
                  src={morador.imagem}
                  alt="Imagem morador"
                  title={morador.apelido}
                  className={styles.image}
                  width={80}
                  height={80}
                />
                {showMedal(0, index, morador.cachaca_ja_tomada) &&
                  <div className={styles.table_medal}>
                    <Image
                      src="/images/medalha-ouro.png"
                      alt="medalha ouro"
                      width={32}
                      height={42}
                    />
                  </div>
                }
                {showMedal(1, index, morador.cachaca_ja_tomada) &&
                  <div className={styles.table_medal}>
                    <Image
                      src="/images/medalha-prata.png"
                      alt="medalha prata"
                      width={32}
                      height={42}
                    />
                  </div>
                }
                {showMedal(2, index, morador.cachaca_ja_tomada) &&
                  <div className={styles.table_medal}>
                    <Image
                      src="/images/medalha-bronze.png"
                      alt="medalha bronze"
                      width={32}
                      height={42}
                    />
                  </div>
                }
              </div>
              <div className={styles.Apelido}>{morador.apelido}</div>

              <p>{morador.cachaca_ja_tomada}</p>
            </div>
          ))}
        </div>
        {isLoading && (
          <div className={styles.loading}>
            <Loading />
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session || (session as any).role !== "cavernoso") {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
