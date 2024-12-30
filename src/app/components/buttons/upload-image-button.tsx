/* eslint-disable */
'use client'

import { useEffect, useState } from 'react';
import { CldUploadWidget, CloudinaryUploadWidgetResults } from 'next-cloudinary';

export type ImageData = {
    publicId: string;
    url: string;
    secure_url: string;
    original_filename: string;
}

type ImageUploadButtonProps = {
    retrieveImageUrls: (urls: string[], imageData: ImageData[]) => void;
}



export const ImageUploadButton = (props: ImageUploadButtonProps) => {

    const [images, setImages] = useState<any[]>([

    ]);


    const onUploadSuccess = (result: CloudinaryUploadWidgetResults) => {
        // console.log("result", result);
        setImages((prev) => [...prev, result.info]);
    }

    useEffect(() => {
        const urls = images.map((image: ImageData) => image.secure_url);
        const imagedata: ImageData[] = images.map((image) => {
            return {
                publicId: image.public_id,
                url: image.url,
                secure_url: image.secure_url,
                original_filename: image.original_filename
            }
        })
        props.retrieveImageUrls(urls, imagedata);
        // console.log('images', images);

    }, [images])


    return (
        <CldUploadWidget
            uploadPreset={process.env.CLOUDINARY_UPLOAD_PRESET}
            onSuccess={(result) => {
                if (typeof result.info === "object" && "secure_url" in result.info) {
                    onUploadSuccess(result);

                }

            }}
            options={{
                multiple: true,
                sources: ["local", "url", "camera", "facebook", "instagram", "shutterstock"],
            }}
        >
            {({ open }: { open: () => void }) => {
                return (
                    <button
                        type="button"
                        onClick={() => open()}
                        className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Upload Avatar
                    </button>
                );
            }}
        </CldUploadWidget>
    )

}