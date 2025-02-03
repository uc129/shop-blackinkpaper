'use client'
import { ProductType } from "@/app/api/products/model"
import { FormContainer } from "@/app/components/form-components/form-container"
import { CustomTextArea, CustomTextInput } from "@/app/components/form-components/inputs/custom-text-input"
import { useState, useEffect } from 'react'

type Step1Type = Partial<ProductType>

export const CreateProductStep1 = ({ product, retrieveData }: { product?: ProductType, retrieveData: (productDetails: Step1Type) => void }) => {

    const [productDetails, setProductDetails] = useState<Step1Type>({
        title: '',
        description: '',
        tagline: '',
        price: 0,
        price_currency: 'INR',
        discount: 0,
        price_after_discount: 0,
        sell_count: 0,
        isFeatured: false,
    })

    useEffect(() => {
        if (product) {
            setProductDetails(product)
        }
        console.log('product details', productDetails);
    }, [product, productDetails])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.target.type === 'checkbox') {
            setProductDetails({ ...productDetails, [e.target.name]: (e.target as HTMLInputElement).checked })
            localStorage.setItem('productDetails', JSON.stringify({ ...productDetails, [e.target.name]: (e.target as HTMLInputElement).checked }))
            return
        }
        const { name, value } = e.target
        setProductDetails({ ...productDetails, [name]: value })
        localStorage.setItem('productDetails', JSON.stringify({ ...productDetails, [name]: value }))
    }

    useEffect(() => {
        if (productDetails.price) {
            setProductDetails({ ...productDetails, price_after_discount: productDetails.price - ((productDetails.discount || 0) * 0.01 * productDetails.price) })
        }
    }, [productDetails.price, productDetails.discount])
    useEffect(() => {
        const productDetails = localStorage.getItem('productDetails')
        if (productDetails) {
            setProductDetails(JSON.parse(productDetails))
        }
    }, [])

    useEffect(() => {
        retrieveData(productDetails)
    }, [productDetails])


    return (
        <div>
            <FormContainer title="Create Product">
                <form>
                    <CustomTextInput type="text" label="Product Name" name="title" value={productDetails.title!} onChange={handleChange} />
                    <CustomTextArea type="text" label="Description" name="description" value={productDetails.description!} onChange={handleChange} />
                    <CustomTextInput type="text" label="Tagline" name="tagline" value={productDetails.tagline!} onChange={handleChange} />
                    <CustomTextInput type="number" label="Price" name="price" value={productDetails.price! as unknown as string} onChange={handleChange} />
                    <CustomTextInput type="text" label="Currency" name="price_currency" value={productDetails.price_currency!} onChange={handleChange} />
                    <CustomTextInput type="number" label="Discount" name="discount" value={productDetails.discount! as unknown as string} onChange={handleChange} />
                    {/* <CustomTextInput type="number" label="Price After Discount" name="price_after_discount" value={productDetails.price_after_discount! as unknown as string} onChange={handleChange} /> */}
                    <CustomTextInput type="number" label="Sell Count" name="sell_count" value={productDetails.sell_count! as unknown as string} onChange={handleChange} />
                    <CustomTextInput type="checkbox" label="Is Featured" name="isFeatured" value={productDetails.isFeatured! as unknown as string} onChange={handleChange} />
                </form>


            </FormContainer>
        </div>
    )


}