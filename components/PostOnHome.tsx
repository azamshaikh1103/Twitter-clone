"use client";

import Image from "next/image";
import TextareaAutosize from "react-textarea-autosize";

export function PostOnHome() {
  return (
    <div className=" h-auto grid grid-cols-12 pl-4 py-3 mt-14 border-b dark:border-[#2f3336] cursor-text">
      <div className="col-span-1">
        <Image
          className="rounded-full"
          src="https://avatars.githubusercontent.com/u/140999593?v=4"
          alt="profile"
          height={45}
          width={45}
        />
      </div>
      <div className="ml-4 text-md col-span-11">
        <TextareaAutosize
          className=" h-auto w-11/12 mr-6 mt-3 pb-3 text-lg dark:text-white bg-transparent outline-none resize-none overflow-hidden border-b dark:border-[#232323]"
          placeholder="What is happening?!"
          rows={1}
        />
        <div className=" flex justify-between my-2 mr-10 dark:text-white">
          <div>O O O O O O</div>
          <button className=" font-semibold bg-[#1d9bf0] text-white hover:bg-[#1a8cd8] w-[100px] p-1 rounded-full">
            POST
          </button>
        </div>
      </div>
    </div>
  );
}
