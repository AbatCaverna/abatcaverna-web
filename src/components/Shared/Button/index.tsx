import { DetailedHTMLProps, InputHTMLAttributes } from "react"

import styles from "./styles.module.css"

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: React.ReactChild
  type: "button" | "reset" | "submit" 
}

function Button({ children, type, ...rest }: Props) {
  return (
    <button className={styles.btn} type={type} {...rest}>{children}</button>
  )
}

export default Button
