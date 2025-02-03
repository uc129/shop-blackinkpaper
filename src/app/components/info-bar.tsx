'use client'
import EmblaCarousel from "./hero/carousel"


const slides = [
    <p className="text-white text-center">Free Shipping on Orders Over Rs.5000</p>,
    <p className="text-white text-center">Welcome to BlackInkPaper.</p>,
    <p className="text-white text-center"> Browse unique line art pieces!</p>


]

export const InfoBar = () => {
    return (
        <div className="bg-black w-full text-white  p-4 flex justify-center items-center pointer-events-none select-none">
            <EmblaCarousel slides={slides} interval={10000} />
        </div>
    )
}