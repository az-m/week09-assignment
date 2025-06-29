import ListUserPosts from "@/components/ListUserPosts";
import Footer from "@/components/Footer";
import TopBioAll from "@/components/TopBioAll";

export default async function UserPage({ params, searchParams }) {
  const thisuser = (await params).id;
  const reply = (await searchParams).reply;

  return (
    <div>
      <div>
        <div className="relative flex flex-col justify-self-center items-center min-w-[375px] max-w-[600px] min-h-[100dvh] bg-background">
          <TopBioAll userID={thisuser} />
          <ListUserPosts
            userID={thisuser}
            host={`/users/${thisuser}`}
            reply={reply}
          />
          <Footer />
        </div>
      </div>
    </div>
  );
}
