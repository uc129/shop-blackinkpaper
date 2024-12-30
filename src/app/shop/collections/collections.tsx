'use client'
import { ProductType } from "@/app/api/products/model";
import CustomImage from "../../components/Image/image";
import { useRouter } from "next/navigation";
import { ButtonWithIcon } from "../../components/buttons/buttonsWithIcon";
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
        <div className="pt-12 pb-4">
            <div className="flex flex-col gap-8">
                <div>
                    <h4>{props.title} </h4>
                    <p>{props.description}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">

                    {products.map((product) => {
                        return (
                            <ProductCard key={product._id as unknown as string} product={product} link={`/shop/product/${product._id}`} />
                        )
                    })}
                </div>

            </div>
            {props.limit_products && < ButtonWithLink buttonText="View Collection" link="/shop/collections/new-releases" />}

        </div>
    )




}