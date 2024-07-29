import { MenuBar } from "@/components/MenuBar";
import { Provider } from "./provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider>
      <div className="flex h-screen w-screen px-20 dark:bg-black">
        <MenuBar />

        {children}

        <div className=" w-4/12 px-4 overflow-scroll scrollbar-none">
          <div className=" m-4 h-1/2 rounded-2xl border border-slate-300 dark:border-[#2f3336]">
            s
          </div>
          <div className=" m-4 h-screen rounded-2xl border border-slate-300 dark:border-[#2f3336]">
            s
          </div>
        </div>
      </div>
    </Provider>
  );
}
