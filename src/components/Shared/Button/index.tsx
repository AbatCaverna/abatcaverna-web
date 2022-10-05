import { DetailedHTMLProps, InputHTMLAttributes } from "react"

import styles from "./styles.module.css"

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: React.ReactChild
  type: "button" | "reset" | "submit" 
  customStyle?: "default" | "small"
  loading?: boolean
}

function Button({
  children,
  type,
  loading = false,
  customStyle = "default",
  ...rest
}: Props) {
  return (
    <button
      className={`${styles.btn} ${styles[customStyle]}`}
      type={type}
      {...rest}>
        {loading ? (<LoadingAnimation />) : children}
    </button>
  )
}

function LoadingAnimation() {
  return (
    <div className={styles.lds_ellipsis}><div></div><div></div><div></div><div></div></div>
  )
}

export default Button
