import useCarrinho from "../../../hooks/useCarrinho";
import styles from "./styles.module.css"
import { FiShoppingCart } from "react-icons/fi"
import { useRouter } from "next/router";

export default function CarrinhoIcone() {
  const { products } = useCarrinho()
  const router = useRouter()

  function handleGoToCartPage() {
    router.push('/loja/carrinho')
  }

  return (
    <div
      className={styles.container}
      title="Clique para abrir o carrinho"
      onClick={handleGoToCartPage}
    >
      <FiShoppingCart color="#FFC74A" size="1.5rem"/> {products.length}
    </div>
  );
}