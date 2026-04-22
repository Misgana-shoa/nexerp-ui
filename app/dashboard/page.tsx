"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import CashFlow from "../components/CashFlow";
import CashPosition from "../components/CashPosition";
import Expenses from "../components/Expenses";
import InventoryStatus from "../components/InventoryStatus";
import QuickStats from "../components/QuickStats";
import RecentActivity from "../components/RecentActivity";
import RevenueOverview from "../components/RevenueOverview";
import TopCustomers from "../components/TopCustomers";
import {
  UserPlus,
  House,
  Box,
  FileSpreadsheet,
  AppWindow,
  DollarSign,
} from "lucide-react";
import Modal from "../components/Modal";
import VendorModal from "../components/VendorModal";
import ProductModal from "../components/ProductModal";
import SaleModal from "../components/SaleModal";
import CustomerPage from "../customer/page";
import VendorPage from "../Vendor/page";
import ProductPage from "../Product/page";

type Stats = {
  outstanding: number;
  invoices: number;
};

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    outstanding: 0,
    invoices: 0,
  });

  const [activeTab, setActiveTab] = useState("dashboard");

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
  });

  const [openCustomerModal, setOpenCustomerModal] = useState(false);

  const [openVendorModal, setOpenVendorModal] = useState(false);

  const [vendor, setVendor] = useState({
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
  });

  const [openProductModal, setOpenProductModal] = useState(false);

  const [product, setProduct] = useState({
    name: "",
    type: "Product",
    sku: "",
    sellingPrice: "",
    costPrice: "",
    item_group: "",
  });

  // SALE MODAL STATE
const [openSaleModal, setOpenSaleModal] = useState(false);

const [sale, setSale] = useState({
  name: "",
  type: "Product",
  sku: "",
  sellingPrice: "",
  costPrice: "",
  item_group: "",
});



  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  // ✅ TIME
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      setTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "UTC",
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // ✅ DATE
  useEffect(() => {
    const now = new Date();

    setDate(
      now.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      })
    );
  }, []);

  // ✅ FETCH DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/invoices", {
          credentials: "include",
        });

        const data = await res.json();

        const invoices = data.data?.length || 0;
        const outstanding = invoices * 1000;

        setStats({
          invoices,
          outstanding,
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  // ✅ AUTH
  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("/api/me", {
        credentials: "include",
      });

      if (!res.ok) {
        window.location.href = "/";
      }
    };

    checkAuth();
  }, []);

  // ✅ CREATE CUSTOMER
  const createCustomer = async () => {
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

      setActiveTab("customers");
    } else {
      alert("❌ Failed");
    }
  };

  // ✅ CREATE VENDOR
  const createVendor = async () => {
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

      setActiveTab("vendors");
    } else {
      alert("❌ Failed");
    }
  };

  // ✅ CREATE PRODUCT
  const createProduct = async () => {
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

      setActiveTab("products");
    } else {
      alert("❌ Failed");
    }
  };


  // ✅ CREATE SALE
const createSale = async () => {
  const res = await fetch("/api/sale", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sale),
  });

  if (res.ok) {
    alert("✅ Sale Created");

    setOpenSaleModal(false);

    setSale({
      name: "",
      type: "Product",
      sku: "",
      sellingPrice: "",
      costPrice: "",
      item_group: "",
    });

    setActiveTab("sales");
  } else {
    alert("❌ Failed");
  }
};

  return (
    <div className="layout font-serif">
      {/* ✅ SIDEBAR */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* ✅ MAIN DASHBOARD */}
      <div className="main ml-14 group-hover:ml-45 transition-all duration-300">
        {/* HEADER */}
        <div className="header">
          <div>
            <h1 className="font-bold text-3xl text-zinc-300">
              Welcome back, Demo User
            </h1>

            <p className="text-taupe-400">
              Here’s what’s happening with your business today
            </p>
          </div>

          {/* TIME BOX */}
          <div className="time-box">
            <p className="text-taupe-200 mb-1.5 font-semibold">
              {date}
            </p>

            <h2 className="text-blue-500 font-bold text-2xl">
              {time}
            </h2>

            <span className="text-taupe-400 text-xs">UTC</span>
          </div>
        </div>

        {/* SHOW DASHBOARD ONLY */}
        {activeTab === "dashboard" && (
          <>
            {/* FLOATING STATS */}
            <div className="cards floating">
              <div className="card glass flex flex-col justify-between min-h-20 p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-taupe-400 text-xs">
                      THIS MONTH
                    </span>

                    <h1 className="text-2xl font-bold text-zinc-300 mt-2">
                      $0.00
                    </h1>
                  </div>

                  <div className="flex items-center gap-1 text-emerald-400 text-sm font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-md backdrop-blur-sm shadow-[0_0_8px_rgba(16,185,129,0.25)]">
                    ↑ 0%
                  </div>
                </div>

                <p className="text-taupe-400 text-sm mt-4">
                  vs $0.00 last month
                </p>
              </div>

              <div className="card glass flex flex-col justify-between min-h-20 p-5">
                <div>
                  <span className="text-taupe-400 text-xs">
                    COLLECTION RATE
                  </span>

                  <h1 className="text-2xl font-bold text-zinc-300 mt-2">
                    66.7%
                  </h1>
                </div>

                <div className="mt-5">
                  <div className="w-full bg-taupe-500 h-2 rounded-full mb-3">
                    <div
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{ width: "66.7%" }}
                    />
                  </div>

                  <p className="text-taupe-400 text-sm">
                    Invoices paid vs total
                  </p>
                </div>
              </div>

              <div className="card glass flex flex-col justify-between min-h-10 p-5">
                <span className="text-taupe-400 text-xs">
                  PROFIT MARGIN
                </span>

                <h1 className="text-2xl font-bold text-emerald-500">
                  99.9%
                </h1>

                <p className="text-taupe-400">
                  Revenue: $5,333,826.00
                </p>

                <p className="text-taupe-400">
                  Expenses: $2,033,826.00
                </p>
              </div>

              <div className="card glass flex flex-col justify-between min-h-20 p-5">
                <span className="text-taupe-400 text-xs">
                  OUTSTANDING
                </span>

                <h1 className="text-2xl font-bold text-yellow-600">
                  ${stats.outstanding}
                </h1>

                <p className="text-taupe-400">
                  {stats.invoices} unpaid invoices
                </p>
              </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className="section">
              <h3 className="text-taupe-400 text-xl font-serif">
                Quick Actions
              </h3>

              <div className="actions">
                <div
                  className="flex items-center gap-2 text-emerald-400 text-sm font-semibold bg-emerald-500/10 border border-emerald-500/20 px-6 py-3 rounded-md backdrop-blur-sm cursor-pointer hover:scale-105 transition shadow-[0_0_8px_rgba(16,185,129,0.25)]"
                  onClick={() => {
                                    setActiveTab("customers");   // 👈 switches page
                                    setOpenCustomerModal(true);   // 👈 opens modal
                                 }}
                >
                  <UserPlus size={18} />
                  <span className="whitespace-nowrap">
                    Add Customer
                  </span>
                </div>

                <div
                  className="flex items-center gap-2 text-purple-400 text-sm font-semibold bg-purple-500/10 border border-purple-500/20 px-6 py-3 rounded-md backdrop-blur-sm cursor-pointer hover:scale-105 transition shadow-[0_0_8px_rgba(16,185,129,0.25)]"
                  onClick={() => {
                    setActiveTab("vendors") 
                    setOpenVendorModal(true);
                  }}
                >
                  <House size={18} />
                  <span className="whitespace-nowrap">
                    Add Vendor
                  </span>
                </div>

                <div
                  className="flex items-center gap-2 text-blue-400 text-sm font-semibold bg-blue-500/10 border border-blue-500/20 px-6 py-3 rounded-md backdrop-blur-sm cursor-pointer hover:scale-105 transition shadow-[0_0_8px_rgba(16,185,129,0.25)]"
                  onClick={() => { setActiveTab("products")
                    setOpenProductModal(true);
                  }}  // 👈 opens modal
                >
                  <Box />
                  <span className="whitespace-nowrap">
                    Add Products
                  </span>
                </div>

                <div className="flex items-center gap-2 text-pink-400 text-sm font-semibold bg-pink-500/10 border border-pink-500/20 px-6 py-3 rounded-md backdrop-blur-sm shadow-[0_0_8px_rgba(16,185,129,0.25)]"
                     onClick={() => { setActiveTab("sales") 
                      setOpenSaleModal(true); 
                    }} 
                >
                  <FileSpreadsheet />
                  <span className="whitespace-nowrap">
                    Sale Bills
                  </span>
                </div>

                <div className="flex items-center gap-2 text-yellow-400 text-sm font-semibold bg-yellow-500/10 border border-yellow-500/20 px-6 py-3 rounded-md backdrop-blur-sm shadow-[0_0_8px_rgba(16,185,129,0.25)]">
                  <AppWindow />
                  <span className="whitespace-nowrap">
                    Purchase Bill
                  </span>
                </div>

                <div className="flex items-center gap-2 text-teal-400 text-sm font-semibold bg-teal-500/10 border border-teal-500/20 px-6 py-3 rounded-md backdrop-blur-sm shadow-[0_0_8px_rgba(16,185,129,0.25)]">
                  <DollarSign />
                  <span className="whitespace-nowrap">
                    Petty Cash
                  </span>
                  Expenses
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <RevenueOverview />
              <TopCustomers />
              <CashPosition />
              <Expenses />
              <RecentActivity />
              <InventoryStatus />
              <CashFlow />
              <QuickStats />
            </div>

            <div className="alert">
              ⚠ {stats.invoices} Invoices Found
            </div>
          </>
        )}

        {/* TABLE PAGES */}
        {activeTab === "customers" && (
          <div className="mt-6">
            <CustomerPage />
          </div>
        )}

        {activeTab === "vendors" && (
          <div className="mt-6">
            <VendorPage />
          </div>
        )}

        {activeTab === "products" && (
          <div className="mt-6">
            <ProductPage />
          </div>
        )}
      </div>

      {/* MODALS */}
      <Modal
        open={openCustomerModal}
        onClose={() => setOpenCustomerModal(false)}
        onCreate={createCustomer}
        customer={customer}
        setCustomer={setCustomer}
      />

      <VendorModal
        open={openVendorModal}
        onClose={() => setOpenVendorModal(false)}
        onCreate={createVendor}
        vendor={vendor}
        setVendor={setVendor}
      />

      <ProductModal
        open={openProductModal}
        onClose={() => setOpenProductModal(false)}
        onCreate={createProduct}
        product={product}
        setProduct={setProduct}
      />
      <SaleModal
        open={openSaleModal}
        onClose={() => setOpenSaleModal(false)}
        onCreate={createSale}
        sale={sale}
        setSale={setSale}
      />
    </div>
  );
}