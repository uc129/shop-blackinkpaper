'use client'
import { useParams } from "next/navigation"
import { NewReleaseCollections } from "../new-releases";
import { ArchitectureCollections } from "../architecture";
import { BotanyCollections } from "../botany";
import { AbstractCollections } from "../abstract";
import { StickerCollection } from "../sticker-collection";
import { FramedCollections } from "../frmaed-collections";
import { RolledCollections } from "../rolled-collections";
import { BestSellersCollections } from "../best-sellers";
import { FeaturedCollections } from "../featured-collection";


export default function CollectionsPage() {

    const { collectionName } = useParams();

    if (collectionName === "new-releases") return <NewReleaseCollections />
    else if (collectionName === "best-sellers") return <BestSellersCollections />
    else if (collectionName === "featured") return <FeaturedCollections />
    else if (collectionName === "architecture") return <ArchitectureCollections />
    else if (collectionName === "botany") return <BotanyCollections />
    else if (collectionName === "abstract") return <AbstractCollections />
    else if (collectionName === "stickers") return <StickerCollection />
    else if (collectionName === "framed") return <FramedCollections />
    else if (collectionName === "rolled") return <RolledCollections />
    else return <h1>Collection Not Found</h1>

}