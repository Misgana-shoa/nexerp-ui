"use client";

import { ChevronDown } from "lucide-react";
import SaleModal from "../components/SaleModal";

const rows = [
  { id: "QT-2026-0011", customer: "Steve", date: "Mar 24, 2026", valid: "Apr 8, 2026", amount: "$120", status: "Expired" },
  { id: "QT-2026-0010", customer: "Steve", date: "Mar 4, 2026", valid: "Mar 19, 2026", amount: "$120", status: "Expired" },
  { id: "QT-2026-0009", customer: "Steve", date: "Mar 2, 2026", valid: "Mar 17, 2026", amount: "$57,942", status: "Converted" },
  { id: "QT-2026-0008", customer: "Steve", date: "Feb 23, 2026", valid: "Mar 10, 2026", amount: "$600", status: "Expired" },
];

function StatCard({ title, value, color }: any) {
  return (
    <div className="rounded-2xl border border-zinc-700 bg-zinc-800/90 p-6 min-h-[130px]">
      <p className="text-[#d2b48c] text-sm uppercase">{title}</p>
      <h3 className={`mt-4 text-5xl font-bold ${color}`}>{value}</h3>
    </div>
  );
}

export default function QuotationsPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-6xl font-bold tracking-tight">Quotations</h1>
        <button className="rounded-2xl bg-indigo-600 px-10 py-5 text-2xl font-semibold hover:bg-indigo-500">
          + New Quotation
        </button>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard title="Total" value="9" color="text-white" />
        <StatCard title="Sent" value="0" color="text-blue-500" />
        <StatCard title="Accepted" value="0" color="text-emerald-400" />
        <StatCard title="Pending Value" value="$0" color="text-amber-400" />
      </div>

      <div className="mt-8 space-y-6">
        <input
          placeholder="Search quotations..."
          className="w-full rounded-2xl border border-zinc-700 bg-zinc-800 px-6 py-6 text-3xl placeholder:text-[#9f8b73] outline-none"
        />

        <div className="flex items-center justify-between rounded-2xl border border-zinc-700 bg-zinc-800 px-6 py-6 text-3xl text-white">
          <span>All Status</span>
          <ChevronDown className="h-8 w-8 text-[#9f8b73]" />
        </div>
      </div>

      <div className="mt-10 overflow-hidden rounded-3xl border border-zinc-700">
        <div className="grid grid-cols-7 bg-black px-8 py-6 text-xl font-semibold text-[#b8a999]">
          <div>QUOTATION #</div>
          <div>CUSTOMER</div>
          <div>DATE</div>
          <div>VALID UNTIL</div>
          <div>AMOUNT</div>
          <div>STATUS</div>
          <div>ACTIONS</div>
        </div>

        {rows.map((row) => (
          <div key={row.id} className="grid grid-cols-7 items-center border-t border-zinc-700 bg-zinc-800 px-8 py-7 text-2xl">
            <div className="font-semibold text-blue-500">{row.id}</div>
            <div>{row.customer}</div>
            <div className="text-zinc-300">{row.date}</div>
            <div className="text-zinc-300">{row.valid}</div>
            <div className="font-semibold text-emerald-400">{row.amount}</div>
            <div>
              <span className={`rounded-full px-4 py-2 text-lg font-semibold ${row.status === "Converted" ? "bg-violet-900/60 text-violet-400" : "bg-amber-900/50 text-amber-400"}`}>
                {row.status}
              </span>
            </div>
            <div className="flex gap-3">
              <button className="rounded-xl bg-blue-500 px-5 py-2 text-lg font-semibold">View</button>
              {row.status !== "Converted" && (
                <button className="rounded-xl bg-red-600 px-5 py-2 text-lg font-semibold">Delete</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
