import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/db";
import { ArrowRight } from "lucide-react";

export default async function HackathonsPage() {
  const hackathons = await db.query.hackathons.findMany({
    orderBy: (hackathons, { desc }) => [desc(hackathons.createdAt)],
  });

  return (
    <div>
      <h2 className="my-4 text-center text-2xl font-bold">Hackathons</h2>
      {hackathons.length > 0 ? (
        <>
          {hackathons.map((hackathon) => (
            <Card key={hackathon.id}>
              <CardHeader>
                <CardTitle>{hackathon.name}</CardTitle>
                <CardDescription>{hackathon.description}</CardDescription>
              </CardHeader>
              <CardFooter className="flex items-center justify-between">
                <p className="text-muted-foreground">
                  {hackathon.createdAt.toLocaleString()}
                </p>
                <Button size="sm">
                  join <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </>
      ) : (
        <div className="mt-3 flex h-[100px] items-center justify-center rounded-lg border text-center text-muted-foreground">
          hackathons will be displayed here.
        </div>
      )}
    </div>
  );
}
