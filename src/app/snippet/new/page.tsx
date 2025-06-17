"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useActionState } from "react";
import * as actions from "@/actions";

const CreateSnippetPage = () => {
  const [formStateData, action] = useActionState(actions.createSnipppet, {
    message: "",
  });

  return (
    <form action={action}>
      <div>
        <Label className="mt-4">Title</Label>
        <Input type="text" name="title" id="title" />
      </div>
      <div>
        <Label className="mt-4">Code</Label>
        <Textarea name="code" id="code" />
      </div>
      {formStateData.message && (
        <div className="p-2 bg-red-300 border-2 border-red-600 mt-2">
          {formStateData.message}
        </div>
      )}
      <Button type="submit" className="mt-4">
        Create Snippet
      </Button>
    </form>
  );
};

export default CreateSnippetPage;
