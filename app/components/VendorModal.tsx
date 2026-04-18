"use client";

import { X } from "lucide-react";
import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreate: () => void;
  vendor: any;
  setVendor: (data: any) => void;
};

export default function VendorModal({
  open,
  onClose,
  onCreate,
  setVendor,
}: Props) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [sameAsPhone, setSameAsPhone] = useState(false);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl bg-zinc-800 text-white shadow-2xl border border-zinc-700">

        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-700">
          <h2 className="text-xl font-semibold text-zinc-200">
            Add Vendor
          </h2>
          <button onClick={onClose}>
            <X className="text-zinc-400 hover:text-white" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-6">

          {/* NAME */}
          <div>
            <label className="text-sm text-zinc-400">
              Vendor Name <span className="text-red-400">*</span>
            </label>
            <input
  type="text"
  onChange={(e) =>
    setVendor((prev: any) => ({
      ...prev,
      name: e.target.value,
    }))
  }
  className="w-full mt-2 px-4 py-3 rounded-lg bg-black text-white outline-none border border-zinc-700 focus:border-purple-500"
/>
          </div>

          {/* EMAIL + PHONE */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-zinc-400">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 px-4 py-3 rounded-lg bg-black text-white outline-none border border-zinc-700 focus:border-purple-500"
              />
            </div>

            <div>
              <label className="text-sm text-zinc-400">Phone</label>
              <input
                type="text"
                placeholder="03XX-XXXXXXX"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (sameAsPhone) setWhatsapp(e.target.value);
                }}
                className="w-full mt-2 px-4 py-3 rounded-lg bg-black text-white outline-none border border-zinc-700 focus:border-purple-500"
              />
            </div>
          </div>

          {/* WHATSAPP TOGGLE */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const value = !sameAsPhone;
                setSameAsPhone(value);
                if (value) setWhatsapp(phone);
              }}
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

          {/* WHATSAPP INPUT */}
          <div>
            <label className="text-sm text-green-400">
              WhatsApp Number
            </label>
            <input
              type="text"
              placeholder="03XX-XXXXXXX"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="w-full mt-2 px-4 py-3 rounded-lg bg-black text-white outline-none border border-zinc-700 focus:border-green-500"
            />
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-4 px-6 py-4 border-t border-zinc-700">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg border border-zinc-600 text-zinc-300 hover:bg-zinc-700 transition"
          >
            Cancel
          </button>

          <button
            onClick={onCreate}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold hover:opacity-90 transition"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}