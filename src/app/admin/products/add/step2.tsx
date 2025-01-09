'use client'

import { useDataStore } from "@/app/lib/data-store/store"
import { useEffect, useState } from "react";
import { FormContainer } from "@/app/components/form-components/form-container";
import { ProductCategory } from "@/app/api/categories/model";

export const CreateProductStep2 = ({ retrieveCategories }: { productCategories?: ProductCategory, retrieveCategories: (categories: string[]) => void }) => {

    const { categories } = useDataStore();

    if (!categories || categories.length < 1) return <div>Loading...</div>
    const selectOptions = categories.map(category =>
        <option key={category._id as unknown as string} value={category._id as unknown as string}>
            {category.title}
        </option>)

    const [selectedCategory, setSelectedCategory] = useState<string[]>([''])
    const [selectedCategoriesData, setSelectedCategoriesData] = useState<ProductCategory[]>([])


    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let selectedCategories = Array.from(e.target.selectedOptions).map(option => option.value)
        setSelectedCategory(selectedCategories);
        setSelectedCategoriesData(categories.filter(category => selectedCategories.includes(category._id as unknown as string)))
    }


    useEffect(() => {
        retrieveCategories(selectedCategory)
    }, [selectedCategory])

    return (
        <div>
            <FormContainer title="Add Categories">
                <form>
                    <select name="category" id="category" multiple onChange={handleChange}>
                        {selectOptions}
                    </select>
                </form>
                <div>
                    {selectedCategoriesData.map((category, index) =>
                        <p key={index}>
                            {category.title} {category.description}
                        </p>)}

                </div>
            </FormContainer>

        </div>
    )


}