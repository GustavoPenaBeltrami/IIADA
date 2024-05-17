"use client"
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-[80vh]">
      <h1 className="text-4xl font-bold text-center pt-20 pb-5">Register</h1>
      <form className="flex flex-col md:w-1/3 w-11/12 mx-auto">
        <label className="text-md font-semibold">E-mail</label>
        <input className="border border-gray-400 p-2 rounded-lg mb-3 outline-none" type="text" />
        <label className="text-md font-semibold outline-none">Password</label>
        <input className="border border-gray-400 p-2 rounded-lg mb-3 outline-none" type="password" />
        <label className="text-md font-semibold outline-none">Repeat password</label>
        <input className="border border-gray-400 p-2 rounded-lg mb-3 outline-none" type="password" />
        <button className="login-button text-white p-2 rounded-lg transition duration-300 mb-3 mt-3">Login</button>
        <div className="flex flex-row justify-center">
          <p className="text-sm">Already registered?</p>
          <Link href="/login" className="custom-text font-semibold text-sm ml-2">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
