import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function LeftSidebar() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <UserButton />
      <Link href="/">Home</Link>
      <Link href="/user">My blog</Link>
    </div>
  );
}
