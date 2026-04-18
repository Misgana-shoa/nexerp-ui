import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.name) {
      return NextResponse.json(
        { message: "Product name required" },
        { status: 400 }
      );
    }

    const res = await fetch(`${process.env.ERP_URL}/api/resource/Item`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: req.headers.get("cookie") || "",
      },
      body: JSON.stringify({
        item_code: body.sku || body.name,
        item_name: body.name,
        item_group: body.item_group || "Products",
        stock_uom: "Nos",
        is_stock_item: body.type === "Service" ? 0 : 1,
        standard_rate: Number(body.sellingPrice || 0),
        valuation_rate: Number(body.costPrice || 0),
        disabled: 0,
      }),
    });

    const data = await res.text();

    if (!res.ok) {
      return new NextResponse(data, { status: 500 });
    }

    return new NextResponse(data);
  } catch {
    return new NextResponse("Create Failed", { status: 500 });
  }
}