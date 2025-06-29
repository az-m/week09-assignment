import { db } from "@/utils/dbconnection";
import { AlertDialog } from "radix-ui";
import { TrashIcon } from "@radix-ui/react-icons";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function ReplyOptions({ replyID, host }) {
  async function handleDelete() {
    "use server";

    db.query(`DELETE FROM replies9 WHERE id = $1`, [replyID]);

    revalidatePath("/");
    revalidatePath("/user");

    redirect(`${host}`);
  }
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <p>
            <TrashIcon className="h-[20px] w-[20px]" />
          </p>
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="fixed inset-0 data-[state=open]:animate-overlayShow" />
          <AlertDialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-red-950 p-[25px] focus:outline-none data-[state=open]:animate-contentShow">
            <AlertDialog.Title className="text-center text-2xl">
              Are you sure?
            </AlertDialog.Title>
            <AlertDialog.Description />
            <div className="flex flex-row h-[35px] justify-center justify-items-center mt-4">
              <AlertDialog.Cancel asChild>
                <button className="h-[35px] px-[15px] outline-none font-semibold focus-visible:outline-2 select-none">
                  Cancel
                </button>
              </AlertDialog.Cancel>
              <form action={handleDelete}>
                <button className="rounded h-[35px] px-[15px] outline-none border border-red-950 hover:border-red-500 focus-visible:outline-2 select-none">
                  Yes, delete reply
                </button>
              </form>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </>
  );
}
