"use client"
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

export default function LoginPage() {


  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false
    })

    if (res.error) {
      toast.error("Invalid email or password");
      reset();
    } else {
      router.refresh();
      router.push("/");
    }
    setIsLoading(false);
  })


  return (
    <div className="min-h-[80vh]">
      <h1 className="text-4xl font-bold text-center pt-20 pb-5">Login</h1>
      <form className="flex flex-col md:w-1/3 w-11/12 mx-auto" onSubmit={onSubmit}>

        <label className="text-md font-semibold">E-mail</label>
        <input className="border border-gray-400 p-2 rounded-lg outline-none" type="email" {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address"
          }
        })}
          placeholder="email"
        />
        {errors.email && <p className="text-slate-400 italic text-sm mt-1 ml-2 mb-3">{errors.email.message}</p>}


        <label className="text-md font-semibold outline-none">Password</label>
        <input
          placeholder="********" className="border border-gray-400 p-2 rounded-lg outline-none" type="password" {...(register("password", { required: true }))} />
        {errors.password && <p className="text-slate-400 italic text-sm mt-1 ml-2 mb-3">Password required</p>}


        <div className="flex flex-row justify-between pr-2  mt-2">
          <div className="flex flex-row gap-2 items-start mb-3">
            <input type="checkbox" className="ml-2 translate-y-1" />
            <label className="text-sm">Remember me</label>
          </div>
          <Link href="/forget-password" className="custom-text font-semibold text-sm">Forget Password?</Link>
        </div>
        <button type="submit" className="special-button text-white p-2 rounded-lg transition duration-300 mb-3">{isLoading ? "Loading..." : "Login"}</button>
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
