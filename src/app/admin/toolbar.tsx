'use client'
import { useRouter } from "next/navigation"

export const Toolbar = () => {
    const router = useRouter();
    return (
        <div className="toolbar w-[60%] mx-auto flex gap-4">
            <button onClick={() => window.location.reload()}>Refresh </button>
            <button onClick={() => router.back()}>Back </button>
        </div>
    )
}