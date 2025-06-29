import { db } from "@/utils/dbconnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function FormDeletePost({ postID }) {
  const post = (
    await db.query(
      `SELECT posts9.title, posts9.content FROM posts9 WHERE posts9.id= $1`,
      [postID]
    )
  ).rows[0];

  async function deletePost() {
    "use server";
    db.query(`DELETE FROM posts9 WHERE id = $1`, [postID]);

    revalidatePath("/");
    revalidatePath("/user");

    redirect("/user");
  }

  return (
    <>
      <p className="text-foreground-reverse font-bold pt-2 pl-4 pr-4 text-xl">
        {post.title}
      </p>
      {post.content.split("<br />").map((para, index) => (
        <p
          key={index}
          className="text-foreground-reverse pl-4 pr-4 pt-2 pb-2 lg:text-lg"
        >
          {para}
        </p>
      ))}
      <form action={deletePost}>
        <fieldset></fieldset>
        <button
          type="submit"
          className="text-foreground-reverse p-4 bg-red-700 border hover:bg-red-500 my-4 font-semibold"
        >
          DELETE
        </button>
      </form>
    </>
  );
}
