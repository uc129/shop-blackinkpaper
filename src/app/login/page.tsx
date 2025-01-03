'use client'
import { ButtonWithIcon } from "@/app/components/buttons/buttonsWithIcon"
import { CustomTextInput } from "@/app/components/form-components/inputs/custom-text-input"
import { useEffect, useState } from "react"
import { FormContainer } from "../components/form-components/form-container"
export default function LoginPage() {

    const [loginData, setLoginData] = useState({
        // username: "",
        email: "",
        password: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.MouseEvent) => {
        e.preventDefault()
        console.log(loginData)
        const res = await fetch("/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        })
        const data = await res.json()
        if (data.status === 200) {
            console.log(data)
            localStorage.setItem('email', data.user.email);
            localStorage.setItem('role', data.user.role);
        }
    }


    return (
        <div>

            <FormContainer>
                <h1>Login</h1>
                <form>
                    {/* <CustomTextInput type="text" name="username" label="Username" value={loginData.username} onChange={handleChange} /> */}
                    <CustomTextInput type="text" name="email" label="Email" value={loginData.email} onChange={handleChange} />
                    <CustomTextInput type="text" name="password" label="Password" value={loginData.password} onChange={handleChange} />
                    <ButtonWithIcon onClick={handleSubmit} icon={<></>} label="Login" />
                </form>
            </FormContainer>

        </div>)
}