"use client";

import { DropdownMenu } from "radix-ui";
import Link from "next/link";
import { useState } from "react";

export default function PostOptions({ puid, uid, pid, host }) {
  const [open, setOpen] = useState(false);
  function handleClick() {
    setOpen(!open);
  }
  return (
    <DropdownMenu.Root open={open}>
      <DropdownMenu.Trigger
        className="focus: outline-none"
        onClick={handleClick}
      >
        <span className="text-2xl hover:text-link-hover hover:cursor-pointer">
          &hellip;
        </span>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="bg-gray-900 py-2 px-4 -translate-x-8 translate-y-2 rounded-sm">
          <p onClick={handleClick} className="hover:cursor-pointer">
            X
          </p>
          <DropdownMenu.Item className="mb-1">
            <Link
              href={`${host}?reply=${pid}`}
              className="hover:text-link"
              onClick={handleClick}
            >
              REPLY
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item className="mb-1">
            {puid === uid && (
              <Link
                href={`/user?upd=true&postid=${pid}`}
                className="hover:text-link"
                onClick={handleClick}
              >
                UPDATE
              </Link>
            )}
          </DropdownMenu.Item>
          <DropdownMenu.Item className="mb-1">
            {puid === uid && (
              <Link
                href={`/user?del=true&postid=${pid}`}
                className="text-red-500 hover:font-bold"
                onClick={handleClick}
              >
                DELETE
              </Link>
            )}
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
