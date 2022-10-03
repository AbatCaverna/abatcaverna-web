import Image from 'next/image';
import Link from 'next/link';
import { TiSocialInstagram } from 'react-icons/ti';

import styles from 'styles/Checkout.module.css';

export default function CheckoutSucesso() {
  return (
    <div className={styles.container}>
      <Image
        src="/images/undraw_order_confirmed_re_g0if.svg"
        alt="Order success"
        width={240}
        height={240}
      />
      <h1 className={styles.color_yellow}>Obrigado pela compra!</h1>
      <p>Pagamento realizado com sucesso!</p>
      <p>
          Você receberá um e-mail com os detalhes da sua compra! <br /> <br /> <br /> 
          Siga-nos em <TiSocialInstagram width={32} height={32}/>
          <Link href="https://www.instagram.com/abat_caverna">
            <a className={styles.color_yellow}>ABatCaverna</a>
          </Link>
      </p>
    </div>
  );
}