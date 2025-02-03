'use client'
import { AddressType } from "@/app/api/user/address/model";
import { useDataStore } from "@/app/lib/data-store/store";
import { useAuthContext } from "@/app/lib/utils/authContext";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CartUI } from "../cart/cart-ui";



export default function CheckoutPage() {
    const { user } = useAuthContext();
    const { products } = useDataStore();
    const [selectedAddress, setSelectedAddress] = useState<AddressType | null>(null)
    const ref = useRef<HTMLDivElement>(null)
    const [newAddress, setNewAddress] = useState<AddressType>({
        name: '',
        phone: '',
        building: '',
        street: '',
        city: '',
        country: '',
        state: '',
        instructions: '',
        postalCode: '',
        default: false
    })

    useEffect(() => {
        const selected = localStorage.getItem('shippingAddress')
        if (!selected) return
        if (selected) {
            console.log('Selected Address', selected);
            setSelectedAddress(JSON.parse(selected))
        }
    }, [])



    if (!user) return <h1>Please login to continue</h1>
    if (!user.cart) return <h1>No items in cart</h1>

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewAddress({
            ...newAddress,
            [e.target.name]: e.target.value
        })
    }



    const handleAddressSubmit = async () => {
        if (!newAddress || !newAddress.name || !newAddress.phone || !newAddress.building || !newAddress.street || !newAddress.city || !newAddress.country || !newAddress.state || !newAddress.postalCode) {
            console.log('Please fill all fields');
            return
        }

        try {
            console.log(user._id, 'sending address');

            const res = await fetch(`/api/user/address?userId=${user._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newAddress)
            })
            const data = await res.json()
            console.log(data)
            if (data.status === 200) {
                console.log('Address added');
                setNewAddress(data.address)
                localStorage.setItem('shippingAddress', JSON.stringify(data.address))
                window.location.reload()
                return
            }
        }
        catch (error) {
            console.log(error);
        }
        // setSelectedAddress(newAddress)
        // localStorage.setItem('shippingAddress', JSON.stringify(newAddress))
    }
    return (
        <div className="p-12 flex flex-col gap-12">
            <h1>Checkout Page</h1>

            <div className="">
                <div className="">
                    <CartUI
                        cart={user.cart}
                        products={products}
                        showRemoveButton={false}
                    />


                </div>

                {
                    user?.address?.length &&
                    user.address.length > 0 &&
                    <div>
                        <h4>
                            Select Shipping Address
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {
                                user.address?.map((address, index) => {
                                    return (
                                        <div ref={ref}
                                            id={`${selectedAddress?._id || index}`}
                                            key={index}
                                            className={`border-2 border-black p-4 
                                     ${selectedAddress === address ? 'bg-gray-300 text-white' : ''}`}
                                        >
                                            <h4>{address.name}</h4>
                                            <p>{address.phone}</p>
                                            <p>{address.building}</p>
                                            <p>{address.street}</p>
                                            <p>{address.city}</p>
                                            <p>{address.state}</p>
                                            <p>{address.country}</p>
                                            <p>{address.postalCode}</p>
                                            <p>{address.instructions}</p>
                                            <button onClick={() => {
                                                console.log('Selected Address', address);
                                                localStorage.setItem('shippingAddress', JSON.stringify(address))
                                                setSelectedAddress(address)
                                            }}>Select Address</button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>}

                <div className="w-fit">
                    <h4>
                        Add New Shipping address
                    </h4>
                    <form className="flex flex-col">
                        <input type="text" name="name" placeholder="Name" onChange={handleAddressChange} />
                        <input type="text" name="phone" placeholder="Phone" onChange={handleAddressChange} />
                        <input type="text" name="building" placeholder="Building" onChange={handleAddressChange} />
                        <input type="text" name="street" placeholder="Street" onChange={handleAddressChange} />
                        <input type="text" name="city" placeholder="City" onChange={handleAddressChange} />
                        <input type="text" name="state" placeholder="State" onChange={handleAddressChange} />
                        <input type="text" name="country" placeholder="Country" onChange={handleAddressChange} />
                        <input type="text" name="postalCode" placeholder="Postal Code" onChange={handleAddressChange} />
                        <input type="text" name="instructions" placeholder="Instructions" onChange={handleAddressChange} />
                        <input type="checkbox" name="default" onChange={handleAddressChange} />
                        <label htmlFor="default">Default Address</label>
                        <button type="button" onClick={handleAddressSubmit}>Add Address</button>
                    </form>
                </div>

                <div>
                    <Link href="/shop/payment">Proceed to Payment</Link>
                </div>
            </div>
        </div>
    )
}