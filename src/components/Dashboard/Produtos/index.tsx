import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";
import styles from "./styles.module.css";

type ProductsResponse = {
  product: Stripe.Response<Stripe.Product>;
  price: Stripe.Price;
}[]

interface Produtos {
  data: ProductsResponse
}

export default function Produtos({ data }: Produtos) {
  function trasnformValue(amount: number) {
    const real = amount / 100;
    const value_string = real.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    return value_string
  }
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Produtos</h1>
        <div>
          <Link href="/dashboard/create-product">
            <a >+ Adicionar produto</a>
          </Link>
        </div>
      </div>
      <div className={styles.content}>
        <ul>
          {data.map(({product, price}) => (
            <li key={product.id}>
              <div className={styles.item}>
                <img
                  src={product.images[0]}
                  alt="produto"
                  width={42}
                  height={42}
                />
                <div>
                  <p>{product.name}</p>
                  <span>{trasnformValue(price.unit_amount!)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}