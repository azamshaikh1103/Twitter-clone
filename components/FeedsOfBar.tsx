"use client";

import { useState } from "react";

export function FeedsOfBar() {
  const [selected, setSelected] = useState("forYou");

  return (
    <div className=" w-[630px] h-14 fixed z-20 top-0 bg-white/50 dark:bg-black/60 dark:text-white backdrop-blur-xl flex border-b  dark:border-[#2f3336] items-center cursor-pointer">
      <div
        className=" w-1/2 h-full flex items-center justify-center hover:bg-slate-100 dark:hover:bg-[#181818]"
        onClick={() => setSelected("forYou")}
      >
        <span
          className={` border-b-4 pt-4 ${
            selected === "forYou"
              ? "border-[#1d9bf0] font-bold"
              : "border-transparent font-medium"
          } py-[13px]`}
        >
          For you
        </span>
      </div>
      <div
        className=" w-1/2 h-full flex items-center justify-center hover:bg-slate-100 dark:hover:bg-[#181818]"
        onClick={() => setSelected("following")}
      >
        <span
          className={` border-b-4 pt-4 ${
            selected === "following"
              ? "border-[#1d9bf0] font-bold"
              : "border-transparent font-medium"
          } py-[13px]`}
        >
          Following
        </span>
      </div>
    </div>
  );
}
