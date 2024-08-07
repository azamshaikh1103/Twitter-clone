import type { Metadata } from "next";
import { Inter, Quicksand } from "next/font/google";
import "./globals.css";
import { Provider } from "./provider";

const inter = Inter({ subsets: ["latin"] });
const quickSand = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={quickSand.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
