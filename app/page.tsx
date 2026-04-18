"use client";

import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Login(): JSX.Element {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [exit, setExit] = useState(false);

  const handleLogin = async (): Promise<void> => {
    try {
      setLoading(true);

      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
        credentials: "include",
      });

      const data = await res.json();

      if (data.message === "Logged In") {
        router.push("/dashboard");
      } else {
        alert("❌ Login Failed");
      }
    } catch (error) {
      console.error(error);
      alert("⚠️ Error");
    } finally {
      setLoading(false);
    }
  };

  const goToSignup = () => {
    setExit(true);
    setTimeout(() => {
      router.push("/signup");
    }, 400);
  };

  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={exit ? { x: 300, opacity: 0 } : { x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="relative h-screen bg-[#111827] overflow-hidden text-white"
    >

      {/* LEFT EDGE GLOW */}
      <div className="absolute left-48 top-0 h-full w-px
        bg-teal-300/40
        shadow-[0_0_25px_rgba(45,212,191,0.9),0_0_60px_rgba(45,212,191,0.6)]
        z-50"
      />

      {/* RIGHT EDGE GLOW */}
      <div className="absolute right-48 top-0 h-full w-px
        bg-teal-300/40
        shadow-[0_0_25px_rgba(45,212,191,0.9),0_0_60px_rgba(45,212,191,0.6)]
        z-50"
      />

      {/* CENTER WRAPPER */}
      <div className="h-full flex items-center justify-center">

        <div className="w-[70%] h-full flex overflow-hidden">

          {/* LEFT PANEL */}
          <div className="w-2/3 flex items-center justify-center bg-[#1f2937]">

            <div className="w-[340px] space-y-5">

              <h2 className="text-3xl font-semibold text-center mb-6">
                Login
              </h2>

              <div>
                <label className="text-teal-300 text-sm">Email</label>
                <input
                  type="text"
                  placeholder="demo@nexaerp.me"
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  className="w-full mt-1 px-4 py-3 rounded-lg bg-gray-300 text-black outline-none"
                />
              </div>

              <div>
                <label className="text-teal-300 text-sm">Password</label>
                <input
                  type="password"
                  placeholder="******"
                  value={password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  className="w-full mt-1 px-4 py-3 rounded-lg bg-gray-300 text-black outline-none"
                />
              </div>

              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full py-3 rounded-lg bg-teal-800 hover:bg-teal-700 transition"
              >
                {loading ? "Logging in..." : "LOGIN"}
              </button>

              <p className="text-sm text-teal-300 text-center">
                Don't have an account?{" "}
                <span
                  onClick={goToSignup}
                  className="text-teal-400 cursor-pointer"
                >
                  Sign Up
                </span>
              </p>

            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="w-2/3 flex items-center justify-center
            bg-gradient-to-b from-teal-500/10 to-emerald-900/30">

            <h1 className="text-6xl font-bold text-white/90 text-center">
              WELCOME <br /> BACK!
            </h1>

          </div>

        </div>
      </div>
    </motion.div>
  );
}