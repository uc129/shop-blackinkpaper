'use client'
import { useDataStore } from "@/app/lib/data-store/store"
import { ProductCollections } from "./collections";

export const ArchitectureCollections = () => {

    const { products, categories } = useDataStore()
    const architectureCategory = categories.find((category) => category.title.toLowerCase() === "architecture");
    if (!architectureCategory) return <h1>Loading...</h1>
    const architectureProducts = products.filter((product) => product.category.includes(architectureCategory._id!));


    return (
        <div className="p-12">
            <ProductCollections products={architectureProducts}
                title="Architecture"
                description="Check out our architecture products"
                link="/shop/collections/architecture"
                linkText="View All"
            />
        </div>
    )

}