"use client"

export default function ForgetPasswordPage() {
  return (
    <div className="min-h-[80vh]">
      <h1 className="text-4xl font-bold text-center pt-20 pb-5">Forget Password</h1>
      <p className="flex flex-col md:w-1/3 w-11/12 mx-auto mt-2 mb-5">Send a password reset request to your email</p>
      <form className="flex flex-col md:w-1/3 w-11/12 mx-auto">
        <label className="text-md font-semibold">E-mail</label>
        <input className="border border-gray-400 p-2 rounded-lg mb-3 outline-none" type="text" />
        <button className="special-button text-white p-2 rounded-lg transition duration-300 mb-3 mt-3">Send</button>
      </form>
    </div>
  );
}
