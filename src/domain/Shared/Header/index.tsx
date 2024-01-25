import { useSession } from 'next-auth/react';
import { useEffect, useState, useRef, useMemo, ReactElement } from 'react';
import { MdMenu } from 'react-icons/md';
import Image from 'next/image';
import Link from 'next/link';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

import ProfileButton from '../ProfileButton';
import useWindow from '../../../hooks/useWindow';

type NavItems = {
  key: string
  href: string
  label: string
  render?: () => ReactElement | null
}

export default function Header() {
  const window = useWindow();
  const [showNav, setShowNav] = useState(false)
  const { data, status } = useSession()

  useEffect(() => {
    if (window && window.width < 480) {
      setShowNav(false)
    } else {
      setShowNav(true)
    }
  }, [window])

  const items: NavItems[] = useMemo(() => {
    return [
      {
        key: 'home',
        href: '/',
        label: 'Home'
      },
      {
        key: 'rank',
        href: '/cachaca-rank',
        label: 'Cachaça',
      },
      {
        key: 'historia',
        href: '/#historia',
        label: 'História'
      },
      {
        key: 'moradores',
        href: '/#moradores',
        label: 'Moradores',
      },
      {
        key: 'nossa_casa',
        href: '/#nossa_casa',
        label: 'Nosa casa'
      },
      {
        key: 'loja',
        href: '/loja',
        label: 'Loja'
      },
      {
        key: 'login',
        href: '/login',
        label: 'Login',
        render: () => {
          if (status !== "authenticated") return null
          return (
            <ProfileButton
              name={data?.user?.name!}
              image={data?.user?.image!}
              email={data?.user?.email!}
              role={(data as any)?.role as string}
            />
          )
        }
      }
    ]
  }, [status, data])

  if (status === 'loading') return (
    <div>
      ...
    </div>
  )

  if (!showNav) {
    return (
      <header className="flex items-center justify-between px-8 relative border-b-light-gray border-b-2 py-2">
        <h1 className="text-yellow text-2xl flex items-center gap-2">
          <Image src="/favicon-96x96.png" alt="Abat Logo" width={45} height={45} />
          AbatCaverna
        </h1>
        <Sheet>
          <SheetTrigger><MdMenu size="1.5em" /></SheetTrigger>
          <SheetContent className="bg-black bg-opacity-60">
            <SheetHeader>
              <SheetTitle>
                <h1 className="text-yellow text-2xl flex items-center gap-2">
                  <Image src="/favicon-96x96.png" alt="Abat Logo" width={45} height={45} />
                  AbatCaverna
                </h1>
              </SheetTitle>
            </SheetHeader>
            <Navigation items={items} orientation="vertical" />
          </SheetContent>
        </Sheet>
      </header>
    )
  }

  return (
    <header className="flex items-center justify-between px-8 relative border-b-light-gray border-b-2 py-2">
      <h1 className="text-yellow text-2xl flex items-center gap-2">
        <Image src="/favicon-96x96.png" alt="Abat Logo" width={45} height={45} />
        AbatCaverna
      </h1>
      <Navigation items={items} />
    </header>
  )
}

type NavigationProps = {
  items: NavItems[]
  orientation?: 'horizontal' | 'vertical'
}

function Navigation({ orientation = 'horizontal', items }: NavigationProps) {
  return (
    <NavigationMenu orientation={orientation}>
      <NavigationMenuList className={orientation === 'vertical' ? 'flex-col items-start' : ''}>
        {items.map(item => (
          <NavigationMenuItem key={item.key}>
            {
              item.render && item.render()
                ? item.render()
                : (
                  <Link href={item.href} passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      {item.label}
                    </NavigationMenuLink>
                  </Link>
                )
            }
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
