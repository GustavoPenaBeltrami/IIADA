import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex md:flex-row flex-col md:mt-16 mt-0 gap-10 pb-4">
      <div className="md:w-5/12 flex flex-col md:pt-14 pt-6">
        <h1 className="text-[38px] font-bold mb-6 custom-black">IIADA Education Center: Empowering Dealerships</h1>
        <p className="mt-2 text-[19px] custom-black">
          Explore our comprehensive automotive education center. Specialized training for independent dealerships. Empower your business with our courses designed for success in the automotive industry.
        </p>
        <Link href="/courses" className="w-fit block mt-10 blue-bg p-4 px-6 rounded-xl login-button text-white font-normal text-xl transition-all duration-300">See all courses</Link>
      </div>
      <div className="md:w-7/12">
        <Image src="/landing-image.webp" alt="Hero Image" width={700} height={1000} className="rounded-2xl" objectFit="cover"/>
      </div>

    </div>

  );
}
