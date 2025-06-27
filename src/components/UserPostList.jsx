import { db } from "@/utils/dbconnection";

export default async function UserPostList({ userID }) {
  const userPosts = (
    await db.query(
      `SELECT posts9.id, posts9.title, posts9.content, posts9.created_at FROM posts9 WHERE posts9.user_id = $1`,
      [userID]
    )
  ).rows;

  let noPosts = "";
  if (userPosts.length === 0) {
    noPosts = "No posts here";
  }

  return (
    <div>
      <div>
        <p>{noPosts}</p>
        <ul>
          {userPosts.map((post) => (
            <li key={post.id}>
              {post.title} {post.content}
            </li>
          ))}
        </ul>
      </div>
      <div></div>
    </div>
  );
}
