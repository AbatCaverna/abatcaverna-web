import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRgbDataURL } from '../../hooks/useBlur';
import styles from './styles.module.css';

interface ImageView { 
  images: Array<string>
}

export default function ImageView({ images }: ImageView) {
  const [indexImageOn, setIndexImageOn] = useState(0)
  const displayImageTime = 5000; // 5 segunds

  function returnImageName(image: string) {
    // considerando que a imagem vem da pasta public
    const name = image.split('/')[0];

    return name
  }

  function getBlurImg() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const img = useRgbDataURL(0, 0, 0)
    return img
  }

  useEffect(() => {
    
    setTimeout(() => {
      if (indexImageOn < images.length - 1) {
        setIndexImageOn(prev => prev += 1)
      } else {
        setIndexImageOn(0)
      }
    }, displayImageTime)
  }, [indexImageOn, images])

  return (
    <div className={styles.container}>
      {images &&
        images.map((image, index) => (
          index === indexImageOn ? (
          <div key={image} className={styles.image} >
            <Image
              src={image}
              alt={returnImageName(image)}
              objectFit="contain"
              layout="fill"
              placeholder="blur"
              blurDataURL={getBlurImg()}
            />
          </div>
        ) : (null)
          
      ))}
    </div>
    
  )

}