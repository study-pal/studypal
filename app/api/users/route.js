export async function GET() {
  const users = [
    {
      id: 1,
      email: "name@email.com",
    },
    {
      id: 2,
      email: "name2@email.com",
    },
  ];
  const status = "success!";

  return Response.json({ data: users, status });
}
