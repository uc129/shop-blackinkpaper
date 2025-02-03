'use client'
import { ArrowDown, TagChevron } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";




const Links = [
    {
        title: 'Dashboard',
        href: "/admin",
        children: []
    },
    {
        title: 'Products',
        href: "/admin/products",
        children: [
            {
                title: 'All Products',
                href: "/admin/products"
            },
            {
                title: 'Add Product',
                href: "/admin/products/add"
            },
            // {
            //     title: 'Manage Products',
            //     href: "/admin/products"
            // }
        ]
    },
    {
        title: 'Categories',
        href: "/admin/products/categories",
        children: [
            {
                title: 'All Categories',
                href: "/admin/products/categories/"
            },
            {
                title: 'Add Category',
                href: "/admin/products/categories/add"
            },
            // {
            //     title: 'Manage Categories',
            //     href: "/admin/categories"
            // }
        ]
    },
    {
        title: 'Orders',
        href: "/admin/orders",
        children: []
    },
    {
        title: 'Users',
        href: "/admin/users",
        children: []
    },
    {
        title: 'Customers',
        href: "/admin/customers",
        children: []
    },
    {
        title: 'Home',
        href: '/',
        children: []
    }
]

export default function AdminSidebar() {


    const [open, setOpen] = useState({
        show: false,
        index: -1
    });





    const toggleDropdown = (e: React.MouseEvent) => {
        let index = Number((e.target as HTMLButtonElement).dataset.index);
        if (open.show && open.index === index) {
            setOpen({ show: false, index: -1 });
        } else {
            setOpen({ show: true, index });
        }
    }




    return (
        <div id="admin-sidebar" className=" w-1/6 min-w-[288px] rounded-tr-lg rounded-br-lg max-w-[340px] min-h-[70vh] sticky top-24   bg-gray-200 pt-8">
            <div className="flex flex-col gap-4 p-4">
                {/* <Link href="/admin">
                    <p className="p-2 ">Dashboard</p>
                </Link>
                <Link href="/admin/products">
                    <p className="p-2 ">Products</p>
                </Link>
                <Link href="/admin/categories">
                    <p className="p-2 ">Categories</p>
                </Link>
                <Link href="/admin/orders">
                    <p className="p-2 ">Orders</p>
                </Link> */}
                <h4 className="font-bold pl-2">Admin</h4>
                {
                    Links.map((link, index) => (
                        <div key={index} className="flex flex-col gap-4">
                            <button onClick={toggleDropdown} data-index={index} className="grid grid-cols-2 gap-4 text-left items-center p-2 ">
                                <Link href={link.href} className=" ">{link.title}</Link>
                                {link.children.length > 0 &&
                                    <Image src={'/icons/chevron.svg'} alt="chevron" width={10} height={10} />}
                            </button>
                            {link.children.length > 0 &&
                                open.show && open.index === index &&
                                <div className="flex flex-col gap-2 pl-4 ">
                                    {
                                        link.children.map((child, index) => (
                                            <Link key={index} href={child.href}>
                                                <p className=" ">{child.title}</p>
                                            </Link>
                                        ))
                                    }
                                </div>}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}