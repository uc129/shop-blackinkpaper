'use client'

import { useDataStore } from "@/app/lib/data-store/store"
import { ProductCategory } from "@/app/api/categories/model";
import { useEffect, useState } from "react";

export const CreateProductStep2 = ({ retrieveCategories }: { retrieveCategories: (categories: string[]) => void }) => {

    const { categories } = useDataStore();

    if (!categories || categories.length < 1) return <div>Loading...</div>
    const selectOptions = categories.map(category =>
        <option key={category._id as unknown as string} value={category._id as unknown as string}>
            {category.title}
        </option>)

    const [selectedCategory, setSelectedCategory] = useState<string[]>([''])

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let selectedCategories = Array.from(e.target.selectedOptions).map(option => option.value)
        setSelectedCategory(selectedCategories);
    }

    useEffect(() => {
        retrieveCategories(selectedCategory)
    }, [selectedCategory])

    return (
        <div>
            <h1>Add Categories</h1>
            <form>
                <select name="category" id="category" multiple onChange={handleChange}>
                    {selectOptions}
                </select>

            </form>
        </div>
    )


}