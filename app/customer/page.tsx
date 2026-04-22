"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Loader2,
  ChevronLeft,
  ChevronRight,
  Plus,
  Download,
} from "lucide-react";
import { motion } from "framer-motion";
import Modal from "../components/Modal";

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

  const [openCustomerModal, setOpenCustomerModal] = useState(false);

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
  });

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
          invoices: Math.floor(Math.random() * 3) + 1,
          revenue: Math.floor(Math.random() * 500),
          balance: Math.floor(Math.random() * 60000),
          score: Math.floor(Math.random() * 60) + 40,
          joinedThisMonth: i === 0,
        })
      );

      setCustomers(enriched);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  /* ================= CREATE CUSTOMER ================= */
  const createCustomer = async () => {
    try {
      const res = await fetch("/api/customer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
      });

      if (res.ok) {
        alert("✅ Customer Created");

        setOpenCustomerModal(false);

        setCustomer({
          name: "",
          email: "",
          phone: "",
          whatsapp: "",
        });

        fetchCustomers(); // refresh table
      } else {
        alert("❌ Failed");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Error creating customer");
    }
  };

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

    if (filter === "With Balance") list = list.filter((c) => c.balance > 0);
    if (filter === "No Balance") list = list.filter((c) => c.balance === 0);
    if (filter === "New This Month")
      list = list.filter((c) => c.joinedThisMonth);

    if (sortBy === "Sort: Revenue") list.sort((a, b) => b.revenue - a.revenue);
    if (sortBy === "Sort: Balance") list.sort((a, b) => b.balance - a.balance);
    if (sortBy === "Sort: Name")
      list.sort((a, b) => a.customer_name.localeCompare(b.customer_name));

    return list;
  }, [customers, search, filter, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const rows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const totalReceivables = customers.reduce((s, c) => s + c.balance, 0);
  const withBalance = customers.filter((c) => c.balance > 0).length;
  const newThisMonth = customers.filter((c) => c.joinedThisMonth).length;

  function initials(name: string) {
    return name?.charAt(0)?.toUpperCase() || "C";
  }

  /* ================= EXPORT CSV ================= */
  function exportCSV() {
    const headers = ["Customer", "Email", "Phone", "Balance"];

    const body = filtered.map((v) => [
      v.customer_name,
      v.email_id || "",
      v.mobile_no || "",
      v.balance || 0,
    ]);

    const csv = [headers, ...body]
      .map((row) => row.map((c) => `"${c}"`).join(","))
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

  const avatarColors = [
    "from-pink-500 to-fuchsia-500",
    "from-blue-500 to-indigo-500",
    "from-emerald-500 to-green-500",
    "from-orange-500 to-yellow-500",
    "from-purple-500 to-violet-500",
  ];

  return (
    <>
      <div className="min-h-screen bg-black text-white px-6 xl:px-12 py-8">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-5xl font-bold">Customers</h1>

          <div className="flex gap-3">
            <button
              onClick={exportCSV}
              className="px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center gap-2"
            >
              <Download size={18} />
              Export CSV
            </button>

            <button
              onClick={() => setOpenCustomerModal(true)}
              className="px-7 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center gap-2"
            >
              <Plus size={18} />
              Add Customer
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          <Stat
            title="TOTAL CUSTOMERS"
            value={customers.length}
            color="text-blue-500"
          />
          <Stat
            title="TOTAL RECEIVABLES"
            value={`$${totalReceivables.toLocaleString()}`}
            color="text-orange-400"
          />
          <Stat
            title="WITH BALANCE"
            value={withBalance}
            color="text-red-500"
          />
          <Stat
            title="NEW THIS MONTH"
            value={newThisMonth}
            color="text-emerald-400"
          />
        </div>

        {/* SEARCH */}
        <input
          placeholder="Search by name, email, or phone..."
          className="w-full h-16 mb-6 rounded-2xl bg-zinc-800 border border-zinc-700 px-6 text-lg outline-none placeholder:text-zinc-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* TABLE */}
        <div className="rounded-3xl border border-zinc-800 overflow-hidden">
          <table className="w-full">
            <thead className="text-zinc-400 uppercase text-sm border-b border-zinc-800">
              <tr>
                <th className="px-6 py-5 text-left">Customer</th>
                <th className="px-6 py-5 text-left">Phone</th>
                <th className="px-6 py-5 text-left">Invoices</th>
                <th className="px-6 py-5 text-left">Revenue</th>
                <th className="px-6 py-5 text-left">Balance</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-14 text-center">
                    <Loader2 className="animate-spin mx-auto" />
                  </td>
                </tr>
              ) : (
                rows.map((c, i) => (
                  <tr key={i} className="bg-zinc-900 border-b border-zinc-800">
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-14 h-14 rounded-full bg-gradient-to-br ${
                            avatarColors[i % avatarColors.length]
                          } flex items-center justify-center text-xl font-bold`}
                        >
                          {initials(c.customer_name)}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-semibold">
                              {c.customer_name}
                            </span>
                            <span className="text-xs bg-yellow-600 px-2 py-1 rounded-full">
                              {c.score}%
                            </span>
                          </div>
                          <p className="text-zinc-400">{c.email_id}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-6">{c.mobile_no}</td>
                    <td className="px-6 py-6">{c.invoices}</td>
                    <td className="px-6 py-6 text-emerald-400">
                      ${c.revenue.toLocaleString()}
                    </td>
                    <td className="px-6 py-6 text-orange-400">
                      ${c.balance.toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex justify-between items-center mt-6 text-zinc-400">
          <span>
            Page {page} of {totalPages}
          </span>

          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* MODAL */}
      <Modal
        open={openCustomerModal}
        onClose={() => setOpenCustomerModal(false)}
        onCreate={createCustomer}
        customer={customer}
        setCustomer={setCustomer}
      />
    </>
  );
}

function Stat({ title, value, color }: any) {
  return (
    <motion.div className="bg-zinc-800 border border-zinc-700 rounded-3xl p-8 h-[160px] flex flex-col justify-between">
      <p className="text-zinc-400">{title}</p>
      <p className={`text-4xl font-bold ${color}`}>{value}</p>
    </motion.div>
  );
}