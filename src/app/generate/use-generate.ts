import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { generatePresentation } from "./actions";

export const useGenerate = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      setLoading(true);
      const downloadLink = await generatePresentation(formData);
      setLink(downloadLink);

      toast.success("Joined hackathon successfully.");
    } catch {
      toast.error("Failed to join the hackathon.");
    } finally {
      setLoading(false);
      router.refresh();
    }
  }

  return {
    loading,
    link,
    onSubmit,
  };
};
