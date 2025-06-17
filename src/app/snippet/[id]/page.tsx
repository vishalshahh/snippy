import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import React from "react";
import * as actions from "@/actions";
import SnippetNotFound from "./edit/not-found";

const SnippetDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = parseInt((await params).id);

  await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate loading delay

  const snippet = await prisma.snippet.findUnique({
    where: {
      id: id,
    },
  });

  if (!snippet) return SnippetNotFound();

  const deleteSnippetAction = actions.deleteSnippet.bind(null, snippet.id);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="font-bold" text-xl>
          {snippet?.title}
        </h1>
        <div className="flex items-center gap-2">
          <Link href={`/snippet/${snippet.id}/edit`}>
            <Button>Edit</Button>
          </Link>
          <form action={deleteSnippetAction}>
            <Button variant={"destructive"} type="submit">
              Delete
            </Button>
          </form>
        </div>
      </div>
      <pre className="p-3 bg-gray-300 rounded border-gray-200">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
};

export default SnippetDetailPage;

export const generateStaticParams = async () => {
  const snippets = await prisma.snippet.findMany();

  return snippets.map((snippet) => {
    return { id: snippet.id.toString() };
  });
};
