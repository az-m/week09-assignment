import { db } from "@/utils/dbconnection";
import Link from "next/link";
import PostOptions from "@/components/PostOptions";
import Replies from "@/components/Replies";
import FormReply from "@/components/FormReply";
import ReblogPost from "@/components/ReblogPost";

export default async function ListFollowedPosts({ userID, reply, host }) {
  const userPosts = (
    await db.query(
      `SELECT posts9.id, posts9.title, posts9.content, posts9.user_id, posts9.created_at, users.username, ARRAY_AGG(tags9.tag) AS tags FROM follows 
JOIN posts9 ON follows.follows_id = posts9.user_id 
JOIN users ON posts9.user_id = users.id
JOIN tags9 ON posts9.id = tags9.post_id
WHERE follows.user_id = $1
GROUP BY posts9.id, posts9.title, posts9.content, posts9.user_id, posts9.created_at, users.username
ORDER BY created_at DESC`,
      [userID]
    )
  ).rows;

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
                className="text-link-reverse hover:text-link-hover-reverse"
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
          <div className="grid grid-cols-2">
            {userID !== post.user_id ? (
              <ReblogPost id={post.id} userID={userID} />
            ) : (
              <div></div>
            )}
            <div className="justify-self-end">
              <PostOptions pid={post.id} uid={null} host={host} />
            </div>
          </div>
          {reply == post.id && (
            <FormReply postID={post.id} host={host} reply={reply} />
          )}
          <Replies postID={post.id} host={host} />
        </div>
      ))}
      <div></div>
    </div>
  );
}
