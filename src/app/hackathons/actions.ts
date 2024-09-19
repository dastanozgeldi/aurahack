"use server";

import { db } from "@/db";
import { teams } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";

export async function joinHackathon(formData: FormData) {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");

  const name = formData.get("teamName") as string;

  const [result] = await db
    .insert(teams)
    .values({
      name,
    })
    .returning();

  return result;
}
