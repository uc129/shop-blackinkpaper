'use client'
import { ProductType } from "@/app/api/products/model";
import CustomImage from "@/app/components/Image/image";
import { useRouter } from "next/navigation";

export type ProductCardProps = {
    product: ProductType;
    link: string;
}

export const ProductCard = (props: ProductCardProps) => {
    const router = useRouter()
    const price_after_discount = props.product.price - (props.product.price * props.product.discount / 100)


    return (
        <div key={props.product._id as unknown as string} onClick={() => router.push(props.link)}
            className="flex flex-col  gap-4 border-b-[1px] border-gray-100 md:border-none py-4">
            <div className="min-h-[340px] p-4 cursor-pointer">
                <CustomImage src={props.product.image_urls[0]} alt={props.product.title} width={500} />
            </div>
            <div className="text-center">
                <p>{props.product.title}</p>
                <div className={`flex gap-4 items-center justify-center  
                    ${props.product.discount > 0 ? 'grid-cols-2' : 'grid-cols-1'} `}
                >
                    <p className={`${props.product.discount > 0 ? 'line-through ' : ''}`}>
                        Rs.{props.product.price}</p>

                    {props.product.discount > 0 &&
                        <p className="">
                            <span className="text-sm">From Rs.</span>
                            {price_after_discount}
                        </p>
                    }
                </div>
                {
                    props.product.discount > 0 &&
                    <p className="text-red-500">{props.product.discount}% off</p>
                }

            </div>
        </div>
    )

}