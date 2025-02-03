'use client'

import { AddressType } from "@/app/api/user/address/model"
import { useDataStore } from "@/app/lib/data-store/store"
import { useAuthContext } from "@/app/lib/utils/authContext"
import Link from "next/link"
import { CartUI } from "../cart/cart-ui"




export default function PaymentPage() {

    const { products } = useDataStore()
    const { user } = useAuthContext()
    if (!user) return <h1>Please login to continue</h1>
    if (!user.cart) return <h1>No items in cart</h1>

    const address: AddressType = JSON.parse(localStorage.getItem('shippingAddress') as string)

    return (
        <div className="p-12 flex flex-col gap-12">
            <h1>Payment Page</h1>

            <div className="flex gap-12 flex-wrap">

                <CartUI
                    cart={user.cart}
                    products={products}
                    showRemoveButton={false}
                />

                <div className="p-12 bg-green-100 h-fit flex flex-col gap-6">
                    <h4 className="text-center">Shipping address</h4>
                    {
                        <div>

                            <h4>{address.name}</h4>
                            <p>{address.phone}</p>
                            <p>{address.building}</p>
                            <p>{address.street}</p>
                            <p>{address.city}</p>
                            <p>{address.state}</p>
                            <p>{address.country}</p>
                            <p>{address.postalCode}</p>
                            <p>{address.instructions}</p>
                        </div>
                    }
                </div>
            </div>

        </div>

    )
}