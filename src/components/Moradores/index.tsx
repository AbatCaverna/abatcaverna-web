import Image from "next/image";
import styles from './styles.module.css';

export function Moradores() {
  const moradores = [
    {
      nome: 'Matheus S',
      apelido: 'Teta',
      dataEntrada: 2016,
      curso: 'Ciencia da Computacao',
      image: '/moradores/teta.jpeg'
    },
    {
      nome: 'Lucas Takeshi',
      apelido: 'Coleira',
      dataEntrada: 2016,
      curso: 'Ciencia da Computacao',
      image: '/moradores/coleira.jpeg'
    },
    {
      nome: 'Victor Hugo',
      apelido: 'Cocorico',
      dataEntrada: 2018,
      curso: 'Ciencia da Computacao',
      image: '/moradores/cocorico.jpeg'
    },
    {
      nome: 'Vinicius T',
      apelido: 'Chapoca',
      dataEntrada: 2019,
      curso: 'Ciencia da Computacao',
      image: '/moradores/chapoca.jpeg',
    },
    {
      nome: 'Ruens',
      apelido: 'Alan',
      dataEntrada: 2021,
      curso: 'Agronomia',
      image: '/moradores/alan.jpeg'
    }
  ]
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Moradores</h2>
      <div className={styles.content}>
        {moradores.map((morador) => (
          <div key={morador.nome} className={styles.imageContainer}>
            <div className={styles.image}>
              <Image 
                src={morador.image}
                alt={morador.nome}
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