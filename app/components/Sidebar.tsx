"use client";

import {
  LayoutDashboard, Users, Home, CircleDollarSign,
  ClipboardList, Table, CalendarDays, ChartLine,
  FileText, Truck, Sun, Box, Birdhouse, FilePlus,
  Banknote, DollarSign, Repeat, Calendar
} from "lucide-react";

const menuItems = [
  {
    label: "Day Mode",
    icon: Sun,
    color: "text-yellow-400",
    hover: "group-hover:text-gray-700",
  },
  {
    label: "Dashboard",
    icon: Home,
    color: "text-blue-400",
    hover: "group-hover:text-blue-300",
  },
  {
    label: "Customers",
    icon: Users,
    color: "text-emerald-400",
    hover: "group-hover:text-emerald-300",
  },
  {
    label: "Invoices",
    icon: FileText,
    color: "text-yellow-400",
    hover: "group-hover:text-yellow-300",
  },
];

function SidebarItem({ icon, label, variant, iconColor, textColor, hover }: any) {
  return (
    <div className="relative">

      {variant === "active" && (
        <span className="absolute left-0 top-0 h-full w-1 bg-indigo-700" />
      )}

      <div
        className={`
        flex items-center gap-4 cursor-pointer transition-all duration-300
        
        ${variant === "pill" && `
          mx-3 px-4 py-2.5 
          bg-white/20 rounded-full
          justify-start
        `}

        ${variant === "active" && `
          px-4 py-3 
          bg-linear-to-r from-[#212445] to-transparent
          justify-start
        `}

        ${!variant && `
          mx-2 px-4 py-3 
          rounded-lg hover:bg-linear-to-r from-[#212445] to-transparent
          justify-center group-hover:justify-start
        `}
        `}
      >
        {/* ICON */}
        <div className={`min-w-5 flex justify-center ${iconColor || "text-zinc-400"} ${hover || ""} transition`}>
          {icon}
        </div>

        {/* TEXT */}
        <span
          className={`
            text-sm font-bold whitespace-nowrap
            ${textColor || "text-zinc-300"} ${hover || ""}
            ${variant ? "block" : "hidden group-hover:block"}
            transition
          `}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

function Section({ short, full }: any) {
  return (
    <p className="text-[10px] text-zinc-500 px-4 mt-6 mb-2 whitespace-nowrap">
      <span className="block group-hover:hidden text-center">
        {short}
      </span>

      <span className="hidden group-hover:block">
        {full}
      </span>
    </p>
  );
}

export default function Sidebar() {
  return (
    <div
      className="
      group fixed left-0 top-0 h-screen
      w-16 hover:w-60
      bg-black border-r border-white/10
      transition-all duration-300
      overflow-y-auto z-50
      "
    >
      {/* LOGO */}
      <div className="p-4 font-bold text-lg text-white flex items-center justify-center group-hover:justify-start">
        <span className="block group-hover:hidden text-xl">P</span>
        <span className="hidden group-hover:block ml-2">PrimaERP</span>
      </div>

      {/* TOP */}
      <SidebarItem 
        icon={<Sun size={18} />} 
        label="Day Mode" 
        variant="pill"
        iconColor="text-yellow-400"
        textColor="text-taupe-400"
        hover="group-hover:text-yellow-300"
      />
      <div className="mt-5">
      {/* MAIN */}
      <SidebarItem 
        icon={<LayoutDashboard size={20} />} 
        label="Dashboard" 
        variant="active"
        iconColor="text-blue-400"
        textColor="text-taupe-400"
        hover="group-hover:text-blue-300"
      />
      </div>

      {/* PEOPLE */}
      <Section short="PEOPL" full="PEOPLE" />
      <SidebarItem 
        icon={<Users size={20} />} 
        label="Customers"
        iconColor="text-emerald-400"
  textColor="text-taupe-400"
        hover="group-hover:text-emerald-300"
      />
      <SidebarItem 
        icon={<Home size={20} />} 
        label="Vendors"
        iconColor="text-purple-400"
  textColor="text-taupe-400"
        hover="group-hover:text-purple-300"
      />

      {/* SALES */}
      <Section short="SALES" full="SALES" />
      <SidebarItem icon={<ClipboardList size={20} />} label="Orders" iconColor="text-blue-400" textColor="text-taupe-400" hover="group-hover:text-blue-300" />
      <SidebarItem icon={<Truck size={20} />} label="Delivery" iconColor="text-indigo-400" textColor="text-taupe-400" hover="group-hover:text-indigo-300" />
      <SidebarItem icon={<FileText size={20} />} label="Invoices" iconColor="text-yellow-400" textColor="text-taupe-400" hover="group-hover:text-yellow-300" />
      <SidebarItem icon={<Repeat size={20} />} label="Returns" iconColor="text-pink-400"textColor="text-taupe-400" hover="group-hover:text-pink-300" />
      <SidebarItem icon={<Table size={20} />} label="Payments" iconColor="text-emerald-400" textColor="text-taupe-400" hover="group-hover:text-emerald-300" />
      <SidebarItem icon={<CalendarDays size={20} />} label="Receipts"  iconColor="text-orange-400" textColor="text-taupe-400" hover="group-hover:text-orange-300" />
      <SidebarItem icon={<DollarSign size={20} />} label="Quotes" iconColor="text-teal-400" textColor="text-taupe-400" hover="group-hover:text-teal-300" />

      {/* PURCHASE */}
      <Section short="PURCH" full="PURCHASE" />
      <SidebarItem icon={<Calendar size={20} />} label="Purchase Orders" iconColor="text-blue-400" textColor="text-taupe-400" hover="group-hover:text-blue-300" />
      <SidebarItem icon={<Truck size={20} />} label="Suppliers" iconColor="text-indigo-400" textColor="text-taupe-400" hover="group-hover:text-indigo-300" />
    <SidebarItem icon={<FileText size={20} />} label="Bills" iconColor="text-yellow-400" textColor="text-taupe-400" hover="group-hover:text-yellow-300" />
      <SidebarItem icon={<Table size={20} />} label="Expenses" iconColor="text-red-400" textColor="text-taupe-400" hover="group-hover:text-red-300" />
      <SidebarItem icon={<CircleDollarSign size={20} />} label="Transactions" iconColor="text-orange-400" textColor="text-taupe-400" hover="group-hover:text-orange-300" />

      {/* INVENTORY */}
      <Section short="INVEN" full="INVENTORY" />
      <SidebarItem icon={<Box size={20} />} label="Products" iconColor="text-teal-400" textColor="text-taupe-400" hover="group-hover:text-teal-300" />

      {/* FINANCE */}
      <Section short="F" full="FINANCE" />
      <SidebarItem icon={<Birdhouse size={20} />} label="Accounts" iconColor="text-blue-400" textColor="text-taupe-400" hover="group-hover:text-blue-300" />
      <SidebarItem icon={<FilePlus size={20} />} label="Ledger" iconColor="text-purple-400" textColor="text-taupe-400" hover="group-hover:text-purple-300" />

      {/* PAYROLL */}
      <Section short="PAYRO" full="PAYROLL" />
      <SidebarItem icon={<Banknote size={20} />} label="Salary" iconColor="text-emerald-400" textColor="text-taupe-400" hover="group-hover:text-emerald-300" />
      <SidebarItem icon={<DollarSign size={20} />} label="Reports" iconColor="text-yellow-400" textColor="text-taupe-400" hover="group-hover:text-yellow-300" />

      {/* ANALYTICS */}
      <Section short="ANALY" full="ANALYTICS" />
      <SidebarItem icon={<ChartLine size={20} />} label="Analytics" iconColor="text-pink-400" textColor="text-taupe-400" hover="group-hover:text-pink-300" />
    </div>
  );
}