import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch(
      `http://127.0.0.1:8080/api/resource/Item/${body.name}`,
      {
        method: "DELETE",
        headers: {
          Cookie: req.headers.get("cookie") || "",
        },
      }
    );

    if (!res.ok) {
      return new NextResponse("Delete failed", { status: 500 });
    }

    return new NextResponse("Deleted");
  } catch {
    return new NextResponse("Delete failed", { status: 500 });
  }
}