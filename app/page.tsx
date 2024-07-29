"use client";

import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "./lib/auth";
import { useRouter } from "next/navigation";

import { signOut } from "next-auth/react";

export default async function Home() {
  const router = useRouter();
  const session = await getServerSession(NEXT_AUTH);
  console.log(session);

  if (!session || !session.user) {
    router.push("/signin");
  }

  return (
    <>
      <p>Name: {session.user.name}</p>
      <p>Email: {session.user.email}</p>
      <p>
        Image: <img src={session.user.image} alt={session.user.name} />
      </p>

      <button
        onClick={() => signOut()}
        className=" px-10 py-2 my-2 rounded-full bg-blue-600 text-white font-bold"
      >
        Logout
      </button>
    </>
  );
}
