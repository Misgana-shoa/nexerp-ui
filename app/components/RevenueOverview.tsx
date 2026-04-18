export default function RevenueOverview() {
    return(
        <div className="card">
            {/* TOP ROW */}
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-zinc-300 font-semibold text-xl">Revenue Overview</h2>
                <p className="text-sm text-zinc-500">This financial year</p>
              </div>

            {/* RIGHT SIDE (PERCENT) */}
            <div className="text-zinc-300 text-2xl font-extrabold">
               $ 0.00
            </div>
          </div>
       </div>

    );
}