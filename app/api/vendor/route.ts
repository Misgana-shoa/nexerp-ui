import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch(
      `${process.env.ERP_URL}/api/resource/Supplier`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: req.headers.get("cookie") || "",
        },
        body: JSON.stringify({
          supplier_name: body.name,
          supplier_type: "Company",

          // optional fields
          email_id: body.email,
          mobile_no: body.phone,
        }),
      }
    );

    const text = await res.text();

    if (!res.ok) {
      console.error("ERP ERROR:", text);
      return new NextResponse(text, { status: 500 });
    }

    return new NextResponse(text, { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse("Error creating vendor", { status: 500 });
  }
}