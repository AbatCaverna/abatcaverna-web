import CriarProduto from "../../components/Dashboard/CriarProduto";
import SideBar from "../../components/Dashboard/SideBar";
import styles from  "../../styles/Dashboard.module.css";

export default function CriarProdutoPage() {
  return (
    <div className={styles.container}>
      <SideBar />
      <main>
        <CriarProduto/>
      </main>
    </div>
  );
}