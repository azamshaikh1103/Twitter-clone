import { FaTwitter } from "react-icons/fa";
import { HiMiniHome } from "react-icons/hi2";
import { PiHashBold } from "react-icons/pi";
import { BsBellFill } from "react-icons/bs";
import { RiMessage3Fill } from "react-icons/ri";
import { MdBookmarks } from "react-icons/md";
import { FaUserLarge } from "react-icons/fa6";
import FeedCard from "../components/FeedCard";

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

export default function Home() {
  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen px-24">
        <div className="col-span-3 px-6">
          <div className="text-3xl m-1 w-fit h-fit hover:bg-slate-200 cursor-pointer p-2 rounded-full transition-all">
            <FaTwitter />
          </div>
          <div className="mt-4 text-lg font-bold">
            <ul>
              {sidebarMenuItems.map((item) => (
                <li
                  key={item.title}
                  className="flex justify-start items-center gap-4 w-fit mx-4 pl-4 pr-6 py-1 mt-2 rounded-3xl hover:bg-slate-100 cursor-pointer"
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
        <div className="col-span-6 border-x border-slate-100 h-screen overflow-scroll scrollbar-none scrollbar-thumb-blue-100">
          <FeedCard />
          <FeedCard />
        </div>
        <div className="col-span-3"></div>
      </div>
    </div>
  );
}
