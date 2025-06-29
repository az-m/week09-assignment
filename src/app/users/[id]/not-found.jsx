import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-self-center mt-50">
      <p className="text-3xl">This user does not exist.</p>
      <Link href="/" className="text-link hover:text-link-hover">
        Go home
      </Link>
    </div>
  );
}
