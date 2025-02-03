'use client'
import { ProductType } from "@/app/api/products/model";
import CustomImage from "@/app/components/Image/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export type ProductCardProps = {
    product: ProductType;
    link: string;
}

export const ProductCard = (props: ProductCardProps) => {
    const router = useRouter()
    const price_after_discount = props.product.price - (props.product.price * props.product.discount / 100)


    return (
        <Link href={props.link} key={props.product._id as unknown as string}
            className="flex flex-col w-96 md:w-80 justify-between gap-8 border-b-[1px] border-gray-100 md:border-none  p-4 rounded-xl ">

            <div className="overflow-hidden mx-auto min-h-[200px]  border-2 border-black  rounded-xl p-4" >
                {props.product.image_urls[0] !== '' &&
                    <CustomImage src={props.product.image_urls[0]} alt={props.product.title} width={300} className="" />}
            </div>

            <div className="text-center border-2 border-black hover:bg-gray-200 rounded-xl p-4 min-h-[100px] flex flex-col justify-center gap-2">
                <p className="uppercase">{props.product.title}</p>
                <div className={`flex gap-4 items-center justify-center  ${props.product.discount > 0 ? 'grid-cols-2' : 'grid-cols-1'} `} >
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

        </Link>
    )

}