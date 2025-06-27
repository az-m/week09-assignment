import { db } from "@/utils/dbconnection";

export default async function TopBioAll({ userID }) {
  const userdata = (
    await db.query(`SELECT id, username, about FROM users WHERE id = $1`, [
      userID,
    ])
  ).rows[0];

  return (
    <div className="mt-10">
      <p className="flex justify-center text-lg mb-2">{userdata.username}</p>
      <p className="flex justify-self-center max-w-[300px]">{userdata.about}</p>
    </div>
  );
}
