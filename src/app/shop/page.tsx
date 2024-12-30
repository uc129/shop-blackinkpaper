import CollectionCard, { CollectionCardProps } from "./collection-cards";

const CollectionsData: CollectionCardProps[] = [
    {
        title: "Architecture",
        image: "https://picsum.photos/800",
        link: "/shop/collections/architecture"
    },
    {
        title: "Best Sellers",
        image: "https://picsum.photos/800",
        link: "/shop/collections/bestSellers"
    },
    {
        title: "Framed",
        image: "https://picsum.photos/800",
        link: "/shop/collections/framed"
    },
    {
        title: "Abstract",
        image: "https://picsum.photos/800",
        link: "/shop/collections/abstract"
    },
    {
        title: "Stickers",
        image: "https://picsum.photos/800",
        link: "/shop/collections/stickers"
    },
    {
        title: "Rolled",
        image: "https://picsum.photos/800",
        link: "/shop/collections/rolled"
    },
    {
        title: "New Releases",
        image: "https://picsum.photos/800",
        link: "/shop/collections/newReleases"
    },
    {
        title: "Featured",
        image: "https://picsum.photos/800",
        link: "/shop/collections/featured"
    },

    {
        title: "Botany",
        image: "https://picsum.photos/800",
        link: "/shop/collections/botany"
    },
    {
        title: "People",
        image: "https://picsum.photos/800",
        link: "/shop/collections/people"
    },
    {
        title: "Urban",
        image: "https://picsum.photos/800",
        link: "/shop/collections/urban"
    }


]


export default function ShopPage() {
    return (
        <div className="px-12 flex flex-col gap-8">
            <h1 className="uppercase text-center">Collection List</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
                {
                    CollectionsData.map((collection, index) => {
                        return (
                            <div key={index}>
                                <CollectionCard {...collection} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}