"use client";

import { useState, ChangeEvent, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [exit, setExit] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (): Promise<void> => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const text = await res.text();

      let data: any = {};
      try {
        data = JSON.parse(text);
      } catch {
        data = { raw: text };
      }

      if (
        res.ok &&
        (
          data.message === "Logged In" ||
          data.message === "Logged in" ||
          data.full_name ||
          text.toLowerCase().includes("logged")
        )
      ) {
        router.push("/dashboard");
        return;
      }

      setError("Invalid email or password.");
    } catch (err) {
      console.error(err);
      setError("Server connection failed.");
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

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={exit ? { x: 300, opacity: 0 } : { x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="relative min-h-screen overflow-hidden bg-[#111827] text-white"
    >
      {/* Glow Lines */}
      <div className="hidden md:block absolute left-37 lg:left-47 top-0 h-full w-px bg-teal-300/40 shadow-[0_0_25px_rgba(45,212,191,0.9),0_0_60px_rgba(45,212,191,0.6)]" />

      <div className="hidden md:block absolute right-56 lg:right-78 top-0 h-full w-px bg-teal-300/40 shadow-[0_0_25px_rgba(45,212,191,0.9),0_0_60px_rgba(45,212,191,0.6)]" />

      {/* Main Layout */}
      <div className="min-h-screen w-full flex items-stretch justify-center px-0 md:px-4">
        <div
          className="
            w-full md:w-[80%] lg:w-[76%] xl:w-[72%]
            mx-auto grid grid-cols-1 md:grid-cols-2
            min-h-screen shadow-2xl border border-white/10
            overflow-hidden relative left-0
            "
          >
          {/* LEFT */}
          <div className="bg-[#1f2937]/80 flex items-center justify-center p-6 sm:p-8 md:p-12 min-h-screen md:min-h-0">
            <div className="w-full max-w-md">
              <p className="text-sm tracking-[0.35em] text-teal-300 uppercase">
                PrimaERP
              </p>

              <h1 className="mt-4 text-3xl sm:text-4xl font-bold">
                Prima EV Manufacturing
              </h1>

              <p className="mt-3 text-sm text-zinc-400">
                Sign in to continue to your dashboard.
              </p>

              <div className="mt-8 space-y-5">
                <div>
                  <label className="text-sm text-teal-300">
                    Email
                  </label>

                  <input
                    type="text"
                    placeholder="demo@nexaerp.me"
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                    }
                    onKeyDown={handleEnter}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none transition focus:border-teal-400"
                  />
                </div>

                <div>
                  <label className="text-sm text-teal-300">
                    Password
                  </label>

                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setPassword(e.target.value)
                    }
                    onKeyDown={handleEnter}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none transition focus:border-teal-400"
                  />
                </div>

                {error && (
                  <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                    {error}
                  </div>
                )}

                <button
                  onClick={handleLogin}
                  disabled={loading}
                  className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 py-3 font-semibold transition hover:opacity-90 disabled:opacity-60"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Logging in...
                    </div>
                  ) : (
                    "LOGIN"
                  )}
                </button>

                <p className="text-center text-sm text-zinc-400">
                  Don&apos;t have an account?{" "}
                  <span
                    onClick={goToSignup}
                    className="cursor-pointer font-medium text-teal-400 hover:text-teal-300"
                  >
                    Sign Up
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div
            className="
              flex items-center justify-center
              border-t md:border-t-0 md:border-l border-white/10
              bg-white/5
              bg-gradient-to-br
              from-teal-500/10 via-emerald-500/10 to-black
              p-6 sm:p-8 lg:p-12
              min-h-[45vh] md:min-h-screen
            "
          >
            <div className="w-full max-w-3xl p-4 sm:p-8 text-center backdrop-blur-xl">
              <p className="text-xs sm:text-sm tracking-[0.4em] text-teal-300 uppercase">
                ERP Dashboard
              </p>

              <h2 className="mt-4 sm:mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                WELCOME
                <br />
                BACK!
              </h2>

              <p className="mt-4 sm:mt-6 text-sm sm:text-base text-zinc-400">
                Manage products, invoices, customers and growth in one place.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}