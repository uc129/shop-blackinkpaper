'use client'
import { useEffect } from "react";
import AdminSidebar from "./sidebar";
import { Toolbar } from "./toolbar";
import { useAuthContext } from "../lib/utils/authContext";



export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user } = useAuthContext();
    useEffect(() => {
        document.querySelector('nav')?.classList.add('hidden');
        return () => {
            document.querySelector('nav')?.classList.remove('hidden');
        }
    })




    return (
        <div className="flex gap-12">
            <div>
                <AdminSidebar />
            </div>
            <div className="w-5/6 flex flex-col gap-4">
                <Toolbar />
                {children}
            </div>
        </div>
    )
}