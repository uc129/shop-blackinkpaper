

'use client'
import { useDataStore } from "@/app/lib/data-store/store"
import { ProductCollections } from "./collections";

export const FeaturedCollections = () => {

    const { products, categories } = useDataStore()
    const FeaturedCategory = categories.find((category) => category.title.toLowerCase() === "featured");
    if (!FeaturedCategory) return <h1>Loading...</h1>
    const FeaturedProducts = products.filter((product) => product.category.includes(FeaturedCategory._id!));


    return (
        <div>
            <h1>Featured</h1>
            <ProductCollections products={FeaturedProducts}
                title="Featured"
                description="Check out our Featured products"
                link="/shop/collections/Featured"
                linkText="View All"
            />
        </div>
    )

}