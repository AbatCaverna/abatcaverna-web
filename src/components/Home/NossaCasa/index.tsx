import Link from 'next/link'
import { useState, useEffect } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'

import styles from './styles.module.css'
import { FaWhatsapp } from 'react-icons/fa'
import useWindow from '../../../hooks/useWindow'

// coordenadas da casa cruzeiro , 368, California
const center = {
  lat: -19.8923114,
  lng: -44.4323548
}

const markerPosition = {
  lat: -19.8923114,
  lng: -44.4323548
}

export default function NossaCasa() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_KEY || ''
  })
  const [containerStyle, setContainerStyle] = useState({
    width: '600px',
    height: '600px'
  })

  const window = useWindow()

  const urlencodedtext = `Opa%20estou%20interessado%20na%20vaga%20da%20sua%20república`

  function resizeMapByWindowWidht(window_width: number) {
    if (window_width < 600) {
      // reduz em 60 pixels pois a contagem nao eh 100% precisa
      const mapSize = window_width - 60
      setContainerStyle({
        width: `${mapSize}px`,
        height: `${mapSize}px`
      })
    } else {
      // caso a tela couber, redefine o tamanho original
      setContainerStyle({
        width: '600px',
        height: '600px'
      })
    }
  }

  useEffect(() => {
    if (window) {
      resizeMapByWindowWidht(window.width)
    }
  }, [window])
  return (
    <section id="nossa_casa" className={styles.nossa_casa}>
      <h2>Nossa casa</h2>

      <div className={styles.container}>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={17}
          >
            <Marker
              position={markerPosition}
            />
          </GoogleMap>
        ) : (
          null
        )}

        <div className={styles.text_container}>
          <ul>
            <li>Casa localizada no centro </li>
            <li>Quartos para dividir ou individual</li>
            <li>Casa mobiliada (fora o quarto)</li>
            <li>4 quartos</li>
            <li>2 banheiros</li>
            <li>Sala com enorme mesa para estudos</li>
            <li>Temos uma cachorrinha linda e muito carinhosa</li>
          </ul>

          <h3> Temos vagas!</h3>
          <p>Dúvidas e/ou interesse, entre em contato com um dos moradores:</p>
          <ul className={styles.contact_list}>
            <li>
              <Link href={`https://wa.me/5531992881568?text=${urlencodedtext}`}>
                <a target="_blank">
                  <FaWhatsapp color="eaeaea"/> 
                  Matheus (Teta)
                </a>
              </Link>
            </li>
            <li>
              <Link href={`https://wa.me/5531993420757?text=${urlencodedtext}`}>
                <a target="_blank">
                  <FaWhatsapp color="eaeaea"/> 
                  Takeshi (Coleira)   
                </a>
              </Link>
            </li>
            <li>
              <Link href={`https://wa.me/5531992449442?text=${urlencodedtext}`}>
                <a target="_blank">
                  <FaWhatsapp color="eaeaea"/>
                  Victor (Cocoricó)
                </a>
              </Link>
               
            </li>
            <li>
              <Link href={`https://wa.me/5531995339124?text=${urlencodedtext}`}>
                <a target="_blank">
                  <FaWhatsapp color="eaeaea"/>
                  Vinícius (Chapoca)
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      

    </section>
  )
}