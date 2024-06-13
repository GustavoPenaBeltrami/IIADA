"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const ActiveLink = ({ path, text }) => {
  const currentPath = usePathname();
  const [session, setSession] = useState(null);

  useEffect(() => {
    const user = sessionStorage.getItem("session");

    if (!session || !user) {
      fetch("/api/auth/")
        .then((res) => res.json())
        .then((data) => {
          setSession(data.session);
          sessionStorage.setItem("session", JSON.stringify(data.session));
        });
    } else{
      setSession(JSON.parse(user));
    }
},[currentPath]);
  
  if (
    (session && text === "Login") ||
    (!session && text === "Logout") ||
    (!session && text === "My account") ||
    (!session && text === "My courses")
  ) {
    return null;
  }

  if (session && text === "Logout") {
    return (
      <button
        className=" flex text-center flex-row items-center justify-center mx-auto transition-all duration-300 nav-text lightblue-hover login-button p-2 px-3 rounded-md no-underline"
        onClick={() => {
          sessionStorage.clear();
          setSession(null);
          signOut()
        }}
      >
        Logout
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            className="ml-2 transition-all duration-300"
        >
          <path
              fill="white"
              className=" transition-all duration-300"
            d="M3 5c0-1.1.9-2 2-2h8v2H5v14h8v2H5c-1.1 0-2-.9-2-2zm14.176 6L14.64 8.464l1.414-1.414l4.95 4.95l-4.95 4.95l-1.414-1.414L17.176 13H10.59v-2z"
          />
        </svg>
      </button>
    );
  }

  return (
    <div className="min-w-max">
      <Link
        href={path}
        className={`flex text-center flex-row items-center justify-center mx-auto transition-all duration-300 nav-text lightblue-hover ${
          currentPath === path ? "underline" : ""
        } ${
          text === "Login"
            ? "login-button p-2 px-3 rounded-md no-underline"
            : ""
        }`}
      >
        {text === "Login" && (
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
        )}
        {text}
      </Link>
    </div>
  );
};
