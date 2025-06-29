import { db } from "@/utils/dbconnection";
import { revalidatePath } from "next/cache";
import { SymbolIcon } from "@radix-ui/react-icons";

export default function ReblogPost({ id, userID }) {
  async function reblog(formData) {
    "use server";
    const postID = formData.get("postid");

    const og_post = (
      await db.query(
        `SELECT posts9.title, posts9.content, posts9.user_id, users.username FROM posts9 JOIN users ON posts9.user_id = users.id WHERE posts9.id  = $1`,
        [postID]
      )
    ).rows[0];

    let temp = parseInt(Math.random() * (1000000 - 1) + 1);

    await db.query(
      `INSERT INTO posts9 (title, content, user_id, from_user, temp) VALUES ($1, $2, $3, $4, $5)`,
      [og_post.title, og_post.content, userID, og_post.user_id, temp]
    );

    const new_postID = (
      await db.query(`SELECT id FROM posts9 WHERE temp = $1`, [temp])
    ).rows[0].id;

    await db.query(`INSERT INTO tags9 (post_id) VALUES ($1)`, [new_postID]);

    temp = null;
    await db.query(`UPDATE posts9 SET temp = $1`, [temp]);

    revalidatePath("/");
    revalidatePath("/user");
  }

  return (
    <>
      <form className="self-end" action={reblog}>
        <input
          name="postid"
          id="postid"
          value={id}
          className="hidden"
          readOnly
        />
        <button type="submit">
          <SymbolIcon />
        </button>
      </form>
    </>
  );
}
