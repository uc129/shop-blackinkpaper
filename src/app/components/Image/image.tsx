'use client'
import Image from "next/image"

type CustomImageProps = {
    src: string,
    alt: string,
    width: number,
    height?: number,
    className?: string
}

const CustomImage = (props: CustomImageProps) => {

    return <Image
        src={props.src}
        alt={props.alt}
        width={props.width || 800}
        height={props.height || props.width || 800}
        priority
        className={`w-full h-auto pointer-events-none select-none -z-0  ${props.className}`}
    />
}

export default CustomImage