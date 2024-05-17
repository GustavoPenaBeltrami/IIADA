"use client";

import Image from "next/image";
import Link from "next/link";
import { ActiveLink } from "./ActiveLink";
import { useState } from "react";
import { links } from "@/data/links";


const HeadBar = () => {
  const [open, setOpen] = useState(false);

  const handleMenu = () => {
    setOpen(!open);
  };

  return (
    <nav className={`w-full fixed z-20 headbar-bg header-border bg-white`}>
      <div className=" flex flex-row wrapper mx-auto max-w-[1200px] justify-between py-4 px-5 md:bg-transparent blue-bg">
        <Link href="/" className="logo-width md:block hidden">
          <Image
            src="/logo.webp"
            alt="Logo"
            height={100}
            width={100}
            objectFit="cover"
          />
        </Link>
        <div className=" w-full flex md:flex-row flex-col justify-end items-center mx-auto">
          <div className="md:hidden flex flex-row items-center justify-between w-full">
            <Link href="/" className="logo-width md:hidden block">
              <Image
                src="/logo.webp"
                alt="Logo"
                width={100}
                height={50}
                objectFit="cover"
              />
            </Link>
            <button
              onClick={handleMenu}
              className="focus:outline-none flex flex-row justify-end items-end"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                className="w-10 h-10"
              >
                <path
                  fill="white"
                  fillRule="evenodd"
                  d="M2 6h20v2H2zm0 5h20v2H2zm0 5h20v2H2z"
                />
              </svg>
            </button>
          </div>

          <div
            className={`${
              open ? "flex" : "hidden"
            } md:flex flex-col md:flex-row text-white xl:gap-7 justify-center
          gap-4 items-center font-semibold transition-all duration-700`}
          >
            {links.map((link) => (
              <ActiveLink
                key={link.href}
                path={link.href}
                text={link.label}
                options={link.options}
              />
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HeadBar;
