"use server";

import { db } from "@/db";
import { profiles } from "@/db/schema";
import { auth, clerkClient } from "@clerk/nextjs/server";

export const completeOnboarding = async (formData: FormData) => {
  const { userId } = auth();

  if (!userId) {
    return { message: "No Logged In User" };
  }

  try {
    const name = formData.get("name") as string;
    const username = formData.get("username") as string;

    await db
      .insert(profiles)
      .values({
        userId,
        name,
        username,
      })
      .onConflictDoUpdate({
        target: profiles.userId,
        set: { name, username },
      });

    const res = await clerkClient().users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
      },
    });
    return { message: res.publicMetadata };
  } catch {
    return { error: "There was an error updating the user metadata." };
  }
};
