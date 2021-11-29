import Image from 'next/image';

import styles from './styles.module.css';
import { TiSocialInstagram } from 'react-icons/ti'

export function Footer() {
  
  return (
    <footer className={styles.footer}>
      <a
        href="https://github.com/AbatCaverna"
        target="_blank"
        rel="noopener noreferrer"
      >
        Feito por{' '}
        <span className={styles.logo}>
          <Image src="/favicon-16x16.png" alt="Abat Logo" width={16} height={16} />
        </span>
      </a>

      <a 
        href="https://www.instagram.com/abat_caverna/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <TiSocialInstagram color="eaeaea" width={32} height={32}/>
      </a>
    </footer>
  )
}