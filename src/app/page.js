import ListPosts from "@/components/ListPosts";
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

  const following = (
    await db.query(`SELECT * FROM follows WHERE user_id = $1`, [user.id])
  ).rows.length;

  return (
    <>
      <OnLoad />
      <div>
        <div>
          <div className="relative flex flex-col justify-self-center items-center min-w-[375px] max-w-[600px] min-h-[100dvh] bg-background">
            <Tabs.Root defaultValue="following">
              <Tabs.List className="pl-5 pt-5">
                <Tabs.Trigger
                  value="following"
                  className="text-xl font-semibold pr-10 text-foreground-reverse"
                >
                  Following
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="allposts"
                  className="text-xl font-semibold text-foreground-reverse"
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
            <Footer following={following} />
          </div>
        </div>
      </div>
    </>
  );
}
