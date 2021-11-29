import { useEffect, useState } from 'react';
import useWindow from '../../hooks/useWindow';
import Image from 'next/image';
import styles from './styles.module.css';

export function Header() {
  const { width } = useWindow();
  const [showNav, setShowNav] = useState(true)

  useEffect(() => {
    if (width && width < 480) {
      setShowNav(false)
    } else {
      setShowNav(true)
    }
  },[width])
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
              <a href="#">
              Home
              </a>
            </li>
            <li>
              <a href="#historia">Hisória</a>
            </li>
            <li>
              <a href="#moradores">Moradores</a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}