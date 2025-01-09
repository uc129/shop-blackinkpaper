'use client'

import { ProductCategory } from "@/app/api/categories/model";
import { ProductType } from "@/app/api/products/model";

import useMultistepForm from "@/app/lib/multistep-form-hook";
import { useEffect, useState } from "react";
import { CreateProductStep1 } from "../../add/step1";
import { CreateProductStep2 } from "../../add/step2";
import { Schema } from "mongoose";
import { ButtonWithIcon } from "@/app/components/buttons/buttonsWithIcon";
import { CreateProductStep3 } from "../../add/step3";
import { CreateProductStep4 } from "../../add/step4";

type EditProductFormProps = {
    product: ProductType;
    categories: ProductCategory[];
    onSubmit: (submit: boolean) => void;
    retrieveProductDetails: (productDetails: ProductType) => void;
    onCancel: () => void;
}

const EditProductForm = (props: EditProductFormProps) => {
    const [productDetails, setProductDetails] = useState<ProductType>(props.product);
    const productCategories = props.categories.filter((category) => productDetails.category.includes(category._id! as any));
    const [editedProduct, setEditedProduct] = useState<ProductType>(productDetails);


    // useEffect(() => {
    //     console.log('edited product', editedProduct);
    // }, [editedProduct])



    const steps = [
        <CreateProductStep1 product={productDetails} retrieveData={(data) => {
            // console.log('retrieving step1 data  ', data);
            // setProductDetails({ ...productDetails, ...data })
            setEditedProduct((prev) => ({ ...prev, ...data }))

        }} />,
        <CreateProductStep2 productCategories={productCategories[0]} retrieveCategories={(cat) => {
            // console.log('retrieving step2 data', cat)
            // setProductDetails({ ...productDetails, category: cat })
            setEditedProduct((prev) => ({ ...prev, category: cat as unknown as Schema.Types.ObjectId[] }))
        }} />,
        <CreateProductStep3 imageData={props.product.imageData} retrieveImages={(urls, images) => {
            // console.log('retrieving step3 data', urls, images)
            // setProductDetails({ ...productDetails, imageData: images, image_urls: urls })
            setEditedProduct((prev) => ({ ...prev, imageData: images, image_urls: urls }))
        }} />,
        <CreateProductStep4 product={productDetails} retrieveProductDetails={
            (data) => {
                // console.log('retrieving step4 data', data)
                // setProductDetails({ ...productDetails, ...data })
                setEditedProduct((prev) => ({ ...prev, ...data }))
            }
        } />,
    ]

    useEffect(() => {
        // console.log('edited product', editedProduct);
        props.retrieveProductDetails(editedProduct);
    }, [editedProduct])

    const { goToStep, isFirstStep, isLastStep, step, nextStep, prevStep } = useMultistepForm(steps)

    const handleSubmit = () => {
        localStorage.removeItem('productDetails');
        props.onSubmit(true);
    }

    return (
        <div>
            {steps[step]}
            {!isFirstStep && <ButtonWithIcon label='Previous' icon='⬅️' onClick={(e) => { e.preventDefault(); prevStep() }} />}
            {!isLastStep && <ButtonWithIcon label='Next' icon='➡️' onClick={(e) => { e.preventDefault(); nextStep() }} />}
            {
                <ButtonWithIcon label='Submit' icon='📤' onClick={handleSubmit} />
            }
        </div>
    )


}

export default EditProductForm;