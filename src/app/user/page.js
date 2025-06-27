import RightSidebar from "@/components/RightSidebar";
import UserPostList from "@/components/UserPostList";
import LeftSidebar from "@/components/LeftSidebar";
import Link from "next/link";
import Footer from "@/components/Footer";
import PostModal from "@/components/PostModal";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/dbconnection";

export default async function UserPage({ searchParams }) {
  const show = (await searchParams).show;

  const authuser = await currentUser();
  const user = (
    await db.query(`SELECT id, username, about FROM users WHERE usercl = $1`, [
      authuser.id,
    ])
  ).rows[0];

  return (
    <div>
      <div>
        <LeftSidebar />
        <div className="relative flex flex-col justify-self-center items-center min-w-[375px] max-w-[600px] h-[100dvh] border">
          <UserPostList userID={user.id} />
          <Link
            href="/user?show=true"
            className="absolute right-4 bottom-10 content-center p-2 bg-sky-500 rounded-[50%] w-[50px] h-[50px] text-center z-2"
          >
            Post
          </Link>
          {show && <PostModal host="/user" userID={user.id} />}
          <Footer />
        </div>
        <RightSidebar />
      </div>
    </div>
  );
}
