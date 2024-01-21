import Image from "next/image"
import { BsFillCartPlusFill } from "react-icons/bs"

import { Button } from '@/components/ui/button'
import { Card } from "domain/Shared"
import useCarrinho from "hooks/useCarrinho"
import { Product } from "services/ProdutosService"

import styles from "./styles.module.css"

interface ProductCardProps {
  data: Product
  handleClick: (priceId: string) => void
}

export default function ProductCard({ data, handleClick }: ProductCardProps) {
  const noImage = "/images/no_image.png"
  const { addToCart } = useCarrinho()

  function transformPrice(price: number | string | null) {
    if (!price) return "R$0,00"

    if (typeof price === "string") {
      price = parseFloat(price)
      return price.toLocaleString('pt-BR', { style: "currency", currency: "BRL" })
    } else {
      const priceValue = price / 100

      return priceValue.toLocaleString('pt-BR', { style: "currency", currency: "BRL" })
    }

  }

  function calculatePriceWIthoutTax(price: number | null, tax: string) {
    if (!price) return "R$0,00"
    const priceTotal = (price / 100) - parseFloat(tax)
    return priceTotal.toLocaleString('pt-BR', { style: "currency", currency: "BRL" })
  }

  return (
    <Card style={{
      maxWidth: '350px',
      minWidth: '295px',
    }}>
      <>
        <strong className={styles.card_title}>{data.name}</strong>
        <div className={styles.card_image}>
          <Image
            src={data.image || noImage}
            alt="Produto"
            layout="fill"
          />

        </div>
        <p className={styles.card_price}>{transformPrice(data.price)} <span>({calculatePriceWIthoutTax(data.price, data.tax)} + {transformPrice(data.tax)} taxas)</span></p>
        <div className={styles.btn_container}>
          <Button
            type="button"
            size="sm"
            onClick={() => addToCart(data)}
          ><BsFillCartPlusFill color="#000" size="1rem" /></Button>
          <Button
            type="button"
            onClick={() => handleClick(data.stripe_price_id)}
          >Comprar</Button>
        </div>
      </>
    </Card>
  );
}
