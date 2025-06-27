import { ClerkProvider } from "@clerk/nextjs";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";

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
        <body className={`${nunitoSans.variable} antialiased`}>
          <div>{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
