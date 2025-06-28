import { revalidatePath } from "next/cache";
import { db } from "@/utils/dbconnection";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";

export default async function CommentForm({ postID, host }) {
  const authuser = await currentUser();
  const user = (
    await db.query(`SELECT id, username, about FROM users WHERE usercl = $1`, [
      authuser.id,
    ])
  ).rows[0];

  async function handleReply(formData) {
    "use server";
    const content = formData.get("content");

    await db.query(
      `INSERT INTO replies9 (content, post_id, user_id) VALUES ($1, $2, $3)`,
      [content, postID, user.id]
    );

    revalidatePath(`${host}`);
    redirect(`${host}`);
  }

  return (
    <>
      <p>
        <Link href={`${host}`} className="font-semibold">
          X
        </Link>
      </p>
      <form
        action={handleReply}
        className="pt-3 pl-4 pr-4 pb-3 my-4 bg-sky-900 rounded-xs"
      >
        <fieldset className="flex flex-col">
          <label htmlFor="content" className="mb-1 ml-1">
            Reply
          </label>
          <textarea
            name="content"
            id="content"
            rows="4"
            placeholder="required"
            required
            className="bg-form-input rounded-sm mb-2 p-1"
          />
          <button
            type="submit"
            className="border border-button-border active:bg-button-active hover:bg-button-hover"
          >
            Submit
          </button>
        </fieldset>
      </form>
    </>
  );
}
