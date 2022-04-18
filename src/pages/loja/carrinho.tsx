import Head from "next/head";
import Image from "next/image";
import useCarrinho from "../../hooks/useCarrinho";
import transformUnitAmount from "../../utils/trasnformUnitAmout";
import { GoTrashcan } from "react-icons/go";
import styles from "../../styles/Carrinho.module.css";
import Link from "next/link";

export default function Carrinho() {
  const { products, cartCheckout } = useCarrinho()
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
                {products.map(({ product, price }) => (
                  <tr key={product.id}>
                    <td>
                      <div className={styles.table_image}>
                        <Image src={product.images[0] || noImage} alt="Produto" layout="fill" />
                      </div>
                    </td>
                    <td>
                      <div className={styles.table_data}>
                        <p>{product.name}</p>
                        <span>{product.description}</span>
                      </div>
                    </td>
                    <td>
                      {transformUnitAmount(price.unit_amount)}
                    </td>
                    <td>
                      <button type="button" className={styles.table_btn_remove}>
                        <GoTrashcan size="1.1rem"/>
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
            <a >Voltar a comprar</a>
          </Link>
        </div>

      </main>

    </div>
  );
}