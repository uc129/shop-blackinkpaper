'use client'
import { ImageUploadButton } from "@/app/components/buttons/upload-image-button"
import { ImageData } from "@/app/components/buttons/upload-image-button"
import { FormContainer } from "@/app/components/form-components/form-container";
import Image from "next/image";
import { useEffect, useState } from "react";


export const CreateProductStep3 = ({ imageData, retrieveImages }: { imageData?: ImageData[], retrieveImages: (urls: string[], images: ImageData[]) => void }) => {

    const [images, setImages] = useState<string[]>([]);

    const retrieveImageUrls = (urls: string[], imageData: ImageData[]) => {
        setImages(urls);
        retrieveImages(urls, imageData)
    }
    useEffect(() => {
        if (imageData) {
            setImages(imageData.map(image => image.url));
            const urls = imageData.map(image => image.url)
            retrieveImages(urls, imageData);
        }
    }, [imageData])

    return (
        <div>
            <FormContainer title="Add Images">
                <form>
                    {/* <input type="file" name="images" id="images" multiple /> */}
                    <ImageUploadButton retrieveImageUrls={retrieveImageUrls} />
                </form>
                <div>
                    {images.length > 0 &&
                        images.map((image, index) => <Image key={index} src={image} alt="product image" width={100} height={100} />)}
                </div>
            </FormContainer>
        </div>
    )
}