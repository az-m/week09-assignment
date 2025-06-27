import OnLoad from "@/components/OnLoad";
import Link from "next/link";
import PostModal from "@/components/PostModal";

export default async function HomePage({ searchParams }) {
  const show = (await searchParams).show;
  return (
    <>
      <OnLoad />
      <Link href="/?show=true">Show modal</Link>
      <p>{show}</p>
      {show && <PostModal host="/" />}
    </>
  );
}
