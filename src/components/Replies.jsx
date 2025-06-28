import { db } from "@/utils/dbconnection";

export default async function Replies({ postID }) {
  const replies = (
    await db.query(
      `SELECT replies9.id, content, replies9.created_at, users.username FROM replies9
      JOIN users ON replies9.user_id = users.id
      WHERE replies9.post_id = $1`,
      [postID]
    )
  ).rows;

  return (
    <div>
      <ul className="p-4">
        {replies.map((r) => (
          <li key={r.id} className="pb-4 grid grid-cols-[85%_15%]">
            <div className="col-start-1 col-span-1">
              <p>
                <span>{r.username}</span>
                <span className="ml-2 text-sm opacity-80">
                  {r.created_at.toLocaleDateString()}
                </span>
              </p>
              <p className="col-start-1 col-span-2 row-start-2 row-span-1 text-sm">
                {r.content}
              </p>
            </div>
            <div className="col-start-2 col-span-1 justify-items-end">
              {/* <CommentOptions postID={postID} commentID={comment.id} /> */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
