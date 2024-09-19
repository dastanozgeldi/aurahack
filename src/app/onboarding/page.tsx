"use client";

import * as React from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { completeOnboarding } from "./_actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function OnboardingComponent() {
  const [error, setError] = React.useState("");
  const { user } = useUser();
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const res = await completeOnboarding(formData);
    if (res?.message) {
      // Reloads the user's data from Clerk's API
      await user?.reload();
      router.push("/");
      router.refresh();

      toast.success("Registration complete! Go to hackathons page.");
    }
    if (res?.error) {
      setError(res?.error);
    }
  };
  return (
    <div>
      <h1 className="my-4 text-center text-2xl font-bold">before we begin</h1>
      <form action={handleSubmit}>
        <div>
          <Label htmlFor="name">enter your full name.</Label>
          <Input type="text" name="name" required autoComplete="off" />
        </div>

        <div className="my-3">
          <Label htmlFor="username">come up with a username.</Label>
          <Input
            type="text"
            name="username"
            required
            minLength={3}
            maxLength={20}
            autoComplete="off"
          />
        </div>
        {error && <p className="text-red-600">Error: {error}</p>}
        <Button className="mt-4 w-full">Submit</Button>
      </form>
    </div>
  );
}
