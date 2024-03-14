import React from "react"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdSpaceDashboard } from "react-icons/md"

import useWindow from "hooks/useWindow";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

export default function SideBar() {
  const router = useRouter()
  const window = useWindow()
  const [isMobile, setIsMobile] = useState(true)

  function onChangeRoute(route: string) {
    router.push('/dashboard/' + route)
  }

  useEffect(() => {
    if (window && window?.width < 580) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }, [window])

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger className="bg-sidebar-bg fixed w-full flex items-center justify-center bottom-0 min-h-12">
          <MdSpaceDashboard />
        </DrawerTrigger>
        <DrawerContent className="bg-sidebar-bg bg-opacity-80">
          <DrawerHeader>
            <DrawerTitle>
              <h1 className="flex items-center gap-2 justify-center">
                <MdSpaceDashboard /> Dashboard
              </h1>
            </DrawerTitle>
          </DrawerHeader>
          <nav className="w-full text-center">
            <ul className="list-none">
              {items.map(({ strong, list }) => (
                <React.Fragment key={strong}>
                  <strong className="text-xs">{strong}</strong>
                  <hr className="m-0" />it
                  {list.map(({ label, route }) => (
                    <li
                      key={route}
                      className="text-[1rem] uppercase my-4 cursor-pointer"
                      onClick={() => onChangeRoute(route)}
                    >
                      {label}
                    </li>
                  ))}
                </React.Fragment>
              ))}
            </ul>
          </nav>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <div className="bg-sidebar-bg p-4 w-72">
      <h1 className="flex items-center gap-2">
        <MdSpaceDashboard /> Dashboard
      </h1>
      <nav>
        <ul className="list-none">
          {items.map(({ strong, list }) => (
            <React.Fragment key={strong}>
              <strong className="text-xs">{strong}</strong>
              <hr className="m-0" />
              {list.map(({ label, route }) => (
                <li
                  key={route}
                  className="text-[1rem] uppercase my-4 cursor-pointer"
                  onClick={() => onChangeRoute(route)}
                >
                  {label}
                </li>
              ))}
            </React.Fragment>
          ))}
        </ul>
      </nav>
    </div>
  )
}

const items = [
  {
    strong: "Morador",
    list: [
      {
        label: "Perfil",
        route: "perfil",
      },
      {
        label: "Cachaça",
        route: "cachaca",
      },
      {
        label: "Tarefas",
        route: "tarefas",
      }
    ]
  },
  {
    strong: "Loja",
    list: [
      {
        label: "Produtos",
        route: "produtos"
      }
    ]
  }
]

