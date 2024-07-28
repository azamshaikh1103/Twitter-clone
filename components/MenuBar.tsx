import { FaXTwitter } from "react-icons/fa6";
import { HiMiniHome } from "react-icons/hi2";
import { PiHashBold } from "react-icons/pi";
import { BsBellFill } from "react-icons/bs";
import { RiMessage3Fill } from "react-icons/ri";
import { MdBookmarks } from "react-icons/md";
import { FaUserLarge } from "react-icons/fa6";
import { SlOptions } from "react-icons/sl";

import Image from "next/image";

interface TwitterSidebarButton {
  title: String;
  icon: React.ReactNode;
}

const sidebarMenuItems: TwitterSidebarButton[] = [
  {
    title: "Home",
    icon: <HiMiniHome />,
  },
  {
    title: "Explore",
    icon: <PiHashBold />,
  },
  {
    title: "Notifications",
    icon: <BsBellFill />,
  },
  {
    title: "Messages",
    icon: <RiMessage3Fill />,
  },
  {
    title: "Bookmarks",
    icon: <MdBookmarks />,
  },
  {
    title: "Profile",
    icon: <FaUserLarge />,
  },
];

export function MenuBar() {
  return (
    <div className=" w-3/12 px-6 flex flex-col justify-between">
      <div>
        <div className="text-3xl m-1 w-fit h-fit hover:bg-slate-200 dark:hover:bg-[#181818] cursor-pointer p-3 rounded-full transition-all">
          <FaXTwitter className=" text-black dark:text-white" />
        </div>
        <div className="mt-4 text-xl font-bold">
          <ul>
            {sidebarMenuItems.map((item, index) => (
              <li
                key={index}
                className="flex justify-start items-center gap-4 w-fit px-4 py-2 mt-1 rounded-3xl dark:text-white dark:hover:bg-[#181818] hover:bg-slate-100 cursor-pointer"
              >
                <span>{item.icon}</span>
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
          <button className=" text-lg font-semibold bg-[#1d9bf0] text-white hover:bg-[#1a8cd8] w-full mt-4 p-3 rounded-full">
            POST
          </button>
        </div>
      </div>

      <div className=" mb-2 flex items-center justify-between cursor-pointer hover:bg-slate-200 dark:hover:bg-[#181818] py-2 px-2 rounded-full">
        <Image
          className="rounded-full"
          src="https://avatars.githubusercontent.com/u/140999593?v=4"
          alt="profile"
          height={45}
          width={45}
        />
        <div className=" flex flex-col w-2/3">
          <span className=" text-base font-semibold dark:text-white">Azam Ali Shaikh</span>
          <span className=" text-sm font-medium text-slate-500">
            @azamshaikh1103
          </span>
        </div>
        <SlOptions className="text-gray-600 hover:bg-blue-100 dark:hover:bg-[#232323] transition-all h-fit w-fit p-2 rounded-full" />
      </div>
    </div>
  );
}
