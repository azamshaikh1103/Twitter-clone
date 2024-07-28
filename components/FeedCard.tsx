import React from "react";
import Image from "next/image";
import { SlOptions } from "react-icons/sl";
import { MdOutlineChatBubbleOutline } from "react-icons/md";
import { AiOutlineRetweet } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { ImStatsBars } from "react-icons/im";
import { FaRegBookmark } from "react-icons/fa";
import { LuShare } from "react-icons/lu";

const FeedCard: React.FC = () => {
  return (
    <div className="grid grid-cols-12 pl-4 pt-3 border-b dark:border-[#2f3336] hover:bg-[#f7f7f7] dark:hover:bg-[#181818] transition-all cursor-pointer">
      <div className="col-span-1">
        <Image
          className="rounded-full"
          src="https://avatars.githubusercontent.com/u/140999593?v=4"
          alt="profile"
          height={45}
          width={45}
        />
      </div>
      <div className="pl-4 text-md col-span-11 dark:text-white">
        <div className="flex justify-between items-center pr-4">
          <div className="font-bold">
            <span className=" border-b-2 border-transparent dark:hover:border-[#181818]">
              Azam Ali Shaikh
            </span>
            <span className="pl-1 font-medium text-slate-400">@azamshaikh</span>
            <span className=" pl-1 font-medium text-slate-400">~ Mar 12</span>
          </div>
          <SlOptions className="text-gray-600 hover:bg-blue-100  dark:hover:bg-[#232323]  transition-all h-fit w-fit p-2 rounded-full" />
        </div>
        <div className=" py-2 pr-4 font-medium">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
          fugit dolore quaerat? Ducimus qui excepturi molestiae sit nulla
          reprehenderit quos est sequi repellat, sapiente quidem fugit impedit,
          praesentium odit fugiat reiciendis itaque quia delectus dicta? Harum
          dolorem nihil placeat facilis, ex recusandae qui blanditiis quidem
          quod nesciunt necessitatibus fugit odit.
        </div>
        <div className=" pb-4 flex justify-between items-center text-lg text-gray-500">
          <span className=" flex items-center">
            <MdOutlineChatBubbleOutline className="hover:bg-blue-100 dark:hover:bg-[#262d36] transition-all h-fit w-fit p-2 rounded-full" />
            <p className=" text-sm font-semibold">284</p>
          </span>
          <span className=" flex items-center">
            <AiOutlineRetweet className="hover:bg-green-100  dark:hover:bg-[#27382d] transition-all h-fit w-fit p-2 rounded-full" />
            <p className=" text-sm font-semibold">284</p>
          </span>
          <span className=" flex items-center">
            <FaRegHeart className="hover:bg-red-100 dark:hover:bg-[#342424] transition-all h-fit w-fit p-2 rounded-full" />
            <p className=" text-sm font-semibold">284</p>
          </span>
          <span className=" flex items-center">
            <ImStatsBars className="hover:bg-blue-100 dark:hover:bg-[#262d36]  transition-all h-fit w-fit p-2 rounded-full" />
            <p className=" text-sm font-semibold">284</p>
          </span>
          <div className="flex">
            <FaRegBookmark className="hover:bg-blue-100  dark:hover:bg-[#262d36] transition-all h-fit w-fit p-2 rounded-full" />
            <LuShare className="hover:bg-blue-100  dark:hover:bg-[#262d36] transition-all h-fit w-fit p-2 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
