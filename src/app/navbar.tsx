
'use client'
import { InstagramLogo, FacebookLogo, XLogo, MagnifyingGlass, User, Heart, ShoppingBag, X, List } from "@phosphor-icons/react";
/* eslint-disable */
import Link from "next/link"
import React from "react";
import { useEffect, useState, useTransition } from "react";
import { ButtonWithIcon } from "./components/buttons/buttonsWithIcon";
import { useWindowContext } from "./lib/utils/windowContext";
import { useAuthContext } from "./lib/utils/authContext";
import LogoutButton from "./logout/logoutButton";









let iconSize = 24;





const SocialBar = () => {

    // const { InstagramLogo, FacebookLogo, XLogo } = usePhosphorIcons()

    const size = iconSize - 6;

    const socialLinks = [
        {
            platform: 'instagram',
            icon: <InstagramLogo size={size} />,
            link: "/instagram/blackinkpaper"
        },
        {
            platform: 'facebook',
            icon: <FacebookLogo size={size} />,
            link: "/facebook/blackinkpaper"
        },
        {
            platform: 'X',
            icon: <XLogo size={size} />,
            link: "/x/blackinkpaper"
        }

    ]
    return (
        <div id='social-bar' className="border-b-[1px] border-gray-100 py-2 h-fit " style={{ zIndex: 1000 }}>

            <ul className=" flex justify-end items-center gap-2 px-28 ">
                {socialLinks.map((link) =>
                    <li key={link.link}>
                        <Link href={link.link}> {link.icon} </Link>
                    </li>
                )}
            </ul>
        </div>

    )


}


const TopBar = () => {


    const handleSearchClick = () => {

    }

    const handleWishListClick = () => {

    }

    const handleCartClick = () => {

    }

    const { isAuthenticated } = useAuthContext()




    return (
        <div style={{ zIndex: 1000 }}>
            <ul className="flex items-start justify-between px-36 py-10 flex-wrap ">

                <li>
                    <ButtonWithIcon
                        label=""
                        icon={<MagnifyingGlass size={iconSize} />}
                        onClick={handleSearchClick} classNames="" />
                </li>

                <li>
                    <ButtonWithIcon label="" isLink icon={<Link href={"/"}
                        className="logo text-2xl font-bold ml-24" >
                        BLACKINKPAPER </Link>} onClick={() => { }} />
                </li>

                <li>
                    <ul>
                        <li className="">
                            <ul className="flex items-start justify-between gap-7">

                                <li>
                                    <ButtonWithIcon isLink icon={<>  <Link href="/admin" > <User size={iconSize} />  </Link></>} label={""} onClick={() => { }} />
                                </li>
                                <li>
                                    <ButtonWithIcon label="" icon={<Heart size={iconSize} />} onClick={handleWishListClick} />
                                </li>
                                <li>
                                    <ButtonWithIcon label="" icon={<ShoppingBag size={iconSize} />} onClick={handleCartClick} />
                                </li>
                                {
                                    isAuthenticated && <li> <LogoutButton /> </li>
                                }
                            </ul>


                        </li>

                        {/* <li>
                            {isAuthenticated ?
                                <LogoutButton /> :
                                <ul className="flex items-start justify-between gap-7">
                                    <li>
                                        <ButtonWithIcon isLink icon={<Link href="/auth/login" > Login </Link>} label={""} onClick={() => { }} />

                                    </li>
                                    <li>
                                        <ButtonWithIcon isLink icon={<Link href="/auth/signup" > Signup </Link>} label={""} onClick={() => { }} />

                                    </li>
                                </ul>}
                        </li> */}
                    </ul>
                </li>

            </ul>
        </div>
    )
}




const shopLinks = [

    {
        collectionName: 'Wall Art Prints',
        links: [
            {
                title: 'Best Sellers',
                link: '/shop/bestsellers',
                icon: <></>
            },
            {
                title: 'New Arrivals',
                link: '/shop/new-arrivals',
                icon: <></>
            },
            {
                title: 'Sale',
                link: '/shop/sale',
                icon: <></>
            },
            {
                title: 'All Prints',
                link: '/shop/all-prints',
                icon: <></>
            }
        ]
    },
    {
        collectionName: 'Shop by Style',
        links: [
            {
                title: 'Abstract',
                link: '/shop/abstract',
                icon: <></>
            },
            {
                title: 'Minimalist',
                link: '/shop/minimalist',
                icon: <></>
            },
            {
                title: 'Modern',
                link: '/shop/modern',
                icon: <></>
            },
            {
                title: 'Vintage',
                link: '/shop/vintage',
                icon: <></>
            }
        ]
    },
    {
        collectionName: 'Shop by Room',
        links: [
            {
                title: 'Living Room',
                link: '/shop/living-room',
                icon: <></>
            },
            {
                title: 'Bedroom',
                link: '/shop/bedroom',
                icon: <></>
            },
            {
                title: 'Bathroom',
                link: '/shop/bathroom',
                icon: <></>
            },
            {
                title: 'Kitchen',
                link: '/shop/kitchen',
                icon: <></>
            }
        ]
    },

    {
        collectionName: 'Shop Sets',
        links: [
            {
                title: 'Gallery Wall Sets',
                link: '/shop/gallery-wall-sets',
                icon: <></>
            },
            {
                title: 'Diptych Sets',
                link: '/shop/diptych-sets',
                icon: <></>
            },
            {
                title: 'Triptych Sets',
                link: '/shop/triptych-sets',
                icon: <></>
            },

        ]

    },

    {
        collectionName: 'Exclusive Collections',
        links: [
            {
                title: 'Renaissance Punk',
                link: '/shop/renaissance-punk',
                icon: <>🆕️</>
            },
            {
                title: 'Vintage Collection',
                link: '/shop/vintage-collection',
                icon: <></>
            },
            {
                title: 'Modern Love Collection',
                link: '/shop/modern-love-collection',
                icon: <></>
            },
            {
                title: 'Aquarelle Collection',
                link: '/shop/aquarelle-collection',
                icon: <></>
            },
            {
                title: 'Flower Market',
                link: '/shop/flower-market',
                icon: <></>
            },
            {
                title: 'Cushion Covers',
                link: '/shop/cushion-covers',
                icon: <></>
            }
        ]
    },
]


const CollectionsNav = (props: { classNames?: string, onMouseLeave?: (e: React.MouseEvent) => void }) => {

    return (
        <div className={`${props.classNames}`} id='collections-nav' onMouseLeave={props.onMouseLeave} style={{ zIndex: 1000 }} >
            <ul className="grid grid-cols-5 px-36 py-10 w-full bg-white pt-8 text-black">
                {shopLinks.map((collection) =>
                    <li key={collection.collectionName}>
                        <ul>
                            <li className="font-black gap-4 uppercase mb-4 text-sm "> {collection.collectionName} </li>
                            {collection.links.map((link) =>
                                <li key={link.link}>
                                    <Link href={link.link} > {link.title} </Link>
                                </li>
                            )}
                        </ul>
                    </li>
                )}
            </ul>
        </div>
    )
}


const collabLinks = {
    links: [
        {
            title: 'Artists',
            link: '/shop/artists',
            icon: <></>
        },
        {
            title: 'Brands',
            link: '/shop/brands',
            icon: <></>
        },
        {
            title: 'Institutions',
            link: '/shop/institutions',
            icon: <></>
        },
        {
            title: 'Charities',
            link: '/shop/charities',
            icon: <></>
        }
    ]
}

const DropDowns = (props: { links: { title: string, link: string, icon: React.ReactNode }[], onMouseLeave?: (e: React.MouseEvent) => void, classNames?: string }) => {

    return (
        <ul className={`hidden min-w-32  ${props.classNames}`} onMouseLeave={props.onMouseLeave} style={{ zIndex: 1000 }}>
            <div className="mt-4">
                {props.links.map((link) =>
                    <li key={link.link} className="">
                        <Link href={link.link} className="" > {link.title} </Link>
                    </li>
                )}
            </div>

        </ul>
    )
}


const BottomBar = () => {

    const handleShowCollections = (e: React.MouseEvent) => {
        e.preventDefault();

        let target = e.target as HTMLElement;
        let collectionsNav = document.getElementById('collections-nav');
        if (!target || !collectionsNav) return;
        collectionsNav.classList.remove('hidden')
    }
    const handleHideCollections = (e: React.MouseEvent) => {
        e.preventDefault();
        let target = e.target as HTMLElement;
        let collectionsNav = document.getElementById('collections-nav');
        if (!target || !collectionsNav) return;
        collectionsNav.classList.add('hidden')
    }
    const handleMouseEnter = (e: React.MouseEvent) => {
        e.preventDefault();
        let target = e.target as HTMLElement;
        let children = target.children;
        if (!target || !children) return;
        // console.log('child[1]', children[1])
        children[1]?.classList.remove('hidden');
    }
    const handleMouseLeave = (e: React.MouseEvent) => {
        e.preventDefault();
        let target = e.target as HTMLElement;
        if (!target) return;

        if (target.tagName === 'UL') {
            target.classList.add('hidden')
        }
        else if (target.tagName === 'A') {
            let sibling = target.nextElementSibling;
            sibling?.classList.add('hidden')
        }

        else if (target.tagName === 'LI') {
            if (target.classList.contains('relative')) {
                return target?.children[1]?.classList.add('hidden')
            }
            let parent = target.parentElement;
            let grandparent = parent?.parentElement;
            return grandparent?.classList.add('hidden')
        }


    }
    return (
        <div className="relative" style={{ zIndex: 1000 }} >

            <ul className="flex items-center justify-between px-80 uppercase flex-wrap gap-6  ">

                <li>
                    <Link href='/' > Home </Link>
                </li>
                <li>
                    <Link href='/about' > About </Link>
                </li>

                {/* <li className="relative " onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <Link href='/collaborations' className=""  > Collaborations 🤝  </Link>
                    <DropDowns links={collabLinks.links} classNames="absolute " />
                </li> */}
                <li className="" >
                    <Link href='/shop' onMouseEnter={handleShowCollections}  >  Shop Art  </Link>
                    <CollectionsNav classNames="absolute left-0 w-full hidden " onMouseLeave={handleHideCollections} />
                </li>

                <li>
                    <Link href='/shop/collections/new-releases' > Just Launched </Link>
                </li>

                <li>
                    <Link href='/shop/collections/botany' > Botany </Link>
                </li>

                <li>
                    <Link href='/shop/collections/architecture' > Architecture </Link>

                </li>


            </ul>

        </div>
    )

}




export const Navbar = () => {

    const [scrolledPast, setScrolledPast] = useState(false);

    useEffect(() => {
        if (isMobile || isTablet) return;
        let scrollY;
        window.addEventListener('scroll', () => {
            scrollY = window.scrollY;
            if (!scrollY) return;
            let navbarHeight = document.getElementsByTagName('nav')[0]?.clientHeight;
            // console.log('scrollY', scrollY, 'navbarHeight', navbarHeight + 100);

            if (scrollY > navbarHeight + 100) {
                setScrolledPast(true)
            }
            else if (scrollY <= 40) {
                setScrolledPast(false)
            }
        })
    })


    //  colour for sticky navbar
    useEffect(() => {
        if (isMobile || isTablet) return;

        let navbar = document.getElementsByTagName('nav')[0];
        let socialBar = document.getElementById('social-bar');
        if (!navbar || !socialBar) return;
        if (scrolledPast) {
            navbar.classList.add('sticky', 'top-0', 'shadow-md', 'slideFromTop')
            socialBar.classList.remove('py-2', 'h-fit', 'slideFromTop')
            socialBar.classList.add('h-0', 'overflow-hidden')
        }
        else {
            navbar.classList.remove('fixed', 'top-0', 'shadow-md', 'slideFromTop')
            socialBar.classList.remove('h-0')
            socialBar.classList.add('h-fit', 'py-2', 'slideFromTop')
        }
    }, [scrolledPast])

    const { isMobile, isTablet } = useWindowContext()



    return (
        <nav className={` ${isMobile || isTablet ? '' : 'pb-8'} bg-background `}
            style={{ transition: 'all 0.5s ease', zIndex: 1000 }} >

            {isMobile || isTablet ?
                <div className=" ">
                    <MobileNav />
                </div>
                :
                <div className="large-nav  " style={{ zIndex: 1000 }}>
                    <SocialBar />
                    <TopBar />
                    <BottomBar />
                </div>
            }
        </nav>
    )

}



const MobileNav = () => {
    const { isAuthenticated } = useAuthContext()

    const [showMenu, setShowMenu] = React.useState(false);
    const handleMenuClick = () => {
        setShowMenu(!showMenu);
    }

    const { isDesktop } = useWindowContext()

    useEffect(() => {
        if (showMenu) {
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = 'auto';
        }

    })

    useEffect(() => {
        window.addEventListener('click', (e) => {
            let target = e.target as HTMLElement;
            let mobileNav = document.getElementsByClassName('mobile-nav')[0];
            if (!target || !mobileNav) return;
            if (target.classList.contains('mobile-nav') || target.classList.contains('menu-button')) return;
            setShowMenu(false)
        })
    })


    return (
        <div className={`mobile-nav  flex flex-col p-12 sticky top-0 shadow-md ${showMenu ? 'h-screen' : 'h-fit'}`} style={{ zIndex: 1000 }}>
            <div className="relative flex justify-between ">
                <ButtonWithIcon label="" isLink icon={<Link href='/'> <h3>BLACKINKPAPER</h3> </Link>} onClick={() => { }} />
                <ButtonWithIcon label={""}
                    icon={showMenu ?
                        <X size={1.5 * iconSize} />
                        :
                        <List size={1.5 * iconSize} />
                    }
                    onClick={handleMenuClick}
                    classNames={'float-end px-10 menu-button'}
                />
            </div>
            {showMenu
                &&
                <div className=" mobile-nav-items w-full text-2xl bg-white pt-4 border-t-[1px] border-gray-100" >
                    <ul className=" *:mb-6">
                        {/* <li>
                                    <Link href='/' > Home </Link>
                                </li> */}

                        <li className="" >
                            <Link href='/shop' > Shop Art </Link>
                        </li>

                        <li className="relative">
                            <Link href='/collaborations' className=""  > Collaborations 🤝  </Link>
                        </li>

                        <li>
                            <Link href='/new-arrivals' > Just Launched </Link>
                        </li>

                        <li>
                            <Link href='/contact' > Wall Decor </Link>
                        </li>

                        <li>
                            <Link href='/contact' > Home Decor </Link>
                        </li>
                        <li>
                            {isAuthenticated ?
                                <LogoutButton /> :
                                <Link href='/login' > Login </Link>
                            }
                        </li>

                    </ul>
                </div>
            }

        </div>
    )

}


