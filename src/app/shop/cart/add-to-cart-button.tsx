'use client'

import { ProductType } from "@/app/api/products/model"
import { CustomTextInput } from "@/app/components/form-components/inputs/custom-text-input"
import { useCartAccess } from "@/app/lib/cart-access/cart-access"
import { useAuthContext } from "@/app/lib/utils/authContext"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

const SIZES = [
    {
        size: "S",
        priceJump: 0
    },
    {
        size: "M",
        priceJump: 1200
    },
    {
        size: "L",
        priceJump: 1800
    },
    {
        size: "XL",
        priceJump: 2400
    }
]

const FRAMES = [
    {
        frame: "Black",
        priceJump: 1200
    },
    {
        frame: "White",
        priceJump: 1200
    },
    {
        frame: "Brown",
        priceJump: 1200
    },
    {
        frame: "Gold",
        priceJump: 1500
    },
    {
        frame: "rolled",
        priceJump: 0
    }
]

const MATERIALS = [
    {
        material: "Canvas",
        priceJump: 0
    },
    {
        material: "Paper",
        priceJump: -500
    },
    {
        material: "Matte",
        priceJump: 500
    },
    {
        material: "Glossy",
        priceJump: 1000
    }
]

export type AddToCartButtonProps = {
    product: ProductType
}


export const AddToCartButton = (props: AddToCartButtonProps) => {

    const router = useRouter()

    const { isAuthenticated, user } = useAuthContext()

    const { addToCart } = useCartAccess()

    const [productDetails, setProductDetails] = useState({
        productId: props.product._id,
        quantity: 1,
        price: props.product.price_after_discount,
        total: props.product.price_after_discount,
        size: {
            size: "S",
            priceJump: 0
        },
        frame: {
            frame: "rolled",
            priceJump: 0
        },
        material: {
            material: "Canvas",
            priceJump: 0
        }
    })

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProductDetails({
            ...productDetails,
            quantity: parseInt(e.target.value),
        })
    }

    const handleSizeChange = (e: React.MouseEvent<HTMLButtonElement>) => {
        setProductDetails({
            ...productDetails,
            size: {
                size: e.currentTarget.dataset.size || "",
                priceJump: parseInt(e.currentTarget.dataset.price || "0")
            },
        })
    }

    const handleFrameChange = (e: React.MouseEvent<HTMLButtonElement>) => {
        setProductDetails({
            ...productDetails,
            frame: {
                frame: e.currentTarget.dataset.frame || "",
                priceJump: parseInt(e.currentTarget.dataset.price || "0")
            },
        })
    }

    const handleMaterialChange = (e: React.MouseEvent<HTMLButtonElement>) => {
        setProductDetails({
            ...productDetails,
            material: {
                material: e.currentTarget.dataset.material || "",
                priceJump: parseInt(e.currentTarget.dataset.price || "0")
            },
        })
    }

    useEffect(() => {
        const total = productDetails.price + productDetails.size.priceJump + productDetails.frame.priceJump + productDetails.material.priceJump
        setProductDetails({
            ...productDetails,
            total
        })
    }, [productDetails.size, productDetails.frame, productDetails.material, productDetails.quantity])


    const handleAddToCart = () => {
        if (!isAuthenticated) {
            console.log('Please login to add items to cart')
            router.push('/login')
            return
        }

        if (productDetails.size.size === "" || productDetails.frame.frame === "" || productDetails.material.material === "") {
            toast.error('Please select size, frame and material')
            return
        }
        if (productDetails.quantity < 1) {
            toast.error('Quantity must be greater than 0')
        }
        if (!productDetails.total) {
            toast.error('Total must be greater than 0')
        }

        console.log(productDetails)

        addToCart({
            productId: productDetails.productId,
            quantity: productDetails.quantity,
            price: productDetails.price,
            total: productDetails.total,
            size: productDetails.size,
            frame: productDetails.frame,
            material: productDetails.material
        })
    }



    return (
        <div>
            <div className="flex flex-col">

                <div>
                    {SIZES.map((size, index) => {
                        return (
                            <button key={index}
                                data-size={size.size}
                                data-price={size.priceJump}
                                className={`p-2 border-2 border-black ${productDetails.size.size === size.size ? 'bg-black text-white' : ''}`}
                                onClick={handleSizeChange}
                            >
                                {size.size}
                            </button>
                        )
                    })}
                </div>

                <div>
                    {
                        FRAMES.map((frame, index) => {
                            return (
                                <button key={index}
                                    data-frame={frame.frame}
                                    data-price={frame.priceJump}
                                    className={`p-2 border-2 border-black ${productDetails.frame.frame === frame.frame ? 'bg-black text-white' : ''}`}
                                    onClick={handleFrameChange}
                                >
                                    {frame.frame}
                                </button>
                            )
                        })
                    }
                </div>

                <div>
                    {
                        MATERIALS.map((material, index) => {
                            return (
                                <button key={index}
                                    data-material={material.material}
                                    data-price={material.priceJump}
                                    className={`p-2 border-2 border-black ${productDetails.material.material === material.material ? 'bg-black text-white' : ''}`}
                                    onClick={handleMaterialChange}
                                >
                                    {material.material}
                                </button>
                            )
                        })
                    }
                </div>

                <div>
                    <CustomTextInput
                        label="Quantity"
                        type="number"
                        name="quantity"
                        min={1}
                        max={100}
                        value={productDetails.quantity.toString()}
                        onChange={handleQuantityChange} />
                </div>

                {isAuthenticated ? <button onClick={handleAddToCart}>Add to Cart</button>
                    : <button onClick={() => router.push('/login')}>Login to Add to Cart</button>
                }

            </div>
        </div>
    )
}