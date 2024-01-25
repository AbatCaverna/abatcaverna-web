import { CSSProperties } from 'react'
import styles from './styles.module.css'

interface Props {
  children: React.ReactChild
  className?: string
  style?: CSSProperties
}

function Card({ children, className = "", style }: Props) {
  return (
    <div className={`${styles.container} ${className}`} style={style}>
      {children}
    </div>
  )
}

export default Card