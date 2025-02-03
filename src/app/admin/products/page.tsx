'use client';
import CustomImage from "@/app/components/Image/image";
import { useDataStore } from "@/app/lib/data-store/store";
import { ProductCard } from "@/app/shop/products/products-card";
import Link from "next/link";





export default function ManageProductsPage() {
    const { products, categories } = useDataStore();
    if (!products || !categories || products.length === 0 || categories.length === 0) {
        return <h1>Loading...</h1>;
    }
    return (
        <div className="flex flex-col gap-4 p-12 pl-0">
            <h1>All Products</h1>
            <div className=" flex flex-col gap-8">
                {
                    products.map((product) => (
                        // <div key={product._id as unknown as string} className="border p-4 flex flex-col justify-between" >
                        //     <div className="min-h-[240px]">
                        //         <CustomImage src={product.image_urls[0]} alt={product.title} width={200} height={200} />

                        //     </div>
                        //     <div>
                        //         <h3>{product.title}</h3>
                        //         <p>{product.description}</p>
                        //         <p>{product.price}</p>
                        //         <p>{product.discount}</p>
                        //         <p>
                        //             {
                        //                 product.category.map((id) => {
                        //                     const category = categories.find((category) => category._id === id);
                        //                     return category ? category.title : 'Unknown';
                        //                 }).join(', ')
                        //             }
                        //         </p>
                        //     </div>
                        //     <Link href={`/admin/products/manage/${product._id}`}>
                        //         Manage
                        //     </Link>

                        // </div>
                        <div key={product._id as unknown as string} className="border p-4 flex flex-col justify-between" >
                            {/* <ProductCard key={product._id as unknown as string}
                                product={product}
                                link={`/admin/products/manage/${product._id}`} /> */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 mb-4">
                                <p>{product.title}</p>
                                <p>{product.description}</p>
                                <p>{product.price}</p>
                                <p>{product.discount}</p>
                                <p>{product._id as unknown as string}</p>

                                <p>
                                    {product.image_urls.length} images
                                </p>
                                <p>
                                    {
                                        product.category.map((id) => {
                                            const category = categories.find((category) => category._id === id);
                                            return category ? category.title : 'Unknown';
                                        }).join(', ')
                                    }
                                </p>


                            </div>
                            <Link className="hover:-translate-y-1 transition-transform duration-200 p-1 px-2 text-xs bg-orange-200 w-fit rounded-md" href={`/admin/products/manage/${product._id}`}>
                                Manage
                            </Link>
                        </div>

                    ))
                }
            </div>
        </div>
    );
}