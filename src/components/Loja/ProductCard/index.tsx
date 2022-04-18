import Image from "next/image";
import Stripe from "stripe";
import useCarrinho from "../../../hooks/useCarrinho";
import { BsFillCartPlusFill } from "react-icons/bs";
import styles from "./styles.module.css";
import CheckoutService from "../../../services/CheckoutService";
import getStripe from "../../../services/stripejs";
import { signIn, useSession } from "next-auth/react";

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
  const checkoutService = new CheckoutService()
  const session = useSession()

  function transformPrice(price: number | null) {
    if (!price) return "R$0,00"

    const priceValue = price / 100
    return priceValue.toLocaleString('pt-BR', { style: "currency", currency: "BRL"})
  }

  async function handleBuyItem(priceId: string) {
    try {
      if (session.status === "unauthenticated") await signIn("google")

      const response = await checkoutService.createCheckoutSession(priceId)
      const stripe = await getStripe()
  
      await stripe?.redirectToCheckout({ sessionId: response.data.sessionId })
      
    } catch (error) {
      alert("Erro! ")
    }

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
          onClick={() => handleBuyItem(data.price.id)}
        >Comprar</button>
      </div>

    </div>
  );
}