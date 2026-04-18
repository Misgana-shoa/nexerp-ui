import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const cookie = req.headers.get("cookie");

    const res = await fetch(
      `${process.env.ERP_URL}/api/resource/Sales%20Invoice`,
      {
        headers: {
          Cookie: cookie || "",
        },
      }
    );

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return new NextResponse("Error fetching invoices", { status: 500 });
  }
}