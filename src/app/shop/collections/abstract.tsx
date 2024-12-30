'use client'
import { useDataStore } from "@/app/lib/data-store/store"
import { ProductCollections } from "./collections";

export const AbstractCollections = () => {

    const { products, categories } = useDataStore()
    const AbstractCategory = categories.find((category) => category.title.toLowerCase() === "abstract");
    if (!AbstractCategory) return <h1>Loading...</h1>
    const AbstractProducts = products.filter((product) => product.category.includes(AbstractCategory._id!));


    return (
        <div>
            <ProductCollections products={AbstractProducts}
                title="Abstract"
                description="Check out our Abstract products"
                link="/shop/collections/Abstract"
                linkText="View All"
            />
        </div>
    )

}