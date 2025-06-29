"use client";
import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

export default function SidebarRight({ following }) {
  const [open, setOpen] = useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <>
      <p
        onClick={openDrawer}
        className="text-link hover:text-link-hover hover:cursor-pointer font-bold justify-self-end items-end"
      >
        <HamburgerMenuIcon className="h-[25px] w-[25px]" />
      </p>
      <div
        className={`p-4 min-h-[100dvh] fixed z-50 top-0 left-[50%] translate-x[-50%] overflow-x-hidden bg-gray-800 ${
          open ? `w-[50%]` : `w-[0%]`
        } ${!open && `hidden`}`}
      >
        <div>
          <p
            className="text-lg font-bold hover:cursor-pointer"
            onClick={closeDrawer}
          >
            X
          </p>
        </div>
        <div className="mb-6 flex flex-col items-center">
          <UserButton />

          <p className="mt-10">Following: {following}</p>
        </div>
      </div>
    </>
  );
}
