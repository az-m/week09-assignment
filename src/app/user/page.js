import RightSidebar from "@/components/RightSidebar";
import UserPostList from "@/components/UserPostList";

export default async function UserPage() {
  return (
    <div>
      <div className="min-h-[100dvh] grid grid-cols-[75%_25%]">
        <UserPostList />
        <RightSidebar />
      </div>
    </div>
  );
}
