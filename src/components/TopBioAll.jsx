import { db } from "@/utils/dbconnection";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export default async function TopBioAll({ userID }) {
  const authuser = await currentUser();

  const user = (
    await db.query(`SELECT id, username, about FROM users WHERE usercl = $1`, [
      authuser.id,
    ])
  ).rows[0];

  const follows = (
    await db.query(
      `SELECT user_id, follows_id FROM follows WHERE user_id = $1 AND follows_id = $2`,
      [user.id, userID]
    )
  ).rows[0];

  const userdata = (
    await db.query(`SELECT id, username, about FROM users WHERE id = $1`, [
      userID,
    ])
  ).rows[0];

  async function followSubmit() {
    "use server";

    await db.query(
      `INSERT INTO follows (user_id, follows_id) VALUES ($1, $2)`,
      [user.id, userID]
    );
    revalidatePath(`/user/${userID}`);
  }

  async function unfollowSubmit() {
    "use server";

    await db.query(
      `DELETE FROM follows WHERE user_id = $1 AND follows_id = $2`,
      [user.id, userID]
    );
    revalidatePath(`/user/${userID}`);
  }

  return (
    <div className="flex flex-col items-center mt-10">
      <p className="text-xl mb-2 font-semibold">{userdata.username}</p>
      <p className="max-w-[300px]">{userdata.about}</p>
      <div className="mt-5">
        {!follows && (
          <form action={followSubmit}>
            <button
              type="submit"
              className="bg-sky-500 p-2 rounded-lg text-black"
            >
              Follow
            </button>
          </form>
        )}
        {follows && (
          <form action={unfollowSubmit}>
            <button
              type="submit"
              className="bg-sky-500 p-2 rounded-lg text-black"
            >
              Unfollow
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
