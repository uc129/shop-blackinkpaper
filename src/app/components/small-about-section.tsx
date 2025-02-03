import Image from "next/image"
import CustomImage from "./Image/image"




export const SmallAboutSection = () => {
    return (
        <div className="grid grid-cols-1 xl:grid-cols-5 items-center gap-24 text-justify">
            <div className="col-span-3 flex flex-col gap-12  ">
                <p className="text-lg ">Black Ink Paper is a brand that focuses on creating beautiful art prints that are perfect for your home or office. Our prints are inspired by nature, architecture, and everyday life. We believe that art should be accessible to everyone, which is why we offer high-quality prints at affordable prices. Whether you're looking for a statement piece or a subtle addition to your space, we have something for you. Our prints are printed on high-quality paper and are available in a variety of sizes to suit your needs. We hope you enjoy our prints as much as we enjoy creating them!
                </p>
                <p className="text-lg ">
                    Each of our prints is crafted with care and precision, using high-quality paper to ensure rich colors and fine details that bring every design to life. Available in a variety of sizes, our prints are designed to suit different spaces and preferences, allowing you to personalize your environment effortlessly. We take pride in creating artwork that not only enhances interiors but also inspires and uplifts. At Black Ink Paper, our passion for art is at the heart of everything we do, and we hope you love our prints as much as we love making them.
                </p>
            </div>
            <div className="col-span-2 flex gap-12">
                <CustomImage src="/art/bg/mansion.jpg" alt="about" width={800} height={800} className="" />
            </div>
        </div>
    )
}
