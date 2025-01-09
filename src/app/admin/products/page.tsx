'use client';
import CustomImage from "@/app/components/Image/image";
import { useDataStore } from "@/app/lib/data-store/store";
import Link from "next/link";





export default function ManageProductsPage() {
    const { products, categories } = useDataStore();
    if (!products || !categories || products.length === 0 || categories.length === 0) {
        return <h1>Loading...</h1>;
    }
    return (
        <div className="flex flex-col gap-4 p-12 pl-0">
            <h1>All Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    products.map((product) => (
                        <div key={product._id as unknown as string} className="border p-4 flex flex-col justify-between" >
                            <div className="min-h-[240px]">
                                <CustomImage src={product.image_urls[0]} alt={product.title} width={200} height={200} />

                            </div>
                            <div>
                                <h3>{product.title}</h3>
                                <p>{product.description}</p>
                                <p>{product.price}</p>
                                <p>{product.discount}</p>
                                <p>
                                    {
                                        product.category.map((id) => {
                                            const category = categories.find((category) => category._id === id);
                                            return category ? category.title : 'Unknown';
                                        }).join(', ')
                                    }
                                </p>
                            </div>
                            <Link href={`/admin/products/manage/${product._id}`}>
                                Manage
                            </Link>

                        </div>
                    ))
                }
            </div>
        </div>
    );
}