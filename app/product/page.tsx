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
  Minus,
  Eye,
  Download,
} from "lucide-react";
import { motion } from "framer-motion";
import ProductModal from "../components/ProductModal";

type Product = {
  name: string;
  item_name: string;
  item_code: string;
  stock_qty?: number;
  price?: number;
  sold_qty?: number;
};

const PAGE_SIZE = 8;

export default function ProductTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [stockFilter, setStockFilter] = useState("All Stock");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const [openProductModal, setOpenProductModal] = useState(false);

  const [product, setProduct] = useState({
    name: "",
    type: "Product",
    sku: "",
    sellingPrice: "",
    costPrice: "",
    item_group: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      setLoading(true);

      const res = await fetch("/api/product/list");
      const data = await res.json();

      const enriched = (data.data || []).map((p: Product) => ({
        ...p,
        stock_qty: p.stock_qty ?? Math.floor(Math.random() * 500),
        price: p.price ?? Math.floor(Math.random() * 150 + 10),
        sold_qty: p.sold_qty ?? Math.floor(Math.random() * 900),
      }));

      setProducts(enriched);
    } finally {
      setLoading(false);
    }
  }

  const filtered = useMemo(() => {
    let list = [...products];

    const q = search.toLowerCase().trim();

    if (q) {
      list = list.filter(
        (p) =>
          p.item_name?.toLowerCase().includes(q) ||
          p.item_code?.toLowerCase().includes(q)
      );
    }

    if (stockFilter === "In Stock") {
      list = list.filter((p) => (p.stock_qty || 0) > 20);
    }

    if (stockFilter === "Low Stock") {
      list = list.filter(
        (p) => (p.stock_qty || 0) > 0 && (p.stock_qty || 0) <= 20
      );
    }

    if (stockFilter === "Out of Stock") {
      list = list.filter((p) => (p.stock_qty || 0) === 0);
    }

    return list;
  }, [products, search, stockFilter, typeFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const rows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const inventoryValue = filtered.reduce(
    (sum, p) => sum + (p.stock_qty || 0) * (p.price || 0),
    0
  );

  const lowStock = filtered.filter(
    (p) => (p.stock_qty || 0) > 0 && (p.stock_qty || 0) <= 20
  ).length;

  function updateStock(name: string, delta: number) {
    setProducts((prev) =>
      prev.map((p) =>
        p.name === name
          ? {
              ...p,
              stock_qty: Math.max(0, (p.stock_qty || 0) + delta),
            }
          : p
      )
    );
  }

  function stockLabel(qty: number) {
    if (qty === 0) return "Out";
    if (qty <= 20) return "Low";
    return "OK";
  }

  function stockColor(qty: number) {
    if (qty === 0) return "bg-red-500/20 text-red-400";
    if (qty <= 20) return "bg-orange-500/20 text-orange-400";
    return "bg-emerald-500/20 text-emerald-400";
  }

  function exportCSV() {
    const headers = [
      "Product",
      "Code",
      "Price",
      "Stock",
      "Sold",
      "Revenue",
    ];

    const body = filtered.map((p) => [
      p.item_name,
      p.item_code,
      p.price || 0,
      p.stock_qty || 0,
      p.sold_qty || 0,
      (p.price || 0) * (p.sold_qty || 0),
    ]);

    const csv = [headers, ...body]
      .map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "products.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  /* ================= CREATE PRODUCT ================= */
  const createProduct = async () => {
    try {
      const res = await fetch("/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (res.ok) {
        alert("✅ Product Created");

        setOpenProductModal(false);

        setProduct({
          name: "",
          type: "Product",
          sku: "",
          sellingPrice: "",
          costPrice: "",
          item_group: "",
        });

        fetchProducts();
      } else {
        alert("❌ Failed");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Error creating product");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-black text-white w-full max-w-300 mx-auto px-3 md:px-5 lg:px-6 py-5 overflow-x-hidden">
        {/* HEADER */}
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between mb-6 w-full">
          <h1 className="text-3xl md:text-4xl font-bold">
            Products & Services
          </h1>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={exportCSV}
              className="px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-700 hover:bg-zinc-700 transition font-semibold flex items-center gap-2"
            >
              <Download size={18} />
              Export CSV
            </button>

            <button
              onClick={() => setOpenProductModal(true)}
              className="px-7 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center gap-2"
            >
              <Plus size={18} />
              Add Product
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-6 w-full">
          <Stat title="PRODUCTS" value={filtered.length} color="text-blue-400" />
          <Stat title="SERVICES" value={0} color="text-purple-400" />
          <Stat title="LOW STOCK" value={lowStock} color="text-orange-400" />
          <Stat
            title="INVENTORY VALUE"
            value={`$${inventoryValue.toLocaleString()}`}
            color="text-emerald-400"
          />
        </div>

        {/* SEARCH */}
        <div className="mb-4 w-full">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
              size={18}
            />

            <input
              placeholder="Search by name, SKU..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full h-16 rounded-2xl bg-zinc-900 border border-zinc-700 pl-12 pr-4 text-lg outline-none"
            />
          </div>
        </div>

        {/* FILTERS */}
        <div className="space-y-4 mb-6 w-full">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full h-16 rounded-2xl bg-zinc-900 border border-zinc-700 px-4 text-lg outline-none"
          >
            <option>All Types</option>
            <option>Products</option>
            <option>Services</option>
          </select>

          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="w-full h-16 rounded-2xl bg-zinc-900 border border-zinc-700 px-4 text-lg outline-none"
          >
            <option>All Stock</option>
            <option>In Stock</option>
            <option>Low Stock</option>
            <option>Out of Stock</option>
          </select>
        </div>

        {/* TABLE */}
        <div className="w-full rounded-3xl overflow-hidden border border-zinc-800">
          <div className="overflow-x-auto">
            <table className="w-full min-w-auto">
              <thead className="bg-black border-b border-zinc-800 text-zinc-400 uppercase text-sm">
                <tr>
                  <th className="text-left px-6 py-5">Product</th>
                  <th className="text-left px-6 py-5">Type</th>
                  <th className="text-left px-6 py-5">Price</th>
                  <th className="text-left px-6 py-5">Stock</th>
                  <th className="text-left px-6 py-5">Sold</th>
                  <th className="text-left px-6 py-5">Revenue</th>
                  <th className="text-left px-6 py-5">Actions</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="py-14 text-center">
                      <Loader2 className="animate-spin mx-auto" />
                    </td>
                  </tr>
                ) : (
                  rows.map((item) => {
                    const qty = item.stock_qty || 0;
                    const price = item.price || 0;
                    const sold = item.sold_qty || 0;
                    const revenue = sold * price;

                    return (
                      <motion.tr
                        key={item.name}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border-b border-zinc-800 bg-zinc-900 hover:bg-zinc-800/70 transition"
                      >
                        <td className="px-6 py-5">
                          <div className="text-2xl font-semibold">
                            {item.item_name}
                          </div>

                          <div className="text-zinc-400 mt-2">
                            {item.item_code}
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <span className="px-4 py-2 rounded-full bg-blue-500/20 text-blue-400 text-sm">
                            product
                          </span>
                        </td>

                        <td className="px-6 py-5 text-2xl">${price}</td>

                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateStock(item.name, -1)}
                              className="w-9 h-9 rounded bg-zinc-700 hover:bg-zinc-600 flex items-center justify-center"
                            >
                              <Minus size={14} />
                            </button>

                            <span className="text-2xl min-w-[40px]">
                              {qty}
                            </span>

                            <button
                              onClick={() => updateStock(item.name, 1)}
                              className="w-9 h-9 rounded bg-zinc-700 hover:bg-zinc-600 flex items-center justify-center"
                            >
                              <Plus size={14} />
                            </button>

                            <span
                              className={`px-3 py-1 rounded-lg text-sm ${stockColor(
                                qty
                              )}`}
                            >
                              {stockLabel(qty)}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-5 text-2xl">
                          {sold.toFixed(2)}
                        </td>

                        <td className="px-6 py-5 text-emerald-400 text-2xl font-semibold">
                          ${revenue.toLocaleString()}
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2 whitespace-nowrap">
                            <button className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 flex items-center gap-1">
                              <Eye size={12} />
                              View
                            </button>

                            <button className="px-3 py-2 rounded-xl border border-zinc-600 hover:bg-zinc-800 flex items-center gap-2">
                              <Pencil size={12} />
                              Edit
                            </button>

                            <button className="px-3 py-2 rounded-xl bg-red-600 hover:bg-red-500 flex items-center gap-2">
                              <Trash2 size={12} />
                              Delete
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* PAGINATION */}
        <div className="flex justify-between items-center mt-5 text-zinc-400 w-full">
          <span>
            Page {page} of {totalPages}
          </span>

          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="w-10 h-10 rounded-lg bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="w-10 h-10 rounded-lg bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* MODAL */}
      <ProductModal
        open={openProductModal}
        onClose={() => setOpenProductModal(false)}
        onCreate={createProduct}
        product={product}
        setProduct={setProduct}
      />
    </>
  );
}

function Stat({
  title,
  value,
  color,
}: {
  title: string;
  value: string | number;
  color: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-zinc-800 border border-zinc-700 rounded-3xl p-7 min-h-42.5 w-full"
    >
      <p className="text-zinc-400 text-lg">{title}</p>

      <p className={`text-5xl font-bold mt-8 ${color}`}>
        {value}
      </p>
    </motion.div>
  );
}