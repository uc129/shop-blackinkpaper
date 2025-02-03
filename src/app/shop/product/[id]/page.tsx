
'use client'
import { useParams } from "next/navigation";
import { useDataStore } from "@/app/lib/data-store/store";
import { ImageViewer } from "./image-viewer";
// import { AddToCartButton } from "@/app/shop/cart/addToCartButton";
import { useState } from "react";
import { AddToCartButton } from "../../cart/add-to-cart-button";



const deliverySchedule = Date.now() + 7 * 24 * 60 * 60 * 1000;// 7 days from now


export default function ProductDetailPage() {
    const { id } = useParams();
    const { products, categories } = useDataStore();
    const product = products.find((product) => product._id.toString() === id);

    const productCats = product?.category.map((cat) => {
        const category = categories.find((category) => category?._id!.toString() === String(cat));
        return category?.title;
    });






    if (!product) return <h1>Product not found</h1>
    return (
        <div className="p-12 ">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8" >

                <div className="left min-w-1/2 ">
                    <ImageViewer image_urls={product.image_urls} />
                </div>

                <div className="right flex flex-col gap-8 ">

                    <div className="text-center xl:text-left">
                        <h1>{product.title}</h1>
                    </div>
                    <p>Price: {product.price}</p>
                    <p>Price after discount {product.price_after_discount}</p>
                    <p>Category: {productCats!.join(',')}</p>


                    <div>
                        {/* <AddToCartButton product={product} /> */}
                        <AddToCartButton product={product} />
                    </div>
                    <div>
                        <button className="p-2 border-[1px] border-black w-full">Buy Now</button>
                    </div>
                    <div>
                        <button className="p-2 border-[1px] border-black w-full">Add to Wishlist</button>
                    </div>
                    <div>
                        <p>Delivery Schedule: {new Date(deliverySchedule).toDateString()} if ordered in the next, {
                            Math.ceil((deliverySchedule - Date.now()) / (24 * 60 * 60 * 1000))
                        }hours</p>
                    </div>

                    <div>
                        <p>
                            Custom Sizes Available. Message Your Requirement on Whatsapp to +91-7358792364
                        </p>
                        <p>
                            Highest Quality Assurance
                        </p>
                        <p>
                            Free Shipping For Orders Over ₹2990
                        </p>
                        <p>
                            In stock, ready to ship
                        </p>

                    </div>

                    <div>
                        {product.description}
                    </div>
                    <div>
                        {product.sell_count} already sold
                    </div>
                </div>
            </div>
        </div>
    );
}