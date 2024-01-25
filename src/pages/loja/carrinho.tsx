import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { GoTrash } from "react-icons/go";

import Loader from 'domain/Shared/Loading';
import useCarrinho from "hooks/useCarrinho";
import styles from "styles/Carrinho.module.css";
import transformUnitAmount from "utils/trasnformUnitAmout";

export default function Carrinho() {
  const { products, cartCheckout, removeFromCart, loading } = useCarrinho()
  const noImage = "/images/no_image.png"
  return (
    <div>
      <Head>
        <title>Carrinho | Loja AbatCaverna</title>
        <meta name="description" content="Carrinho para a loja da república AbatCaverna de Florestal MG" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Carrinho</h1>
        <p>Você tem <span>{products.length}</span> produto(s) no seu carrinho!</p>
        {products.length > 0 && (
          <div className={styles.content}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <td>Produto</td>
                  <td></td>
                  <td>Preço</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className={styles.table_image}>
                        <Image src={product.image || noImage} alt="Produto" layout="fill" />
                      </div>
                    </td>
                    <td>
                      <div className={styles.table_data}>
                        <p>{product.name}</p>
                        <span></span>
                      </div>
                    </td>
                    <td>
                      {transformUnitAmount(product.price)}
                    </td>
                    <td>
                      <button
                        type="button"
                        className={styles.table_btn_remove}
                        onClick={() => removeFromCart(product)}
                      >
                        <GoTrash size="1.1rem" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className={styles.btn_checkout_container}>
          <button type="button" className={styles.btn_checkout} onClick={cartCheckout}>pagamento</button>

        </div>
        <div className={styles.link_store}>
          <Link href="/loja" >
            Voltar a comprar
          </Link>
        </div>
        {loading && (
          <div className={styles.loading}>
            <Loader />
            <p>Carregando...</p>
          </div>
        )}
      </main>

    </div>
  );
}
