"use client";

import { Search, ChevronDown } from "lucide-react";

const rows = [
  { id: "QT-2026-0011", customer: "Steve", date: "Mar 24, 2026", valid: "Apr 8, 2026", amount: "$120", status: "Expired" },
  { id: "QT-2026-0010", customer: "Steve", date: "Mar 4, 2026", valid: "Mar 19, 2026", amount: "$120", status: "Expired" },
  { id: "QT-2026-0009", customer: "Steve", date: "Mar 2, 2026", valid: "Mar 17, 2026", amount: "$57,942", status: "Converted" },
  { id: "QT-2026-0008", customer: "Steve", date: "Feb 23, 2026", valid: "Mar 10, 2026", amount: "$600", status: "Expired" },
];

function StatCard({ title, value, color="text-white" }: any){
  return (
    <div className="rounded-2xl border border-zinc-700 bg-zinc-800/90 p-6 min-h-[130px] flex flex-col justify-between">
      <p className="text-[#c7b299] text-xl">{title}</p>
      <h3 className={`text-5xl font-bold ${color}`}>{value}</h3>
    </div>
  )
}

export default function QuotationPage(){
  return (
    <div className="min-h-screen bg-black text-white p-8 scale-70 origin-top">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-6xl font-bold tracking-tight">Quotations</h1>
        <button className="px-10 py-5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-3xl font-semibold">+ New Quotation</button>
      </div>

      <div className="grid grid-cols-4 gap-5 mb-8">
        <StatCard title="TOTAL" value="9" />
        <StatCard title="SENT" value="0" color="text-blue-500" />
        <StatCard title="ACCEPTED" value="0" color="text-emerald-400" />
        <StatCard title="PENDING VALUE" value="$0" color="text-amber-400" />
      </div>

      <div className="space-y-5 mb-8">
        <div className="rounded-2xl border border-zinc-700 bg-zinc-800 px-6 py-5 flex items-center gap-4 text-zinc-400 text-3xl">
          <Search className="w-7 h-7" />
          <input placeholder="Search quotations..." className="bg-transparent outline-none w-full" />
        </div>

        <div className="rounded-2xl border border-zinc-700 bg-zinc-800 px-6 py-5 flex items-center justify-between text-3xl">
          <span>All Status</span>
          <ChevronDown className="w-7 h-7 text-zinc-400" />
        </div>
      </div>

      <div className="rounded-3xl border border-zinc-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-black text-[#b7a58e] text-2xl text-nowrap">
            <tr>
              <th className="text-left px-8 py-7">QUOTATION #</th>
              <th className="text-left px-8 py-7">CUSTOMER</th>
              <th className="text-left px-8 py-7">DATE</th>
              <th className="text-left px-8 py-7">VALID UNTIL</th>
              <th className="text-left px-8 py-7">AMOUNT</th>
              <th className="text-left px-8 py-7">STATUS</th>
              <th className="text-left px-8 py-7">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="bg-zinc-800/95 text-3xl">
            {rows.map((row,i)=>(
              <tr key={i} className="border-t border-zinc-700 hover:bg-zinc-700/40 text-nowrap">
                <td className="px-8 py-8 text-blue-500 font-semibold">{row.id}</td>
                <td className="px-8 py-8">{row.customer}</td>
                <td className="px-8 py-8 text-zinc-300">{row.date}</td>
                <td className="px-8 py-8 text-zinc-300">{row.valid}</td>
                <td className="px-8 py-8 text-emerald-400 font-semibold">{row.amount}</td>
                <td className="px-8 py-8">
                  <span className={`px-5 py-2 rounded-full text-xl font-semibold ${row.status==='Converted' ? 'bg-violet-500/20 text-violet-400' : 'bg-amber-500/20 text-amber-400'}`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-8 py-8">
                  <div className="flex gap-3">
                    <button className="px-5 py-2 rounded-xl bg-blue-500 text-xl font-semibold">View</button>
                    {row.status !== 'Converted' && <button className="px-5 py-2 rounded-xl bg-red-500 text-xl font-semibold">Delete</button>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
