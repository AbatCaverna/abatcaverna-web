import { DetailedHTMLProps, forwardRef, ForwardRefRenderFunction, InputHTMLAttributes, ReactElement } from "react"
import { IconType } from "react-icons"
import styles from "./styles.module.css"

interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  name: string
  type: string
  label?: string
  icon?: IconType
  inputStyle?: "default" | "large"
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({
  label,
  name,
  type,
  icon,
  inputStyle = "default",
  ...rest
}, ref) => {
  const Icon = icon
  return (
    <div className={styles.input}>
      {label && <label htmlFor={name}>{Icon && <Icon />} {label}</label>}
      <input className={inputStyle === "large" ? styles.large : ""} ref={ref} type={type} name={name} id={name} autoComplete="off" {...rest} />
    </div>
  );
}

const Input = forwardRef(InputBase)

export default Input