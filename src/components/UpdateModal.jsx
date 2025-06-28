import Link from "next/link";

export default function UpdateModal({ host, userID }) {
  return (
    <div className="fixed inset-0 -top-5 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="pt-8 pb-8 border-2 w-96 rounded-md bg-background">
        <div className="text-center">
          {/* <NewPostForm userID={userID} /> */}
          <div className="flex justify-center mt-4">
            {/* Navigates back to the base URL - closing the modal */}
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
