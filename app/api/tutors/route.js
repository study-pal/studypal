import { db } from "@/firebase";

export async function GET(request, { params }) {
  const tutors = [];
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("gender");
  console.log(query);
  try {
    const snapshot = await db
      .collection("tutors")
      // .where(query.keys(), "==", query.values)
      .get();
    snapshot.forEach((doc) => {
      tutors.push(doc.data());
    });
    return Response.json({ status: "success", data: tutors });
  } catch (error) {
    return Response.json({ status: "error", message: JSON.stringify(error) });
  }
}
