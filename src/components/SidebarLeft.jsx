import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default async function SidebarLeft() {
  return (
    <div className="hidden">
      <UserButton />
      <Link href="/">Home</Link>
      <Link href="/user">My blog</Link>
    </div>
  );
}
