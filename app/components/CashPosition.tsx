export default function CashPosition() {
  return (
    
          <div className="card glass flex flex-col justify-between h-full min-h-20 p-5">
  
            {/* TOP */}
           <div>
             <h2 className="text-zinc-300 font-semibold text-xl">Cash Position</h2>
             <p className="text-xs text-zinc-500">Bank accounts</p>
           </div>

            {/* BOTTOM */}
            <div className="mt-6">
              <h2 className="text-emerald-400 font-extrabold text-3xl">$ 0.00</h2>
              <p className="text-xs text-zinc-500">Total balance</p>
           </div>
         </div>
         
    
  );
}