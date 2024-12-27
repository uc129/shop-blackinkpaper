'use client'
import Image from "next/image"
import EmblaCarousel from "./carousel"
import { Monoton } from "next/font/google"


const ImageSlides = [
    <Image src="/art/bg/green.jpg" alt='a lot of green' width={800} height={300} className="" />,
    <Image src="/art/bg/mansion.jpg" alt='mansion' width={800} height={300} />,
    <Image src="/art/bg/green.jpg" alt='a lot of green' width={800} height={300} />,
    <Image src="/art/bg/mansion.jpg" alt='mansion' width={800} height={300} />,
]

const TextSlides = [
    <p className="text-xl"> Handcrafted with love. </p>,
    <p className="text-xl"> Made in INDIA. </p>,
    <p className="text-xl"> Sustainably sourced. </p>,
    <p className="text-xl"> Ethically made. </p>,
    <p className="text-xl"> Made for you. </p>,
]

const monoton = Monoton({
    display: "swap",
    weight: "400",
    style: "normal",
    preload: true,
    subsets: ["latin"],
    adjustFontFallback: true,
    fallback: ["sans-serif"],
    variable: '--font-monoton'
})

const HeroSection = () => {



    return (
        <section className=" bg-gray-100 p-8 rounded-lg ">
            <div className="flex flex-col-reverse lg:flex-row justify-between gap-12  ">

                <div className="left  flex flex-col gap-6 my-auto break-words p-12 pl-0 lg:max-w-[50%]">
                    <h1 className={`text-9xl  break-words ${monoton.className} `}>BlackInkPaper</h1>

                    <div className=" flex flex-col gap-1">

                        <p className="text-4xl">Shop the latest collection</p>

                        <div className="flex flex-col gap-1 w-fit">
                            <EmblaCarousel slides={TextSlides} interval={7000} />
                            <EmblaCarousel slides={TextSlides} interval={12000} />
                        </div>

                    </div>
                </div>

                <div className=" min-w-[500px]  ">
                    <EmblaCarousel slides={ImageSlides} interval={9000} />
                </div>

            </div>

        </section>
    )





}

export default HeroSection