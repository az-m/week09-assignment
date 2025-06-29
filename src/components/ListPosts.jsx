import { db } from "@/utils/dbconnection";
import Link from "next/link";
import PostOptions from "@/components/PostOptions";
import Replies from "@/components/Replies";
import FormReply from "@/components/FormReply";

export default async function ListPosts({ userID, reply, host }) {
  let userPosts;

  if (userID) {
    userPosts = (
      await db.query(
        `SELECT posts9.id, posts9.title, posts9.content, posts9.created_at, users.id AS user_id, users.username, ARRAY_AGG(tags9.tag) AS tags
        FROM posts9 
        JOIN users ON posts9.user_id = users.id
        JOIN tags9 ON posts9.id = tags9.post_id
        WHERE posts9.user_id = $1
        GROUP BY posts9.id, posts9.title, posts9.content, posts9.created_at, users.id, users.username
        ORDER BY created_at DESC`,
        [userID]
      )
    ).rows;
  } else {
    userPosts = (
      await db.query(
        `SELECT posts9.id, posts9.title, posts9.content, posts9.created_at, users.id AS user_id, users.username, ARRAY_AGG(tags9.tag) AS tags
        FROM posts9 
        JOIN users ON posts9.user_id = users.id
        JOIN tags9 ON posts9.id = tags9.post_id
        GROUP BY posts9.id, posts9.title, posts9.content, posts9.created_at, users.id, users.username
        ORDER BY created_at DESC`
      )
    ).rows;
  }

  let noPosts = "";
  if (userPosts.length === 0) {
    noPosts = "No posts here";
  }

  return (
    <div className="max-w-[600px] mt-5">
      <p>{noPosts}</p>
      {userPosts.map((post) => (
        <div
          key={post.id}
          className="bg-content-panel ml-5 mr-5 mb-5 rounded-md p-4 text-lg"
        >
          <p className="p-2 border-b border-content-border grid grid-cols-[65%_35%]">
            <span>
              <Link
                href={`/users/${post.user_id}`}
                className="text-link hover:text-link-hover"
              >
                {post.username}
              </Link>
            </span>
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
          <p className="p-2 border-t border-content-border opacity-70">
            {post.tags[0] && "#" + post.tags.toString().replace(",", " #")}
          </p>
          <div className="justify-self-end">
            <PostOptions
              puid={post.user_id}
              uid={userID}
              pid={post.id}
              host={host}
            />
          </div>
          {reply == post.id && (
            <FormReply postID={post.id} host={host} reply={reply} />
          )}
          <Replies postID={post.id} host={host} />
        </div>
      ))}
    </div>
  );
}
