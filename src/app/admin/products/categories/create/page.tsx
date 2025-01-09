'use client'
import { ProductCategory } from "@/app/api/categories/model";
import { ButtonWithIcon } from "@/app/components/buttons/buttonsWithIcon";
import { ImageData, ImageUploadButton } from "@/app/components/buttons/upload-image-button";
import { FormContainer } from "@/app/components/form-components/form-container";
import { CustomTextArea, CustomTextInput } from "@/app/components/form-components/inputs/custom-text-input";
import { revalidateTag } from "next/cache";
import Image from "next/image";
import { useState } from "react";
export default function CreateCategoryPage() {

    const [category, setCategory] = useState<ProductCategory>({
        title: '',
        description: '',
        image_urls: [],
        imageData: [] as ImageData[],
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCategory({ ...category, [e.target.name]: e.target.value })
    }

    const retrieveImages = (urls: string[], imageData: ImageData[]) => {
        setCategory({ ...category, image_urls: urls, imageData: imageData })
    }

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!category.title || !category.description) {
            alert('Please fill in all fields');
            return
        }
        console.log('submitting', category);
        const create = async () => {
            const res = await fetch('/api/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(category),
            },
            )
            revalidateTag('categories')
            const data = await res.json();
            console.log(data);
        }
        try {
            create();
        }
        catch (error) {
            console.log(error);
        }
    }




    return (
        <div>
            <FormContainer>
                <h4> Create Product Category</h4>
                <form className="">
                    <CustomTextInput label="Title" value={category.title} onChange={handleChange} name={"title"} type={"text"} />
                    <CustomTextArea label="Description" value={category.description} onChange={handleChange} name="description" />
                    <ImageUploadButton retrieveImageUrls={retrieveImages} />
                    <ButtonWithIcon onClick={handleSubmit} label="Create Category" icon={<></>} />
                </form>
                <div className="flex gap-4">
                    {
                        category.image_urls && category.image_urls.length > 0 &&
                        category.image_urls.map((url, index) => {
                            return <Image key={index} src={url} alt="category" width={100} height={100} />
                        })
                    }
                </div>
            </FormContainer>

        </div>
    )

}