'use client'

import { CartType } from '@/app/api/user/cart/model';
import { Order } from '@/app/api/orders/model';
import { ImageData } from '@/app/components/buttons/upload-image-button';

import { useState, useContext, createContext, useEffect } from 'react'
import { AddressType } from '@/app/api/user/address/model';
export type UserInfo = {
    _id: string;
    email: string;
    role: string;
    address?: AddressType[],
    username: string;
    phone: string;
    imageData: ImageData[];
    image_urls: string[];
    cart: CartType
    wishList: { items: string[] };
    orders: Order[];
}
const AuthContext = createContext({
    user: {} as UserInfo | null,
    isAuthenticated: false,
    checkAuthFlag: true,
    setCheckAuthFlag: (flag: boolean) => { }
})

export const useAuthContext = () => useContext(AuthContext);


const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [auth, setAuth] = useState({
        user: {} as UserInfo | null,
        isAuthenticated: false,
    });

    const [checkAuthFlag, setCheckAuthFlag] = useState(true);







    const checkAuth = async () => {
        const res = await fetch('/api/users/auth_check', {
            method: 'POST',
            // body: JSON.stringify({ email }),
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-cache',
        });
        const data = await res.json();
        console.log(data);
        if (data.auth) {
            setAuth({
                user: data.user,
                isAuthenticated: true,
            });
        } else {
            setAuth({
                user: null,
                isAuthenticated: false,
            });
        }
        setCheckAuthFlag(false);
    }
    useEffect(() => {
        if (checkAuthFlag) {
            checkAuth();
        }
    }, [checkAuthFlag]);


    return (
        <AuthContext.Provider value={{ ...auth, checkAuthFlag, setCheckAuthFlag }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
