"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export function UpdateLink() {
  const pathname = usePathname();
  return (
    <Link href={`${pathname}/?show=true`} className="hover:text-link">
      UPDATE
    </Link>
  );
}

export function DeleteLink() {
  const pathname = usePathname();
  return (
    <Link
      href={`${pathname}/?show=true`}
      className="text-red-500 hover:font-bold"
    >
      DELETE
    </Link>
  );
}
