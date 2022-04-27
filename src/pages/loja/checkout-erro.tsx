import Image from 'next/image';
import Link from 'next/link';
import { TiSocialInstagram } from 'react-icons/ti';
import styles from '../../styles/Checkout.module.css';

export default function CheckoutErro() {
  return (
    <div className={styles.container}>
      <Image
        src="/images/undraw_cancel_re_pkdm.svg"
        alt="Order success"
        width={240}
        height={240}
      />
      <h1 className={styles.color_yellow}>Ah não! Parece que tivemos um problema</h1>
      <p>Houve algum problema no processamento do seu pagamento</p>
      <p>
          Por favor tente comprar novamente mais tarde ou entre em contato com um dos moradores! <br /> <br /> <br /> 
          Siga-nos em <TiSocialInstagram width={32} height={32}/>
          <Link href="https://www.instagram.com/abat_caverna">
            <a className={styles.color_yellow}>ABatCaverna</a>
          </Link>
      </p>
    </div>
  );
}