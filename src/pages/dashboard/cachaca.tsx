import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Loading from '../../components/Shared/Loading'
import MoradoresService from '../../services/MoradoresService'
import styles from '../../styles/Cachaca.module.css'
import { VscAdd, VscCheck } from "react-icons/vsc";
import { useEffect, useRef, useState } from 'react'
import { getSession } from 'next-auth/react'

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

interface Cachaca {
  moradores: Array<Morador>
}

export default function Cachaca({ moradores }: Cachaca) {
  const toDrinkRef = useRef<Array<HTMLParagraphElement | null>>([]);
  const [moradoresData, setMoradoresData] = useState(moradores);
  const [headerLabelOffset, setHeaderLabelOffset] = useState(0);
  const moradoresService = new MoradoresService();
  const [isLoading, setIsLoading] = useState(false)

  // adiciona uma cacha pra conta do morador
  async function handleSum(moradorId: string) {
    try {
      setIsLoading(true)
      await moradoresService.setCachaca(moradorId)
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
      await moradoresService.drinkCachaca(moradorId)
      setMoradoresData(data => data.map(value => {
        if (value._id === moradorId && value.cachaca_para_tomar > 0) {
          value.cachaca_para_tomar -= 1;
          value.cachaca_ja_tomada += 1;
        } else if (value._id === moradorId && value.cachaca_para_tomar === 0){
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

  return (
    <div>
      <Head>
        <title>Quadro de Cachaça | ABatCaverna</title>
        <meta name="description" content="Quadro de Cachaça da republica ABatCaverna" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className={styles.container}>
        <header className={styles.header}>
          <Image src="/images/header-quadro-cachaca.svg" alt="Garrafa 51" width="400px" height="97px"/>
        </header>
        <div className={styles.table_content}>

          <div className={styles.table_head}>
            <p 
              className={styles.position_absolute}
              style={{ left: headerLabelOffset - 15 }}
            >Vou beber</p>
            <p>Já bebi</p>
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
                    width="80px" 
                    height="80px"
                  />
                  {showMedal(0, index, morador.cachaca_ja_tomada) &&
                    <div className={styles.table_medal}>
                      <Image 
                        src="/images/medalha-ouro.png" 
                        alt="medalha ouro"
                        width="32px" 
                        height="42px"
                      />
                    </div>
                    }
                  {showMedal(1, index, morador.cachaca_ja_tomada) &&
                    <div className={styles.table_medal}>
                      <Image 
                        src="/images/medalha-prata.png" 
                        alt="medalha prata"
                        width="32px" 
                        height="42px"
                      />
                    </div>  
                  }
                  {showMedal(2, index, morador.cachaca_ja_tomada) &&
                    <div className={styles.table_medal}>
                      <Image 
                        src="/images/medalha-bronze.png" 
                        alt="medalha bronze"
                        width="32px" 
                        height="42px"
                      />
                    </div>
                  } 
                </div>
                <button
                  type="button"
                  onClick={() => handleSum(morador._id)}
                >
                  <VscAdd color="#fff" size="24px"/>
                </button>
                <p ref={el => toDrinkRef.current[index] = el}>{morador.cachaca_para_tomar}</p>
                <button
                  type="button"
                  onClick={() => handleDrink(morador._id)}
                >
                  <VscCheck color="#fff" size="24px"/>
                </button>
                <p>{morador.cachaca_ja_tomada}</p>
              </div>
            ))}
          </div>
          {isLoading && (
            <div className={styles.loading}>
              <Loading/>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  
  if (!session || session.role !== "cavernoso") {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  
  try {
    const service = new MoradoresService()
    const response = await service.getMoradores()

    return {
      props: { moradores: response.data.moradores },
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false },
    }
  }
}