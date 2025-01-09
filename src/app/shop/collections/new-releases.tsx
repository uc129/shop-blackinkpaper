'use client'

import { useDataStore } from "@/app/lib/data-store/store"
import { ProductCollections } from "./collections"
import { ProductType } from "@/app/api/products/model"
import { useCallback, useEffect, useState } from "react"


export const NewReleaseCollections = (props: { limit?: number }) => {

    const { products } = useDataStore()
    if (!products) return <h1>Loading...</h1>

    let newReleases = products.map((product) => {
        const dateNow = new Date()
        const dateProduct = new Date(product.createdAt)
        const diffTime = Math.abs(dateNow.getTime() - dateProduct.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays <= 30) {
            return product
        }
    })

    const newProducts = newReleases.filter((product) => product !== undefined)
    if (!newProducts || newProducts.length === 0) return <h1>Loading..</h1>

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