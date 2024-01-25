import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdSpaceDashboard } from "react-icons/md"

import useWindow from "hooks/useWindow";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import styles from "./styles.module.css"

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
              <strong className="text-xs">Morador</strong>
              <hr className="m-0" />
              <li className="text-[1rem] uppercase my-4 cursor-pointer" onClick={() => onChangeRoute('')}>Perfil</li>
              <li className="text-[1rem] uppercase my-4 cursor-pointer" onClick={() => onChangeRoute('cachaca')}>Cachaça</li>
              <li className="text-[1rem] uppercase my-4 cursor-pointer" onClick={() => onChangeRoute('tarefas')}>Tarefas</li>
              <strong className="text-xs">Loja</strong>
              <hr className="m-0" />
              <li className="text-[1rem] uppercase my-4 cursor-pointer" onClick={() => onChangeRoute('produtos')}>Produtos</li>
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
          <strong className="text-xs">Morador</strong>
          <hr className="m-0" />
          <li className="text-[1rem] uppercase my-4 cursor-pointer" onClick={() => onChangeRoute('')}>Perfil</li>
          <li className="text-[1rem] uppercase my-4 cursor-pointer" onClick={() => onChangeRoute('cachaca')}>Cachaça</li>
          <li className="text-[1rem] uppercase my-4 cursor-pointer" onClick={() => onChangeRoute('tarefas')}>Tarefas</li>
          <strong className="text-xs">Loja</strong>
          <hr className="m-0" />
          <li className="text-[1rem] uppercase my-4 cursor-pointer" onClick={() => onChangeRoute('produtos')}>Produtos</li>
        </ul>
      </nav>
    </div>
  )
}
