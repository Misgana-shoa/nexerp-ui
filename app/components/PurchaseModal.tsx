"use client";

import { X, ChevronDown } from "lucide-react";
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

export default function PurchaseOrderModal({
  open,
  onClose,
  onCreate,
}: Props) {
  const [vendor, setVendor] = useState("");
  const [deliveryDays, setDeliveryDays] = useState("7");
  const [discount, setDiscount] = useState("0");
  const [notes, setNotes] = useState("");

  const [items, setItems] = useState<Item[]>([
    {
      product: "",
      qty: "",
      price: "",
      tax: "",
    },
  ]);

  if (!open) return null;

  const addItem = () => {
    setItems([
      ...items,
      {
        product: "",
        qty: "",
        price: "",
        tax: "",
      },
    ]);
  };

  const removeItem = (index: number) => {
    const updated = [...items];
    updated.splice(index, 1);

    setItems(
      updated.length
        ? updated
        : [
            {
              product: "",
              qty: "",
              price: "",
              tax: "",
            },
          ]
    );
  };

  const updateItem = (
    index: number,
    field: keyof Item,
    value: string
  ) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const subtotal = items.reduce((sum, item) => {
    return sum + (Number(item.qty) || 0) * (Number(item.price) || 0);
  }, 0);

  const taxTotal = items.reduce((sum, item) => {
    return (
      sum +
      (Number(item.qty) || 0) *
        (Number(item.price) || 0) *
        ((Number(item.tax) || 0) / 100)
    );
  }, 0);

  const total =
    subtotal + taxTotal - (Number(discount) || 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="w-full max-w-6xl rounded-2xl bg-zinc-800 text-white border border-zinc-700 shadow-2xl overflow-hidden">

        {/* HEADER */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-zinc-700">
          <h2 className="text-2xl font-semibold">
            New Purchase Order
          </h2>

          <button onClick={onClose}>
            <X className="text-zinc-400 hover:text-white w-6 h-6" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">

          {/* TOP */}
          <div className="grid grid-cols-2 gap-6">

            <div>
              <label className="text-zinc-400 text-sm">
                Vendor *
              </label>

              <div className="relative mt-2">
                <select
                  value={vendor}
                  onChange={(e) =>
                    setVendor(e.target.value)
                  }
                  className="w-full appearance-none px-5 py-4 rounded-xl bg-zinc-900 border border-zinc-700"
                >
                  <option value="">
                    Select Vendor
                  </option>
                  <option>ABC Supplier</option>
                  <option>Global Trading</option>
                </select>

                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
              </div>
            </div>

            <div>
              <label className="text-zinc-400 text-sm">
                Expected Delivery (days)
              </label>

              <input
                value={deliveryDays}
                onChange={(e) =>
                  setDeliveryDays(e.target.value)
                }
                className="w-full mt-2 px-5 py-4 rounded-xl bg-zinc-900 border border-zinc-700"
              />
            </div>
          </div>

          {/* ITEMS */}
          <div className="space-y-5">

            <div className="flex justify-between">
              <h3 className="text-zinc-400">
                Items
              </h3>

              <button
                onClick={addItem}
                className="px-5 py-2 bg-zinc-700 rounded-xl"
              >
                + Add Item
              </button>
            </div>

            {items.map((item, i) => (
              <div
                key={i}
                className="grid grid-cols-12 gap-4"
              >
                <div className="col-span-5">
                  <select
                    value={item.product}
                    onChange={(e) =>
                      updateItem(
                        i,
                        "product",
                        e.target.value
                      )
                    }
                    className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-xl"
                  >
                    <option>
                      Select Product
                    </option>
                    <option>Product A</option>
                    <option>Product B</option>
                  </select>
                </div>

                <input
                  placeholder="Qty"
                  value={item.qty}
                  onChange={(e) =>
                    updateItem(
                      i,
                      "qty",
                      e.target.value
                    )
                  }
                  className="col-span-2 px-4 py-3 bg-black border border-zinc-700 rounded-xl"
                />

                <input
                  placeholder="Price"
                  value={item.price}
                  onChange={(e) =>
                    updateItem(
                      i,
                      "price",
                      e.target.value
                    )
                  }
                  className="col-span-2 px-4 py-3 bg-black border border-zinc-700 rounded-xl"
                />

                <input
                  placeholder="Tax %"
                  value={item.tax}
                  onChange={(e) =>
                    updateItem(
                      i,
                      "tax",
                      e.target.value
                    )
                  }
                  className="col-span-2 px-4 py-3 bg-black border border-zinc-700 rounded-xl"
                />

                <button
                  onClick={() =>
                    removeItem(i)
                  }
                  className="col-span-1 bg-red-500 rounded-xl"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* TOTAL */}
          <div className="rounded-2xl bg-black px-6 py-7">

            <div className="space-y-5 text-[20px]">

              <div className="flex justify-between">
                <span className="text-[#e0c4a7]">
                  Subtotal
                </span>
                <span>
                  Rs {subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#e0c4a7]">
                  Tax
                </span>
                <span>
                  Rs {taxTotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[#e0c4a7]">
                  Discount
                </span>

                <input
                  value={discount}
                  onChange={(e) =>
                    setDiscount(e.target.value)
                  }
                  className="w-[180px] h-11 rounded-md bg-[#3a3a3a] border border-zinc-600 px-3 text-right outline-none"
                />
              </div>
            </div>

            <div className="border-t border-[#25465f] mt-6 pt-5 flex justify-between items-center">
              <span className="text-[24px] font-semibold">
                Total
              </span>

              <span className="text-[28px] font-bold text-orange-400">
                Rs {total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* NOTES */}
          <div>
            <label className="text-zinc-400">
              Notes
            </label>

            <textarea
              value={notes}
              onChange={(e) =>
                setNotes(e.target.value)
              }
              rows={5}
              className="w-full mt-2 px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl resize-none"
            />
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-4 px-8 py-6 border-t border-zinc-700">

          <button
            onClick={onClose}
            className="px-6 py-3 border rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={onCreate}
            className="px-6 py-3 bg-orange-500 rounded-xl"
          >
            Create Purchase Order
          </button>
        </div>
      </div>
    </div>
  );
}