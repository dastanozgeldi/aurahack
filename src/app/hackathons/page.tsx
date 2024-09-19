import { db } from "@/db";

export default async function HackathonsPage() {
  const hackathons = await db.query.hackathons.findMany();
  return (
    <div>
      <h1>Hackathons</h1>
      {hackathons.length > 0 ? (
        <>
          {hackathons.map((hackathon) => (
            <div key={hackathon.id}>
              <h2>{hackathon.name}</h2>
              <p>{hackathon.description}</p>
            </div>
          ))}
        </>
      ) : (
        <div>No hackathons found</div>
      )}
    </div>
  );
}
