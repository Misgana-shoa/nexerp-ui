"use client";

import { useEffect, useState } from "react";

type Customer = {
  name: string;
  customer_name: string;
  email_id?: string;
  mobile_no?: string;
};

export default function CustomerTable() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const res = await fetch("/api/customer/list", {
      credentials: "include",
    });

    const data = await res.json();
    setCustomers(data.data || []);
  };

  return (
    <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-700 shadow-lg">
      <h2 className="text-xl text-white mb-4 font-semibold">
        Customers
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-zinc-300">
          <thead className="text-xs uppercase bg-zinc-800 text-zinc-400">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((c) => (
              <tr
                key={c.name}
                className="border-b border-zinc-700 hover:bg-zinc-800 transition"
              >
                <td className="px-4 py-3">{c.customer_name}</td>
                <td className="px-4 py-3">{c.email_id || "-"}</td>
                <td className="px-4 py-3">{c.mobile_no || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}