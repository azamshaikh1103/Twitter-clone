"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <div className=" h-screen w-screen flex flex-col justify-center items-center">
      <h1 className=" text-xl font-bold py-3">Sign In</h1>
      <button
        onClick={() => signIn("google")}
        className=" px-10 py-2 my-2 rounded-full bg-blue-600 text-white font-bold"
      >
        Sign in with Google
      </button>
      <button
        onClick={() => signIn("github")}
        className=" px-10 py-2 my-2 rounded-full bg-blue-600 text-white font-bold"
      >
        Sign in with GitHub
      </button>
      <input
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className=" px-10 py-2 my-2 rounded-full font-bold"
      />

      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className=" px-10 py-2 my-2 rounded-full font-bold"
      />
      <button
        onClick={() => {
          const res = signIn("credentials", {
            email,
            password,
            redirect: false,
          });
          console.log(res);
        }}
        className=" px-10 py-2 my-2 rounded-full bg-blue-600 text-white font-bold"
      >
        Submit
      </button>

      <h1>Don't have an account?</h1>
      <button
        onClick={() => router.push("/signup")}
        className=" px-10 py-2 my-2 rounded-full bg-blue-600 text-white font-bold"
      >
        Sign up
      </button>
    </div>
  );
}
