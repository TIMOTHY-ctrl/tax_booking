"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, LogOut, Menu, Grid } from "lucide-react";

const tables = [
  "Vehicles",
  "Routes",
  "Drivers",
  "Trips",
  "Payments",
  "Users",
  "Seats",
  "Driver-assignments",
  "Trip-seats",
  "Booking",
];

const tableColumns = {
  Vehicles: ["Vehicle ID", "Model", "Capacity", "License Plate", "Status"],
  Routes: ["Route ID", "Origin", "Destination", "Distance", "Duration"],
  Drivers: ["Driver ID", "First Name", "Last Name", "License No.", "Contact"],
  Trips: ["Trip ID", "Route", "Vehicle", "Date", "Status"],
  Payments: ["Payment ID", "Booking ID", "Amount", "Date", "Status"],
  Users: ["User ID", "First Name", "Last Name", "Email", "Phone"],
  Seats: ["Seat ID", "Vehicle ID", "Seat Number", "Status"],
  "Driver-assignments": ["Assignment ID", "Driver ID", "Vehicle ID", "Date", "Status"],
  "Trip-seats": ["Trip Seat ID", "Trip ID", "Seat ID", "Status"],
  Booking: ["Booking ID", "User ID", "Trip ID", "Seat ID", "Status"],
};

export default function TablesHomePage() {
  const router = useRouter();
  const [active, setActive] = useState("Users");

  const handleTableClick = (table: string) => {
    setActive(table);
    router.push(`/tables/${table.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col overflow-hidden">
        <header className="flex flex-col gap-4 border-b border-slate-200 bg-white px-4 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-teal-600">Tables</p>
            <h1 className="text-2xl font-semibold">Manage dataset tables</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <button onClick={() => router.push("/dashboard")} className="rounded-full border border-slate-300 bg-white px-4 py-2 text-slate-700 transition hover:bg-slate-100">
              Dashboard
            </button>
            <button onClick={() => router.push("/queries")} className="rounded-full border border-slate-300 bg-white px-4 py-2 text-slate-700 transition hover:bg-slate-100">
              Queries
            </button>
            <button onClick={() => router.push("/forms")} className="rounded-full border border-slate-300 bg-white px-4 py-2 text-slate-700 transition hover:bg-slate-100">
              Forms
            </button>
            <button onClick={() => router.push("/login")} className="rounded-full border border-slate-300 bg-white px-4 py-2 text-slate-700 transition hover:bg-slate-100">
              Logout
            </button>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden border-t border-slate-200">
          <aside className="w-56 shrink-0 border-r border-slate-200 bg-white p-4">
            <div className="mb-4 rounded-3xl bg-slate-50 p-4 shadow-sm">
              <p className="text-sm font-semibold text-slate-600">Available tables</p>
              <p className="mt-1 text-xs text-slate-500">Tap a table to view details.</p>
            </div>
            <ul className="space-y-2 text-slate-700">
              {tables.map((table) => (
                <li
                  key={table}
                  onClick={() => handleTableClick(table)}
                  className={`cursor-pointer rounded-2xl px-4 py-3 transition ${
                    active === table ? "bg-teal-100 font-semibold text-slate-900" : "hover:bg-slate-100"
                  }`}
                >
                  {table}
                </li>
              ))}
            </ul>
          </aside>

          <main className="flex-1 overflow-auto p-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold">{active}</h2>
                  <p className="mt-2 text-sm text-slate-500">The current table selection will open in the details view.</p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">
                  <Search className="h-4 w-4" />
                  Search
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-slate-600">
                Select a table from the sidebar to inspect the records, or click again to open a focused view.
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
