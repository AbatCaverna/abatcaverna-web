import { useEffect, useRef } from "react";
import SideBar from "../../components/Dashboard/SideBar";
import styles from "../../styles/Dashboard.module.css";

export default function QRCodePage() {
  const videoRef = useRef<HTMLVideoElement>(null)

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
  
  useEffect(()=> {
    getVideo()
  }, [])

  return (
    <div className={styles.container}>
      <SideBar/>
      <main>
        <h1>Scaneie o qrcode aqui</h1>
        <video ref={videoRef}></video>
      </main>
    </div>
  )
}