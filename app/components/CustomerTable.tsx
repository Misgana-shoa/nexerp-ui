"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Pencil,
  Trash2,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Plus,
  Eye,
  Download,
} from "lucide-react";
import { motion } from "framer-motion";

type Customer = {
  name: string;
  customer_name: string;
  email_id?: string;
  mobile_no?: string;
};

type RowCustomer = Customer & {
  invoices: number;
  revenue: number;
  balance: number;
  score: number;
  joinedThisMonth: boolean;
};

const PAGE_SIZE = 8;

export default function CustomerTable() {
  const [customers, setCustomers] = useState<RowCustomer[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All Customers");
  const [sortBy, setSortBy] = useState("Sort: Recent");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchCustomers();
  }, []);

  async function fetchCustomers() {
    try {
      setLoading(true);

      const res = await fetch("/api/customer/list", {
        credentials: "include",
      });

      const data = await res.json();

      const enriched = (data.data || []).map(
        (c: Customer, i: number): RowCustomer => ({
          ...c,
          invoices: Math.floor(Math.random() * 5) + 1,
          revenue: Math.floor(Math.random() * 2500),
          balance: Math.floor(Math.random() * 60000),
          score: Math.floor(Math.random() * 60) + 40,
          joinedThisMonth: i === 0,
        })
      );

      setCustomers(enriched);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const filtered = useMemo(() => {
    let list = [...customers];

    const q = search.toLowerCase().trim();

    if (q) {
      list = list.filter(
        (c) =>
          c.customer_name?.toLowerCase().includes(q) ||
          c.email_id?.toLowerCase().includes(q) ||
          c.mobile_no?.toLowerCase().includes(q)
      );
    }

    if (filter === "With Balance") {
      list = list.filter((c) => c.balance > 0);
    }

    if (filter === "No Balance") {
      list = list.filter((c) => c.balance === 0);
    }

    if (filter === "New This Month") {
      list = list.filter((c) => c.joinedThisMonth);
    }

    if (sortBy === "Sort: Revenue") {
      list.sort((a, b) => b.revenue - a.revenue);
    }

    if (sortBy === "Sort: Balance") {
      list.sort((a, b) => b.balance - a.balance);
    }

    if (sortBy === "Sort: Name") {
      list.sort((a, b) =>
        a.customer_name.localeCompare(b.customer_name)
      );
    }

    return list;
  }, [customers, search, filter, sortBy]);

  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / PAGE_SIZE)
  );

  const rows = filtered.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const totalReceivables = customers.reduce(
    (sum, c) => sum + c.balance,
    0
  );

  const withBalance = customers.filter(
    (c) => c.balance > 0
  ).length;

  const newThisMonth = customers.filter(
    (c) => c.joinedThisMonth
  ).length;

  function exportCSV() {
    const headers = [
      "Customer",
      "Email",
      "Phone",
      "Invoices",
      "Revenue",
      "Balance",
    ];

    const body = filtered.map((c) => [
      c.customer_name,
      c.email_id || "",
      c.mobile_no || "",
      c.invoices,
      c.revenue,
      c.balance,
    ]);

    const csv = [headers, ...body]
      .map((row) =>
        row.map((cell) => `"${String(cell)}"`).join(",")
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "customers.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  function initials(name: string) {
    return name?.charAt(0)?.toUpperCase() || "C";
  }

  const avatarColors = [
    "from-pink-500 to-fuchsia-500",
    "from-blue-500 to-indigo-500",
    "from-emerald-500 to-green-500",
    "from-orange-500 to-yellow-500",
    "from-purple-500 to-violet-500",
  ];

  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-6 xl:px-10 2xl:px-14 py-6 w-full">

      {/* HEADER */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">Customers</h1>

        <div className="flex gap-3 flex-wrap">
          <button
            onClick={exportCSV}
            className="px-5 py-3 rounded-xl bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 transition font-semibold flex items-center gap-2"
          >
            <Download size={18} />
            Export CSV
          </button>

          <button className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition font-semibold flex items-center gap-2">
            <Plus size={18} />
            Add Customer
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-5 mb-8">
        <Stat title="TOTAL CUSTOMERS" value={customers.length} color="text-blue-400" />
        <Stat title="TOTAL RECEIVABLES" value={`$${totalReceivables.toLocaleString()}`} color="text-orange-400" />
        <Stat title="WITH BALANCE" value={withBalance} color="text-red-400" />
        <Stat title="NEW THIS MONTH" value={newThisMonth} color="text-emerald-400" />
      </div>

      {/* SEARCH */}
      <div className="mb-4">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />

          <input
            placeholder="Search by name, email, or phone..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full h-16 rounded-2xl bg-zinc-800 border border-zinc-700 pl-12 pr-4 text-lg outline-none"
          />
        </div>
      </div>

      {/* FILTERS */}
      <div className="space-y-4 mb-6 w-full">
        <select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setPage(1);
          }}
          className="w-full h-16 rounded-2xl bg-zinc-900 border border-zinc-700 px-4 text-lg outline-none"
        >
          <option>All Customers</option>
          <option>With Balance</option>
          <option>No Balance</option>
          <option>New This Month</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            setPage(1);
          }}
          className="w-full h-16 rounded-2xl bg-zinc-900 border border-zinc-700 px-4 text-lg outline-none"
        >
          <option>Sort: Recent</option>
          <option>Sort: Revenue</option>
          <option>Sort: Balance</option>
          <option>Sort: Name</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="rounded-3xl border border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black border-b border-zinc-800 text-zinc-400 uppercase text-sm">
              <tr>
                <th className="text-left px-6 py-5">Customer</th>
                <th className="text-left px-6 py-5">Phone</th>
                <th className="text-left px-6 py-5">Invoices</th>
                <th className="text-left px-6 py-5">Revenue</th>
                <th className="text-left px-6 py-5">Balance</th>
                <th className="text-left px-6 py-5">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-14 text-center">
                    <Loader2 className="animate-spin mx-auto" />
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-14 text-center text-zinc-500">
                    No customers found
                  </td>
                </tr>
              ) : (
                rows.map((customer, i) => (
                  <motion.tr
                    key={customer.name}
                    className="border-b border-zinc-800 bg-zinc-900 hover:bg-zinc-800/70 transition"
                  >
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-2xl font-bold`}>
                          {initials(customer.customer_name)}
                        </div>

                        <div>
                          <div className="text-2xl font-semibold">{customer.customer_name}</div>
                          <p className="text-zinc-400 text-lg mt-1">{customer.email_id || "-"}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-6 text-2xl text-zinc-300">
                      {customer.mobile_no || "-"}
                    </td>

                    <td className="px-6 py-6 text-2xl">{customer.invoices}</td>

                    <td className="px-6 py-6 text-emerald-400 text-2xl font-semibold">
                      ${customer.revenue.toLocaleString()}
                    </td>

                    <td className="px-6 py-6 text-orange-400 text-2xl font-semibold">
                      ${customer.balance.toLocaleString()}
                    </td>

                    {/* ACTIONS FIXED */}
                    <td className="px-6 py-6">
                      <div className="flex gap-3 flex-nowrap whitespace-nowrap">
                        <button className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 flex items-center gap-2">
                          <Eye size={16} /> View
                        </button>

                        <button className="px-3 py-2 rounded-xl border border-zinc-600 hover:bg-zinc-800 flex items-center gap-2">
                          <Pencil size={16} /> Edit
                        </button>

                        <button className="px-3 py-2 rounded-xl bg-red-600 hover:bg-red-500 flex items-center gap-2">
                          <Trash2 size={16} /> Delete
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center mt-5 text-zinc-400">
        <span>Page {page} of {totalPages}</span>

        <div className="flex gap-2">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} className="w-10 h-10 rounded-lg bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center">
            <ChevronLeft size={18} />
          </button>

          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} className="w-10 h-10 rounded-lg bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

function Stat({ title, value, color }: { title: string; value: string | number; color: string }) {
  return (
    <motion.div whileHover={{ y: -2 }} className="bg-zinc-800 border border-zinc-700 rounded-3xl p-7 min-h-[170px]">
      <p className="text-zinc-300 text-lg">{title}</p>
      <p className={`text-5xl font-bold mt-8 ${color}`}>{value}</p>
    </motion.div>
  );
}