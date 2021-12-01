import { useEffect, useState } from 'react';
import useWindow from '../../hooks/useWindow';
import Image from 'next/image';
import styles from './styles.module.css';

export function Header() {
  const window = useWindow();
  const [showNav, setShowNav] = useState(true)

  useEffect(() => {
    if (window && window.width < 480) {
      setShowNav(false)
    } else {
      setShowNav(true)
    }
  },[window])
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        <Image src="/favicon-96x96.png" alt="Abat Logo" width={45} height={45} />
        AbatCaverna
      </h1>
      {showNav && (
        <nav className={styles.nav}>
          <ul>
            <li>
              <a href="#historia">História</a>
            </li>
            <li>
              <a href="#moradores">Moradores</a>
            </li>
            <li>
              <a href="#nossa_casa">Nossa casa</a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}