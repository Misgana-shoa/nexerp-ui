"use client";

import { useState } from "react";
import { UserPlus, Package, Truck } from "lucide-react";

export default function QuickActions() {
  const [loading, setLoading] = useState(false);

  const handleAction = async (type: string) => {
    setLoading(true);

    let url = "";
    let body: any = {};

    if (type === "customer") {
      url = "/api/customers";
      body = { customer_name: "Test Customer" };
    }

    if (type === "product") {
      url = "/api/products";
      body = { item_name: "Test Product" };
    }

    if (type === "vendor") {
      url = "/api/vendors";
      body = { supplier_name: "Test Vendor" };
    }

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Success");
      } else {
        alert("❌ Failed");
        console.error(data);
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-4 flex-wrap mt-6">

      {/* ADD CUSTOMER */}
      <button
        onClick={() => handleAction("customer")}
        className="flex items-center gap-2 
        text-emerald-400 bg-emerald-500/10 
        border border-emerald-500/20 
        px-6 py-3 rounded-md 
        shadow-[0_0_8px_rgba(16,185,129,0.25)]"
      >
        <UserPlus size={18} />
        <span className="whitespace-nowrap">Add Customer</span>
      </button>

      {/* ADD PRODUCT */}
      <button
        onClick={() => handleAction("product")}
        className="flex items-center gap-2 
        text-blue-400 bg-blue-500/10 
        border border-blue-500/20 
        px-6 py-3 rounded-md"
      >
        <Package size={18} />
        <span>Add Product</span>
      </button>

      {/* ADD VENDOR */}
      <button
        onClick={() => handleAction("vendor")}
        className="flex items-center gap-2 
        text-purple-400 bg-purple-500/10 
        border border-purple-500/20 
        px-6 py-3 rounded-md"
      >
        <Truck size={18} />
        <span>Add Vendor</span>
      </button>
      

    </div>
  );
}