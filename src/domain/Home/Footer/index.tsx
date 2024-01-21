import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.css';
import { TiSocialInstagram } from 'react-icons/ti'
import { GiBatMask, GiDrinkMe } from 'react-icons/gi'

function Footer() {

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


      <div className={styles.social}>
        <Link href="/cachaca-rank" title="Quadro de Cachaça">
          <GiDrinkMe color="eaeaea" width={32} height={32} />
        </Link>
        <a
          href="https://rain-diver-f37.notion.site/Estatuto-Abat-Caverna-e04f83cf85cb43a7ac30668e64f3fe33"
          target="_blank"
          rel="noopener noreferrer"
          title="Estatuto"
        >
          <GiBatMask color="eaeaea" width={32} height={32} />
        </a>
        <a
          href="https://www.instagram.com/abat_caverna/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <TiSocialInstagram color="eaeaea" width={32} height={32} />
        </a>
      </div>

    </footer>
  )
}

export default Footer
