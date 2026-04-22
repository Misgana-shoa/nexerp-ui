"use client";

import { X, ChevronDown, Notebook } from "lucide-react";
import { useState } from "react";

type Item = {
  product: string;
  qty: string;
  price: string;
  tax: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onCreate: () => void;
};

export default function Modal({ open, onClose, onCreate }: Props) {
  const [customer, setCustomer] = useState("");
  const [validDays, setValidDays] = useState("15");
  const [discount, setDiscount] = useState("");

  const [notes, setNotes] = useState("");
  const [terms, setTerms] = useState("");

  const [items, setItems] = useState<Item[]>([
    { product: "", qty: "", price: "", tax: "" },
  ]);

  if (!open) return null;

  const addItem = () => {
    setItems([...items, { product: "", qty: "", price: "", tax: "" }]);
  };

  const removeItem = (index: number) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated.length ? updated : [{ product: "", qty: "", price: "", tax: "" }]);
  };

  const updateItem = (index: number, field: keyof Item, value: string) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const subtotal = items.reduce((sum, item) => {
    return sum + (Number(item.qty) || 0) * (Number(item.price) || 0);
  }, 0);

  const taxTotal = items.reduce((sum, item) => {
    return sum + (Number(item.qty) || 0) * (Number(item.price) || 0) * ((Number(item.tax) || 0) / 100);
  }, 0);

  const total = subtotal + taxTotal - (Number(discount) || 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="w-full max-w-6xl rounded-2xl bg-zinc-800 text-white border border-zinc-700 shadow-2xl overflow-hidden">

        {/* HEADER */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-zinc-700">
          <h2 className="text-2xl font-semibold">New Quotation</h2>
          <button onClick={onClose}>
            <X className="text-zinc-400 hover:text-white w-6 h-6" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">

          {/* TOP */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-zinc-400 text-sm">Customer *</label>
              <div className="relative mt-2">
                <select
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  className="w-full appearance-none px-5 py-4 rounded-xl bg-zinc-900 border border-zinc-700"
                >
                  <option value="">Select Customer...</option>
                  <option>John Doe</option>
                  <option>ABC Company</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
              </div>
            </div>

            <div>
              <label className="text-zinc-400 text-sm">Valid For (Days)</label>
              <input
                value={validDays}
                onChange={(e) => setValidDays(e.target.value)}
                className="w-full mt-2 px-5 py-4 rounded-xl bg-zinc-900 border border-zinc-700"
              />
            </div>
          </div>

          {/* ITEMS */}
          <div className="space-y-5">
            <div className="flex justify-between">
              <h3 className="text-zinc-400">Items</h3>
              <button onClick={addItem} className="px-5 py-2 bg-blue-600 rounded-xl">
                + Add Item
              </button>
            </div>

            {items.map((item, i) => (
              <div key={i} className="grid grid-cols-12 gap-4">
                <div className="col-span-5">
                  <select
                    value={item.product}
                    onChange={(e) => updateItem(i, "product", e.target.value)}
                    className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-xl"
                  >
                    <option>Select product...</option>
                  </select>
                </div>

                <input
                  className="col-span-2 px-4 py-3 bg-black border border-zinc-700 rounded-xl"
                  placeholder="Qty"
                  value={item.qty}
                  onChange={(e) => updateItem(i, "qty", e.target.value)}
                />

                <input
                  className="col-span-2 px-4 py-3 bg-black border border-zinc-700 rounded-xl"
                  placeholder="Price"
                  value={item.price}
                  onChange={(e) => updateItem(i, "price", e.target.value)}
                />

                <input
                  className="col-span-2 px-4 py-3 bg-black border border-zinc-700 rounded-xl"
                  placeholder="Tax %"
                  value={item.tax}
                  onChange={(e) => updateItem(i, "tax", e.target.value)}
                />

                <button
                  onClick={() => removeItem(i)}
                  className="col-span-1 bg-red-500 rounded-xl"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* TOTAL */}
          <div className="p-6 bg-black rounded-2xl space-y-3">
            <div>Subtotal: ${subtotal.toFixed(0)}</div>
            <div>Tax: ${taxTotal.toFixed(0)}</div>

            <input
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="Discount"
              className="w-40 px-3 py-2 bg-zinc-800 rounded-xl"
            />

            <div className="text-2xl font-bold text-emerald-400">
              Total: ${total.toFixed(0)}
            </div>
          </div>

          {/* NOTES + TERMS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="text-zinc-400">Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={5}
                className="w-full mt-2 px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl resize-none"
                placeholder="Write notes..."
              />
            </div>

            <div>
              <label className="text-zinc-400">Terms & Conditions</label>
              <textarea
                value={terms}
                onChange={(e) => setTerms(e.target.value)}
                rows={5}
                className="w-full mt-2 px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl resize-none"
                placeholder="Write terms..."
              />
            </div>

          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-4 px-8 py-6 border-t border-zinc-700">
          <button onClick={onClose} className="px-6 py-3 border rounded-xl">
            Cancel
          </button>

          <button
            onClick={onCreate}
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl"
          >
            Create Quotation
          </button>
        </div>
      </div>
    </div>
  );
}