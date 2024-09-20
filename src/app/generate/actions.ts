"use server";

import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";
import { Octokit } from "octokit";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { decks } from "@/db/schema";

const octokit = new Octokit({
  auth: process.env.GITHUB_ACCESS_TOKEN,
});

function base64ToBytes(base64: string) {
  const binString = atob(base64);
  return Uint8Array.from(binString, (m) => m.codePointAt(0) || 0);
}

export async function generatePresentation(formData: FormData) {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");

  const profile = await db.query.profiles.findFirst({
    where: (profiles, { eq }) => eq(profiles.userId, userId),
    with: { team: true },
  });

  const githubUrl = formData.get("githubUrl") as string;
  const chunks = githubUrl.split("/");

  const {
    data: { content: raw },
  } = await octokit.request("GET /repos/{owner}/{repo}/readme", {
    owner: chunks[3],
    repo: chunks[4],
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  const content = new TextDecoder().decode(base64ToBytes(raw));

  const theme = formData.get("theme") as string;
  const timeLimit = formData.get("timeLimit") as string;

  const prompt =
    `Assume that you are the pitch deck master and you are helping people ` +
    `that are participating in a hackathon. They have a detailed README.md ` +
    `file in their GitHub repository. The user is asking you to ` +
    `create a pitch deck. Take these criteria into consideration:\n` +
    `- theme: ${theme} mode\n` +
    `- time limit: ${timeLimit}\n` +
    `- readme content: ${content}\n` +
    `Couple things to add to the first slide:\n` +
    `- authors: ${profile?.team?.name}\n` +
    `- date: ${new Date()}\n\n` +
    `Analyze the given readme and create a 10-slide pitch deck off of given information.\n` +
    `Give a pitch deck of SVGs. One SVG per slide. Generate 5 of those slides in order.\n` +
    `As a result we should have 5 SVGs that represent the pitch deck. Wrap SVGs in a parent div.\n` +
    `Slide width should be 500px. If there is not much information in a README, make it up from your own understanding. Add margin bottom of 20px inbetween slides.`;

  const { object } = await generateObject({
    model: openai("gpt-4o"),
    schema: z.object({
      code: z.string(),
    }),
    prompt,
  });

  const [deck] = await db
    .insert(decks)
    .values({
      userId,
      code: object.code,
    })
    .returning();

  console.log(object.code);

  return deck;
}
