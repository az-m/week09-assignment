import Link from "next/link";
import NewPostForm from "./NewPostForm";

export default function PostModal({ host, userID }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="p-8 border w-96 shadow-lg rounded-md bg-white">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900">New Post</h3>
          <div className="mt-2 px-7 py-3">
            <NewPostForm userID={userID} />
          </div>
          <div className="flex justify-center mt-4">
            {/* Navigates back to the base URL - closing the modal */}
            <Link
              href={host}
              className="px-4 py-2 bg-sky-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Close
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
