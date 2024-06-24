"use client"

import { useForm } from "react-hook-form";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const { register, watch, handleSubmit, reset, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const password = watch("password");
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    setIsLoading(false);
    if (res.ok) {

      toast.success("Account created successfully");
      // falta llevarlo a ponerse nombre
      reset();

      await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false
      })

      router.refresh();
      router.push("/");

    } else {
      const error = await res.json();
      toast.error(error.message == "User already exist" ? "User already exist" : "An error occurred");
    }
  })

  return (
    <div className="min-h-[80vh]">
      <h1 className="text-4xl font-bold text-center pt-20 pb-5">Register</h1>

      <form className="flex flex-col md:w-1/3 w-11/12 mx-auto" onSubmit={onSubmit}>

      <label className="text-md font-semibold">Name</label>
        <input className="border border-gray-400 p-2 rounded-lg outline-none" type="text" {...(register("name", { required: true }))} />
        {errors.name && <p className="text-slate-400 italic text-sm mt-1 ml-2">Name required</p>}

        <label className="text-md font-semibold mt-3">Last name</label>
        <input className="border border-gray-400 p-2 rounded-lg outline-none" type="text" {...(register("lastName", { required: true }))} />
        {errors.lastName && <p className="text-slate-400 italic text-sm mt-1 ml-2">Last name required</p>}

        <label className="text-md font-semibold mt-3">E-mail</label>
        <input className="border border-gray-400 p-2 rounded-lg outline-none" type="email" {...(register("email", { required: true }))} />
        {errors.email && <p className="text-slate-400 italic text-sm mt-1 ml-2">Email required</p>}

        <label className="text-md font-semibold outline-none mt-3">Password</label>
        <input
          className="border border-gray-400 p-2 rounded-lg outline-none"
          type="password"
          {...register("password", {
            required: "Password required",
            minLength: {
              value: 8,
              message: "Password must have at least 8 characters"
            },
            validate: {
              hasNumber: value => /[0-9]/.test(value) || "Password must include at least one number",
              hasLetter: value => /[a-zA-Z]/.test(value) || "Password must include at least one letter",
              hasSpecial: value => /[^a-zA-Z0-9]/.test(value) || "Password must include at least one special character"
            }
          })}
        />
        {errors.password && <p className="text-slate-400 italic text-sm mt-1 ml-2">{errors.password.message}</p>}
        <label className="text-md font-semibold outline-none mt-3">Confirm password</label>
        <input
          className="border border-gray-400 p-2 rounded-lg outline-none"
          type="password"
          {...register("confirmPassword", {
            required: "Please confirm the password",
            validate: value =>
              value === password || "The passwords do not match"
          })}
        />
        {errors.confirmPassword && <p className="text-slate-400 italic text-sm mt-1 ml-2">{errors.confirmPassword.message}</p>}
        <button className="special-button text-white p-2 rounded-lg transition duration-300 mb-3 mt-6">{
          isLoading ? "Loading..." : "Register"
        }</button>

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
