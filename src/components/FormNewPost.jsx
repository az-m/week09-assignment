import { db } from "@/utils/dbconnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

export default function FormNewPost({ userID }) {
  async function handleNewPost(formData) {
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

    let temp = parseInt(Math.random() * (1000000 - 1) + 1);

    await db.query(
      `INSERT INTO posts9 (title, content, user_id, temp) VALUES ($1, $2, $3, $4)`,
      [data.title, data.content, userID, temp]
    );

    const postID = (
      await db.query(`SELECT id FROM posts9 WHERE temp = $1`, [temp])
    ).rows[0].id;

    if (data.tags.length === 0) {
      await db.query(`INSERT INTO tags9 (post_id) VALUES ($1)`, [postID]);
    } else {
      for (let t = 0; t < data.tags.length; t++) {
        await db.query(`INSERT INTO tags9 (tag, post_id) VALUES ($1,$2)`, [
          data.tags[t],
          postID,
        ]);
      }
    }

    temp = null;
    await db.query(`UPDATE posts9 SET temp = $1`, [temp]);

    revalidatePath("/");
    revalidatePath("/user");

    redirect("/user");
  }

  return (
    <>
      <h3 className="text-2xl font-bold text-foreground">New Post</h3>
      <div className="mt-2 px-4 py-3">
        <form
          action={handleNewPost}
          className="px-4 pb-3 border border-content-border bg-content-panel rounded-md"
        >
          <fieldset className="flex flex-col text-foreground">
            <span>
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="required"
                required
                className="bg-form-input rounded-sm p-1 w-[100%]"
              />
            </span>
            <label htmlFor="content" className="mt-2">
              Content:
            </label>
            <textarea
              name="content"
              id="content"
              rows="10"
              placeholder="required"
              required
              className="bg-form-input rounded-sm p-1"
            />
            <label htmlFor="tags" className="mt-2"></label>
            <input
              type="text"
              name="tags"
              id="tags"
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
