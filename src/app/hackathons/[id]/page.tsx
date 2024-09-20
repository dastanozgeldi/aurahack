import { db } from "@/db";
import { notFound } from "next/navigation";
import { JoinModal } from "../join-modal";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { auth } from "@clerk/nextjs/server";

export default async function Page({ params }: { params: { id: string } }) {
  const { userId } = auth();
  const profile = await db.query.profiles.findFirst({
    where: (profiles, { eq }) => eq(profiles.userId, userId!),
  });
  const hackathon = await db.query.hackathons.findFirst({
    where: (hackathons, { eq }) => eq(hackathons.id, Number(params.id)),
    with: {
      organizer: true,
      teams: { with: { members: true } },
    },
  });

  if (!hackathon) {
    notFound();
  }
  return (
    <div className="mt-4">
      <h2 className="text-2xl font-bold">{hackathon.name}</h2>
      <p className="text-muted-foreground">{hackathon.description}</p>
      <p className="mt-3">{hackathon.createdAt.toLocaleString()}</p>

      <div className="my-3">
        <p>by {hackathon.organizer.name}</p>
        <p>{hackathon.organizer.email}</p>
        <p>{hackathon.organizer.phone}</p>
      </div>

      <div className="my-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold">teams</h1>
          <div>{hackathon.teams.length} in total</div>
        </div>

        {hackathon.teams.length > 0 ? (
          <ScrollArea className="mt-3 h-[300px]">
            {hackathon.teams.map((team) => (
              <Card key={team.id} className="mb-3">
                <CardHeader>
                  <CardTitle>{team.name}</CardTitle>
                  <CardDescription>
                    {team.members.length} participants.
                  </CardDescription>
                </CardHeader>
                {/* <CardContent>{team.explanation}</CardContent> */}
              </Card>
            ))}
          </ScrollArea>
        ) : (
          <div className="mt-3 flex h-[300px] items-center justify-center rounded-lg border text-center text-muted-foreground">
            participant teams will be displayed here.
          </div>
        )}
      </div>

      <JoinModal profile={profile!} hackathon={hackathon} />
    </div>
  );
}
