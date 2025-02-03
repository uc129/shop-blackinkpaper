import CustomImage from "@/app/components/Image/image"
import Image from "next/image"
import { useState } from "react"

export type ImageSliderProps = {
    image_urls: string[]
    interval?: number

}

export const ImageViewer = (props: ImageSliderProps) => {

    const [currentImage, setCurrentImage] = useState(0)

    return (
        <div className="flex flex-col gap-4 ">
            <div className="flex flex-col-reverse md:grid grid-cols-4 gap-12">
                <div className="left flex md:flex-col gap-2" >
                    {
                        props.image_urls.map((url, index) => {
                            if (url.includes('video')) {
                                return (
                                    <video width={100} height={100} onClick={() => setCurrentImage(index)} key={index}
                                        className="p-2 border-2 border-black  flex-justify-center" >
                                        <source src={url} type="video/mp4"></source>
                                    </video>
                                )
                            }
                            return (
                                <button onClick={() => setCurrentImage(index)} key={index}
                                    className="p-2 border-2 border-black flex justify-center w-fit" >
                                    {<Image src={url} alt="" width={80} height={60} className="pointer-events-none select-none w-auto h-auto" />}
                                </button>
                            )
                        })
                    }
                </div>
                <div className="right col-span-3">
                    {props.image_urls[currentImage].includes('video') ?
                        <video width={400} height={400} controls>
                            <source src={props.image_urls[currentImage]} type="video/mp4"></source>
                        </video> :
                        <CustomImage src={props.image_urls[currentImage]} alt="" width={600} height={600} />}
                </div>

            </div>
        </div>
    )
}