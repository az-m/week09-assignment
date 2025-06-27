"use server";
import { db } from "@/utils/dbconnection";
import { revalidatePath } from "next/cache";

export default async function UpdateUsername({ userID, userName }) {
  console.log(userID);
  await db.query(`UPDATE users SET username = $1 WHERE id = $2`, [
    userName,
    userID,
  ]);
  revalidatePath("/user");
}
