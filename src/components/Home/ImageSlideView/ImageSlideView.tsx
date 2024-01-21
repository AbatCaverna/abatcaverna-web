import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';
import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

type Image = {
  img: string;
  imgBase64: string;
}

interface ImageView {
  images: Array<Image>
}

export default function ImageView({ images }: ImageView) {
  const [indexImageOn, setIndexImageOn] = useState(0)
  const displayImageTime = 5000; // 5 segunds
  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )
  function returnImageName(image: string) {
    // considerando que a imagem vem da pasta public
    const name = image.split('/')[0];

    return name
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
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-full md:max-w-[600px]"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {images &&
          images.map((image) => (
            <CarouselItem key={image.img}>
              <Card className="bg-transparent border-none">
                <CardContent className="flex aspect-square items-center justify-center min-h-[400px] md:min-w-[600px]">
                  <img
                    src={image.img}
                    alt={returnImageName(image.img)}
                    className="w-full h-full object-cover"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
      </CarouselContent>
    </Carousel>
  )

}
