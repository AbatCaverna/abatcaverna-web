import { ReactNode } from "react";

import SideBar from "../SideBar";

import styles from "./styles.module.css";

interface Props {
  children: ReactNode
  mainClassName?: string
}

export default function DashboardLayout({ children, mainClassName = "" }: Props) {
  return (
    <div className={styles.container}>
      <SideBar />
      <main className={mainClassName}>
        {children}
      </main>
    </div>
  )
}