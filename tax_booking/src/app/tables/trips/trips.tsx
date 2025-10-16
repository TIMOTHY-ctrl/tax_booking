
"use client";
import { useState } from "react";
import { Search, LogOut, Menu, Grid } from "lucide-react";

export default function Dashboard() {
  const [active, setActive] = useState("Users");

  const tables = [
    "Vehicles",
    "Routes",
    "Drivers",
    "Trips",
    "Payments",
    "Users",
    "Seats",
    "Driver-assignments",
    "Trip_seats",
    "Booking",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white border border-gray-300">
      {/* Top navigation bar */}
      <div className="flex items-center justify-between bg-teal-800 text-white px-4 py-2">
        <div className="flex items-center space-x-4 text-sm">
          <button className="px-3 py-1 bg-teal-600 rounded-md font-semibold">Tables</button>
          <button className="px-3 py-1 hover:bg-teal-600 rounded-md">Queries</button>
          <button className="px-3 py-1 hover:bg-teal-600 rounded-md">Forms</button>
        </div>

        {/* Search bar */}
        <div className="flex items-center bg-teal-700 px-3 py-1 rounded-full w-72">
          <input
            type="text"
            placeholder="search"
            className="bg-transparent outline-none w-full text-white placeholder-white text-sm"
          />
          <Search className="w-4 h-4 text-white" />
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-3">
          <Grid className="w-5 h-5" />
          <div className="flex items-center space-x-1">
            <span>Log out</span>
            <LogOut className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 border-t border-gray-300">
        {/* Sidebar */}
        <div className="w-48 bg-gray-50 border-r border-gray-300">
          <button className="p-3 border-b border-gray-300 w-full text-left hover:bg-gray-100">
            <Menu className="w-5 h-5 text-black" />
          </button>
          <ul className="text-black">
            {tables.map((t) => (
              <li
                key={t}
                onClick={() => setActive(t)}
                className={`px-4 py-2 cursor-pointer ${
                  active === t ? "bg-teal-200 font-semibold" : "hover:bg-gray-100"
                }`}
              >
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Table section */}
        <div className="flex-1 p-4 overflow-auto">
          <div className="w-full h-full border border-gray-400 rounded-lg overflow-auto">
            <table className="min-w-full table-auto border-collapse text-sm">
              <thead className="bg-teal-700 text-white sticky top-0">
                <tr>
                  <th className="border px-3 py-2">Second Name</th>
                  <th className="border px-3 py-2">First Name</th>
                  <th className="border px-3 py-2">Email</th>
                  <th className="border px-3 py-2">Phone</th>
                  <th className="border px-3 py-2">Password</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="border px-3 py-2 text-red-500">new</td>
                  <td className="border px-3 py-2"></td>
                  <td className="border px-3 py-2"></td>
                  <td className="border px-3 py-2"></td>
                  <td className="border px-3 py-2"></td>
                </tr>

                {[...Array(50)].map((_, i) => (
                  <tr key={i}>
                    <td className="border px-3 py-2"></td>
                    <td className="border px-3 py-2"></td>
                    <td className="border px-3 py-2"></td>
                    <td className="border px-3 py-2"></td>
                    <td className="border px-3 py-2"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
