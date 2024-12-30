'use client'
import { useDataStore } from "@/app/lib/data-store/store"
import { ProductCollections } from "./collections";

export const BestSellersCollections = () => {

    const { products, categories } = useDataStore()
    const bestSellersCategory = categories.find((category) => category.title.toLowerCase() === "bestSellers");
    if (!bestSellersCategory) return <h1>Loading...</h1>
    const bestSellersProducts = products.filter((product) => product.category.includes(bestSellersCategory._id!));


    return (
        <div>
            <h1>bestSellers</h1>
            <ProductCollections products={bestSellersProducts}
                title="bestSellers"
                description="Check out our bestSellers products"
                link="/shop/collections/bestSellers"
                linkText="View All"
            />
        </div>
    )

}