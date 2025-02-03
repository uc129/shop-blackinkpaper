'use client'

import { CartItemType, CartType } from '@/app/api/user/cart/model'
import { useAuthContext } from '../utils/authContext'
import toast from 'react-hot-toast'


export const useCartAccess = () => {

    const { user } = useAuthContext()
    const cart = user?.cart

    async function addToCart({
        productId,
        quantity,
        price,
        total,
        size,
        frame,
        material
    }: CartItemType) {
        if (!user) {
            console.log('Please login to add items to cart')
            return
        }
        try {
            toast.loading('Adding to cart', { duration: 500 })

            const res = await fetch(`/api/user/cart?user=${user._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productId,
                    quantity,
                    price,
                    total,
                    size,
                    frame,
                    material
                })
            })
            const data = await res.json()
            if (data.status === 200) {
                console.log('Item added to cart')
                toast.success('Item added to cart')
                setTimeout(() => {
                    window.location.reload()
                }, 500)
            }
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    async function removeFromCart(itemId: string) {
        if (!user) {
            console.log('Please login to remove items from cart')
            return
        }
        toast.loading('Removing item from cart', { duration: 500 })
        try {
            const res = await fetch(`/api/user/cart?user=${user._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    itemId
                })
            })
            const data = await res.json()
            if (data.status === 200) {
                console.log('Item removed from cart')
                toast.success('Item removed from cart')
                setTimeout(() => {
                    window.location.reload()
                }, 500)
            }
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    async function updateCart(cart: CartType) {
        if (!user) {
            console.log('Please login to update cart')
            return
        }
        toast.loading('Updating cart', { duration: 500 })
        try {
            const res = await fetch(`/api/user/cart?user=${user._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cart)
            })
            const data = await res.json()
            if (data.status === 200) {
                console.log('Cart updated')
                toast.success('Cart updated')
                setTimeout(() => {
                    window.location.reload()
                }, 500)
            }
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    async function clearCart() {
        if (!user) {
            console.log('Please login to clear cart')
            return
        }
        toast.loading('Clearing cart', { duration: 500 })
        try {
            const res = await fetch(`/api/user/cart?user=${user._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await res.json()
            if (data.status === 200) {
                console.log('Cart cleared')
                toast.success('Cart cleared')
                setTimeout(() => {
                    window.location.reload()
                }, 500)
            }
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        {
            cart,
            addToCart,
            removeFromCart,
            updateCart,
            clearCart
        }
    )
}