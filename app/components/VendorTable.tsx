"use client";

import { useEffect, useState } from "react";

type Vendor = {
  name: string;
  supplier_name: string;
  email_id?: string;
  mobile_no?: string;
};

export default function VendorTable() {
  const [vendors, setVendors] = useState<Vendor[]>([]);

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    const res = await fetch("/api/vendor/list", {
      credentials: "include",
    });

    const data = await res.json();
    setVendors(data.data || []);
  };

  return (
    <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-700 shadow-lg">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl text-white font-semibold">
          Vendors
        </h2>

        {/* ✅ TOTAL COUNT */}
        <span className="text-sm text-zinc-400">
          Total: {vendors.length}
        </span>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-zinc-300">
          <thead className="text-xs uppercase bg-zinc-800 text-zinc-400">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
            </tr>
          </thead>

          <tbody>
            {vendors.map((v) => (
              <tr
                key={v.name}
                className="border-b border-zinc-700 hover:bg-zinc-800 transition"
              >
                <td className="px-4 py-3">{v.supplier_name}</td>
                <td className="px-4 py-3">{v.email_id || "-"}</td>
                <td className="px-4 py-3">{v.mobile_no || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* EMPTY STATE */}
        {vendors.length === 0 && (
          <p className="text-center text-zinc-500 py-6">
            No vendors found
          </p>
        )}
      </div>
    </div>
  );
}