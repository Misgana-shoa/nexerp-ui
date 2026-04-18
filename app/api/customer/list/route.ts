import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const res = await fetch(
      `${process.env.ERP_URL}/api/resource/Customer?fields=[\"name\",\"customer_name\",\"email_id\",\"mobile_no\"]`,
      {
        method: "GET",
        headers: {
          Cookie: req.headers.get("cookie") || "",
        },
      }
    );

    const data = await res.json();

    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return new NextResponse("Error fetching customers", { status: 500 });
  }
}