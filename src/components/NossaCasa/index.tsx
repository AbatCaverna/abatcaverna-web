import Image from 'next/image'
import Link from 'next/link'
import styles from './styles.module.css'
import { FaWhatsapp } from 'react-icons/fa'

export default function NossaCasa() {
  const googleUrl = `https://maps.googleapis.com/maps/api/staticmap?center=R.+Geni+Naime+Silva,+128,+Florestal+-+MG,+35690-000
  &size=600x600
  &maptype=roadmap
  &markers=-19.888633925595407,-44.42121602868962
  &key=${process.env.NEXT_PUBLIC_GOOGLE_KEY}`

  const urlencodedtext = `Opa%20estou%20interessado%20na%20vaga%20da%20sua%20república`
  
  return (
    <section id="nossa_casa" className={styles.nossa_casa}>
      <h2>Nossa casa</h2>

      <div className={styles.container}>
        <Image
        src={googleUrl}
        alt="Nossa casa no google kkk"
        width={600}
        height={600}
        />

        <div className={styles.text_container}>
          <ul>
            <li>Casa localizada no Califórnia (bairro mais perto da UFV)</li>
            <li>Quartos para dividir ou individual</li>
            <li>Casa mobiliada (fora o quarto)</li>
            <li>5 banheiros</li>
            <li>Sala com enorme mesa para estudos</li>
            <li>Ambiente de lazer (salão de festa e campo de vôlei)</li>
            <li>Temos uma cachorrinha linda e muito carinhosa</li>
          </ul>

          <h3>Temos vagas!</h3>
          <p>Dúvidas e/ou interesse, entre em contato com um dos morarores:</p>
          <ul className={styles.contact_list}>
            <li>
              <Link href={`https://wa.me/5531992881568?text=${urlencodedtext}`}>
                <a target="_blank">Matheus (Teta) <FaWhatsapp color="eaeaea"/> </a>
              </Link>
            </li>
            <li>
              <Link href={`https://wa.me/5531993420757?text=${urlencodedtext}`}>
                <a target="_blank">Takeshi (Coleira) <FaWhatsapp color="eaeaea"/> </a>
              </Link>
            </li>
            <li>
              <Link href={`https://wa.me/5531992449442?text=${urlencodedtext}`}>
                <a target="_blank">Victor (Cocoricó) <FaWhatsapp color="eaeaea"/> </a>
              </Link>
               
            </li>
            <li>
              <Link href={`https://wa.me/5531995339124?text=${urlencodedtext}`}>
                <a target="_blank">Vinícius (Chapoca) <FaWhatsapp color="eaeaea"/> </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      

    </section>
  )
}