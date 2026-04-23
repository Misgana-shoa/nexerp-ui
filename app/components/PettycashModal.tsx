"use client";

import {
  DollarSign,
  X,
  CalendarDays,
  ChevronDown,
} from "lucide-react";

export default function PettyCashExpenseModal() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="w-full max-w-[750px] h-[800px] rounded-[22px] bg-[#343c49] border border-zinc-700 shadow-2xl overflow-hidden">

        {/* HEADER */}
        <div className="h-[88px] px-10 flex items-center justify-between border-b border-zinc-600">
          <div className="flex items-center gap-4">
            <DollarSign
              size={34}
              className="text-teal-400"
            />

            <h2 className="text-[28px] font-semibold text-[#f2e3d5]">
              Petty Cash Expense
            </h2>
          </div>

          <button>
            <X
              size={30}
              className="text-[#b79f88]"
            />
          </button>
        </div>

        {/* BODY */}
        <div className="h-[calc(100%-88px)] overflow-y-auto px-9 py-10 space-y-9">

          {/* TEXT */}
          <p className="text-[22px] leading-[1.45] text-[#d0b59a] max-w-[620px]">
            Quick entry for small daily expenses
            (office supplies, refreshments,
            tips, etc.)
          </p>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-[20px] text-[#c5ab90] mb-4">
              Description *
            </label>

            <input
              placeholder="What was purchased?"
              className="w-full h-[68px] rounded-2xl bg-black px-6 text-[20px] text-[#b99875] outline-none"
            />
          </div>

          {/* AMOUNT */}
          <div>
            <label className="block text-[20px] text-[#c5ab90] mb-4">
              Amount *
            </label>

            <input
              defaultValue="0.00"
              className="w-full h-[68px] rounded-2xl bg-black px-6 text-[20px] text-[#b99875] outline-none"
            />
          </div>

          {/* DATE */}
          <div>
            <label className="block text-[20px] text-[#c5ab90] mb-4">
              Date
            </label>

            <div className="relative">
              <input
                defaultValue="04/23/2026"
                className="w-full h-[68px] rounded-2xl bg-black px-6 pr-16 text-[20px] text-white outline-none"
              />

              <CalendarDays
                size={28}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-500"
              />
            </div>
          </div>

          {/* CATEGORY */}
          <div>
            <label className="block text-[20px] text-[#c5ab90] mb-4">
              Category
            </label>

            <div className="relative">
              <select className="w-full appearance-none h-[68px] rounded-2xl bg-black px-6 pr-16 text-[20px] text-white outline-none">
                <option>
                  Petty Cash (default)
                </option>
              </select>

              <ChevronDown
                size={26}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}