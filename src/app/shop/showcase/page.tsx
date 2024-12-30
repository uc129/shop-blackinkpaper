'use client'


import EmblaCarousel from "@/app/components/hero/carousel";
import CustomImage from "@/app/components/Image/image";
import { useEffect, useState, useTransition } from "react";


const CarouselData = [
    <CustomImage src="/posters/paris-arch-poster.svg" alt="paris-arch" width={4400} className="slideFromLeft py-8" />,
    <CustomImage src="/posters/samurai-poster-large.svg" alt="paris-arch" width={1200} className="slideFromRight" />,
]


export default function ShowcasePage() {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, startTransition] = useTransition();

    // const handleClick = (event: React.MouseEvent) => {
    //     event.preventDefault();
    //     let index = parseInt(event.currentTarget.id);
    //     if (index === currentIndex) return;
    //     startTransition(() => {
    //         setCurrentIndex(index);
    //     })
    // }

    const handleNextClick = (event: React.MouseEvent) => {
        event.preventDefault();
        let index = currentIndex + 1;
        if (index >= CarouselData.length) index = 0;
        startTransition(() => {
            setCurrentIndex(index);
        })
    }

    const handlePrevClick = (event: React.MouseEvent) => {
        event.preventDefault();
        let index = currentIndex - 1;
        if (index < 0) index = CarouselData.length - 1;
        startTransition(() => {
            setCurrentIndex(index);
        })
    }

    // useEffect(() => {
    //     document.querySelector('nav')!.classList.add('hidden');
    //     return () => {
    //         document.querySelector('nav')!.classList.remove('hidden');
    //     }
    // }, [])


    return (
        <div>
            <div className="relative">
                <div className="w-screen flex ">
                    {loading ? <p className="h-screen bg-red-800">Loading</p> :
                        CarouselData[currentIndex]
                    }
                </div>
                <div className="flex absolute justify-between w-full let-0 top-1/2 mx-auto">
                    <button id="0" onClick={handlePrevClick} className="w-8 h-8  rounded-full mx-1 flex items-center justify-center"> ← </button>
                    <button id="1" onClick={handleNextClick} className="w-8 h-8  rounded-full mx-1 flex items-center justify-center">→</button>
                </div>
            </div>
        </div>
    )

}