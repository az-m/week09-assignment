import RightSidebar from "@/components/RightSidebar";
import PostList from "@/components/PostList";
import LeftSidebar from "@/components/LeftSidebar";
import Footer from "@/components/Footer";
import OnLoad from "@/components/OnLoad";
import Link from "next/link";
import PostModal from "@/components/PostModal";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/dbconnection";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { Tabs } from "radix-ui";
import { SpacerLeft, SpacerRight } from "@/components/Spacer";
import FollowedPosts from "@/components/FollowedPosts";

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
            <Tabs.Root defaultValue="following">
              <Tabs.List className="pl-5 pt-5">
                <Tabs.Trigger
                  value="following"
                  className="text-2xl font-semibold pr-12"
                >
                  Following
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="allposts"
                  className="text-2xl font-semibold"
                >
                  All Posts
                </Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="following">
                <SpacerLeft />
                <FollowedPosts userID={user.id} />
              </Tabs.Content>
              <Tabs.Content value="allposts">
                <SpacerRight />
                <PostList />
              </Tabs.Content>
            </Tabs.Root>
            <Link
              href="/user?show=true"
              className="fixed right-5 bottom-15 content-center p-2 bg-sky-500 rounded-[50%] w-[50px] h-[50px] items-center z-2"
            >
              <Pencil1Icon className="w-[30px] h-[30px]" />
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
