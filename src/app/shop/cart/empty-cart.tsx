import Link from "next/link"


export const EmptyCart = () => {
    return (
        <div className="flex flex-col items-center justify-center h-96">
            <h1 className="text-2xl">Your Cart is Empty</h1>
            <p className="text-lg">Looks like you haven't added any items to your cart yet.</p>
            <Link href="/shop"> Continue Shopping</Link>
        </div>
    )
}