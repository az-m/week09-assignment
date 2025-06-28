import { db } from "@/utils/dbconnection";
import Link from "next/link";
import { DropdownMenu } from "radix-ui";

export default async function FollowedPosts({ userID }) {
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
          <p className="p-2 border-t border-content-border">
            {post.tags.toString().replace(",", " | ")}
          </p>
          <div className="justify-self-end">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger className="focus: outline-none">
                <span className="text-2xl hover:text-link-hover hover:cursor-pointer">
                  &hellip;
                </span>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content className="bg-gray-900 py-2 px-4 -translate-x-8 translate-y-2 rounded-sm">
                  <DropdownMenu.Item className="mb-1">
                    <p className="hover:text-link">REPLY</p>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
        </div>
      ))}
      <div></div>
    </div>
  );
}
