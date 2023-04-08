import { useEffect, useState, useRef } from 'react';
import useWindow from '../../../hooks/useWindow';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.css';
import { MdMenu, MdClose } from 'react-icons/md';
import { useSession } from 'next-auth/react';
import ProfileButton from '../ProfileButton';
import CarrinhoIcone from '../../Loja/CarrinhoIcone';

export function Header() {
  const window = useWindow();
  const [showNav, setShowNav] = useState(false)
  const [showMobileNavBar, setshowMobileNavBar] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { data, status } = useSession()

  function handelNavOpen() {
    setshowMobileNavBar(true)

  }

  function handelNavClose() {
    if (navRef.current) {
      navRef.current.classList.remove(styles.mobile_nav_enter)
      navRef.current.classList.add(styles.mobile_nav_out)

      // espera o tempo da animacao acabar 
      // para remover o elemento da dom
      setTimeout(() => {
        setshowMobileNavBar(false)

      }, 400)
    }
  }

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
        handelNavClose()
      }
    }

    document.addEventListener('mousedown', handler)

    return () => {
      document.removeEventListener('mousedown', handler)
    }
  })

  if (status === 'loading') return (
    <div>
      ...
    </div>
  )
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
              <Link href="/cachaca-rank">
                <a >Cachaça</a>
              </Link>
            </li>
            <li>
              <Link href="/#historia">
                <a >História</a>
              </Link>
            </li>
            <li>
              <Link href="/#moradores">
                <a >Moradores</a>
              </Link>
            </li>
            <li>
              <Link href="/#nossa_casa">
                <a >Nossa casa</a>
              </Link>
            </li>
            <li>
              <Link href="/loja">
                <a>Loja</a>
              </Link>
            </li>
            {
              status !== "authenticated" ? (
              <li>
                <Link href="/login">
                  <a>Login</a>
                </Link>
              </li>
              ) : (
                <ProfileButton
                  name={data?.user?.name!}
                  image={data?.user?.image!}
                  email={data?.user?.email!}
                  role={(data as any)?.role as string}
                />
              )
            }

          </ul>
        </nav>
      ) : (
        <MdMenu size="1.5em" onClick={handelNavOpen}/>
      )}

      {showMobileNavBar && (
      <div className={`${styles.mobile_nav} ${styles.mobile_nav_enter}`} ref={navRef}>
        <MdClose
          size="1.5em"
          className={styles.mobile_nav_close_btn}
          onClick={handelNavClose}
        />
        <nav>
          <ul>
            <li>
               <Link href="/">
                  <a >Home</a>
              </Link>
            </li>
            <li>
              <Link href="/cachaca-rank">
                <a >Cachaça</a>
              </Link>
            </li>
            <li>
              <Link href="/#historia">
                <a >História</a>
              </Link>
            </li>
            <li>
              <Link href="/#moradores">
                <a >Moradores</a>
              </Link>
            </li>
            <li>
              <Link href="/#nossa_casa">
                <a >Nossa casa</a>
              </Link>
            </li>
            <li>
              <Link href="/loja">
                <a>Loja</a>
              </Link>
            </li>
            {
               status !== "authenticated" ?  (
              <li>
                <Link href="/login">
                  <a>Login</a>
                </Link>
              </li>
              ) : (
                <ProfileButton
                  name={data?.user?.name!}
                  image={data?.user?.image!}
                  email={data?.user?.email!}
                  role={(data as any)?.role as string}
                />
              )
            }
            <li>
              <CarrinhoIcone/>
            </li>
          </ul>
        </nav>
      </div>
      )}
    </header>
  )
}