import ListUserPosts from "@/components/ListUserPosts";
import SidebarLeft from "@/components/SidebarLeft";
import Link from "next/link";
import Footer from "@/components/Footer";
import ModalPost from "@/components/ModalPost";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/dbconnection";
import TopBioUser from "@/components/TopBioUser";
import { Pencil1Icon } from "@radix-ui/react-icons";

export default async function UserPage({ searchParams }) {
  const post = (await searchParams).post;
  const upd = (await searchParams).upd;
  const del = (await searchParams).del;
  const editid = (await searchParams).postid;
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
  console.log(following);

  return (
    <div>
      <div>
        <SidebarLeft />
        <div className="relative flex flex-col justify-self-center items-center min-w-[375px] max-w-[600px] min-h-[100dvh] bg-background">
          <TopBioUser
            userID={user.id}
            userName={user.username}
            userBio={user.about}
          />
          <ListUserPosts userID={user.id} reply={reply} host="/user" />
          <Link
            href="/user?post=true"
            className="fixed right-5 bottom-15 items-center content-center p-2 bg-sky-500 rounded-[50%] w-[50px] h-[50px] z-2"
          >
            <Pencil1Icon className="w-[30px] h-[30px]" />
          </Link>
          {post && <ModalPost host="/user" userID={user.id} act="post" />}
          {upd && <ModalPost host="/user" act="upd" id={editid} />}
          {del && <ModalPost host="/user" act="del" id={editid} />}
          <Footer following={following} />
        </div>
      </div>
    </div>
  );
}
