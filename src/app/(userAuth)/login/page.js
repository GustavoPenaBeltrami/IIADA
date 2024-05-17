"use client"
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-[80vh]">
      <h1 className="text-4xl font-bold text-center pt-20 pb-5">Login</h1>
      <form className="flex flex-col md:w-1/3 w-11/12 mx-auto">
        <label className="text-md font-semibold">E-mail</label>
        <input className="border border-gray-400 p-2 rounded-lg mb-3 outline-none" type="text" />
        <label className="text-md font-semibold outline-none">Password</label>
        <input className="border border-gray-400 p-2 rounded-lg mb-3 outline-none" type="password" />
        <div className="flex flex-row justify-between pr-2">
          <div className="flex flex-row gap-2 items-start mb-3">
            <input type="checkbox" className="ml-2 translate-y-1" />
            <label className="text-sm">Remember me</label>
          </div>
          <Link href="/forget-password" className="custom-text font-semibold text-sm">Forget Password?</Link>
        </div>
        <button className="login-button text-white p-2 rounded-lg transition duration-300 mb-3">Login</button>
        <div className="flex flex-row justify-center">
          <p className="text-sm">Don't have an account?</p>
          <Link href="/register" className="custom-text font-semibold text-sm ml-2">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}
