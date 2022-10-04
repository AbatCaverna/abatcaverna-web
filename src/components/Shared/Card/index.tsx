import styles from './styles.module.css'

interface Props {
  children: React.ReactChild
}

function Card({ children }: Props) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}

export default Card