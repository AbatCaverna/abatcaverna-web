import { useEffect, useState } from "react";
import Stripe from "stripe";
import ProdutosService from "../../../services/ProdutosService";
import ProductCard from "../../Loja/ProductCard";
import styles from "./styles.module.css";

type Produtos = {
  product: Stripe.Response<Stripe.Product>;
  price: Stripe.Price;
}

export default function NossaLoja() {
  const [produtos, setProdutos] = useState([] as Produtos[])

  function fetchProducts() {
    const produtcService = new ProdutosService()
    produtcService.getAllProducts().then((response) => {
      setProdutos(response.data)
    })
  }

  useEffect(() => {
    fetchProducts()
  }, [])
  return (
    <section id="nossa-loja">
      <h2 className={styles.title}>Nossa Loja</h2>
      <div className={styles.flex}>
        {produtos.map((produto) => (
          <ProductCard
            key={produto.price.id}
            data={produto}
            handleClick={(ev) => console.log(ev)}
            />
        ))}
      </div>
    </section>
  ) 
}