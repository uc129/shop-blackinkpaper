'use client'
import { ButtonWithIcon } from "@/app/components/buttons/buttonsWithIcon"
import { CustomTextInput } from "@/app/components/form-components/inputs/custom-text-input"
import { useEffect, useState } from "react"
import { FormContainer } from "../components/form-components/form-container"
import { useAuthContext } from "../lib/utils/authContext"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import Link from "next/link"

export default function LoginPage() {
    const router = useRouter()
    const { isAuthenticated, setCheckAuthFlag } = useAuthContext()
    console.log({ isAuthenticated })

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
        toast.loading("Logging in...")
        const res = await fetch("/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        })
        const data = await res.json()
        if (data.status === 200) {
            toast.remove()
            toast.success("Login successful")
            localStorage.setItem('email', data.user.email);
            localStorage.setItem('role', data.user.role);
            setCheckAuthFlag(true)
            router.refresh();
            setTimeout(() => {
                if (data.user.role === 'admin')
                    router.replace('/admin')
                else
                    router.replace('/profile')
            }, 1000)


            if (data.status !== 200) {
                toast.error('Login failed')
            }
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            router.replace('/')
        }
    }, [isAuthenticated])


    return (
        <div>

            <FormContainer title="Login">
                <p>
                    Welcome back! Please login to your account
                </p>
                <p>
                    Don't have an account? <Link href="/signup" className="link"><span className="text-blue-500">Register here</span></Link>
                </p>
                <form>
                    {/* <CustomTextInput type="text" name="username" label="Username" value={loginData.username} onChange={handleChange} /> */}
                    <CustomTextInput type="text" name="email" label="Email" value={loginData.email} onChange={handleChange} />
                    <CustomTextInput type="text" name="password" label="Password" value={loginData.password} onChange={handleChange} />
                    <ButtonWithIcon onClick={handleSubmit} icon={<></>} label="Login" />
                </form>
            </FormContainer>

        </div>)
}