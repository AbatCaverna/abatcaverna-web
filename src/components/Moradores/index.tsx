import Image from "next/image";
import { useRgbDataURL } from '../../hooks/useBlur';
import styles from './styles.module.css';

export function Moradores() {
  const moradores = [
    {
      nome: 'Matheus S',
      apelido: 'Teta',
      dataEntrada: 2016,
      curso: 'Ciência da Computação',
      image: '/moradores/teta.jpeg'
    },
    {
      nome: 'Lucas Takeshi',
      apelido: 'Coleira',
      dataEntrada: 2016,
      curso: 'Ciência da Computação',
      image: '/moradores/coleira.jpeg'
    },
    {
      nome: 'Victor Hugo',
      apelido: 'Cocorico',
      dataEntrada: 2018,
      curso: 'Ciência da Computação',
      image: '/moradores/cocorico.jpeg'
    },
    {
      nome: 'Vinicius T',
      apelido: 'Chapoca',
      dataEntrada: 2019,
      curso: 'Ciência da Computação',
      image: '/moradores/chapoca.jpeg',
    },
    {
      nome: 'Ruens',
      apelido: 'Alan',
      dataEntrada: 2021,
      curso: 'Agronomia',
      image: '/moradores/alan.jpeg'
    },
    {
      nome: 'Selina',
      apelido: 'Selina',
      dataEntrada: 2019,
      curso: 'Mascote',
      image: '/moradores/selina.jpeg'
    }
  ]

  function getBlurImg() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const img = useRgbDataURL(0, 0, 0)
    return img
  }
  return (
    <section id="moradores" className={styles.container}>
      <h2 className={styles.title}>Moradores</h2>
      <div className={styles.content}>
        {moradores.map((morador) => (
          <div key={morador.nome} className={styles.imageContainer}>
            <div className={styles.image}>
              <Image 
                src={morador.image}
                alt={morador.nome}
                placeholder="blur"
                blurDataURL={getBlurImg()}
                width="185" 
                height="185" 
              />
            </div>
            
            <p title={`${morador.nome} - ${morador.curso}`}>
              {morador.apelido} <br/>
              <span>{morador.dataEntrada}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}