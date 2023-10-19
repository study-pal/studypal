import { db } from "@/firebase";

export async function POST(request) {
  const { email, firstName, lastName, photo, userType } = await request.json();
  let status = "success";
  let user = {
    email: email,
    firstName: firstName,
    lastName: lastName,
    photo: photo,
    userType: userType,
  };
  try {
    const addNewUser = await db
      .collection("users")
      .add(user)
      .then((docRef) => {
        user.id = docRef.id;
      });
    return Response.json({ status, data: user });
  } catch (error) {
    status = "Error";
    const message = `Error adding document: ${error}`;
    return Response.json({ status, message });
  }
}
