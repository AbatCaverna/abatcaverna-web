import { useState } from "react";
import { QrReader } from 'react-qr-reader';
import SideBar from "../../components/Dashboard/SideBar";
import Loading from "../../components/Shared/Loading";
import CheckCodeService from "../../services/CheckCodeService";
import styles from "../../styles/Dashboard.module.css";
import styles_code from "../../styles/QRCode.module.css";

const SCAN_TEXT_NONE = 'Insira o QRCode'
const SCAN_TEXT_SUCCESS = 'QRCode válido!'
const SCAN_TEXT_ERROR = 'QRCode inválido!'

export default function QRCodePage() {
  const [status, setStatus] = useState(SCAN_TEXT_NONE)
  const [loading, setLoading] = useState(false)
  const checkCodeService = new CheckCodeService()

  async function check(code: string) {
    try {
      setLoading(true)
      const response = await checkCodeService.check(code)
      setStatus(SCAN_TEXT_SUCCESS)
    } catch (err) {
      setStatus(SCAN_TEXT_ERROR)
    } finally {
      setLoading(false)
    }
  }
  

  const handleScan = async  (text: string) => {
    await check(text)
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
            }}
            constraints={{ facingMode: 'user' }}
          />
          <p>{status}</p>
        </div>
        {loading && (
            <div className={styles.loading}>
              <Loading/>
              <p>Verificando...</p>
            </div>
          )}
      </main>
    </div>
  )
}