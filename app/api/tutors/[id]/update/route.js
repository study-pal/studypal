import { db } from "@/firebase";

export async function PATCH(request, { params }) {
  const { ...tutorData } = await request.json();
  try {
    db.collection("tutors")
      .doc(params.id)
      .update({ ...tutorData });
    return Response.json(
      {
        status: "success",
        data: { id: params.id, ...tutorData },
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
