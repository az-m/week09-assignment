import SidebarRight from "@/components/SidebarRight";
import ListPosts from "@/components/ListPosts";
import SidebarLeft from "@/components/SidebarLeft";
import Footer from "@/components/Footer";
import OnLoad from "@/components/OnLoad";
import Link from "next/link";
import ModalPost from "@/components/ModalPost";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/dbconnection";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { Tabs } from "radix-ui";
import { SpacerLeft, SpacerRight } from "@/components/Spacer";
import ListFollowedPosts from "@/components/ListFollowedPosts";

export default async function HomePage({ searchParams }) {
  const post = (await searchParams).post;
  const reply = (await searchParams).reply;

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
          {/* <SidebarLeft /> */}
          <div className="relative flex flex-col justify-self-center items-center min-w-[375px] max-w-[600px] min-h-[100dvh] bg-background">
            <Tabs.Root defaultValue="following">
              <Tabs.List className="pl-5 pt-5">
                <Tabs.Trigger
                  value="following"
                  className="text-xl font-semibold pr-10"
                >
                  Following
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="allposts"
                  className="text-xl font-semibold"
                >
                  All Posts
                </Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="following">
                <SpacerLeft />
                <ListFollowedPosts reply={reply} userID={user.id} host="/" />
              </Tabs.Content>
              <Tabs.Content value="allposts">
                <SpacerRight />
                <ListPosts reply={reply} userID={user.id} host="/" />
              </Tabs.Content>
            </Tabs.Root>
            <Link
              href="/?post=true"
              className="fixed right-5 bottom-15 content-center p-2 bg-sky-500 rounded-[50%] w-[50px] h-[50px] items-center z-2"
            >
              <Pencil1Icon className="w-[30px] h-[30px]" />
            </Link>
            {post && <ModalPost host="/" userID={user.id} act="post" />}
            <Footer />
          </div>

          {/* <SidebarRight /> */}
        </div>
      </div>
    </>
  );
}
