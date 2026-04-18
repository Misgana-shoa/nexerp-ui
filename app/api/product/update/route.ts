import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch(
      `http://127.0.0.1:8080/api/resource/Item/${body.name}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: req.headers.get("cookie") || "",
        },
        body: JSON.stringify({
          item_name: body.item_name,
          item_code: body.item_code,
        }),
      }
    );

    const data = await res.text();

    if (!res.ok) {
      return new NextResponse(data, { status: 500 });
    }

    return new NextResponse(data);
  } catch {
    return new NextResponse("Update Failed", { status: 500 });
  }
}