export default function Expenses() {
  return (
    <div className="card glass flex flex-col justify-between h-full min-h-10 p-5">
  
            {/* TOP */}
           <div>
             <h2 className="text-zinc-300 font-semibold text-xl">Expenses</h2>
             <p className="text-xs text-zinc-500">By category</p>
           </div>

            {/* BOTTOM */}
            <div className="mt-6">
              <h2 className="text-red-400 font-extrabold text-3xl">$ 0.00</h2>
           </div>
         </div>
    
  );
}