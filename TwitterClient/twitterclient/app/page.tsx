import { FaTwitter } from "react-icons/fa";
import { HiMiniHome } from "react-icons/hi2";
import { PiHashBold } from "react-icons/pi";
import { BsBellFill } from "react-icons/bs";
import { RiMessage3Fill } from "react-icons/ri";
import { MdBookmarks } from "react-icons/md";
import { FaUserLarge } from "react-icons/fa6";
import  { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"]});



interface TwitterSidebarButton{
  title: String
  icon: React.ReactNode
}


const sidebarMenuItems: TwitterSidebarButton[] = [
  {
    title: 'Home',
    icon: <HiMiniHome/>
  },
  {
    title: 'Explore',
    icon: <PiHashBold/>
  },
  {
    title: 'Notifications',
    icon: <BsBellFill/>
  },
  {
    title: 'Messages',
    icon: <RiMessage3Fill/>
  },
  {
    title: 'Bookmarks',
    icon: <MdBookmarks/>
  },
  {
    title: 'Profile',
    icon: <FaUserLarge/>
  }
]



export default function Home() {
  return (
    <div className={inter.className}>
      <div className="grid grid-cols-12 h-screen w-screen px-36">
        <div className="col-span-3 px-6">
          <div className="text-3xl m-1 w-fit h-fit hover:bg-slate-200 cursor-pointer p-2 rounded-full transition-all">
            <FaTwitter />
          </div>
          <div className="mt-4 text-lg font-bold">
            <ul>
              {sidebarMenuItems.map((item => <li className="flex justify-start items-center gap-4 w-fit mx-4 pl-4 pr-6 py-1 mt-2 rounded-3xl hover:bg-slate-100 " key={item.title}>
                <span>{item.icon}</span>
                <span>{item.title}</span>
                </li>
              ))}
            </ul>
          <button className=" text-lg font-semibold bg-[#1d9bf0] text-white hover:bg-[#8fc3e6] w-full mt-4 p-3 rounded-full">Tweet</button>
          </div>
        </div>
        <div className="col-span-6 border-x border-slate-200"></div>
        <div className="col-span-3"></div>
      </div>
    </div>
  );
}
