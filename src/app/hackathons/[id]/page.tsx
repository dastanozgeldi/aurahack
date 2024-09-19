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

export default async function Page({ params }: { params: { id: string } }) {
  const hackathon = await db.query.hackathons.findFirst({
    where: (hackathons, { eq }) => eq(hackathons.id, Number(params.id)),
    with: {
      organizer: true,
      teams: true,
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

      <JoinModal hackathon={hackathon} />
    </div>
  );
}
