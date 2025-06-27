import RightSidebar from "@/components/RightSidebar";
import PostList from "@/components/PostList";
import LeftSidebar from "@/components/LeftSidebar";
import Footer from "@/components/Footer";
import OnLoad from "@/components/OnLoad";
import Link from "next/link";
import PostModal from "@/components/PostModal";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/dbconnection";

export default async function HomePage({ searchParams }) {
  const show = (await searchParams).show;

  const authuser = await currentUser();
  const user = (
    await db.query(`SELECT id, username, about FROM users WHERE usercl = $1`, [
      authuser.id,
    ])
  ).rows[0];

  return (
    <>
      <OnLoad />
      <div>
        <div>
          <LeftSidebar />
          <div className="relative flex flex-col justify-self-center items-center min-w-[375px] max-w-[600px] min-h-[100dvh] bg-background">
            <PostList />
            <Link
              href="/user?show=true"
              className="fixed right-5 bottom-15 content-center p-2 bg-sky-500 rounded-[50%] w-[50px] h-[50px] text-center z-2"
            >
              Post
            </Link>
            {show && <PostModal host="/user" userID={user.id} />}
            <Footer />
          </div>
          <RightSidebar />
        </div>
      </div>
    </>
  );
}
