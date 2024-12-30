'use client';
import { useDataStore } from "@/app/lib/data-store/store";
import Link from "next/link";





export default function ManageProductsPage() {
    const { products, categories } = useDataStore();
    if (!products || !categories || products.length === 0 || categories.length === 0) {
        return <h1>Loading...</h1>;
    }
    return (
        <div>
            <h1>Manage Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-[80%] mx-auto">
                {
                    products.map((product) => (
                        <div key={product._id as unknown as string} className="border p-4" >
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