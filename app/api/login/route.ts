import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const erpRes = await fetch(`${process.env.ERP_URL}/api/method/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usr: email,
        pwd: password,
      }),
    });

    const data = await erpRes.json();

    const response = NextResponse.json(data);

    // ✅ SAVE LOGIN SESSION (VERY IMPORTANT)
    const cookie = erpRes.headers.get("set-cookie");
    if (cookie) {
      response.headers.set("set-cookie", cookie);
    }

    return response;
  } catch (error) {
    console.error(error);
    return new NextResponse("Login failed", { status: 500 });
  }
}