import { db } from "@/firebase";
export async function GET(request, { params }) {
  //   console.log(params.id);
  const snapshot = await db.collection("users").doc(params.id).get();
  const user = snapshot.data();
  const status = "success!";
  return Response.json({ data: user, status });
}
