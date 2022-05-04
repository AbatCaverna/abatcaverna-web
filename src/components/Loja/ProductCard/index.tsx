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
  handleClick: (priceId: string) => void
}

export default function ProductCard({ data, handleClick }: ProductCardProps) {
  const { product, price } = data
  const noImage = "/images/no_image.png"
  const { addToCart } = useCarrinho()

  function transformPrice(price: number | string | null) {
    if (!price) return "R$0,00"

    if (typeof price === "string") {
      price = parseFloat(price)
      return price.toLocaleString('pt-BR', { style: "currency", currency: "BRL"})
    } else {
      const priceValue = price / 100

      return priceValue.toLocaleString('pt-BR', { style: "currency", currency: "BRL"})
    }

  }

  function calculatePriceWIthoutTax(price: number | null, tax: string) {
    if (!price) return "R$0,00"
    const priceTotal = (price / 100) - parseFloat(tax)
    return priceTotal.toLocaleString('pt-BR', { style: "currency", currency: "BRL"})
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
      <p>{transformPrice(price.unit_amount)} <span>({calculatePriceWIthoutTax(price.unit_amount, product.metadata.taxas)} + {transformPrice(product.metadata.taxas)} taxas)</span></p>
      <div className={styles.btn_container}>
        <button
          type="button"
          className={styles.btn_buy}
          onClick={() => addToCart(data)}
        ><BsFillCartPlusFill color="#000" size="1rem"/></button>
        <button
          type="button"
          className={styles.btn_buy}
          onClick={() => handleClick(data.price.id)}
        >Comprar</button>
      </div>

    </div>
  );
}