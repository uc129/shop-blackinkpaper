'use client'
import { useDataStore } from "@/app/lib/data-store/store";
import { useAuthContext } from "@/app/lib/utils/authContext";
import Link from "next/link";
import { EmptyCart } from "./empty-cart";
import { useCartAccess } from "@/app/lib/cart-access/cart-access";
import CustomImage from "@/app/components/Image/image";
import { CartUI } from "./cart-ui";




export default function CartPage() {

    const { user } = useAuthContext();
    const { products } = useDataStore();
    const cart = user?.cart;
    const { removeFromCart, clearCart } = useCartAccess()


    const handleClearCart = async (e: React.MouseEvent) => {
        e.preventDefault()
        const res = await clearCart();

    }


    if (!user) return <Link href="/login">Login to view cart</Link>

    if (!cart) {
        return <EmptyCart />
    }

    else if (cart.items.length === 0) {
        return (
            <div>
                {cart.totalItems}
                {cart.grandTotal}
            </div>
        )
    }

    return (
        <div className="p-12 flex flex-col gap-12">

            <CartUI
                cart={cart}
                products={products}
                showRemoveButton={true}
            />


            <div>
                <button onClick={handleClearCart}>
                    Clear Cart
                </button>
            </div>

            <div>
                <Link href="/shop/checkout">Proceed to Checkout</Link>
            </div>
        </div>
    )
}