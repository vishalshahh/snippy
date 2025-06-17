import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Home() {
  const snippets = await prisma.snippet.findMany();

  return (
    <div>
      <h1 className="font-bold text-4xl"> Snippy </h1>
      <div className="flex items-center justify-between">
        <h1>
          Your pocket-sized snippet saver, ready to clip code and keep
          it cozy.
        </h1>
        <Link href={"/snippet/new"}>
          <Button>New</Button>
        </Link>
      </div>
      {snippets.map((snippet) => (
        <div
          key={snippet.id}
          className="flex items-center justify-between bg-gray-200 p-2 rounded-md my-2"
        >
          <h1>{snippet.title}</h1>
          <Link href={`/snippet/${snippet.id}`}>
            <Button variant={"link"}>View</Button>
          </Link>
        </div>
      ))}
    </div>
  );
}
