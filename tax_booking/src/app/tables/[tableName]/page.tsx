"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Search, LogOut, Menu, Grid } from "lucide-react";

export default function TablePage() {
  const { tableName } = useParams();
  const router = useRouter();
  const [active, setActive] = useState("");

  const tableColumns = {
    vehicles: ["Vehicle ID", "Model", "Capacity", "License Plate", "Status"],
    routes: ["Route ID", "Origin", "Destination", "Distance", "Duration"],
    drivers: ["Driver ID", "First Name", "Last Name", "License No.", "Contact"],
    trips: ["Trip ID", "Route", "Vehicle", "Date", "Status"],
    payments: ["Payment ID", "Booking ID", "Amount", "Date", "Status"],
    users: ["User ID", "First Name", "Last Name", "Email", "Phone"],
    seats: ["Seat ID", "Vehicle ID", "Seat Number", "Status"],
    "driver-assignments": ["Assignment ID", "Driver ID", "Vehicle ID", "Date", "Status"],
    "trip-seats": ["Trip Seat ID", "Trip ID", "Seat ID", "Status"],
    booking: ["Booking ID", "User ID", "Trip ID", "Seat ID", "Status"],
  };

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

  useEffect(() => {
    if (tableName) {
      setActive(tableName.toString().replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()));
    }
  }, [tableName]);

  const handleTableClick = (table: string): void => {
    setActive(table);
    router.push(`/tables/${table.toLowerCase()}`);
  };

  const currentTableColumns = tableColumns[tableName as keyof typeof tableColumns] || [];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col overflow-hidden">
        <header className="flex flex-col gap-4 border-b border-slate-200 bg-white px-4 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-teal-600">Tables</p>
            <h1 className="text-2xl font-semibold">Inspect table data</h1>
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
              <p className="text-sm font-semibold text-slate-600">Table list</p>
              <p className="mt-1 text-xs text-slate-500">Switch between data tables.</p>
            </div>
            <ul className="space-y-2 text-slate-700">
              {tables.map((t) => (
                <li
                  key={t}
                  onClick={() => handleTableClick(t)}
                  className={`cursor-pointer rounded-2xl px-4 py-3 transition ${
                    active === t ? "bg-teal-100 font-semibold text-slate-900" : "hover:bg-slate-100"
                  }`}
                >
                  {t}
                </li>
              ))}
            </ul>
          </aside>

          <main className="flex-1 overflow-auto p-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold">
                    {active || "Select a table"}
                  </h2>
                  <p className="mt-2 text-sm text-slate-500">Manage the current table data from this view.</p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">
                  <Search className="h-4 w-4" />
                  Search
                </div>
              </div>

              {currentTableColumns.length > 0 ? (
                <div className="overflow-auto rounded-3xl border border-slate-200">
                  <table className="min-w-full border-separate border-spacing-0 text-sm">
                    <thead className="bg-slate-900 text-white">
                      <tr>
                        {currentTableColumns.map((column, index) => (
                          <th key={index} className="border-b border-slate-200 px-4 py-3 text-left font-medium">
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[...Array(6)].map((_, rowIndex) => (
                        <tr key={rowIndex} className="border-b border-slate-200 hover:bg-slate-50">
                          {currentTableColumns.map((_, colIndex) => (
                            <td key={colIndex} className="px-4 py-3 text-slate-600">-</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500">
                  Select a table from the sidebar to view data.
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
