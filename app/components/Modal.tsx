"use client";

import { X } from "lucide-react";
import { useState, useEffect } from "react";

type Customer = {
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onCreate: () => void;
  customer: Customer;
  setCustomer: (data: Customer) => void;
};

export default function Modal({
  open,
  onClose,
  onCreate,
  customer,
  setCustomer,
}: Props) {
  const [sameAsPhone, setSameAsPhone] = useState(false);

  if (!open) return null;

  const handleChange = (field: keyof Customer, value: string) => {
    setCustomer({
      ...customer,
      [field]: value,
    });
  };

  const handlePhoneChange = (value: string) => {
    handleChange("phone", value);
    if (sameAsPhone) {
      handleChange("whatsapp", value);
    }
  };

  const toggleWhatsapp = () => {
    const newValue = !sameAsPhone;
    setSameAsPhone(newValue);

    if (newValue) {
      handleChange("whatsapp", customer.phone);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl bg-zinc-800 text-white shadow-2xl border border-zinc-700">

        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-700">
          <h2 className="text-xl font-semibold">Add Customer</h2>
          <button onClick={onClose}>
            <X className="text-zinc-400 hover:text-white" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-6">

          {/* NAME */}
          <div>
            <label className="text-sm text-zinc-400">Name *</label>
            <input
              value={customer.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full mt-2 px-4 py-3 rounded-lg bg-black border border-zinc-700 focus:border-blue-500 outline-none"
            />
          </div>

          {/* EMAIL + PHONE */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-zinc-400">Email</label>
              <input
                type="email"
                value={customer.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full mt-2 px-4 py-3 rounded-lg bg-black border border-zinc-700 focus:border-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-zinc-400">Phone</label>
              <input
                value={customer.phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                className="w-full mt-2 px-4 py-3 rounded-lg bg-black border border-zinc-700 focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          {/* TOGGLE */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleWhatsapp}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                sameAsPhone ? "bg-green-500" : "bg-zinc-600"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full transition ${
                  sameAsPhone ? "translate-x-6" : ""
                }`}
              />
            </button>

            <span className="text-sm text-zinc-400">
              Same number for WhatsApp
            </span>
          </div>

          {/* WHATSAPP */}
          <div>
            <label className="text-sm text-green-400">WhatsApp Number</label>
            <input
              value={customer.whatsapp}
              onChange={(e) => handleChange("whatsapp", e.target.value)}
              className="w-full mt-2 px-4 py-3 rounded-lg bg-black border border-zinc-700 focus:border-green-500 outline-none"
            />
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-4 px-6 py-4 border-t border-zinc-700">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg border border-zinc-600 text-zinc-300 hover:bg-zinc-700"
          >
            Cancel
          </button>

          <button
            onClick={onCreate}
            className="px-6 py-2 rounded-lg bg-linear-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:opacity-90"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}