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

    return (
        <div key={props.product._id as unknown as string} onClick={() => router.push(props.link)}
            className="flex flex-col gap-8 border-b-[1px] border-gray-100 md:border-none py-4">
            <div className="min-h-[320px] border-[1px] border-black p-4 cursor-pointer">
                <CustomImage src={props.product.image_urls[0]} alt={props.product.title} width={500} />
            </div>
            <div>
                <p>{props.product.title}</p>
                <p>{props.product.description}</p>
                <p>{props.product.price}</p>
            </div>
        </div>
    )

}