"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, Pencil, Trash2, Package, Download, Loader2, ChevronLeft, ChevronRight, X } from "lucide-react";

type Product = {
  name: string;
  item_name: string;
  item_code: string;
  stock_uom?: string;
  disabled?: number;
};

const PAGE_SIZE = 10;

export default function ProductTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [toast, setToast] = useState<{msg:string,type:'ok'|'err'}|null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);
  const [editName, setEditName] = useState("");
  const [editCode, setEditCode] = useState("");

  useEffect(() => { fetchProducts(); }, []);
  useEffect(() => { if(toast){ const t=setTimeout(()=>setToast(null),2500); return ()=>clearTimeout(t);} }, [toast]);

  async function fetchProducts(){
    try{
      setLoading(true);
      const res = await fetch('/api/product/list', { credentials:'include' });
      const data = await res.json();
      setProducts(data.data || []);
    }catch{
      showToast('Failed to load products','err');
    }finally{ setLoading(false); }
  }

  function showToast(msg:string,type:'ok'|'err'='ok'){ setToast({msg,type}); }

  const filtered = useMemo(()=>{
    const q = search.toLowerCase().trim();
    if(!q) return products;
    return products.filter(p => p.item_name?.toLowerCase().includes(q) || p.item_code?.toLowerCase().includes(q));
  },[products,search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const rows = filtered.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);

  useEffect(()=>{ if(page>totalPages) setPage(1); },[search, totalPages]);

  function exportCSV(){
    const headers = ['Product Name','Code','UOM','Status'];
    const lines = filtered.map(p => [p.item_name,p.item_code,p.stock_uom||'Nos',p.disabled?'Disabled':'Active']);
    const csv = [headers,...lines].map(r=>r.map(v=>`"${String(v??'').replace(/"/g,'""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href=url; a.download='products.csv'; a.click(); URL.revokeObjectURL(url);
  }

  async function deleteProduct(name:string){
    if(!confirm('Delete this product? This cannot be undone.')) return;
    const res = await fetch('/api/product/delete', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({name})});
    if(res.ok){ showToast('Product deleted'); fetchProducts(); } else showToast('Delete failed','err');
  }

  function openEdit(p:Product){ setSelected(p); setEditName(p.item_name); setEditCode(p.item_code); setEditOpen(true); }

  async function saveEdit(){
    if(!selected) return;
    const res = await fetch('/api/product/update', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({name:selected.name,item_name:editName,item_code:editCode})});
    if(res.ok){ setEditOpen(false); showToast('Product updated'); fetchProducts(); } else showToast('Update failed','err');
  }

  return (
    <div className='mt-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-6 text-white'>
      {toast && <div className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-xl shadow-lg ${toast.type==='ok'?'bg-emerald-600':'bg-red-600'}`}>{toast.msg}</div>}

      <div className='flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-6'>
        <div>
          <h2 className='text-2xl font-bold flex items-center gap-2'><Package size={22}/> Products</h2>
          <p className='text-zinc-400 text-sm mt-1'>Total Products: {filtered.length}</p>
        </div>
        <div className='flex gap-3 flex-col sm:flex-row w-full md:w-auto'>
          <div className='relative w-full md:w-80'>
            <Search size={18} className='absolute left-3 top-3 text-zinc-500'/>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder='Search product...' className='w-full pl-10 pr-4 py-3 rounded-xl bg-black/40 border border-white/10 outline-none focus:border-indigo-500'/>
          </div>
          <button onClick={exportCSV} className='px-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 flex items-center gap-2'><Download size={16}/> Export CSV</button>
        </div>
      </div>

      <div className='overflow-x-auto rounded-2xl border border-white/10'>
        <table className='w-full text-sm'>
          <thead className='bg-black/30 text-zinc-400 uppercase text-xs'>
            <tr>
              <th className='px-4 py-4 text-left'>Product Name</th>
              <th className='px-4 py-4 text-left'>Code</th>
              <th className='px-4 py-4 text-left'>UOM</th>
              <th className='px-4 py-4 text-left'>Status</th>
              <th className='px-4 py-4 text-right'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan={5} className='py-12'><div className='flex justify-center'><Loader2 className='animate-spin'/></div></td></tr> : rows.length===0 ? <tr><td colSpan={5} className='py-12 text-center text-zinc-500'>No Products Found</td></tr> : rows.map(item => (
              <tr key={item.name} className='border-t border-white/10 hover:bg-white/5'>
                <td className='px-4 py-4 font-medium'>{item.item_name}</td>
                <td className='px-4 py-4 text-zinc-300'>{item.item_code}</td>
                <td className='px-4 py-4 text-zinc-300'>{item.stock_uom || 'Nos'}</td>
                <td className='px-4 py-4'>{item.disabled ? <span className='text-red-400'>Disabled</span> : <span className='text-emerald-400'>Active</span>}</td>
                <td className='px-4 py-4'><div className='flex justify-end gap-2'>
                  <button onClick={()=>openEdit(item)} className='p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20'><Pencil size={16}/></button>
                  <button onClick={()=>deleteProduct(item.name)} className='p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20'><Trash2 size={16}/></button>
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='flex items-center justify-between mt-5 text-sm'>
        <span className='text-zinc-400'>Page {page} of {totalPages}</span>
        <div className='flex gap-2'>
          <button disabled={page===1} onClick={()=>setPage(p=>p-1)} className='px-3 py-2 rounded-lg border border-white/10 disabled:opacity-40'><ChevronLeft size={16}/></button>
          <button disabled={page===totalPages} onClick={()=>setPage(p=>p+1)} className='px-3 py-2 rounded-lg border border-white/10 disabled:opacity-40'><ChevronRight size={16}/></button>
        </div>
      </div>

      {editOpen && <div className='fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4'>
        <div className='w-full max-w-lg rounded-3xl border border-white/10 bg-zinc-900 p-6'>
          <div className='flex justify-between items-center mb-5'><h3 className='text-xl font-bold'>Edit Product</h3><button onClick={()=>setEditOpen(false)}><X/></button></div>
          <div className='space-y-4'>
            <input value={editName} onChange={e=>setEditName(e.target.value)} placeholder='Product Name' className='w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10'/>
            <input value={editCode} onChange={e=>setEditCode(e.target.value)} placeholder='Code' className='w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10'/>
          </div>
          <div className='flex justify-end gap-3 mt-6'>
            <button onClick={()=>setEditOpen(false)} className='px-5 py-3 rounded-xl border border-white/10'>Cancel</button>
            <button onClick={saveEdit} className='px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500'>Save Changes</button>
          </div>
        </div>
      </div>}
    </div>
  );
}
