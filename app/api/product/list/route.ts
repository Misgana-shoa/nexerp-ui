import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const res = await fetch(
      `${process.env.ERP_URL}/api/resource/Item?fields=["name","item_name","item_code","stock_uom","disabled"]&limit_page_length=500`,
      {
        headers: {
          Cookie: req.headers.get("cookie") || "",
        },
      }
    );

    const data = await res.json();

    return NextResponse.json(data);
  } catch {
    return new NextResponse("Failed", { status: 500 });
  }
}