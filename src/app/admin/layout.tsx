'use client'
import { useEffect } from "react";
import AdminSidebar from "./sidebar";



export default function AdminLayout({ children }: { children: React.ReactNode }) {

    useEffect(() => {
        document.querySelector('nav')?.classList.add('hidden');
        return () => {
            document.querySelector('nav')?.classList.remove('hidden');
        }
    })

    return (
        <div className="flex">
            <div>
                <AdminSidebar />
            </div>
            <div className="w-5/6">
                {children}
            </div>
        </div>
    )
}