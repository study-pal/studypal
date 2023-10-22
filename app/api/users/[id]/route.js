import Passage from "@passageidentity/passage-node";
import { db } from "@/firebase";

export async function GET(request, { params }) {
  //   console.log(params.id);
  const snapshot = await db.collection("users").doc(params.id).get();
  const user = snapshot.data();
  const status = "success!";
  return Response.json({ data: user, status });
}

export async function DELETE(_, { params }) {
  const passageConfig = {
    appID: process.env.NEXT_PUBLIC_PASSAGE_APP_ID,
    apiKey: process.env.PASSAGE_API_KEY,
  };
  const passage = new Passage(passageConfig);

  try {
    const userID = params.id;
    await db.collection("tutors").doc(userID).delete();
    await passage.user.delete(userID);

    return Response.json({ status: "success" }, { status: 204 });
  } catch (error) {
    return Response.json(
      { status: "error", message: JSON.stringify(error) },
      { status: 400 },
    );
  }
}
