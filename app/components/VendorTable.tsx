"use client";

import { useEffect, useState } from "react";
import {
  Eye,
  Pencil,
  Trash2,
  Loader2,
} from "lucide-react";

type Vendor = {
  name: string;
  supplier_name: string;
  email_id?: string;
  mobile_no?: string;
};

export default function VendorTable() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/vendor/list", {
        credentials: "include",
      });

      const data = await res.json();
      setVendors(data.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-700 shadow-lg w-full overflow-hidden">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4 gap-3 flex-wrap">
        <h2 className="text-xl text-white font-semibold">
          Vendors
        </h2>

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
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={4}
                  className="py-10 text-center"
                >
                  <Loader2 className="animate-spin mx-auto" />
                </td>
              </tr>
            ) : vendors.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="text-center text-zinc-500 py-6"
                >
                  No vendors found
                </td>
              </tr>
            ) : (
              vendors.map((v) => (
                <tr
                  key={v.name}
                  className="border-b border-zinc-700 hover:bg-zinc-800 transition"
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    {v.supplier_name}
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap">
                    {v.email_id || "-"}
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap">
                    {v.mobile_no || "-"}
                  </td>

                  {/* ACTIONS SAME ROW */}
                  <td className="px-4 py-3">
                    <div className="flex gap-2 flex-nowrap whitespace-nowrap">
                      <button className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium flex items-center gap-1">
                        <Eye size={14} />
                        View
                      </button>

                      <button className="px-3 py-2 rounded-lg border border-zinc-600 hover:bg-zinc-800 text-white font-medium flex items-center gap-1">
                        <Pencil size={14} />
                        Edit
                      </button>

                      <button className="px-3 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-medium flex items-center gap-1">
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}