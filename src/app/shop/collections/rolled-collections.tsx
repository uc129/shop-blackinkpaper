

'use client'
import { useDataStore } from "@/app/lib/data-store/store"
import { ProductCollections } from "./collections";

export const RolledCollections = () => {

    const { products, categories } = useDataStore()
    const RolledCategory = categories.find((category) => category.title.toLowerCase() === "rolled");
    if (!RolledCategory) return <h1>Loading...</h1>
    const RolledProducts = products.filter((product) => product.category.includes(RolledCategory._id!));


    return (
        <div>
            <h1>Rolled</h1>
            <ProductCollections products={RolledProducts}
                title="Rolled"
                description="Check out our Rolled products"
                link="/shop/collections/Rolled"
                linkText="View All"
            />
        </div>
    )

}