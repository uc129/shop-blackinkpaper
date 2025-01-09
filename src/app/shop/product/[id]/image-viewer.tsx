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
            <div className="flex">
                <div className="left flex flex-col gap-4" >
                    {
                        props.image_urls.map((url, index) => {
                            return (
                                <button onClick={() => setCurrentImage(index)} key={index} className="p-4 border-2 border-black" >
                                    <Image src={url} alt="" width={200} height={200} />
                                </button>
                            )
                        })
                    }
                </div>
                <div className="right">
                    <Image src={props.image_urls[currentImage]} alt="" width={600} height={600} />
                </div>

            </div>
        </div>
    )
}