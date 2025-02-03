'use client'
import Image from "next/image"
import EmblaCarousel from "./carousel"
import { Monoton } from "next/font/google"
import CustomImage from "../Image/image"


const ImageSlides = [
    <CustomImage src="/art/bg/green.jpg" alt='a lot of green' width={1200} height={300} />,
    <CustomImage src="/art/bg/mansion.jpg" alt='mansion' width={1200} height={300} />,
    <CustomImage src="/art/bg/green.jpg" alt='a lot of green' width={800} height={300} />,
    <CustomImage src="/art/bg/mansion.jpg" alt='mansion' width={800} height={300} />,
]

const TextSlides = [
    <p className="text-xl "> Handcrafted with love. </p>,
    <p className="text-xl "> Made in INDIA. </p>,
    <p className="text-xl "> Sustainably sourced. </p>,
    <p className="text-xl "> Ethically made. </p>,
    <p className="text-xl "> Made for you. </p>,
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
        <section className="  rounded-lg ">
            <div className="flex flex-col-reverse xl:flex-row justify-between  gap-12  ">

                <div className="left  flex flex-col lg:justify-end gap-6  break-words   pl-0 xl:max-w-[45%]  ">
                    {/* <h1 className={`text-7xl md:text-8xl xl:text-9xl   break-words ${monoton.className} `}>BlackInkPaper</h1> */}
                    <h1 className={`text-7xl sm:text-8xl md:text-9xl xl:text-[9rem] 2xl:text-[10rem] font-bold leading-none py-8   break-words  `}>Blackinkpaper</h1>


                    <div className=" flex flex-col gap-4">

                        <p className="text-4xl">Shop the latest collection</p>

                        <div className="flex flex-col gap-2 w-fit">
                            <EmblaCarousel slides={TextSlides} interval={7000} />
                            {/* <EmblaCarousel slides={TextSlides} interval={12000} /> */}
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