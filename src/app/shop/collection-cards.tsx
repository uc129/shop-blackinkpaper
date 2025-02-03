'use client'
import Link from "next/link";
import CustomImage from "../components/Image/image";
import { useRouter } from "next/navigation";

export type CollectionCardProps = {
    title: string;
    image: string;
    link: string
}

export default function CollectionCard(props: CollectionCardProps) {
    const router = useRouter();
    return (
        <Link href={props.link} className="mb-8 cursor-pointer">
            <div>
                <CustomImage src={props.image} alt={props.title} width={500} />
            </div>
            <div>
                <p className="uppercase text-center text-xl">{props.title}</p>
            </div>
        </Link>
    );
}