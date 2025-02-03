
'use client'
import { UserType } from "@/app/api/users/model";
import { useDataStore } from "@/app/lib/data-store/store";
import { useAuthContext } from "@/app/lib/utils/authContext"
import { useEffect, useState } from "react";


export default function UserProfile() {

    const { user, isAuthenticated } = useAuthContext();
    const { products } = useDataStore();
    const cartItems = user?.cart?.items?.map((item) => {
        return ({
            product: products.find((product) => product._id === item.productId),
            quantity: item.quantity,
            frame: item.frame,
            size: item.size,
            material: item.material,
        })
    })



    return (
        <div>
            <h1>User Profile</h1>
            <div>
                <p>Email: {user?.email}</p>
                <p>Role: {user?.role}</p>
                <p>Cart:{
                    // cartItems?.map((item) => {
                    //     return (
                    //         <div>
                    //             <p>Product: {item.product?.title}</p>
                    //             <p>Quantity: {item.quantity}</p>
                    //             <p>Frame: {item.frame}</p>
                    //             <p>Size: {item.size}</p>
                    //             <p>Material: {item.material}</p>
                    //         </div>
                    //     )
                    // })
                }</p>
            </div>
        </div>
    )
}