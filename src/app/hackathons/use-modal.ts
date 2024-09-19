import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { toast } from "sonner";
import { joinHackathon } from "./actions";

export const useModal = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      setLoading(true);
      await joinHackathon(formData);

      toast.success("Joined hackathon successfully.");
    } catch {
      toast.error("Failed to join the hackathon.");
    } finally {
      setLoading(false);
      setOpen(false);
      router.refresh();
    }
  }

  return {
    loading,
    open,
    setOpen,
    onSubmit,
  };
};
