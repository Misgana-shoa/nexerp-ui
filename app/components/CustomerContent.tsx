"use client";

export default function CustomerContent() {
  return (
    <div className="p-6 space-y-6 text-white">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Customers</h1>

        <button className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600">
          + Add Customer
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-[#2f3640] p-5 rounded-xl">
          <p className="text-gray-400 text-sm">TOTAL CUSTOMERS</p>
          <h1 className="text-3xl text-blue-500 font-bold mt-2">5</h1>
        </div>

        <div className="bg-[#2f3640] p-5 rounded-xl">
          <p className="text-gray-400 text-sm">TOTAL RECEIVABLES</p>
          <h1 className="text-3xl text-yellow-500 font-bold mt-2">$58,422</h1>
        </div>

        <div className="bg-[#2f3640] p-5 rounded-xl">
          <p className="text-gray-400 text-sm">WITH BALANCE</p>
          <h1 className="text-3xl text-red-500 font-bold mt-2">2</h1>
        </div>

        <div className="bg-[#2f3640] p-5 rounded-xl">
          <p className="text-gray-400 text-sm">NEW THIS MONTH</p>
          <h1 className="text-3xl text-green-500 font-bold mt-2">0</h1>
        </div>
      </div>

      {/* SEARCH */}
      <input
        placeholder="Search by name, email, or phone..."
        className="w-full p-4 rounded-xl bg-[#2f3640] outline-none"
      />

      {/* FILTERS */}
      <div className="flex gap-4">
        <div className="flex-1 p-4 bg-[#2f3640] rounded-xl">
          All Customers
        </div>
        <div className="flex-1 p-4 bg-[#2f3640] rounded-xl">
          Sort: Recent
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-[#2f3640] rounded-xl overflow-hidden">

        {/* HEADER */}
        <div className="grid grid-cols-6 p-4 text-gray-400 text-sm border-b border-gray-600">
          <span>CUSTOMER</span>
          <span>PHONE</span>
          <span>INVOICES</span>
          <span>REVENUE</span>
          <span>BALANCE</span>
          <span>ACTIONS</span>
        </div>

        {/* ROW 1 */}
        <div className="grid grid-cols-6 p-4 items-center border-b border-gray-700">
          <div>
            <p className="font-semibold">Steve</p>
            <p className="text-gray-400 text-sm">steveth@thomassx.com</p>
          </div>

          <span>0355-5555555</span>
          <span>1</span>
          <span className="text-green-400">$0</span>
          <span className="text-yellow-400">$57,942</span>

          <div className="flex gap-2">
            <button className="px-3 py-1 bg-blue-500 rounded">View</button>
            <button className="px-3 py-1 border border-gray-500 rounded">Edit</button>
            <button className="px-3 py-1 bg-red-500 rounded">Delete</button>
          </div>
        </div>

        {/* ROW 2 */}
        <div className="grid grid-cols-6 p-4 items-center">
          <div>
            <p className="font-semibold">Peter</p>
            <p className="text-gray-400 text-sm">peterpipe@yopmail.com</p>
          </div>

          <span>0355-5555522</span>
          <span>2</span>
          <span className="text-green-400">$360</span>
          <span className="text-green-400">$0</span>

          <div className="flex gap-2">
            <button className="px-3 py-1 bg-blue-500 rounded">View</button>
            <button className="px-3 py-1 border border-gray-500 rounded">Edit</button>
            <button className="px-3 py-1 bg-red-500 rounded">Delete</button>
          </div>
        </div>

      </div>
    </div>
  );
}