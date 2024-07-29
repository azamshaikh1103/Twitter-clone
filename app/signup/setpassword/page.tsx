"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function () {
  const router = useRouter();
  const [confPassword, setConfPassword] = useState();
  const [password, setPassword] = useState();

  return (
    <div className=" w-screen h-screen bg-transparent flex justify-center items-center">
      <div className=" w-1/2 h-1/2 bg-white flex flex-col justify-center items-center">
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className=" px-10 py-2 my-2 rounded-full font-bold"
        />

        <input
          type="password"
          onChange={(e) => setConfPassword(e.target.value)}
          placeholder="Confirm Password"
          className=" px-10 py-2 my-2 rounded-full font-bold"
        />
        <button
          onClick={() => router.push("/user/home")}
          className=" px-10 py-2 my-2 rounded-full bg-blue-600 text-white font-bold"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
