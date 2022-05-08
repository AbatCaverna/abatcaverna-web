import { useState } from "react";
import SideBar from "../../components/Dashboard/SideBar";
import styles from "../../styles/Dashboard.module.css";
import styles_code from "../../styles/QRCode.module.css";
import { QrReader } from 'react-qr-reader';

const SCAN_TEXT_NONE = 'Insira o QRCode'
const SCAN_TEXT_SUCCESS = 'QRCode válido!'
const SCAN_TEXT_ERROR = 'QRCode inválido!'

export default function QRCodePage() {
  const [status, setStatus] = useState(SCAN_TEXT_NONE)
  

  const handleScan = (text: string) => {
    setStatus(SCAN_TEXT_SUCCESS)
    setTimeout(() => setStatus(SCAN_TEXT_NONE), 5000)
  };

  return (
    <div className={styles.container}>
      <SideBar/>
      <main className={styles_code.container}>
        <h1>Scaneie o qrcode aqui</h1>
        <div className={styles_code.scan_container}>
          <QrReader
            onResult={(result: any, error) => {
              if (!!result) {
                handleScan(result?.text);
              }

              if (!!error) {
                console.info(error);
                
              }
            }}
            constraints={{ facingMode: 'user' }}
          />
          <p>{status}</p>
        </div>
      </main>
    </div>
  )
}