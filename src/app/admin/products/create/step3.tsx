'use client'
import { ImageUploadButton } from "@/app/components/buttons/upload-image-button"
import { ImageData } from "@/app/components/buttons/upload-image-button"
import Image from "next/image";
import { useState } from "react";


export const CreateProductStep3 = ({ retrieveImages }: { retrieveImages: (urls: string[], images: ImageData[]) => void }) => {

    const [images, setImages] = useState<string[]>([]);

    const retrieveImageUrls = (urls: string[], imageData: ImageData[]) => {
        setImages(urls);
        retrieveImages(urls, imageData)
    }

    return (
        <div>
            <h1>Upload Images</h1>
            <form>
                {/* <input type="file" name="images" id="images" multiple /> */}
                <ImageUploadButton retrieveImageUrls={retrieveImageUrls} />
            </form>
            <div>
                {images.length > 0 &&
                    images.map((image, index) => <Image key={index} src={image} alt="product image" width={100} height={100} />)}
            </div>
        </div>
    )
}