import { db } from "@/firebase";

export async function POST(request) {
  const { userId, ...tutorData } = await request.json();
  try {
    db.collection("tutors")
      .doc(userId)
      .set({ ...tutorData });

    return Response.json(
      {
        status: "success",
        data: { id: userId, ...tutorData },
      },
      { status: 200 },
    );
  } catch (error) {
    return Response.json(
      { status: "error", message: JSON.stringify(error) },
      { status: 400 },
    );
  }
}
