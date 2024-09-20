import { GitHub, Loom } from "@/app/icons";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { db } from "@/db";
import Link from "next/link";

import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const team = await db.query.teams.findFirst({
    where: (teams, { eq }) => eq(teams.id, Number(params.id)),
    with: {
      hackathon: true,
      project: true,
      members: true,
    },
  });

  if (!team) notFound();
  return (
    <div className="mt-4">
      <h2 className="text-2xl font-bold">team: {team.name}</h2>
      <p className="text-muted-foreground">
        hackathon:{" "}
        <Link className="underline" href={`/hackathons/${team.hackathonId}`}>
          {team.hackathon!.name}
        </Link>
      </p>

      <div className="my-4">
        <h1 className="text-2xl font-extrabold">project</h1>
        {team.project ? (
          <Card className="mt-2">
            <CardHeader>
              <CardTitle>{team.project.name}</CardTitle>
            </CardHeader>
            <CardFooter className="flex flex-col items-start gap-2">
              <a href={team.project.githubUrl} className="flex items-center">
                <GitHub className="mr-2 h-5 w-5 fill-current text-white" />
                visit repo
              </a>

              {team.project.loomUrl && (
                <a href={team.project.loomUrl} className="flex items-center">
                  <Loom className="mr-2 h-5 w-5 fill-current text-white" />
                  watch demo
                </a>
              )}
            </CardFooter>
          </Card>
        ) : (
          <div className="mt-2 flex h-[100px] items-center justify-center rounded-lg border text-center text-muted-foreground">
            team project will be displayed here if there is one.
          </div>
        )}
      </div>

      <div className="my-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold">members</h1>
          <div>{team.members.length} in total</div>
        </div>

        {team.members.length > 0 ? (
          <ScrollArea className="mt-2 h-[300px]">
            {team.members.map((profile) => (
              <Link
                key={profile.userId}
                className="mb-3"
                href={`/profiles/${profile.userId}`}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>{profile.name}</CardTitle>
                    <CardDescription>@{profile.username}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </ScrollArea>
        ) : (
          <div className="mt-2 flex h-[300px] items-center justify-center rounded-lg border text-center text-muted-foreground">
            team participants will be displayed here.
          </div>
        )}
      </div>
    </div>
  );
}
