import { db } from "@/db";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const deck = await db.query.decks.findFirst({
    where: (decks, { eq }) => eq(decks.id, Number(params.id)),
    with: { profile: true },
  });

  if (!deck) notFound();
  return (
    <div>
      <h2 className="mb-3">
        Deck by{" "}
        <Link href={`/profiles/${deck.profile.userId}`}>
          @{deck.profile.username}
        </Link>
      </h2>
      <div dangerouslySetInnerHTML={{ __html: deck.code }} />
    </div>
  );
}
