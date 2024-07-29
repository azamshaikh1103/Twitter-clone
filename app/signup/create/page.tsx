"use client";

import { useState } from "react";
import axios from "axios";

export default function UserForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    console.log("clicked");
    try {
      const response = await axios.post("/api/auth", {
        name,
        email,
        password,
      });

      console.log("User created successfully!", response.data);
    } catch (err) {
      console.error("An error occurred while creating the user:", err);
    }
  };

  return (
    <div className="w-screen h-screen bg-transparent flex justify-center items-center">
      <div className="w-1/2 h-1/2 bg-white flex flex-col justify-center items-center">
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="px-10 py-2 my-2 rounded-full font-bold"
        />
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="px-10 py-2 my-2 rounded-full font-bold"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="px-10 py-2 my-2 rounded-full font-bold"
        />
        <button
          onClick={handleSubmit}
          className="px-10 py-2 my-2 rounded-full bg-blue-600 text-white font-bold"
        >
          Next
        </button>
      </div>
    </div>
  );
}
