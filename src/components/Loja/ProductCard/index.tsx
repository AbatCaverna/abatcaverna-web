import Image from "next/image";
import Stripe from "stripe";
import useCarrinho from "../../../hooks/useCarrinho";
import { BsFillCartPlusFill } from "react-icons/bs";
import styles from "./styles.module.css";

type ProductsResponse = {
  product: Stripe.Response<Stripe.Product>;
  price: Stripe.Price;
}

interface ProductCardProps {
  data: ProductsResponse
}

export default function ProductCard({ data }: ProductCardProps) {
  const { product, price } = data
  const noImage = "/images/no_image.png"
  const { addToCart } = useCarrinho()

  function transformPrice(price: number | null) {
    if (!price) return "R$0,00"

    const priceValue = price / 100
    return priceValue.toLocaleString('pt-BR', { style: "currency", currency: "BRL"})
  }

  return (
    <div className={styles.card}>
      <strong>{product.name}</strong>
      <div className={styles.card_image}>
        <Image
          src={product.images[0] || noImage}
          alt="Produto"
          layout="fill"
        />

      </div>
      <p>{transformPrice(price.unit_amount)}</p>
      <div className={styles.btn_container}>
        <button
          type="button"
          className={styles.btn_buy}
          onClick={() => addToCart(data)}
        ><BsFillCartPlusFill color="#000" size="1rem"/></button>
        <button
          type="button"
          className={styles.btn_buy}
        >Comprar</button>
      </div>

    </div>
  );
}