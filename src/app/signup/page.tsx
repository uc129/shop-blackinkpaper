'use client'
import { ImageDataType, UserType } from "@/app/api/users/model";
import { ButtonWithIcon } from "@/app/components/buttons/buttonsWithIcon";
import { DeleteButton } from "@/app/components/buttons/deleteButton";
import { ImageUploadButton } from "@/app/components/buttons/upload-image-button";
import { CustomSelect } from "@/app/components/form-components/inputs/custom-select";
import { CustomTextInput } from "@/app/components/form-components/inputs/custom-text-input";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FormContainer } from "../components/form-components/form-container";

type SignupType = Partial<UserType>



export default function SignupPage() {


    const [user, setUser] = useState<SignupType>({
        username: '',
        email: '',
        phone: '',
        password: '',
        role: 'user',
        image_urls: [],
        imageData: [{
            publicId: '',
            url: '',
            secure_url: '',
            original_filename: ''
        }]
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.target.name === 'image_urls') {
            setUser({
                ...user,
                [e.target.name]: e.target.value.split(', ')
            })
            return
        }

        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const retrieveImageUrls = (urls: string[], imageData: ImageDataType[]) => {
        console.log(urls, imageData);

        setUser({
            ...user,
            image_urls: urls[0] as unknown as string[],
            imageData: imageData[0] as unknown as ImageDataType[]
        })

    }

    const handleSubmit = async () => {
        if (!user.username || !user.email || !user.password || !user.role) {
            console.log('Please fill out all fields')
            alert('Please fill out all fields')
            return
        }
        const res = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await res.json()
        console.log(data)
    }

    const roleOptions = [{
        value: 'user',
        label: 'User',
    }, {
        value: 'admin',
        label: 'Admin',
    }]

    const handleRemoveImage = () => {

        setUser({
            ...user,
            image_urls: [],
            imageData: [{
                publicId: '',
                url: '',
                secure_url: '',
                original_filename: ''
            }]
        })
    }



    return (
        <div>
            <FormContainer>
                <h1>Signup Page</h1>
                <form >
                    <CustomTextInput label="Email" name="email" type="email" value={user.email!} onChange={handleChange} />
                    <CustomTextInput label="Username" name="username" type="text" value={user.username!} onChange={handleChange} />

                    <CustomTextInput label="Phone" name="phone" type="text" value={user.phone!} onChange={handleChange} />
                    <CustomTextInput label="Password" name="password" type="password" value={user.password!} onChange={handleChange} />
                    <CustomSelect label="Role" name="role" value={user.role!} onChange={handleSelectChange} options={roleOptions} />
                    <ImageUploadButton retrieveImageUrls={retrieveImageUrls} />
                    {/* <button type="button" className="btn btn-primary block" onClick={handleSubmit} >Submit</button> */}
                    <ButtonWithIcon label="Submit" icon={<></>} onClick={handleSubmit} />
                </form>

                <div className="flex gap-12 items-center">
                    {user.image_urls && user.image_urls.length > 0 &&
                        <div className="flex gap-12">
                            <Image src={user.image_urls as unknown as string} width={400} height={400} alt="uploaded-image" />
                            <DeleteButton deleteFunction={handleRemoveImage} />
                        </div>
                    }
                    {/* <ButtonWithIcon label="" icon="🗑️" onClick={handleRemoveImage} /> */}
                </div>
            </FormContainer>
        </ div>
    )

}