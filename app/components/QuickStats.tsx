export default function QuickStats() {
  return (
    <div className="card glass p-6">
      <h2 className="text-zinc-300 text-xl font-semibold mb-6">
        Quick Stats
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-500/10 rounded-xl p-6 text-center">
          <h1 className="text-3xl font-bold text-blue-400">0</h1>
          <p className="text-sm text-zinc-400 mt-2">Customers</p>
        </div>

        <div className="bg-purple-500/10 rounded-xl p-6 text-center">
          <h1 className="text-3xl font-bold text-purple-400">0</h1>
          <p className="text-sm text-zinc-400 mt-2">Invoices</p>
        </div>

        <div className="bg-pink-500/10 rounded-xl p-6 text-center">
          <h1 className="text-3xl font-bold text-pink-400">0</h1>
          <p className="text-sm text-zinc-400 mt-2">Paid</p>
        </div>

        <div className="bg-yellow-500/10 rounded-xl p-6 text-center">
          <h1 className="text-3xl font-bold text-yellow-400">0</h1>
          <p className="text-sm text-zinc-400 mt-2">Pending</p>
        </div>
      </div>
    </div>
  );
}