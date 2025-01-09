'use client'
import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import './carousel.css'

type PropType = {
    slides: React.ReactNode[]
    options?: EmblaOptionsType
    interval?: number
}

const EmblaCarousel: React.FC<PropType> = (props) => {
    const { slides, options } = props
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay(
        { delay: props.interval || 4000, }
    )])

    return (
        <section className="embla_hero z-0 ">
            <div className="embla_hero__viewport " ref={emblaRef}>
                <div className="embla_hero__container ">
                    {slides.map((slide, index) => (
                        <div key={index} className="embla_hero__slide">
                            <div className="">{slide}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default EmblaCarousel
