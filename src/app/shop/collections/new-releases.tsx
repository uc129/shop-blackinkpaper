'use client'

import { useDataStore } from "@/app/lib/data-store/store"
import { ProductCollections } from "./collections"


export const NewReleaseCollections = (props: { limit?: number }) => {

    const { products } = useDataStore()
    if (!products) return <h1>Loading...</h1>

    const newProducts = products.filter((product) => product.createdAt > new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)); // 15 days
    return (
        <div>
            <ProductCollections products={newProducts}
                title="New Releases"
                description="Check out our latest products"
                link="/shop/collections/new-releases"
                linkText="View All"
                limit_products={props.limit}
            />

        </div>
    )


}