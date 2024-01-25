import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';
import { useEffect, useReducer, useRef, useState } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

type Image = {
  img: string;
  imgBase64: string;
}

interface ImageView {
  images: Array<Image>
}

export default function ImageView({ images }: ImageView) {
  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )
  const [api, setApi] = useState<CarouselApi>()
  const [activeSlide, setActiveSlide] = useState(0)
  const [autoScroll, toggleAutoScroll] = useReducer((prev) => !prev, false)

  function returnImageName(image: string) {
    // considerando que a imagem vem da pasta public
    const name = image.split('/')[0];

    return name
  }

  useEffect(() => {
    if (!api) {
      return
    }

    api.on('scroll', (eapi) => {
      if (!autoScroll) {
        toggleAutoScroll()
      } else {
        setActiveSlide(eapi.selectedScrollSnap())
      }
    })
  }, [api, autoScroll])

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-full md:max-w-[600px]"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={() => plugin.current.play()}
      setApi={setApi}
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
      <div className="w-full flex gap-2 items-center justify-center">
        {images.map((img, idx) => (
          <div
            key={img.img}
            className={cn('rounded-full w-3 h-3 cursor-pointer', activeSlide === idx ? 'bg-yellow' : 'bg-light-gray')}
            onClick={() => {
              toggleAutoScroll()
              api?.scrollTo(idx, true)
              setActiveSlide(idx)
            }}
          />
        ))}
      </div>
    </Carousel>
  )

}
