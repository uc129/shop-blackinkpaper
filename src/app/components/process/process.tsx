import Image from "next/image"
import CustomImage from "../Image/image"
import { ButtonWithLink } from "../buttons/buttonWithLink"



const ProcessData = [
    {
        id: 1,
        title: "Paris Architecture",
        description: "We design the perfect logo for your brand. We will work with you to create a logo that represents your brand and its values.",
        images: [
            "/process/paris/paris-1.png",
            "/process/paris/paris-2.png",
            "/process/paris/paris-3.png",
            "/process/paris/paris-4.png",
            "/process/paris/paris-5.png",
            "/process/paris/paris-6.png"
        ]
    },

    {
        id: 2,
        title: "Green Mansion",
        description: "We design the perfect logo for your brand. We will work with you to create a logo that represents your brand and its values.",
        images: [
            "/process/green-mansion/green-mansion-1.png",
            "/process/green-mansion/green-mansion-2.png",
            "/process/green-mansion/green-mansion-3.png",
            "/process/green-mansion/green-mansion-4.png",
            "/process/green-mansion/green-mansion-5.png",
            "/process/green-mansion/green-mansion-6.png",
            "/process/green-mansion/green-mansion-7.png",
            "/process/green-mansion/green-mansion-8.png"


        ],
        videos: [
            "/process/green-mansion/green-mansion-9.mp4"

        ]
    }


]


const ProcessSection = () => {


    return (
        <section>
            <div className="flex flex-col gap-8 ">
                {
                    ProcessData.map((process) => {
                        return (
                            <div key={process.id} className="border-b-[1px] border-gray-300 pb-8">

                                <h4 className="my-8"> {process.title}</h4>

                                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-12 items-center ">
                                    {
                                        process.images.map((image, index) => {
                                            return <CustomImage key={image + index} src={image} alt={process.title} width={300} className="rounded-md" />
                                        })
                                    }

                                    {
                                        process.videos?.map((video, index) => {
                                            return (
                                                <video key={video + index} autoPlay loop muted className="rounded-md">
                                                    <source src={video} type="video/mp4" />
                                                </video>
                                            )
                                        })
                                    }

                                    <div className="col-span-3">
                                        <h4>{process.title}</h4>
                                        <p>{process.description}</p>
                                    </div>
                                </div>

                                <ButtonWithLink className="my-4" buttonText="Shop Product" link="/shop/product/kemknevrn" />
                            </div>
                        )

                    })
                }
            </div>
        </section>
    )

}

export default ProcessSection