import { useEffect, useState, useRef } from 'react';
import useWindow from '../../hooks/useWindow';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.css';
import { MdMenu } from 'react-icons/md';

export function Header() {
  const window = useWindow();
  const [showNav, setShowNav] = useState(false)
  const [showMobileNavBar, setshowMobileNavBar] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (window && window.width < 480) {
      setShowNav(false)
    } else {
      setShowNav(true)
    }
  },[window])

  // close the navbar when click outside of it
  useEffect(() => {
    router.events.on('routeChangeComplete', () => setshowMobileNavBar(false)) // closes the navbar when route changes
    const handler = (event: any) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setshowMobileNavBar(false)
      }
    }

    document.addEventListener('mousedown', handler)

    return () => {
      document.removeEventListener('mousedown', handler)
    }
  })
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        <Image src="/favicon-96x96.png" alt="Abat Logo" width={45} height={45} />
        AbatCaverna
      </h1>
      {showNav ? (
        <nav className={styles.nav}>
          <ul>
            <li>
              <Link href="/">
                <a >Home</a>
              </Link>
            </li>
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
      ) : (
        <MdMenu size="1.5em" onClick={() => {setshowMobileNavBar(!showMobileNavBar);}}/>
      )}

      {showMobileNavBar && (
      <div className={styles.navBar_container} ref={navRef}>
        <nav>
          <ul>
            <li>
               <Link href="/">
                  <a >Home</a>
              </Link>
            </li>
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
      </div>
      )}
    </header>
  )
}