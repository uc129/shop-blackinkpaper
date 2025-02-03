'use client'
import { useDataStore } from "@/app/lib/data-store/store"
import { ProductCollections } from "./collections";

export const ArchitectureCollections = ({ limit }: { limit?: number }) => {

    const { products, categories } = useDataStore()
    const architectureCategory = categories.find((category) => category.title.toLowerCase() === "architecture");
    if (!architectureCategory) return <h1>Loading...</h1>
    const architectureProducts = products.filter((product) => product.category.includes(architectureCategory._id!));


    return (
        <section className="">
            <ProductCollections products={architectureProducts}
                title="Architecture Collection"
                description="Check out our architecture collection"
                link="/shop/collections/architecture"
                linkText="View All"
                limit_products={limit}
                collection_link="/shop/collections/architecture"
            />
        </section>
    )

}