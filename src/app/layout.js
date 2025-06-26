import { ClerkProvider } from "@clerk/nextjs";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "A Social Network",
  description: "A user network for TE course",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        cssLayerName: "clerk",
      }}
    >
      <html lang="en">
        <body
          className={`${nunitoSans.variable} antialiased grid grid-cols-[20%_80%] grid-rows-1`}
        >
          <LeftSidebar />
          <div className="row-start-1 col-start-2 col-span-2">{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
