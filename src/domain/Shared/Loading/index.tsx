import Image from "next/image";
import styles from "./styles.module.css"

export default function Loading() {
  return (
    <div className={styles.container}>
      <Image
        src="/images/bat-outline-svgrepo-com.svg"
        alt="bat loader"
        width={35}
        height={35}
      />
    </div>
  )
}
