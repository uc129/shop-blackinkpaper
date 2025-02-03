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
import Link from "next/link";
import toast from "react-hot-toast";

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

    const handleSubmit = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (!user.username || !user.email || !user.password || !user.role || !user.phone) {
            toast.error('Please fill out all fields')
            return
        }
        else {
            const res = await fetch('/api/users/signup', {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await res.json()
            console.log(data);
            if (data.status === 200) {
                toast.success('User created successfully')
                window.location.href = '/login'
            }
            else {
                toast.error('Error creating user')
            }
        }

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
        });

    }



    return (
        <div>
            <FormContainer>
                <h1>Signup Page</h1>
                <span>Already have an account? </span>
                <Link className="link" href={'/login'}>Login here</Link>
                <form >
                    <CustomTextInput label="Email" name="email" type="email" value={user.email!} onChange={handleChange} />
                    <CustomTextInput label="Username" name="username" type="text" value={user.username!} onChange={handleChange} />

                    <CustomTextInput label="Phone" name="phone" type="text" value={user.phone!} onChange={handleChange} />
                    <CustomTextInput label="Password" name="password" type="password" value={user.password!} onChange={handleChange} />
                    <CustomSelect label="Role" name="role" value={user.role!} onChange={handleSelectChange} options={roleOptions} />
                    <div className="w-[40%]">
                        <ImageUploadButton retrieveImageUrls={retrieveImageUrls} />
                        {/* <button type="button" className="btn btn-primary block" onClick={handleSubmit} >Submit</button> */}
                    </div>
                    <ButtonWithIcon label="Submit" classNames="primary mt-8" icon={<></>} onClick={handleSubmit} />
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