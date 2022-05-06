import { useEffect, useRef, useState } from "react";
import Html5QrcodePlugin from "../../components/Dashboard/QRCodeScanner";
import SideBar from "../../components/Dashboard/SideBar";
import styles from "../../styles/Dashboard.module.css";

export default function QRCodePage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [status, setStatus] = useState('Insira o QRCode')

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current?.play();
        }
        
      })
      .catch(err => {
        console.error("error:", err);
      });
  };

  function onNewScanResult(decodedText: string, decodedResult: object) {
    // Handle the result here.
    console.log(decodedText, decodedResult)
    setStatus(decodedText)
  }
  
  useEffect(()=> {
    getVideo()
  }, [])

  return (
    <div className={styles.container}>
      <SideBar/>
      <main>
        <h1>Scaneie o qrcode aqui</h1>
        <Html5QrcodePlugin
          fps={10}
          qrbox={250}
          qrCodeSuccessCallback={onNewScanResult}
          qrCodeErrorCallback={() => console.log('eerror')}
          supportedScanTypes={[]}
        />
        <p>{status}</p>
      </main>
    </div>
  )
}