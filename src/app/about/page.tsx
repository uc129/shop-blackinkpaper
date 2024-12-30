import Image from "next/image";
import CustomImage from "../components/Image/image";



export default function AboutPage() {


    return (
        <div className="p-12">
            <div className="flex flex-col items-center relative ">

                <div className="grid grid-cols-1 xl:grid-cols-6 items-end gap-12">
                    <div className="col-span-3 md:max-w-[600px]">
                        <CustomImage src="/sucharita-mukharjee.png" alt="about" width={1200} height={600} />
                    </div>

                    <div className="col-span-3">
                        <div className="flex flex-col gap-8">
                            <h1 className="text-7xl" style={{ wordBreak: 'break-word', wordWrap: 'break-word' }}>
                                ABOUT
                                <span> ✦ </span>
                                BLACKINKPAPER
                            </h1>
                            <h1> ⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜⎜ </h1>

                            <p className='text-2xl'>
                                Black Ink Paper is a small, independent publisher of books and other printed materials. We are dedicated to the production of high-quality,
                                well-designed books that are a pleasure to read and to hold.
                                Our books are printed on high-quality paper and bound with care, and we take pride in the craftsmanship of our products.
                                Founded in 2021, we strive to bring unique voices and stories to the forefront, offering a diverse range of genres and styles.
                                Our mission is to support emerging authors and provide readers with fresh, engaging content.
                            </p>
                            <p className="text-lg">
                                We are committed to sustainability and environmental responsibility, and we use eco-friendly materials and practices whenever possible.
                                Our books are printed on FSC-certified paper, and we work with local printers and suppliers to reduce our carbon footprint.
                                We also donate a portion of our profits to environmental causes, and we are always looking for ways to reduce waste and promote conservation.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
            <div>

            </div>
        </div>
    )
}