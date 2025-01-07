import { useRouter } from "next/navigation"
import { ButtonWithIcon } from "../components/buttons/buttonsWithIcon"
import { useAuthContext } from "../lib/utils/authContext"


export default function LogoutButton() {

    const router = useRouter()


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
            localStorage.removeItem('email');
            localStorage.removeItem('role');
            console.log('Logged out');
            router.refresh()
            router.replace('/login')
        }
    }

    const handleLogout = async () => {
        await logout()
    }

    return (
        <ButtonWithIcon onClick={handleLogout} icon={<></>} label="Logout" />
    )
}