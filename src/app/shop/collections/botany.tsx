'use client'
import { useDataStore } from "@/app/lib/data-store/store"
import { ProductCollections } from "./collections";

export const BotanyCollections = ({ limit }: { limit?: number }) => {

    const { products, categories } = useDataStore()
    const botanyCategory = categories.find((category) => category.title.toLowerCase() === "botany");
    const botanyProducts = products.filter((product) => product.category.includes(botanyCategory?._id!));

    if (botanyProducts.length === 0) return null
    console.log('botany', botanyProducts);



    return (
        <section>
            <ProductCollections products={botanyProducts}
                limit_products={limit}
                title="Botany"
                description="Check out our botany products"
                link="/shop/collections/botany"
                linkText="View All"
                collection_link="/shop/collections/botany"
            />
        </section>
    )

}