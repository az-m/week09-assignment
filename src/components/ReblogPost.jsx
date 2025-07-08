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

    const new_postID = (
      await db.query(
        `INSERT INTO posts9 (title, content, user_id, from_user) VALUES ($1, $2, $3, $4) RETURNING id`,
        [og_post.title, og_post.content, userID, og_post.user_id]
      )
    ).rows[0].id;

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
