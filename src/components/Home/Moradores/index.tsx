import Image from "next/image";
import Link from 'next/link';
import styles from './styles.module.css';

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

export function Moradores({ moradores }: MoradorProps) {

  return (
    <section id="moradores" className={styles.container}>
      <h2 className={styles.title}>Moradores</h2>
      <div className={styles.content}>
        {moradores.map((morador) => (
          <div key={morador.nome} className={styles.imageContainer}>
            <Link href={morador.instagram || ''}>
              <a
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={styles.image}>
                  <Image 
                    src={morador.image}
                    alt={morador.nome}
                    placeholder="blur"
                    blurDataURL={morador.base64}
                    width="185" 
                    height="185" 
                  />
                </div>
                
                <p title={`${morador.nome} - ${morador.curso}`}>
                  {morador.apelido} <br/>
                  <span>{morador.dataEntrada}</span>
                </p>

              </a>
              
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}