"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const ActiveLink = ({ path, text }) => {
  const currentPath = usePathname();

  return (
    <div className="min-w-max">
      <Link
        href={path}
        className={`flex text-center flex-row items-center justify-center mx-auto transition-all duration-300 nav-text lightblue-hover ${
          currentPath === path ? "underline" : ""
        } ${text === "Login" ? "login-button p-2 px-3 rounded-md no-underline" : ""}`}
      >
        {text === "Login" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            className="mr-2 transition-all duration-300"
          >
            <path
              fill="white"
              className=" transition-all duration-300"
              d="M19 10h1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V11a1 1 0 0 1 1-1h1V9a7 7 0 0 1 14 0zm-2 0V9A5 5 0 0 0 7 9v1zm-6 4v4h2v-4z"
            />
          </svg>
        ) : null}
        {text}
      </Link>
    </div>
  );
};
