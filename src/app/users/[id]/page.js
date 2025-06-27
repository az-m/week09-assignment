import RightSidebar from "@/components/RightSidebar";
import PostList from "@/components/PostList";
import LeftSidebar from "@/components/LeftSidebar";
import Footer from "@/components/Footer";
import TopBioAll from "@/components/TopBioAll";

export default async function UserPage({ params }) {
  const thisuser = (await params).id;

  return (
    <div>
      <div>
        <LeftSidebar />
        <div className="relative flex flex-col justify-self-center items-center min-w-[375px] max-w-[600px] min-h-[100dvh] bg-background">
          <TopBioAll userID={thisuser} />
          <PostList userID={thisuser} />
          <Footer />
        </div>
        <RightSidebar />
      </div>
    </div>
  );
}
