import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const ERP_URL = process.env.ERP_URL;

    if (!ERP_URL) {
      return NextResponse.json(
        { message: "ERP_URL not configured" },
        { status: 500 }
      );
    }

    const erpRes = await fetch(`${ERP_URL}/api/method/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usr: email,
        pwd: password,
      }),
      redirect: "manual",
    });

    const text = await erpRes.text();

    let data: any = {};
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }

    if (!erpRes.ok) {
      return NextResponse.json(
        {
          message: "Login failed",
          error: data,
        },
        { status: erpRes.status }
      );
    }

    const response = NextResponse.json({
      message: "Logged In",
      ...data,
    });

    // Forward ERPNext cookies to browser
    const cookie = erpRes.headers.get("set-cookie");

    if (cookie) {
      response.headers.set("set-cookie", cookie);
    }

    return response;
  } catch (error) {
    console.error("Login Error:", error);

    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}