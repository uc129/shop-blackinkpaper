

'use client'
import { useDataStore } from "@/app/lib/data-store/store"
import Link from "next/link";
import { useEffect } from "react";

export default function CategoriesPage() {
    const { categories } = useDataStore();
    // useEffect(() => {
    //     window.location.reload()
    // }, [])
    return (
        <div className="container mx-auto">
            <h1>Categories</h1>
            {
                categories.map(cat => {
                    return (
                        <div key={cat._id as unknown as string}
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4 max-w-[1200px]
                            items-center border-b border-gray-200 py-2"
                        >
                            <p>{cat.title}</p>
                            <p>{cat.description}</p>
                            <Link href={`/admin/products/categories/manage/${cat._id}`}>Manage</Link>
                        </div>
                    )
                })
            }
        </div>
    )
}