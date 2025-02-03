'use client'
import { ProductType } from "@/app/api/products/model";
import { ButtonWithLink } from "../../components/buttons/buttonWithLink";
import { useState, useEffect } from "react";
import { ProductCard } from "../products/products-card";


export type ProductCollectionsProps = {
    products: ProductType[];
    title: string;
    description: string;
    link: string;
    linkText: string;
    limit_products?: number;
    collection_link: string;
}

export const ProductCollections = (props: ProductCollectionsProps) => {
    const [products, setProducts] = useState<ProductType[]>(props.products)
    if (!props.products) return <h1>Loading...</h1>

    useEffect(() => {
        if (props.limit_products) {
            setProducts(props.products.slice(0, props.limit_products))
        }
    }, [props.limit_products])
    return (
        <div className=" pt-12 ">
            <div className="flex flex-col justify-between gap-4">

                <div className="text-center mb-12">
                    <h4 className="uppercase">{props.title} </h4>
                    <p>{props.description}</p>
                </div>

                <div className="flex flex-wrap justify-center xl:justify-start  gap-2  items-end ">

                    {products.map((product) => {
                        return (
                            <ProductCard key={product._id as unknown as string} product={product} link={`/shop/product/${product._id}`} />
                        )
                    })}
                </div>

                {props.limit_products && < ButtonWithLink buttonText="View Collection" link={props.collection_link} />}
            </div>
        </div>
    )




}