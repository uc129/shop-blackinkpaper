
'use client'
import { useParams } from "next/navigation";
import { useDataStore } from "@/app/lib/data-store/store";
import { ImageViewer } from "./image-viewer";

export default function ProductDetailPage() {
    const { id } = useParams();
    const { products, categories } = useDataStore();
    const product = products.find((product) => product._id.toString() === id);
    const productCats = product?.category.map((cat) => {
        const category = categories.find((category) => category?._id!.toString() === String(cat));
        return category?.title;
    });

    const productSizes = [
        {
            size: 'S',
            available: true
        },
        {
            size: 'M',
            available: true
        },
        {
            size: 'L',
            available: false
        },
        {
            size: 'XL',
            available: true
        },
        {
            size: 'XXL',
            available: true
        },
    ]

    const productMaterials = [
        {
            material: 'Matte Paper',
            available: true
        },
        {
            material: 'Canvas',
            available: true
        },
    ]

    const productFrames = [
        {
            frame: 'Black',
            available: true
        },
        {
            frame: 'White',
            available: true
        },
        {
            frame: 'Wooden',
            available: true
        },
        {
            frame: 'Metal',
            available: true
        },
        {
            frame: 'Rolled',
            available: true
        }
    ]

    const deliverySchedule = Date.now() + 7 * 24 * 60 * 60 * 1000;// 7 days from now

    const handleSizeOption = (e: React.MouseEvent) => {
        let size = (e.target as HTMLButtonElement).dataset.size;
        console.log(size);
    }


    if (!product) return <h1>Product not found</h1>
    return (
        <div className="p-12 ">
            <div className="flex gap-12">
                <div className="left ">
                    <ImageViewer image_urls={product.image_urls} />
                </div>
                <div className="right flex flex-col gap-8">
                    <h1>{product.title}</h1>
                    <p>Price: {product.price}</p>
                    <p>Category: {productCats!.join(',')}</p>
                    <p>{product.description}</p>
                    <div className="size flex gap-4">
                        {productSizes.map((size, index) => (
                            <button key={index} onClick={handleSizeOption} data-size={size.size}
                                disabled={!size.available}
                                className={`p-2 border-[1px] ${size.available ? 'border-black' : ''}`}>
                                {size.size}
                            </button>
                        ))}
                    </div>
                    <div className="material flex gap-4">
                        {productMaterials.map((material, index) => (
                            <button key={index} disabled={!material.available}
                                className={`p-2 border-[1px] ${material.available ? 'border-black' : ''}`}>
                                {material.material}
                            </button>
                        ))}
                    </div>
                    <div className="frame flex gap-4">
                        {productFrames.map((frame, index) => (
                            <button key={index} disabled={!frame.available}
                                className={`p-2 border-[1px] ${frame.available ? 'border-black' : ''}`}>
                                {frame.frame}
                            </button>
                        ))}
                    </div>
                    <div>
                        <button className="p-2 border-[1px] border-black w-full">Add to Cart</button>
                    </div>
                    <div>
                        <button className="p-2 border-[1px] border-black w-full">Buy Now</button>
                    </div>
                    <div>
                        <button className="p-2 border-[1px] border-black w-full">Add to Wishlist</button>
                    </div>
                    <div>
                        <p>Delivery Schedule: {new Date(deliverySchedule).toDateString()} if ordered in the next, {
                            Math.ceil((deliverySchedule - Date.now()) / (24 * 60 * 60 * 1000))
                        }hours</p>
                    </div>

                    <div>
                        <p>
                            Custom Sizes Available. Message Your Requirement on Whatsapp to +91-7358792364
                        </p>
                        <p>
                            Highest Quality Assurance
                        </p>
                        <p>
                            Free Shipping For Orders Over ₹2990
                        </p>
                        <p>
                            In stock, ready to ship
                        </p>

                    </div>

                    <div>
                        {product.description}
                    </div>
                    <div>
                        {product.sell_count} already sold
                    </div>
                </div>
            </div>
        </div>
    );
}