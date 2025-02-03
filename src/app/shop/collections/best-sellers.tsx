'use client'
import { useDataStore } from "@/app/lib/data-store/store"
import { ProductCollections } from "./collections";

export const BestSellersCollections = ({ limit }: { limit?: number }) => {

    const { products, categories } = useDataStore()
    const bestSellerProducts = products.filter((product) => product.sell_count > 10);
    if (bestSellerProducts.length === 0) return null

    return (
        <section>
            <ProductCollections products={bestSellerProducts} limit_products={limit}
                title="Best Sellers"
                description="Check out our best sellers"
                link="/shop/collections/bestSellers"
                linkText="View All"
                collection_link="/shop/collections/best-sellers"
            />
        </section>
    )

}