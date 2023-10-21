import { db } from "@/firebase";

export async function GET() {
  const tutors = [];
  try {
    const snapshot = await db.collection("tutors").get();
    snapshot.forEach((doc) => {
      tutors.push(doc.data());
    });
    return Response.json({ status: "success", data: tutors });
  } catch (error) {
    return Response.json({ status: "error", message: JSON.stringify(error) });
  }
}
