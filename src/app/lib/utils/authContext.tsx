'use client'

import { useState, useContext, createContext, useEffect } from 'react'

const AuthContext = createContext({
    user: null,
    isAuthenticated: false,
    checkAuthFlag: true,
    setCheckAuthFlag: (flag: boolean) => { }
})

export const useAuthContext = () => useContext(AuthContext);


const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [auth, setAuth] = useState({
        user: null,
        isAuthenticated: false,
    });

    const [checkAuthFlag, setCheckAuthFlag] = useState(true);







    const checkAuth = async () => {
        console.log('checkAuth');
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
