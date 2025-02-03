'use client'

import CustomImage from "../components/Image/image";
import { useDataStore } from "../lib/data-store/store"


export default function GalleryPage() {


    const { products, categories } = useDataStore();

    if (!products) return <h1> Loading.. </h1>



    return (
        <div className="p-12">
            <h1 className="text-center my-16"> Gallery  </h1>

            <div className="flex flex-col ">
                {
                    products.map((product, index) => {
                        return (
                            <div key={product._id as unknown as string} className="border-b-[1px] border-gray-50 py-12">
                                <div>
                                    <div className="flex flex-col gap-2 mb-12">
                                        <h2>{product.title}</h2>
                                        <p>{product.description}</p>
                                    </div>
                                    <div className="grid grid-cols-4 ">
                                        {product.image_urls.map((url, index) => {
                                            if (url.includes('video')) {
                                                return (
                                                    <video key={url} width={200} height={200} controls>
                                                        <source src={url} type="video/mp4"></source>
                                                    </video>
                                                )
                                            }
                                            return (
                                                <CustomImage key={url} src={url} alt={product.title} width={200} height={200} />
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        )

                    })
                }
            </div>
        </div>
    )
}