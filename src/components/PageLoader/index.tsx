import Image from "next/image";
import styles from "./styles.module.css"

export default function PageLoader() {
  return (
    <div className={styles.container}>
      <Image
        src="/images/bat-outline-svgrepo-com.svg"
        alt="bat loader"
        width="35px"
        height="35px"
      />
    </div>
  )
}