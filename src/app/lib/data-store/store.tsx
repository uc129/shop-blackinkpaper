'use client'
import { ProductCategory } from '@/app/api/categories/model'
import { ProductType } from '@/app/api/products/model'
import { useState, useContext, createContext, useEffect } from 'react'


const DataStoreContext = createContext(
    {
        products: [] as ProductType[],
        categories: [] as ProductCategory[],
    }
)

export const useDataStore = () => useContext(DataStoreContext)

export const DataStoreProvider = ({ children }: { children: React.ReactNode }) => {
    const [products, setProducts] = useState<ProductType[]>([])
    const [categories, setCategories] = useState<ProductCategory[]>([])

    const getProducts = async () => {
        console.log('fetching products');
        const response = await fetch('/api/products', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        if (data.status === 200 && data, products) { setProducts(data.products) }
        console.log('products', data);

    };

    const getCategories = async () => {
        console.log('fetching categories');
        const response = await fetch('/api/categories', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        if (data.status === 200 && data.categories) { setCategories(data.categories) }
    };

    useEffect(() => {
        if (!products || products.length === 0) getProducts();
        if (!categories || categories.length === 0) getCategories();
    }, [products, categories, getProducts, getCategories])



    return (
        <DataStoreContext.Provider value={{ products, categories }}>
            {children}
        </DataStoreContext.Provider>
    )
}