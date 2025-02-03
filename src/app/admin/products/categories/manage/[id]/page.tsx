


'use client'
import { ProductCategory } from "@/app/api/categories/model";
import { ButtonWithIcon } from "@/app/components/buttons/buttonsWithIcon";
import { ImageData, ImageUploadButton } from "@/app/components/buttons/upload-image-button";
import { FormContainer } from "@/app/components/form-components/form-container";
import { CustomTextArea, CustomTextInput } from "@/app/components/form-components/inputs/custom-text-input";
import Image from "next/image";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useDataStore } from "@/app/lib/data-store/store";
import { revalidateTag } from "next/cache";
import toast from "react-hot-toast";



export default function ManageCategoryPage() {

    const { id } = useParams();
    const { categories } = useDataStore();
    const categoryToManage = categories.find(cat => cat._id === id);

    const [category, setCategory] = useState<ProductCategory>(categoryToManage || {} as ProductCategory);

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
        // console.log('submitting', category);
        const update = async () => {
            const res = await fetch('/api/categories', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(category)
            })
            const data = await res.json();
            if (data.status === 200) {
                toast.success('Category updated successfully');
                window.history.back();

            }
            console.log(data);
        }
        try {
            update();
            revalidateTag('categories');
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <FormContainer title="Manage Product Categories">

                <form className="">
                    <CustomTextInput label="Title" value={category.title} onChange={handleChange} name={"title"} type={"text"} />
                    <CustomTextArea label="Description" value={category.description} onChange={handleChange} name="description" />
                    <ImageUploadButton retrieveImageUrls={retrieveImages} />
                    <ButtonWithIcon onClick={handleSubmit} label="Update Category" icon={<></>} />
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