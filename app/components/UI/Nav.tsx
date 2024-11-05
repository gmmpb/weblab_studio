import { headers } from "next/headers";
import Link from "next/link";

export default async function Nav() {
  const heads = await headers();

  return (
    <nav className="flex space-x-4 p-4 w-full z-30 justify-center ">
      <Link href="/">
        <span className="hover:underline text-gray-400 hover:text-gray-100 transition-all ease-in">
          Home
        </span>
      </Link>
      <Link href="/gdpr">
        <span className="hover:underline text-gray-400 hover:text-gray-100 transition-all ease-in">
          GDPR
        </span>
      </Link>
      <Link href="/imprint">
        <span className="hover:underline text-gray-400 hover:text-gray-100 transition-all ease-in">
          Imprint
        </span>
      </Link>
    </nav>
  );
}
