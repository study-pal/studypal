import { NextResponse } from "next/server";
import Passage from "@passageidentity/passage-node";

export async function middleware(request) {
  const authToken = request.cookies.get("psg_auth_token")?.value;
  if (!authToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  const passageConfig = {
    appID: process.env.NEXT_PUBLIC_PASSAGE_APP_ID,
    apiKey: process.env.PASSAGE_API_KEY,
    authStrategy: Passage.HEADER_AUTH,
  };
  const passage = new Passage(passageConfig);
  const userID = await passage.validAuthToken(authToken);
  if (!userID) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/api/users/:path*", "/api/tutors/new", "/api/tutors/:id/update"],
};
