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
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setProductDetails({ ...productDetails, [name]: value })
    }

    useEffect(() => {
        retrieveData(productDetails)
    }, [productDetails])


    return (
        <div>
            <FormContainer>
                <h1>Create Product</h1>
                <form>
                    <CustomTextInput type="text" label="Product Name" name="title" value={productDetails.title!} onChange={handleChange} />
                    <CustomTextArea type="text" label="Description" name="description" value={productDetails.description!} onChange={handleChange} />
                    <CustomTextInput type="text" label="Tagline" name="tagline" value={productDetails.tagline!} onChange={handleChange} />
                    <CustomTextInput type="number" label="Price" name="price" value={productDetails.price! as unknown as string} onChange={handleChange} />
                    <CustomTextInput type="text" label="Currency" name="price_currency" value={productDetails.price_currency!} onChange={handleChange} />
                    <CustomTextInput type="number" label="Discount" name="discount" value={productDetails.discount! as unknown as string} onChange={handleChange} />
                    {/* <CustomTextInput type="number" label="Price After Discount" name="price_after_discount" value="" onChange={handleChange} /> */}
                </form>
            </FormContainer>
        </div>
    )


}