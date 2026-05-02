"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, LogOut, Menu, Grid } from "lucide-react";

const formCategories = [
  "Routes",
  "Vehicles",
  "Drivers",
  "Trips",
  "Users",
  "Bookings",
  "Payments",
  "Seats",
  "Reports",
];

export default function FormsHomePage() {
  const router = useRouter();
  const [active, setActive] = useState("Routes");

  const handleFormClick = (form: string) => {
    setActive(form);
    router.push(`/forms/${form.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col overflow-hidden">
        <header className="flex flex-col gap-4 border-b border-slate-200 bg-white px-4 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-teal-600">Forms</p>
            <h1 className="text-2xl font-semibold">Start by choosing a record type</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <button onClick={() => router.push("/dashboard")} className="rounded-full border border-slate-300 bg-white px-4 py-2 text-slate-700 transition hover:bg-slate-100">
              Dashboard
            </button>
            <button onClick={() => router.push("/tables")} className="rounded-full border border-slate-300 bg-white px-4 py-2 text-slate-700 transition hover:bg-slate-100">
              Tables
            </button>
            <button onClick={() => router.push("/queries")} className="rounded-full border border-slate-300 bg-white px-4 py-2 text-slate-700 transition hover:bg-slate-100">
              Queries
            </button>
            <button onClick={() => router.push("/login")} className="rounded-full border border-slate-300 bg-white px-4 py-2 text-slate-700 transition hover:bg-slate-100">
              Logout
            </button>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden border-t border-slate-200">
          <aside className="w-56 shrink-0 border-r border-slate-200 bg-white p-4">
            <div className="mb-4 rounded-3xl bg-slate-50 p-4 shadow-sm">
              <p className="text-sm font-semibold text-slate-600">Form categories</p>
              <p className="mt-1 text-xs text-slate-500">Navigate to a form type.</p>
            </div>
            <ul className="space-y-2 text-slate-700">
              {formCategories.map((category) => (
                <li
                  key={category}
                  onClick={() => handleFormClick(category)}
                  className={`cursor-pointer rounded-2xl px-4 py-3 transition ${
                    active === category ? "bg-teal-100 font-semibold text-slate-900" : "hover:bg-slate-100"
                  }`}
                >
                  {category}
                </li>
              ))}
            </ul>
          </aside>

          <main className="flex-1 overflow-auto p-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold">Quick start</h2>
              <p className="mt-3 text-slate-600">Choose a form from the sidebar to edit records for routes, vehicles, drivers and more.</p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {formCategories.slice(0, 6).map((category) => (
                  <button
                    key={category}
                    onClick={() => handleFormClick(category)}
                    className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-5 text-left text-slate-900 transition hover:bg-teal-50"
                  >
                    <p className="text-sm font-semibold">{category}</p>
                    <p className="mt-1 text-xs text-slate-500">Manage {category.toLowerCase()} records.</p>
                  </button>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
