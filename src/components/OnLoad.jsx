import { db } from "@/utils/dbconnection";
import { currentUser } from "@clerk/nextjs/server";

export default async function OnLoad() {
  const user = await currentUser();
  const userID = (
    await db.query(`SELECT id FROM users WHERE usercl = $1`, [user.id])
  ).rows[0];

  if (!userID) {
    console.log("not found");
    await db.query(
      `INSERT INTO users (username, about, usercl) VALUES ($1, $2, $3)`,
      ["your-display-name", "About your blog", user.id]
    );
  }
}
