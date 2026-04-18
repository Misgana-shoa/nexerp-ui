export default function CashFlow() {
  return (
    <div className="card glass p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-zinc-300 text-xl font-semibold">
          Cash Flow
        </h2>
        <p className="text-sm text-zinc-500">This month</p>
      </div>

      <div className="flex justify-between mt-6">
        <div>
          <p className="text-emerald-400 text-sm">↑ Cash In</p>
          <h1 className="text-2xl font-bold text-emerald-400">$0.00</h1>
        </div>

        <div>
          <p className="text-red-400 text-sm">↓ Cash Out</p>
          <h1 className="text-2xl font-bold text-red-400">$0.00</h1>
        </div>
      </div>

      <div className="mt-6 bg-emerald-500/10 rounded-xl p-5">
        <p className="text-zinc-400 text-sm">Net Flow</p>
        <h1 className="text-2xl font-bold text-emerald-400">
          +$0.00
        </h1>
      </div>
    </div>
  );
}