import Image from "next/image";
import Link from "next/link";

import { ProductsResponse } from "services/ProdutosService";

import styles from "./styles.module.css";

interface Produtos {
  data: ProductsResponse
}

export default function Produtos({ data }: Produtos) {
  const { products } = data
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
            + Adicionar produto
          </Link>
        </div>
      </div>
      <div className={styles.content}>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <div className={styles.item}>
                <Image
                  src={product.image || noImage}
                  alt="produto"
                  width={62}
                  height={62}
                />
                <div>
                  <p>{product.name}</p>
                  <span>{trasnformValue(product.price!)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
