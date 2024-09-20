import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { generatePresentation } from "./actions";
import { SelectDeck } from "@/db/schema";

export const useGenerate = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [deck, setDeck] = useState<SelectDeck | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      setLoading(true);
      const deck = await generatePresentation(formData);
      setDeck(deck);

      toast.success("Generated successfully.");
    } catch {
      toast.error("Failed to generate the deck.");
    } finally {
      setLoading(false);
      router.refresh();
    }
  }

  return {
    loading,
    deck,
    onSubmit,
  };
};
