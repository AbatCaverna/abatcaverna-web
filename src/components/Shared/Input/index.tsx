import { DetailedHTMLProps, forwardRef, ForwardRefRenderFunction, InputHTMLAttributes, ReactElement } from "react"
import { IconType } from "react-icons"
import styles from "./styles.module.css"

interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label: string
  name: string
  type: string
  icon: IconType
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({
  label,
  name,
  type,
  icon,
  ...rest
}, ref) => {
  const Icon = icon
  return (
    <div className={styles.input}>
      <label htmlFor={name}><Icon /> {label}</label>
      <input ref={ref} type={type} name={name} id={name} {...rest} />
    </div>
  );
}

const Input = forwardRef(InputBase)

export default Input