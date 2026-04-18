import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const cookie = req.headers.get("cookie");

    const res = await fetch(
      "http://127.0.0.1:8080/api/method/frappe.auth.get_logged_user",
      {
        headers: {
          Cookie: cookie || "",
        },
      }
    );

    if (!res.ok) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const data = await res.json();

    return NextResponse.json(data);
  } catch (err) {
    return new NextResponse("Error", { status: 500 });
  }
}