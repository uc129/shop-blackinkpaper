'use client'

import { useState, useContext, createContext, useEffect } from 'react'

const AuthContext = createContext({
    user: null,
    isAuthenticated: false,
})

export const useAuthContext = () => useContext(AuthContext);


const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [auth, setAuth] = useState({
        user: null,
        isAuthenticated: false,
    });

    const checkAuth = async () => {
        console.log('checkAuth');

        const email = localStorage.getItem('email') || ''
        if (!email) {
            setAuth({
                user: null,
                isAuthenticated: false,
            });
            return;
        }

        const res = await fetch('/api/users/auth_check', {
            method: 'POST',
            body: JSON.stringify({ email }),
            headers: {
                'Content-Type': 'application/json',
            },
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
    }

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
