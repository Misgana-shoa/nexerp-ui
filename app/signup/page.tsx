"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";

export default function SignupPage() {
  const router = useRouter();
  const [exit, setExit] = useState(false);

  const roles = [
    { name: "Staff", color: "teal" },
    { name: "Manager", color: "blue" },
    { name: "Admin", color: "red" },
    { name: "Worker", color: "purple" },
    { name: "Customer", color: "cyan" },
    { name: "Vendor", color: "orange" },
  ];

  const roleStyles: any = {
    teal: "hover:border-teal-400 hover:text-teal-300 hover:bg-teal-500/10 hover:shadow-[0_0_10px_#14b8a6]",
    blue: "hover:border-blue-400 hover:text-blue-300 hover:bg-blue-500/10 hover:shadow-[0_0_10px_#60a5fa]",
    red: "hover:border-red-400 hover:text-red-300 hover:bg-red-500/10 hover:shadow-[0_0_10px_#f87171]",
    purple: "hover:border-purple-400 hover:text-purple-300 hover:bg-purple-500/10 hover:shadow-[0_0_10px_#c084fc]",
    cyan: "hover:border-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 hover:shadow-[0_0_10px_#22d3ee]",
    orange: "hover:border-orange-400 hover:text-orange-300 hover:bg-orange-500/10 hover:shadow-[0_0_10px_#fb923c]",
  };

  const goToLogin = () => {
    setExit(true);
    setTimeout(() => {
      router.push("/");
    }, 400);
  };

  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={exit ? { x: -300, opacity: 0 } : { x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="relative min-h-screen flex bg-[#06141B] text-white overflow-hidden"
    >

      {/* LEFT GLOW */}
      <div className="absolute left-20 top-0 h-full w-[1px] bg-teal-400/30 shadow-[0_0_20px_#14b8a6]" />

      {/* RIGHT GLOW */}
      <div className="absolute right-20 top-0 h-full w-[1px] bg-teal-400/30 shadow-[0_0_20px_#14b8a6]" />

      {/* LEFT SIDE */}
      <motion.div
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-2/3 flex items-center justify-center bg-gradient-to-r from-[#020617] via-[#0B2C2F] to-[#0E4A4E]"
      >
        <h1 className="text-5xl font-bold tracking-wide opacity-90">
          WELCOME!
        </h1>
      </motion.div>

      {/* RIGHT SIDE */}
      <motion.div
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-2/3 flex items-center justify-center px-10"
      >
        <div className="w-full max-w-md">

          <h2 className="text-3xl font-semibold mb-6 text-center">
            Register
          </h2>

          <div className="mb-4">
            <p className="mb-2 text-sm opacity-80">Role</p>
            <div className="grid grid-cols-3 gap-2">
              {roles.map((role, i) => (
                <button
                  key={i}
                  className={`border border-teal-700 rounded-lg py-2 text-sm transition-all duration-300 ${roleStyles[role.color]}`}
                >
                  {role.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="text-sm opacity-80">Company</label>
            <select className="w-full mt-1 p-3 rounded-lg bg-transparent border border-teal-700 focus:outline-none focus:shadow-[0_0_10px_#14b8a6]">
              <option className="text-teal-200 bg-black">-- Select --</option>
              <option className="text-teal-200 bg-black">Demo Company</option>
              <option className="text-teal-200 bg-black">Prima EV Manufacturing</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="text-sm opacity-80">Name</label>
            <input
              type="text"
              placeholder="Abey Ahmed"
              className="w-full mt-1 p-3 rounded-lg bg-transparent border border-teal-700 focus:outline-none focus:shadow-[0_0_10px_#14b8a6]"
            />
          </div>

          <div className="mb-4">
            <label className="text-sm opacity-80">Email</label>
            <input
              type="email"
              defaultValue="demo@primaerp.me"
              className="w-full mt-1 p-3 rounded-lg bg-gray-200 text-black focus:outline-none"
            />
          </div>

          <div className="mb-6">
            <label className="text-sm opacity-80">Password</label>
            <input
              type="password"
              defaultValue="******"
              className="w-full mt-1 p-3 rounded-lg bg-gray-200 text-black focus:outline-none"
            />
          </div>

          <button className="w-full py-3 rounded-lg bg-teal-700 hover:bg-teal-600 hover:shadow-[0_0_15px_#14b8a6] transition font-semibold tracking-wide">
            REGISTER
          </button>

          <p className="text-center mt-4 text-sm opacity-80">
            Already have an account?{" "}
            <span
              onClick={goToLogin}
              className="text-cyan-400 cursor-pointer hover:underline"
            >
              Sign In
            </span>
          </p>

        </div>
      </motion.div>
    </motion.div>
  );
}