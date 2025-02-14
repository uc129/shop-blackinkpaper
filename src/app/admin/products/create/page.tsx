'use client'
import useMultistepForm from "@/app/lib/multistep-form-hook"
import { CreateProductStep1 } from "./step1"
import { CreateProductStep2 } from "./step2"
import { CreateProductStep3 } from "./step3"
import { CreateProductStep4 } from "./step4"
import { ProductType } from "@/app/api/products/model"
import { useState } from "react"
import { ButtonWithIcon } from "@/app/components/buttons/buttonsWithIcon"



export default function CreateProductPage() {
    const steps = [
        <CreateProductStep1 retrieveData={(productDetails) => {
            setProductDetails(productDetails)

        }} />,
        <CreateProductStep2 retrieveCategories={(categories) => {
            setProductDetails({ ...productDetails, category: categories as any })
        }} />,
        <CreateProductStep3 retrieveImages={(urls, imageData) => {
            // console.log('retrieving images', urls, imageData);
            setProductDetails({ ...productDetails, image_urls: urls, imageData: imageData })
        }} />,
        <CreateProductStep4 retrieveProductDetails={(details) => {
            setProductDetails({ ...productDetails, ...details })
        }} />
    ]
    const { step, nextStep, prevStep, goToStep, isLastStep, isFirstStep } = useMultistepForm(steps)

    const [productDetails, setProductDetails] = useState<Partial<ProductType>>({
        title: '',
        description: '',
        price: 0,
        category: [],
        image_urls: [],
        discount: 0,
        price_after_discount: 0,
        price_currency: 'INR',
        imageData: [],
        product_type: 'rolled',
        tagline: '',
        features: [],
        tools: [],
        notes: []
    })


    const handleSubmit = () => {
        console.log('submitting', productDetails);
    }



    return (
        <div className="flex flex-col">
            <h5>Create Product</h5>
            {steps[step]}

            <div className="p-12 w-full flex flex-col items-center">
                <div className="flex justify-end w-[60%] mx-auto">
                    {/* {!isFirstStep && <button onClick={prevStep} disabled={isFirstStep}>Previous</button>} */}
                    {!isLastStep && <ButtonWithIcon onClick={nextStep} label="Next" icon={<></>} disabled={isLastStep} />}
                </div>
                {isLastStep && <ButtonWithIcon onClick={handleSubmit} label="Submit" icon={<></>} disabled={!isLastStep} />}

            </div>
        </div>
    )
}