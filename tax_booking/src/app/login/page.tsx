
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    
    console.log("DEBUG: Attempting NextAuth signin for email:", email);
    
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      console.log("DEBUG: NextAuth signin result:", result);

      if (result?.error) {
        console.log("DEBUG: Login failed with error:", result.error);
        setError("Invalid credentials. Please try again.");
      } else if (result?.ok) {
        console.log("DEBUG: Login successful, redirecting to dashboard");
        router.push("/dashboard");
        router.refresh(); // Ensure middleware re-evaluates auth state
      }
    } catch (error) {
      console.error("DEBUG: Login attempt failed:", error);
      setError("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 rounded-[2rem] bg-white px-8 py-10 shadow-2xl shadow-slate-900/5 sm:px-12">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-teal-600">Admin access</p>
            <h1 className="mt-4 text-3xl font-bold text-slate-900">Sign in to your Tax Booking dashboard</h1>
            <p className="mt-4 text-slate-600">Enter your login credentials to manage routes, bookings, drivers and vehicles.</p>
          </div>

          <div className="relative h-64 overflow-hidden rounded-[1.5rem] bg-teal-800">
            <Image
              src="/image2.jpg"
              alt="Abstract dashboard artwork"
              fill
              className="object-cover opacity-70"
            />
          </div>
        </div>

        <div className="mx-auto w-full max-w-md space-y-4">
          <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              disabled={isLoading}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-teal-500 disabled:opacity-50"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              disabled={isLoading}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-teal-500 disabled:opacity-50"
            />

            {error && (
              <div className="rounded-2xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <div className="mt-6 flex items-center justify-between text-sm text-slate-500">
              <Link href="/register" className="font-medium text-teal-600 hover:underline">
                Create account
              </Link>
              <Link href="/forgot-password" className="font-medium text-teal-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full inline-flex items-center justify-center rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Signing in..." : "Login"}
              </button>
            </div>
          </form>

          <p className="text-center text-sm text-slate-500">Designed by group Q</p>
        </div>
      </div>
    </div>
  );
}

