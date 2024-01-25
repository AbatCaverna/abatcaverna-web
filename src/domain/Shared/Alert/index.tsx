import { useEffect, useState } from 'react'
import { BsInfoCircleFill } from 'react-icons/bs'

import styles from "./styles.module.css"

type AlertProps = {
  message: string
  title?: string
  type?: 'info' | 'error' | 'warning' | 'success' | 'dark'
}

export default function Alert({
  message,
  title = "",
  type = "dark",
}: AlertProps) {
  const [animation, setAnimation] = useState('enterAnimation')

  useEffect(() => {
    setTimeout(() => {
      setAnimation('leaveAnimation')
    }, 1000)
  }, [])

  return (
    <div className={`${styles.container} ${styles[type]} ${styles[animation]}`}>
      <BsInfoCircleFill/>
      <strong>{title}</strong>
      <p>{message}</p>
    </div>
  )
}