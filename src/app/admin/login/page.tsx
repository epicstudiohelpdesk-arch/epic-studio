"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  RiShieldKeyholeLine,
  RiMailLine,
  RiLockPasswordLine,
  RiEyeLine,
  RiEyeOffLine,
  RiArrowRightLine,
  RiAlertLine,
  RiDatabase2Line,
} from "react-icons/ri";

function AdminLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingExistingSession, setCheckingExistingSession] = useState(true);

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams?.get("redirect") || "/admin/dashboard";

  // Check if session cookie is already active
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/auth/me");
        if (res.ok) {
          window.location.href = redirectTarget;
          return;
        }
      } catch {
        // Not authenticated
      } finally {
        setCheckingExistingSession(false);
      }
    }
    checkAuth();
  }, [redirectTarget, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError("Please enter your administrator password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Authentication failed. Check your credentials.");
        setLoading(false);
        return;
      }

      // Hard navigation ensures Safari and modern browsers immediately apply the secure session cookie
      window.location.href = redirectTarget;
    } catch (err: any) {
      console.error("[Login Error]", err);
      setError(err?.message || "Network or server connection error. Please try again.");
      setLoading(false);
    }
  };

  if (checkingExistingSession) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-slate-600">
        <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-xs uppercase tracking-widest text-slate-500 font-mono">
          Verifying security enclave...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full max-w-full bg-slate-50 text-slate-900 flex flex-col justify-between selection:bg-blue-600 selection:text-white relative overflow-hidden">
      {/* Subtle light ambient background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-xl h-72 bg-gradient-to-b from-blue-100/40 via-indigo-50/20 to-transparent blur-2xl pointer-events-none" />

      {/* Header Bar */}
      <header className="w-full max-w-full px-4 sm:px-8 py-3.5 sm:py-5 border-b border-slate-200/80 bg-white/80 backdrop-blur-md flex items-center justify-between relative z-10 shadow-xs">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-sm shadow-md shadow-blue-600/20 group-hover:bg-blue-700 transition-colors">
              E
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold tracking-wider text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                EPIC STUDIO
              </span>
              <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">
                Admin Console
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-700 bg-emerald-50 px-2.5 sm:px-3 py-1 rounded-full border border-emerald-200 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="hidden sm:inline">Database Enclave Secure</span>
          <span className="sm:hidden">Secure</span>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="flex-1 flex items-center justify-center px-4 py-6 sm:py-12 relative z-10 w-full max-w-full">
        <div className="w-full max-w-sm sm:max-w-md mx-auto">
          {/* Card container */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-8 shadow-xl shadow-slate-200/70 relative w-full">
            {/* Top icon and title */}
            <div className="flex flex-col items-center text-center mb-6 sm:mb-8">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200/80 flex items-center justify-center mb-4 text-blue-600 shadow-xs">
                <RiShieldKeyholeLine className="w-7 h-7" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                Administrator Sign In
              </h1>
              <p className="text-xs text-slate-500 mt-1.5 max-w-xs leading-relaxed">
                Access client inquiries, consultation bookings, analytics, and internal notes.
              </p>
            </div>

            {/* Error banner */}
            {error && (
              <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5 animate-in fade-in slide-in-from-top-1 duration-200">
                <RiAlertLine className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
                <span className="leading-relaxed font-medium">{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase font-mono tracking-wider">
                  Admin Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <RiMailLine className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="name@company.com"
                    className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all font-mono"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-700 uppercase font-mono tracking-wider">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-colors"
                  >
                    {showPassword ? (
                      <>
                        <RiEyeOffLine className="w-3.5 h-3.5" />
                        <span>Hide</span>
                      </>
                    ) : (
                      <>
                        <RiEyeLine className="w-3.5 h-3.5" />
                        <span>Show</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <RiLockPasswordLine className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all font-mono"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm shadow-md shadow-blue-600/25 flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed mt-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Dashboard</span>
                    <RiArrowRightLine className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Bottom Security Note */}
          <div className="mt-6 text-center text-slate-500 text-xs flex items-center justify-center gap-2 font-mono">
            <RiDatabase2Line className="w-3.5 h-3.5 text-slate-400" />
            <span>SQLite Prisma & HttpOnly JWT Enclave</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-4 sm:px-8 py-4 border-t border-slate-200 text-center text-xs text-slate-500 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-2 bg-white/50">
        <span>© {new Date().getFullYear()} EPIC STUDIO. All Rights Reserved.</span>
        <Link href="/" className="hover:text-blue-600 font-medium transition-colors">
          Return to Public Website →
        </Link>
      </footer>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-slate-600">
          <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-xs uppercase tracking-widest text-slate-500 font-mono">
            Loading Admin Portal...
          </p>
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
