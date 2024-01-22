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
    return(
        <div className="border-y border-gray-100 hover:bg-[#f7f7f7] transition-all cursor-pointer">
            <div className="grid grid-cols-12 px-6 pt-6">
                <div className="col-span-1">
                    <Image className="rounded-full" src="https://avatars.githubusercontent.com/u/140999593?v=4" alt="profile" height={50} width={50} />
                </div>
                <div className="px-4 text-md col-span-11">
                    <div className="flex justify-between items-center pr-4">
                        <div className="font-bold">
                            <span>Azam Ali Shaikh</span>
                            <span className="pl-4 font-medium text-slate-400">@azamshaikh</span>
                        </div>
                        <div><SlOptions className="text-gray-600"/></div>
                    </div>
                    <div className="py-2 font-medium">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                             Accusamus fugit dolore quaerat? Ducimus qui excepturi molestiae sit nulla reprehenderit quos est sequi repellat, sapiente quidem fugit impedit, praesentium odit fugiat reiciendis itaque quia delectus dicta? Harum dolorem nihil placeat facilis, ex recusandae qui blanditiis quidem quod nesciunt necessitatibus fugit odit.
                    </div>
                    <div className="flex justify-between items-center text-lg text-gray-600">
                        <MdOutlineChatBubbleOutline className="hover:bg-blue-100 transition-all h-fit w-fit p-2 rounded-full"/>
                        <AiOutlineRetweet className="hover:bg-green-100 transition-all h-fit w-fit p-2 rounded-full"/>
                        <FaRegHeart className="hover:bg-red-100 transition-all h-fit w-fit p-2 rounded-full"/>
                        <ImStatsBars className="hover:bg-blue-100 transition-all h-fit w-fit p-2 rounded-full"/>
                        <div className="flex">
                            <FaRegBookmark className="hover:bg-blue-100 transition-all h-fit w-fit p-2 rounded-full"/>
                            <LuShare className="hover:bg-blue-100 transition-all h-fit w-fit p-2 rounded-full"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FeedCard;