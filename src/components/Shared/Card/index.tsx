import styles from './styles.module.css'

interface Props {
  children: React.ReactChild
  className?: string
}

function Card({ children, className = "" }: Props) {
  return (
    <div className={`${styles.container} ${className}`}>
      {children}
    </div>
  )
}

export default Card