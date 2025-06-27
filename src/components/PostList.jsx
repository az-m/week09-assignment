import { db } from "@/utils/dbconnection";

export default async function PostList({ userID }) {
  let userPosts;

  if (userID) {
    userPosts = (
      await db.query(
        `SELECT posts9.id, posts9.title, posts9.content, posts9.created_at, users.username, ARRAY_AGG(tags9.tag) AS tags
        FROM posts9 
        JOIN users ON posts9.user_id = users.id
        JOIN tags9 ON posts9.id = tags9.post_id
        WHERE posts9.user_id = $1
        GROUP BY posts9.id, posts9.title, posts9.content, posts9.created_at, users.username
        ORDER BY created_at DESC`,
        [userID]
      )
    ).rows;
  } else {
    userPosts = (
      await db.query(
        `SELECT posts9.id, posts9.title, posts9.content, posts9.created_at, users.username, ARRAY_AGG(tags9.tag) AS tags
        FROM posts9 
        JOIN users ON posts9.user_id = users.id
        JOIN tags9 ON posts9.id = tags9.post_id
        GROUP BY posts9.id, posts9.title, posts9.content, posts9.created_at, users.username
        ORDER BY created_at DESC`
      )
    ).rows;
    console.log(userID);
  }

  let noPosts = "";
  if (userPosts.length === 0) {
    noPosts = "No posts here";
  }

  return (
    <div className="max-w-[600px] mt-10">
      <p>{noPosts}</p>
      {userPosts.map((post) => (
        <div
          key={post.id}
          className="bg-content-panel ml-5 mr-5 mb-5 rounded-md p-4 text-lg"
        >
          <p className="p-2 border-b border-content-border grid grid-cols-[65%_35%]">
            <span>{post.username}</span>
            <span className="opacity-80 justify-self-end self-center text-xs">
              {post.created_at.toDateString()}
            </span>
          </p>
          <p className="font-bold pt-2 pl-4 pr-4 text-xl">{post.title}</p>
          {post.content.split("<br />").map((para, index) => (
            <p key={index} className="pl-4 pr-4 pt-2 pb-2 lg:text-lg">
              {para}
            </p>
          ))}
          <p className="p-2 border-t border-content-border">
            {post.tags.toString().replace(",", " | ")}
          </p>
        </div>
      ))}
      <div></div>
    </div>
  );
}
