import Link from "next/link";
import NewPostForm from "@/components/NewPostForm";
import UpdatePostForm from "@/components/UpdatePostForm";
import DeletePostForm from "@/components/DeletePostForm";

export default function PostModal({ host, userID, act, id }) {
  return (
    <div className="fixed inset-0 -top-5 overflow-y-auto h-full w-full flex items-center justify-center z-20">
      <div className="pt-8 pb-8 border-2 w-96 rounded-md bg-background">
        <div className="text-center">
          {act === "post" && <NewPostForm userID={userID} />}
          {act === "upd" && <UpdatePostForm postID={id} />}
          {act === "del" && <DeletePostForm postID={id} />}
          <div className="flex justify-center mt-4">
            <Link
              href={host}
              className="px-4 py-2 bg-sky-500 text-white text-base rounded-md shadow-sm hover:bg-sky-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Close
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
