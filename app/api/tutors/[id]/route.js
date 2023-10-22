import { db } from "@/firebase";

export async function GET(_, { params }) {
  try {
    const snapshot = await db.collection("tutors").doc(params.id).get();

    if (snapshot.exists) {
      return Response.json(
        { status: "success", data: { ...snapshot.data() } },
        { status: 200 },
      );
    } else {
      return Response.json(
        { status: "error", message: "Not found" },
        { status: 404 },
      );
    }
  } catch (error) {
    return Response.json(
      { status: "error", message: JSON.stringify(error) },
      { status: 500 },
    );
  }
}
