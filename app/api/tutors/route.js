import { db } from "@/firebase";

export async function GET(request) {
  const tutors = [];
  const searchParams = request.nextUrl.searchParams;
  const genderQuery = searchParams.get("gender");
  const ageGroupQuery = searchParams.get("ageGroup");
  const subjectQuery = searchParams.get("subject");

  try {
    let tutorsRef = db.collection("tutors");
    if (genderQuery) {
      tutorsRef = tutorsRef.where("gender", "==", genderQuery);
    }
    if (ageGroupQuery) {
      tutorsRef = tutorsRef.where("ageGroup", "==", ageGroupQuery);
    }
    if (subjectQuery) {
      tutorsRef = tutorsRef.where("subjects", "array-contains", subjectQuery);
    }

    const snapshot = await tutorsRef.get();
    snapshot.forEach((doc) => {
      tutors.push({ id: doc.id, ...doc.data() });
    });
    return Response.json({ status: "success", data: tutors }, { status: 200 });
  } catch (error) {
    return Response.json(
      { status: "error", message: JSON.stringify(error) },
      { status: 400 },
    );
  }
}
