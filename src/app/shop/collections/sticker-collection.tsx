'use client'
import { useDataStore } from "@/app/lib/data-store/store"
import { ProductCollections } from "./collections";

export const StickerCollection = () => {

    const { products, categories } = useDataStore()
    const StickerCategory = categories.find((category) => category.title.toLowerCase() === "sticker");
    if (!StickerCategory) return <h1>Loading...</h1>
    const StickerProducts = products.filter((product) => product.category.includes(StickerCategory._id!));


    return (
        <div>
            <h1>Sticker</h1>
            <ProductCollections products={StickerProducts}
                title="Sticker"
                description="Check out our Sticker products"
                link="/shop/collections/Sticker"
                linkText="View All"
            />
        </div>
    )

}