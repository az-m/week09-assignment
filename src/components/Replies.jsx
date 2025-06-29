import { db } from "@/utils/dbconnection";
import { currentUser } from "@clerk/nextjs/server";
import ReplyOptions from "@/components/ReplyOptions";
import Link from "next/link";

export default async function Replies({ postID, host }) {
  const replies = (
    await db.query(
      `SELECT replies9.id, content, replies9.created_at, user_id, users.username FROM replies9
      JOIN users ON replies9.user_id = users.id
      WHERE replies9.post_id = $1`,
      [postID]
    )
  ).rows;

  const authuser = await currentUser();
  const user = (
    await db.query(`SELECT id, username, about FROM users WHERE usercl = $1`, [
      authuser.id,
    ])
  ).rows[0];

  return (
    <div>
      <ul className="p-4">
        {replies.map((r) => (
          <li key={r.id} className="pb-4 grid grid-cols-[85%_15%]">
            <div className="col-start-1 col-span-1">
              <p>
                <span>
                  <Link
                    href={`/users/${r.user_id}`}
                    className="text-link-reverse hover:text-link-hover-reverse"
                  >
                    {r.username}
                  </Link>
                </span>
                <span className="ml-2 text-sm opacity-80">
                  {r.created_at.toLocaleDateString()}
                </span>
              </p>
              <p className="col-start-1 col-span-2 row-start-2 row-span-1 text-sm">
                {r.content}
              </p>
            </div>
            <div className="col-start-2 col-span-1 justify-self-end self-end">
              {r.user_id == user.id && (
                <ReplyOptions replyID={r.id} host={host} />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
