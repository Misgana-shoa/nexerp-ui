"use client";

import {
  Plus,
  ChevronDown,
  Eye,
  Mail,
  Pencil,
  Send,
  Trash2,
  Archive,
} from "lucide-react";

const orders = [
  {
    po: "PO-0005",
    vendor: "Thomas Conley",
    sub: "HW Construction",
    date: "1/4/2026",
    expected: "8/4/2026",
    amount: "Rs 154.53",
    status: "DRAFT",
  },
  {
    po: "PO-0004",
    vendor: "Fred - Munson's Pickles",
    sub: "Munson's Pickles",
    date: "25/2/2026",
    expected: "4/3/2026",
    amount: "Rs NaN",
    status: "SENT",
  },
  {
    po: "PO-0003",
    vendor: "test",
    sub: "",
    date: "7/2/2026",
    expected: "14/2/2026",
    amount: "Rs 666.00",
    status: "PARTIALLY RECEIVED",
  },
  {
    po: "PO-0002",
    vendor: "test",
    sub: "",
    date: "1/2/2026",
    expected: "8/2/2026",
    amount: "Rs NaN",
    status: "RECEIVED",
  },
  {
    po: "PO-0001",
    vendor: "test",
    sub: "",
    date: "31/1/2026",
    expected: "1/2/2026",
    amount: "Rs 3,648.00",
    status: "DRAFT",
  },
];

const stats = [
  { label: "Total", value: "5", color: "text-blue-500" },
  { label: "Draft", value: "2", color: "text-slate-500" },
  { label: "Confirmed", value: "0", color: "text-emerald-400" },
  { label: "Received", value: "2", color: "text-violet-500" },
  {
    label: "Confirmed Value",
    value: "Rs 0.00",
    color: "text-emerald-400",
  },
];

function badge(status: string) {
  if (status === "DRAFT")
    return "bg-zinc-600/50 text-zinc-400";
  if (status === "SENT")
    return "bg-blue-500/20 text-blue-500";
  if (status === "RECEIVED")
    return "bg-violet-500/20 text-violet-500";
  if (status === "PARTIALLY RECEIVED")
    return "bg-amber-500/20 text-amber-400";
  return "bg-zinc-700 text-white";
}

export default function PurchaseOrdersPage() {
  return (
    <div className="min-h-screen bg-black text-white px-8 pb-10">
      {/* HEADER */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-[56px] font-bold leading-none">
            Purchase Orders
          </h1>

          <p className="text-[20px] text-[#cbb395] mt-3">
            Manage orders to vendors
          </p>
        </div>

        <button className="h-14 px-8 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-[18px] font-semibold flex items-center gap-3">
          <Plus size={22} />
          New Purchase Order
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-5 gap-6 mb-9">
        {stats.map((item, i) => (
          <div
            key={i}
            className="h-[132px] rounded-3xl border border-zinc-600 bg-[#373737] flex flex-col items-center justify-center"
          >
            <p className="text-[18px] text-[#d6c1a5] mb-3">
              {item.label}
            </p>

            <h3
              className={`text-[42px] font-bold ${item.color}`}
            >
              {item.value}
            </h3>
          </div>
        ))}
      </div>

      {/* FILTER */}
      <div className="mb-6">
        <button className="h-12 px-6 rounded-2xl bg-[#373737] border border-zinc-600 text-[18px] flex items-center gap-12">
          All Statuses
          <ChevronDown size={18} />
        </button>
      </div>

      {/* TABLE */}
      <div className="rounded-3xl border border-zinc-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-black">
            <tr className="text-left text-[18px] text-[#bca98f]">
              <th className="px-5 py-6">PO #</th>
              <th className="px-5 py-6">VENDOR</th>
              <th className="px-5 py-6">DATE</th>
              <th className="px-5 py-6">EXPECTED</th>
              <th className="px-5 py-6">AMOUNT</th>
              <th className="px-5 py-6">STATUS</th>
              <th className="px-5 py-6 text-center">
                ACTIONS
              </th>
            </tr>
          </thead>

          <tbody className="bg-[#373737]">
            {orders.map((row, i) => (
              <tr
                key={i}
                className="border-t border-zinc-600/40"
              >
                <td className="px-5 py-6 text-[28px] font-semibold whitespace-nowrap">
                  {row.po}
                </td>

                <td className="px-5 py-6">
                  <div className="text-[24px] font-medium">
                    {row.vendor}
                  </div>

                  {row.sub && (
                    <div className="text-[18px] text-zinc-300 mt-1">
                      {row.sub}
                    </div>
                  )}
                </td>

                <td className="px-5 py-6 text-[22px] text-zinc-300">
                  {row.date}
                </td>

                <td className="px-5 py-6 text-[22px] text-zinc-300">
                  {row.expected}
                </td>

                <td className="px-5 py-6 text-[22px] text-amber-400 font-semibold whitespace-nowrap">
                  {row.amount}
                </td>

                <td className="px-5 py-6">
                  <span
                    className={`px-5 py-2 rounded-full text-[14px] font-semibold ${badge(
                      row.status
                    )}`}
                  >
                    {row.status}
                  </span>
                </td>

                <td className="px-5 py-6">
                  <div className="flex items-center justify-center gap-5">
                    <Eye
                      size={24}
                      className="text-blue-500"
                    />

                    {row.po === "PO-0005" && (
                      <>
                        <Mail
                          size={24}
                          className="text-red-500"
                        />
                        <Pencil
                          size={24}
                          className="text-amber-400"
                        />
                        <Send
                          size={24}
                          className="text-blue-500"
                        />
                        <Trash2
                          size={24}
                          className="text-red-500"
                        />
                      </>
                    )}

                    {row.po === "PO-0004" && (
                      <>
                        <Mail
                          size={24}
                          className="text-red-500"
                        />
                        <Archive
                          size={24}
                          className="text-emerald-400"
                        />
                      </>
                    )}

                    {row.po === "PO-0001" && (
                      <>
                        <Pencil
                          size={24}
                          className="text-amber-400"
                        />
                        <Send
                          size={24}
                          className="text-blue-500"
                        />
                        <Trash2
                          size={24}
                          className="text-red-500"
                        />
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}