'use client'
import { useDataStore } from "@/app/lib/data-store/store"
import { ProductCollections } from "./collections";

export const BotanyCollections = () => {

    const { products, categories } = useDataStore()
    const botanyCategory = categories.find((category) => category.title.toLowerCase() === "botany");
    const botanyProducts = products.filter((product) => product.category.includes(botanyCategory?._id!));

    if (botanyProducts.length === 0) return null
    console.log('botany', botanyProducts);



    return (
        <div>
            <ProductCollections products={botanyProducts}
                title="Botany"
                description="Check out our botany products"
                link="/shop/collections/botany"
                linkText="View All"
            />
        </div>
    )

}