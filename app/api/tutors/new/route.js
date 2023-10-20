import { db } from "@/firebase";

export async function POST(request) {
  const { userID, gender, bookingLink, ageGroup, subjects } =
    await request.json();
  let status = "success";
  let tutor = {
    gender: gender,
    bookingLink: bookingLink,
    ageGroup: ageGroup,
    subjects: subjects,
  };
  try {
    db.collection("tutors").doc(userID).set({ tutor });
    return Response.json({ status, data: tutor });
  } catch (error) {
    return Response.json({ status: "error", message: JSON.stringify(error) });
  }
}
