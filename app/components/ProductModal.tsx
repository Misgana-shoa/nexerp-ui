"use client";

import { X } from "lucide-react";
import { useState, useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreate: () => void;
  product: any;
  setProduct: (data: any) => void;
};

export default function ProductModal({
  open,
  onClose,
  onCreate,
  product,
  setProduct,
}: Props) {
  const [groups, setGroups] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/item-group/list")
      .then((res) => res.json())
      .then((data) => setGroups(data.data || []))
      .catch(() => setGroups([]));
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl bg-zinc-800 text-white border border-zinc-700">

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-zinc-700">
          <h2 className="text-xl font-semibold">New Product</h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">

          {/* Name */}
          <div>
            <label>Name</label>
            <input
              type="text"
              value={product.name}
              onChange={(e) =>
                setProduct((prev: any) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              className="w-full mt-2 px-4 py-3 rounded-lg bg-black border border-zinc-700"
            />
          </div>

          {/* Type + SKU */}
          <div className="grid grid-cols-2 gap-4">

            <div>
              <label>Type</label>
              <select
                value={product.type}
                onChange={(e) =>
                  setProduct((prev: any) => ({
                    ...prev,
                    type: e.target.value,
                  }))
                }
                className="w-full mt-2 px-4 py-3 rounded-lg bg-black border border-zinc-700"
              >
                <option>Product</option>
                <option>Service</option>
              </select>
            </div>

            <div>
              <label>SKU / Code</label>
              <input
                type="text"
                value={product.sku}
                onChange={(e) =>
                  setProduct((prev: any) => ({
                    ...prev,
                    sku: e.target.value,
                  }))
                }
                className="w-full mt-2 px-4 py-3 rounded-lg bg-black border border-zinc-700"
              />
            </div>

          </div>

          {/* Item Group */}
          <div>
            <label>Item Group</label>

            <select
              value={product.item_group || ""}
              onChange={(e) =>
                setProduct((prev: any) => ({
                  ...prev,
                  item_group: e.target.value,
                }))
              }
              className="w-full mt-2 px-4 py-3 rounded-lg bg-black border border-zinc-700"
            >
              <option value="">Select Group</option>

              {groups.map((g: any) => (
                <option key={g.name} value={g.name}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>

          {/* Prices */}
          <div className="grid grid-cols-2 gap-4">

            <div>
              <label>Selling Price</label>
              <input
                type="number"
                value={product.sellingPrice}
                onChange={(e) =>
                  setProduct((prev: any) => ({
                    ...prev,
                    sellingPrice: e.target.value,
                  }))
                }
                className="w-full mt-2 px-4 py-3 rounded-lg bg-black border border-zinc-700"
              />
            </div>

            <div>
              <label>Cost Price</label>
              <input
                type="number"
                value={product.costPrice}
                onChange={(e) =>
                  setProduct((prev: any) => ({
                    ...prev,
                    costPrice: e.target.value,
                  }))
                }
                className="w-full mt-2 px-4 py-3 rounded-lg bg-black border border-zinc-700"
              />
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 px-6 py-4 border-t border-zinc-700">

          <button onClick={onClose}>
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