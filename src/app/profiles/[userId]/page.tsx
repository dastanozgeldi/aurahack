import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { db } from "@/db";
import { clerkClient } from "@clerk/nextjs/server";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { userId: string } }) {
  const profile = await db.query.profiles.findFirst({
    where: (profiles, { eq }) => eq(profiles.userId, params.userId),
    with: {
      team: true,
    },
  });
  if (!profile) notFound();

  const user = await clerkClient().users.getUser(params.userId);
  return (
    <div className="mt-4 flex flex-col items-center">
      <Avatar className="h-24 w-24">
        <AvatarImage src={user.imageUrl} />
        <AvatarFallback>
          {profile.username?.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <h2 className="mt-3 text-2xl font-bold">{profile.name}</h2>
      <p className="text-muted-foreground">@{profile.username}</p>
      {profile.team && (
        <p className="text-muted-foreground">
          team:{" "}
          <Link className="underline" href={`/teams/${profile.teamId}`}>
            {profile.team!.name}
          </Link>
        </p>
      )}
    </div>
  );
}
