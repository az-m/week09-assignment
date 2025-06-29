import Link from "next/link";
import SidebarRight from "@/components/SidebarRight";
export default function Footer({ following }) {
  return (
    <div className="fixed bottom-0 w-[100%] z-20 bg-black pt-2 pb-2">
      <div className="justify-self-center grid grid-cols-3 w-[300px]">
        <Link
          href="/"
          className="text-link hover:text-link-hover font-bold justify-self-start"
        >
          Home
        </Link>
        <Link
          href="/user"
          className="text-link hover:text-link-hover font-bold justify-self-center"
        >
          My blog
        </Link>
        <div>
          <SidebarRight following={following} />
        </div>
      </div>
    </div>
  );
}
