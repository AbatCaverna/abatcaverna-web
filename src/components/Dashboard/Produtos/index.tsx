import Image from "next/image";
import Link from "next/link";

import { ProductsResponse } from "types";

import styles from "./styles.module.css";

interface Produtos {
  data: ProductsResponse
}

export default function Produtos({ data }: Produtos) {
  const noImage = "/images/no_image.png";
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
          <Link href="/dashboard/criar-produto">
            <a >+ Adicionar produto</a>
          </Link>
        </div>
      </div>
      <div className={styles.content}>
        <ul>
          {data.map(({product, price}) => (
            <li key={product.id}>
              <div className={styles.item}>
                <Image
                  src={product.images[0] || noImage}
                  alt="produto"
                  width={62}
                  height={62}
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