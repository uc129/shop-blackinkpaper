'use client'

import CustomImage from "@/app/components/Image/image"
import { ProductType } from "../../api/products/model"
import { CartType } from "../../api/user/cart/model"
import { useCartAccess } from "@/app/lib/cart-access/cart-access"



export const CartUI = ({ cart, products, showRemoveButton }: { cart: CartType, products: ProductType[], showRemoveButton: boolean }) => {

    const { removeFromCart } = useCartAccess()
    const grandTotalInRupees = cart.grandTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

    return (
        <div className="flex flex-col gap-4 ">
            <div className=" border-2 border-black  flex flex-wrap justify-around p-12 gap-12">
                {
                    cart.items.map((item, index) => {
                        const title = products.find(product => product._id === item.productId)?.title
                        const price_before_discount = products.find(product => product._id === item.productId)?.price
                        const image = products.find(product => product._id === item.productId)?.image_urls[0]
                        return (
                            <div key={item.productId as unknown as string +
                                item.size.size +
                                item.frame.frame +
                                item.material.material}
                            >
                                {/* <img src={item.image} alt={item.title} className="w-24" /> */}
                                <div>
                                    {image &&
                                        <div className="flex items-center justify-center h-80 overflow-hidden">
                                            <CustomImage src={image!} alt={title!} width={100} height={100} />
                                        </div>
                                    }
                                    <div className=" flex flex-col gap-4">
                                        <h4>{title}</h4>
                                        <div className="grid grid-cols-2 gap-4"><span>Base Price</span>Rs. {price_before_discount}</div>

                                        <div className="grid grid-cols-2 gap-4"><span>Discounted Price</span>Rs. {item.price}</div>


                                        <div className="grid grid-cols-2 gap-4">
                                            <p>Size:{item.size.size}</p>
                                            <p>Rs. {item.size.priceJump}</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <p>Frame:{item.frame.frame}</p>
                                            <p>Rs. {item.frame.priceJump}</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <p>Material:{item.material.material}</p>
                                            <p>Rs. {item.material.priceJump}</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4"><span>Item Quantity</span> {item.quantity}</div>


                                        <div className="grid grid-cols-2 gap-4"><span>Item Total:</span> {item.total}</div>
                                    </div>
                                </div>
                                {showRemoveButton &&
                                    <button
                                        onClick={() =>
                                            removeFromCart(item._id as unknown as string)
                                        }>Remove
                                    </button>
                                }
                            </div>
                        )
                    })
                }

            </div>
            <div className="border-2 border-black p-12 h-44 flex flex-col justify-center">
                <h6>Total Items:{cart.totalItems}</h6>
                <h4>Grand Total: {grandTotalInRupees}</h4>
            </div>
        </div>
    )
}