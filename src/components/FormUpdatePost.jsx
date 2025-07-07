import { db } from "@/utils/dbconnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function FormUpdatePost({ postID }) {
  const post = (
    await db.query(
      `SELECT posts9.title, posts9.content, from_user, ARRAY_AGG(tags9.tag) AS tags
        FROM posts9 
        LEFT JOIN tags9 ON posts9.id = tags9.post_id
        WHERE posts9.id= $1
        GROUP BY posts9.title, posts9.content, from_user`,
      [postID]
    )
  ).rows[0];

  async function handlePostUpdate(formData) {
    "use server";

    const data = {
      title: formData.get("title"),
      content: formData.get("content"),
      tags: [
        ...new Set(
          formData
            .get("tags")
            .split(",")
            .map((t) => t.trim())
        ),
      ],
    };

    if (data.title) {
      await db.query(
        `UPDATE posts9 SET title = $1, content = $2 WHERE posts9.id = $3`,
        [data.title, data.content, postID]
      );
    }

    db.query(`DELETE FROM tags9 WHERE post_id = $1`, [postID]);

    for (let t = 0; t < data.tags.length; t++) {
      await db.query(`INSERT INTO tags9 (tag, post_id) VALUES ($1,$2)`, [
        data.tags[t],
        postID,
      ]);
    }

    revalidatePath("/");
    revalidatePath("/user");

    redirect("/user");
  }

  return (
    <>
      <h3 className="text-2xl font-bold text-foreground-reverse">
        Update Post
      </h3>
      <div className="mt-2 px-4 py-3">
        <form
          action={handlePostUpdate}
          className="px-4 pb-3 border border-content-border bg-content-panel rounded-md"
        >
          <fieldset className="flex flex-col text-foreground">
            {!post.from_user && (
              <span>
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  defaultValue={post.title}
                  required
                  className="bg-form-input rounded-sm p-1 w-[100%]"
                />
              </span>
            )}
            {!post.from_user && (
              <>
                <label htmlFor="content" className="mt-2">
                  Content:
                </label>
                <textarea
                  name="content"
                  id="content"
                  defaultValue={post.content}
                  rows="10"
                  required
                  className="bg-form-input rounded-sm p-1"
                />
              </>
            )}
            <label htmlFor="tags" className="mt-2"></label>
            <input
              type="text"
              name="tags"
              id="tags"
              defaultValue={post.tags.toString()}
              placeholder="mytag,my-tag,my tag"
              className="bg-form-input rounded-sm p-1 w-[100%] mb-2"
            />
            <button
              type="submit"
              className="border border-button-border active:bg-button-active hover:bg-button-hover"
            >
              Submit
            </button>
          </fieldset>
        </form>
      </div>
    </>
  );
}
