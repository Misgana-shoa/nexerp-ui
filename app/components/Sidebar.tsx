"use client";

import {
  LayoutDashboard,
  Users,
  Home,
  CircleDollarSign,
  ClipboardList,
  Table,
  CalendarDays,
  ChartLine,
  FileText,
  Truck,
  Sun,
  Box,
  Birdhouse,
  FilePlus,
  Banknote,
  DollarSign,
  Repeat,
  Calendar,
} from "lucide-react";

type SidebarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

type ItemProps = {
  icon: any;
  label: string;
  tab?: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  iconColor?: string;
};

function SidebarItem({
  icon,
  label,
  tab,
  activeTab,
  setActiveTab,
  iconColor = "text-zinc-400",
}: ItemProps) {
  const isActive = activeTab === tab;

  return (
    <button
      onClick={() => tab && setActiveTab(tab)}
      className={`
        relative w-full flex items-center gap-4
        px-4 py-3 text-left rounded-xl
        transition-all duration-300
        group/item
        ${
          isActive
            ? "bg-gradient-to-r from-[#1e2242] to-transparent"
            : "hover:bg-zinc-900"
        }
      `}
    >
      {isActive && (
        <span className="absolute left-0 top-0 h-full w-1 bg-indigo-500 rounded-r-full" />
      )}

      <div
        className={`
          min-w-[20px] flex justify-center
          ${iconColor}
        `}
      >
        {icon}
      </div>

      <span
        className="
          hidden group-hover:block
          whitespace-nowrap text-sm font-semibold text-zinc-300
        "
      >
        {label}
      </span>
    </button>
  );
}

function Section({
  short,
  full,
}: {
  short: string;
  full: string;
}) {
  return (
    <div className="mt-6 mb-2 px-4 text-[10px] text-zinc-500 uppercase tracking-widest">
      <span className="block group-hover:hidden text-center">
        {short}
      </span>

      <span className="hidden group-hover:block">
        {full}
      </span>
    </div>
  );
}

export default function Sidebar({
  activeTab,
  setActiveTab,
}: SidebarProps) {
  return (
    <aside
      className="
        group
        fixed left-0 top-0 z-50
        h-screen
        w-16 hover:w-64
        bg-black
        border-r border-white/10
        overflow-y-auto
        transition-all duration-300
      "
    >
      {/* LOGO */}
      <div
        className="
          h-16 flex items-center
          justify-center group-hover:justify-start
          px-4 border-b border-white/10
        "
      >
        <span className="text-xl font-bold text-white group-hover:hidden">
          P
        </span>

        <span className="hidden group-hover:block text-lg font-bold text-white">
          PrimaERP
        </span>
      </div>

      {/* TOP */}
      <div className="p-3">
        <button
          className="
            w-full flex items-center gap-4
            px-4 py-3 rounded-full
            bg-white/10 hover:bg-white/15
            transition
          "
        >
          <Sun size={18} className="text-yellow-400" />

          <span className="hidden group-hover:block text-sm font-semibold text-zinc-300">
            Day Mode
          </span>
        </button>
      </div>

      {/* MAIN */}
      <div className="px-2">
        <SidebarItem
          icon={<LayoutDashboard size={20} />}
          label="Dashboard"
          tab="dashboard"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          iconColor="text-blue-400"
        />
      </div>

      {/* PEOPLE */}
      <Section short="PPL" full="PEOPLE" />

      <div className="px-2 space-y-1">
        <SidebarItem
          icon={<Users size={20} />}
          label="Customers"
          tab="customers"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          iconColor="text-emerald-400"
        />

        <SidebarItem
          icon={<Home size={20} />}
          label="Vendors"
          tab="vendors"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          iconColor="text-purple-400"
        />
      </div>

      {/* SALES */}
      <Section short="SAL" full="SALES" />

      <div className="px-2 space-y-1">
        <SidebarItem
          icon={<ClipboardList size={20} />}
          label="Orders"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          iconColor="text-blue-400"
        />

        <SidebarItem
          icon={<Truck size={20} />}
          label="Delivery"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          iconColor="text-indigo-400"
        />

        <SidebarItem
          icon={<FileText size={20} />}
          label="Invoices"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          iconColor="text-yellow-400"
        />

        <SidebarItem
          icon={<Repeat size={20} />}
          label="Returns"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          iconColor="text-pink-400"
        />

        <SidebarItem
          icon={<Table size={20} />}
          label="Payments"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          iconColor="text-emerald-400"
        />

        <SidebarItem
          icon={<CalendarDays size={20} />}
          label="Receipts"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          iconColor="text-orange-400"
        />

        <SidebarItem
          icon={<DollarSign size={20} />}
          label="Quotes"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          iconColor="text-teal-400"
        />
      </div>

      {/* PURCHASE */}
      <Section short="PUR" full="PURCHASE" />

      <div className="px-2 space-y-1">
        <SidebarItem
          icon={<Calendar size={20} />}
          label="Purchase Orders"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          iconColor="text-blue-400"
        />

        <SidebarItem
          icon={<Truck size={20} />}
          label="Suppliers"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          iconColor="text-indigo-400"
        />

        <SidebarItem
          icon={<FileText size={20} />}
          label="Bills"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          iconColor="text-yellow-400"
        />

        <SidebarItem
          icon={<CircleDollarSign size={20} />}
          label="Transactions"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          iconColor="text-orange-400"
        />
      </div>

      {/* INVENTORY */}
      <Section short="INV" full="INVENTORY" />

      <div className="px-2 space-y-1">
        <SidebarItem
          icon={<Box size={20} />}
          label="Products"
          tab="products"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          iconColor="text-teal-400"
        />
      </div>

      {/* FINANCE */}
      <Section short="FIN" full="FINANCE" />

      <div className="px-2 space-y-1">
        <SidebarItem
          icon={<Birdhouse size={20} />}
          label="Accounts"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          iconColor="text-blue-400"
        />

        <SidebarItem
          icon={<FilePlus size={20} />}
          label="Ledger"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          iconColor="text-purple-400"
        />
      </div>

      {/* PAYROLL */}
      <Section short="PAY" full="PAYROLL" />

      <div className="px-2 space-y-1">
        <SidebarItem
          icon={<Banknote size={20} />}
          label="Salary"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          iconColor="text-emerald-400"
        />

        <SidebarItem
          icon={<DollarSign size={20} />}
          label="Reports"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          iconColor="text-yellow-400"
        />
      </div>

      {/* ANALYTICS */}
      <Section short="ANA" full="ANALYTICS" />

      <div className="px-2 pb-6">
        <SidebarItem
          icon={<ChartLine size={20} />}
          label="Analytics"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          iconColor="text-pink-400"
        />
      </div>
    </aside>
  );
}