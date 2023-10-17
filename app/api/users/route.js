import { db } from "@/firebase";
export async function GET() {
  const users = [];
  const snapshot = await db.collection("users").get();
  snapshot.forEach((doc) => {
    users.push(doc.data());
  });
  const status = "success!";
  return Response.json({ data: users, status });
}
