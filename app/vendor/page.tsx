"use client";

import { useEffect, useMemo, useState } from "react";
import { Eye, Pencil, Trash2, Loader2, Plus, Download } from "lucide-react";
import VendorModal from "../components/VendorModal";

type Vendor = {
  name: string;
  supplier_name: string;
  email_id?: string;
  mobile_no?: string;
  balance?: number;
  total_spent?: number;
};

export default function VendorTable() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All Vendors");
  const [sortBy, setSortBy] = useState("Sort: Recent");

  const [openVendorModal, setOpenVendorModal] = useState(false);

  const [vendor, setVendor] = useState({
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
  });

  useEffect(() => {
    fetchVendors();
  }, []);

  async function fetchVendors() {
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
  }

  /* ================= FILTER + SORT ================= */
  const filtered = useMemo(() => {
    let list = [...vendors];
    const q = search.toLowerCase().trim();

    if (q) {
      list = list.filter(
        (v) =>
          v.supplier_name?.toLowerCase().includes(q) ||
          v.email_id?.toLowerCase().includes(q) ||
          v.mobile_no?.toLowerCase().includes(q)
      );
    }

    if (filter === "With Balance") {
      list = list.filter((v) => (v.balance || 0) > 0);
    }

    if (filter === "No Balance") {
      list = list.filter((v) => (v.balance || 0) === 0);
    }

    if (sortBy === "Sort: Name") {
      list.sort((a, b) =>
        a.supplier_name.localeCompare(b.supplier_name)
      );
    }

    if (sortBy === "Sort: Balance") {
      list.sort((a, b) => (b.balance || 0) - (a.balance || 0));
    }

    return list;
  }, [vendors, search, filter, sortBy]);

  /* ================= STATS ================= */
  const totalVendors = vendors.length;

  const totalPayables = vendors.reduce(
    (sum, v) => sum + (v.balance || 0),
    0
  );

  const withBalance = vendors.filter(
    (v) => (v.balance || 0) > 0
  ).length;

  /* ================= EXPORT CSV ================= */
  function exportCSV() {
    const headers = ["Vendor", "Email", "Phone", "Balance"];

    const body = filtered.map((v) => [
      v.supplier_name,
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
    a.download = "vendors.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  function initials(name: string) {
    return name?.charAt(0)?.toUpperCase() || "V";
  }

  const avatarColors = [
    "from-red-500 to-pink-500",
    "from-orange-500 to-yellow-500",
    "from-blue-500 to-indigo-500",
  ];

  /* ================= CREATE VENDOR ================= */
  const createVendor = async () => {
    try {
      const res = await fetch("/api/vendor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vendor),
      });

      if (res.ok) {
        alert("✅ Vendor Created");

        setOpenVendorModal(false);

        setVendor({
          name: "",
          email: "",
          phone: "",
          whatsapp: "",
        });

        fetchVendors(); // refresh table
      } else {
        alert("❌ Failed");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Error creating vendor");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-black text-white px-6 xl:px-12 py-8">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-5xl font-bold">Vendors</h1>

          <div className="flex gap-3">
            <button
              onClick={exportCSV}
              className="px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center gap-2"
            >
              <Download size={18} />
              Export CSV
            </button>

            <button
              onClick={() => setOpenVendorModal(true)}
              className="px-7 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center gap-2"
            >
              <Plus size={18} />
              Add Vendor
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          <Stat
            title="TOTAL VENDORS"
            value={totalVendors}
            color="text-orange-400"
          />

          <Stat
            title="TOTAL PAYABLES"
            value={`$${totalPayables.toLocaleString()}`}
            color="text-red-400"
          />

          <Stat
            title="WITH BALANCE"
            value={withBalance}
            color="text-yellow-400"
          />
        </div>

        {/* SEARCH */}
        <input
          placeholder="Search by name, email, or phone..."
          className="w-full h-16 mb-6 rounded-2xl bg-zinc-900 border border-zinc-700 px-6 text-lg outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* FILTER + SORT */}
        <div className="space-y-4 mb-6">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full h-16 rounded-2xl bg-zinc-900 border border-zinc-700 px-5 text-lg"
          >
            <option>All Vendors</option>
            <option>With Balance</option>
            <option>No Balance</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full h-16 rounded-2xl bg-zinc-900 border border-zinc-700 px-5 text-lg"
          >
            <option>Sort: Recent</option>
            <option>Sort: Name</option>
            <option>Sort: Balance</option>
          </select>
        </div>

        {/* TABLE */}
        <div className="rounded-3xl border border-zinc-900 overflow-hidden">
          <table className="w-full">
            <thead className="text-zinc-400 uppercase text-sm border-b border-zinc-800">
              <tr>
                <th className="px-6 py-5 text-left">Vendor</th>
                <th className="px-6 py-5 text-left">Phone</th>
                <th className="px-6 py-5 text-left">Balance</th>
                <th className="px-6 py-5 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="py-14 text-center">
                    <Loader2 className="animate-spin mx-auto" />
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-10 text-zinc-500">
                    No vendors found
                  </td>
                </tr>
              ) : (
                filtered.map((v, i) => (
                  <tr
                    key={v.name}
                    className="bg-zinc-900 border-b border-zinc-800"
                  >
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-14 h-14 rounded-full bg-gradient-to-br ${
                            avatarColors[i % 3]
                          } flex items-center justify-center`}
                        >
                          {initials(v.supplier_name)}
                        </div>

                        <div>
                          <span className="text-xl font-semibold">
                            {v.supplier_name}
                          </span>
                          <p className="text-zinc-400">{v.email_id}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-6">
                      {v.mobile_no || "-"}
                    </td>

                    <td className="px-6 py-6 text-emerald-400 font-semibold">
                      ${(v.balance || 0).toLocaleString()}
                    </td>

                    <td className="px-6 py-6">
                      <div className="flex gap-3">
                        <button className="px-4 py-2 bg-blue-600 rounded-xl">
                          <Eye size={16} />
                        </button>

                        <button className="px-4 py-2 border border-zinc-600 rounded-xl">
                          <Pencil size={16} />
                        </button>

                        <button className="px-4 py-2 bg-red-600 rounded-xl">
                          <Trash2 size={16} />
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

      {/* MODAL */}
      <VendorModal
        open={openVendorModal}
        onClose={() => setOpenVendorModal(false)}
        onCreate={createVendor}
        vendor={vendor}
        setVendor={setVendor}
      />
    </>
  );
}

function Stat({ title, value, color }: any) {
  return (
    <div className="bg-zinc-800 border border-zinc-700 rounded-3xl p-8 h-[160px] flex flex-col justify-between">
      <p className="text-zinc-400">{title}</p>
      <p className={`text-4xl font-bold ${color}`}>{value}</p>
    </div>
  );
}