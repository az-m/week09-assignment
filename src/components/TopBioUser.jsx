import { Dialog } from "radix-ui";
import { Cross2Icon } from "@radix-ui/react-icons";
import { db } from "@/utils/dbconnection";
import { revalidatePath } from "next/cache";
import { Pencil1Icon } from "@radix-ui/react-icons";

export default function TopBioUser({ userID, userName, userBio }) {
  async function handleNameSubmit(formData) {
    "use server";

    const username = formData.get("username");

    await db.query(`UPDATE users SET username = $1 WHERE id = $2`, [
      username,
      userID,
    ]);

    revalidatePath(`/user`);
  }

  async function handleBioSubmit(formData) {
    "use server";

    const userbio = formData.get("bio");

    await db.query(`UPDATE users SET about = $1 WHERE id = $2`, [
      userbio,
      userID,
    ]);

    revalidatePath(`/user`);
  }

  return (
    <>
      <div className="mt-5 bg-foreground dark:text-background text-foreground-reverse p-4 rounded-sm w-[75%] ">
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <p className="flex justify-center text-xl mb-2 hover:cursor-pointer hover:text-link font-semibold">
              {userName}
              <Pencil1Icon className="w-[12px] h-[12px] translate-y-2 translate-x-4" />
            </p>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0" />
            <Dialog.Content className="fixed border border-content-border left-1/2 top-1/4 max-h-[80vh] w-[50vw] max-w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-content-panel p-[25px]">
              <Dialog.Title className="m-0 text-sm">
                Edit Display Name
              </Dialog.Title>
              <Dialog.Description />
              <form action={handleNameSubmit} autoComplete="off">
                <fieldset className="mt-[5px] mb-[15px] flex items-center gap-5">
                  <input
                    className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded px-2.5 text-[15px] outline"
                    id="username"
                    name="username"
                    defaultValue={userName}
                  />
                </fieldset>
                <div className="mt-[15px] flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex h-[35px] items-center justify-center rounded px-[15px] outline-none hover:bg-gray-800"
                  >
                    Save changes
                  </button>
                </div>
              </form>
              <Dialog.Close asChild>
                <button
                  className="absolute right-2.5 top-2.5 inline-flex size-[25px] appearance-none items-center justify-center rounded-full hover:bg-gray-800"
                  aria-label="Close"
                >
                  <Cross2Icon />
                </button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <p className="flex justify-self-center max-w-[300px] hover:cursor-pointer hover:text-link">
              {userBio}
              <Pencil1Icon className="w-[12px] h-[12px] translate-y-1 translate-x-2" />
            </p>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0" />
            <Dialog.Content className="fixed border border-content-border left-1/2 top-1/4 max-h-[80vh] w-[50vw] max-w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-content-panel p-[25px]">
              <Dialog.Title className="m-0 text-sm">Edit Bio</Dialog.Title>
              <Dialog.Description />
              <form action={handleBioSubmit} autoComplete="off">
                <fieldset className="mt-[5px] mb-[15px] flex items-center gap-5">
                  <textarea
                    className="inline-flex w-full flex-1 items-center justify-center rounded px-2.5 text-[15px] outline"
                    rows={3}
                    id="bio"
                    name="bio"
                    defaultValue={userBio}
                  />
                </fieldset>
                <div className="mt-[15px] flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex h-[35px] items-center justify-center rounded px-[15px] outline-none hover:bg-gray-800"
                  >
                    Save changes
                  </button>
                </div>
              </form>
              <Dialog.Close asChild>
                <button
                  className="absolute right-2.5 top-2.5 inline-flex size-[25px] appearance-none items-center justify-center rounded-full hover:bg-gray-800"
                  aria-label="Close"
                >
                  <Cross2Icon />
                </button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </>
  );
}
