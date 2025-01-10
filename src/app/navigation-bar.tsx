'use client'

import { useState } from "react"
import { useWindowContext } from "./lib/utils/windowContext"
import Link from "next/link"
import { ArrowDown } from "@phosphor-icons/react"
import Image from "next/image"


const Links = [
    {
        title: 'Home',
        url: '/',
        children: []
    },
    {
        title: 'About',
        url: '/about',
        children: []
    },
    {
        title: 'Shop',
        url: '/shop',
        children: [
            {
                title: 'Rolled',
                url: '/shop/rolled'
            },
            {
                title: 'Framed',
                url: '/shop/framed'
            },
            {
                title: 'Sticker',
                url: '/shop/sticker'
            },
            {
                title: 'Merchandise',
                url: '/shop/merchandise'
            }
        ]
    },
    {
        title: 'Blog',
        url: '/blog',
        children: []
    },
    {
        title: 'Contact',
        url: '/contact',
        children: []
    }
]


export default function NavigationBar() {
    const { isMobile, isTablet } = useWindowContext()

    return (
        <nav>
            {isMobile || isTablet ? <MobileNavigationBar /> : <DesktopNavigationBar />}
        </nav>
    )
}

const SubMenu = ({ links }: { links: { title: string, url: string }[] }) => {
    return (
        <ul className="absolute top-6 -left-4 bg-white p-4 ">
            {links.map((link, index) => {
                return (
                    <li key={index} className="uppercase">
                        {link.title}
                    </li>
                )
            })}
        </ul>
    )
}

export const DesktopNavigationBar = () => {

    const [showMenu, setShowMenu] = useState({
        show: false,
        index: -1
    })

    const handleMouseEnter = (e: React.MouseEvent) => {
        let target = e.target as HTMLButtonElement
        let index = target.dataset.index
        if (!index) return
        setShowMenu({
            show: true,
            index: parseInt(index)
        })
    }

    const handleMouseLeave = () => {
        setShowMenu({
            show: false,
            index: -1
        })
    }



    return (
        <ul className="flex gap-4 p-4 justify-between w-[50%] mx-auto ">
            {Links.map((link, index) => {
                return (
                    <li key={index} className="relative " >
                        <button className="grid grid-cols-2 items-center gap-2 *:pointer-events-none"
                            data-index={index}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}>
                            <Link href={link.url} className="uppercase"> {link.title} </Link>
                            {link.children.length > 0 &&
                                <Image src='/icons/chevron.svg' alt="chevron" width={10} height={10} />}
                        </button>

                        {link.children.length > 0
                            && showMenu.show
                            && showMenu.index === index &&
                            <SubMenu links={link.children} />
                        }
                    </li>
                )
            })}
        </ul>
    )
}


export const MobileNavigationBar = () => {
    return (
        <ul>
            <li>Home</li>
            <li>About</li>
            <li>Shop</li>
            <li>Blog</li>
            <li>Contact</li>
        </ul>
    )
}