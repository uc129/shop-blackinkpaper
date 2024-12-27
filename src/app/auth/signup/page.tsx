'use client'
import { UserType } from "@/app/api/users/model";
import { CustomSelect } from "@/app/components/form-components/inputs/custom-select";
import { CustomTextInput } from "@/app/components/form-components/inputs/custom-text-input";
import { useState, useEffect } from "react";

type SignupType = Partial<UserType>

export default function SignupPage() {


    const [user, setUser] = useState<SignupType>({
        username: '',
        email: '',
        password: '',
        role: 'user',
        image_urls: [],
        imageData: [{
            publicId: '',
            url: '',
            secure_url: '',
            original_filename: ''
        }],

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



    return (
        <div>
            <h1>Signup Page</h1>
            <form >
                <CustomTextInput label="Username" name="username" type="text" value={user.username!} onChange={handleChange} />
                <CustomTextInput label="Email" name="email" type="email" value={user.email!} onChange={handleChange} />
                <CustomTextInput label="Password" name="password" type="password" value={user.password!} onChange={handleChange} />
                <CustomSelect label="Role" name="role" value={user.role!} onChange={handleSelectChange} options={roleOptions} />
                <button type="button" className="btn btn-primary" onClick={handleSubmit} >Submit</button>
            </form>
        </ div>
    )

}