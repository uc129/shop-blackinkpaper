import { useRouter } from "next/navigation"
import { ButtonWithIcon } from "../components/buttons/buttonsWithIcon"
import { useAuthContext } from "../lib/utils/authContext"
import toast from "react-hot-toast"


export default function LogoutButton() {

    const router = useRouter()
    const { isAuthenticated, setCheckAuthFlag } = useAuthContext()


    const logout = async () => {
        const res = await fetch("/api/users/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            // body: JSON.stringify({ email: localStorage.getItem('email') })
        })
        const data = await res.json()
        console.log(data);

        if (data.status === 200) {
            toast.success("Logged out successfully")
            localStorage.removeItem('email');
            localStorage.removeItem('role');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('cart');
            localStorage.removeItem('shippingAddress');
            setCheckAuthFlag(true)
            console.log('Logged out');
            router.replace('/')
        }
    }

    const handleLogout = async () => {
        await logout()
    }

    return (
        <ButtonWithIcon onClick={handleLogout} icon={<></>} label="Logout" />
    )
}