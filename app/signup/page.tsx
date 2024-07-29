"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  return (
    <div className=" h-screen w-screen flex flex-col justify-center items-center">
      <h1 className=" text-xl font-bold py-3">Sign Up</h1>
      <button
        onClick={() => signIn("google")}
        className=" px-10 py-2 my-2 rounded-full bg-blue-600 text-white font-bold"
      >
        Signup with Google
      </button>
      <button
        onClick={() => signIn("github")}
        className=" px-10 py-2 my-2 rounded-full bg-blue-600 text-white font-bold"
      >
        Signup with GitHub
      </button>
      <button
        onClick={() => router.push("/signup/create")}
        className=" px-10 py-2 my-2 rounded-full bg-blue-600 text-white font-bold"
      >
        Create Account
      </button>
      <h1>Already have an account?</h1>
      <button
        onClick={() => router.push("/signin")}
        className=" px-10 py-2 my-2 rounded-full bg-blue-600 text-white font-bold"
      >
        Sign in
      </button>
    </div>
  );
}
