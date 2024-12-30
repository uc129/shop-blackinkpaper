'use client'
import { useDataStore } from "@/app/lib/data-store/store"
import { ProductCollections } from "./collections";

export const BotanyCollections = () => {

    const { products, categories } = useDataStore()
    const botanyCategory = categories.find((category) => category.title.toLowerCase() === "botany");
    if (!botanyCategory) return <h1>Loading...</h1>
    const botanyProducts = products.filter((product) => product.category.includes(botanyCategory._id!));


    return (
        <div>
            <h1>botany</h1>
            <ProductCollections products={botanyProducts}
                title="Botany"
                description="Check out our botany products"
                link="/shop/collections/botany"
                linkText="View All"
            />
        </div>
    )

}