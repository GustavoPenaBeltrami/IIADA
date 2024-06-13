import Image from "next/image";
import Link from "next/link";
import { links } from "../data/links";

export const Footer = () => {
  return (
    <div className="bg-[#005FAC] min-h-[250px] mt-10 w-full">
      <div className=" grid lg:grid-cols-3 grid-cols-2 w-[90%] mx-auto max-w-[1200px] pt-10 gap-y-10">
        <div className="flex flex-col">
          <Link
            href="https://www.indianaiada.com"
            target="_blank"
            className="text-white text-md mt-2 font-bold hover:underline"
          >
            Indiana Independent Automobile Dealers Association
          </Link>
          <p className="text-white text-sm mt-4">P.O. Box 206</p>
          <p className="text-white text-sm mt-2">
            North Manchester, IN 46962 (260) 445-5356
          </p>
          <p className="text-white text-sm mt-2">
            executivedirector@indianaiada.com
          </p>
        </div>
        <div className="flex flex-col gap-y-4 justify-center items-center">
          <Link
            href="/"
            className={`text-white text-md mt-2 font-bold hover:underline`}
          >
            Home
          </Link>
          <Link
            href="/catalog"
            className={`text-white text-md mt-2 font-bold hover:underline`}
          >
            Catalog
          </Link>
          <Link
            href="/about-us"
            className={`text-white text-md mt-2 font-bold hover:underline`}
          >
            About Us
          </Link>
        </div>
        <div className="lg:col-span-1 col-span-2 mb-10 lg:mb-0">
          <Image
            src="/naylor-association.webp"
            alt="Hero Image"
            width={300}
            height={200}
            className="mx-auto"
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  );
};
