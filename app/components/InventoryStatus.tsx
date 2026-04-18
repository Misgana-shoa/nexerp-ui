export default function InventoryStatus() {
  return (
    <div className="card glass p-6">
      <h2 className="text-zinc-300 text-xl font-semibold mb-6">
        Inventory Status
      </h2>

      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl p-6 bg-emerald-500/10 text-center">
          <h1 className="text-3xl font-bold text-emerald-400">0</h1>
          <p className="text-sm text-zinc-400 mt-2">In Stock</p>
        </div>

        <div className="rounded-xl p-6 bg-yellow-500/10 text-center">
          <h1 className="text-3xl font-bold text-yellow-400">0</h1>
          <p className="text-sm text-zinc-400 mt-2">Low Stock</p>
        </div>

        <div className="rounded-xl p-6 bg-red-500/10 text-center">
          <h1 className="text-3xl font-bold text-red-400">0</h1>
          <p className="text-sm text-zinc-400 mt-2">Out of Stock</p>
        </div>
      </div>
    </div>
  );
}