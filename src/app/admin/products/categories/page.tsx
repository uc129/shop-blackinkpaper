

'use client'
import { useDataStore } from "@/app/lib/data-store/store"
import Link from "next/link";

export default function CategoriesPage() {
    const { categories } = useDataStore();
    return (
        <div className="container mx-auto">
            <h1>Categories</h1>
            {
                categories.map(cat => {
                    return (
                        <div key={cat._id as unknown as string} className="grid grid-cols-4 items-center border-b border-gray-200 py-2">
                            <p>{cat.title}</p>
                            <p>{cat.description}</p>
                            <p>{cat.image_urls.length}</p>
                            <Link href={`/admin/products/categories/manage/${cat._id}`}>Manage</Link>
                        </div>
                    )
                })
            }
        </div>
    )
}