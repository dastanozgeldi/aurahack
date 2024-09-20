"use server";

import { Octokit } from "octokit";
import { auth } from "@clerk/nextjs/server";

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
    `- readme content: ${content}\n\n` +
    `Analyze the given readme and create a 10-slide pitch deck off of given information.`;

  console.log(prompt);
  // TODO: send readme content to external API to generate presentation
  // the presentation is presumable uploaded to uploadthing.
  const downloadUrl = "/boribay.pptx";

  return downloadUrl;
}
