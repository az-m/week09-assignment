import { db } from "@/utils/dbconnection";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function OnLoad() {
  const authuser = await currentUser();
  const user = (
    await db.query(`SELECT id FROM users WHERE usercl = $1`, [authuser.id])
  ).rows[0];

  if (!user) {
    await db.query(
      `INSERT INTO users (username, about, usercl) VALUES ($1, $2, $3)`,
      ["your-display-name", "About your blog", authuser.id]
    );
    redirect("/");
  }
}
