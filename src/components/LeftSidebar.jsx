import { UserButton } from "@clerk/nextjs";

export default function LeftSidebar() {
  return (
    <>
      <Login />
    </>
  );
}

function Login() {
  return (
    <>
      <UserButton />
    </>
  );
}
