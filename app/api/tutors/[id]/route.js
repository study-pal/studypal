import { db } from "@/firebase";
export async function GET(request, { params }) {
  try {
    const snapshot = await db.collection("tutors").doc(params.id).get();
    const tutor = snapshot.data();
    return Response.json({ status: "success", data: tutor });
  } catch (error) {
    return Response.json({ status: "error", message: JSON.stringify(error) });
  }
}
