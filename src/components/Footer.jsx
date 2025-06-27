import Link from "next/link";

export default function Footer() {
  return (
    <div className="fixed bottom-0 w-[100%] text-center z-20 bg-black h-[40px]">
      <Link href="/">Home</Link> <Link href="/user">My blog</Link>
    </div>
  );
}
