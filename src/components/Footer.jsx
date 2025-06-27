import Link from "next/link";

export default function Footer() {
  return (
    <div className="fixed bottom-0 w-[100%] z-20 bg-black pt-2 pb-2">
      <div className="justify-self-center grid grid-cols-2 w-[200px]">
        <Link
          href="/"
          className="text-link hover:text-link-hover font-bold justify-self-start"
        >
          Home
        </Link>{" "}
        <Link
          href="/user"
          className="text-link hover:text-link-hover font-bold justify-self-end"
        >
          My blog
        </Link>
      </div>
    </div>
  );
}
