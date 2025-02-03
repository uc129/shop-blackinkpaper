'use client'
import { useDataStore } from "@/app/lib/data-store/store"
import { ProductCollections } from "./collections";

export const FramedCollections = () => {

    const { products, categories } = useDataStore()
    const framedCategory = categories.find((category) => category.title.toLowerCase() === "framed");
    if (!framedCategory) return <h1>Loading...</h1>
    const framedProducts = products.filter((product) => product.category.includes(framedCategory._id!));


    return (
        <div>
            <h1>framed</h1>
            <ProductCollections products={framedProducts}
                title="framed"
                description="Check out our framed products"
                link="/shop/collections/framed"
                linkText="View All"
                collection_link="/shop/collections/framed"
            />
        </div>
    )

}