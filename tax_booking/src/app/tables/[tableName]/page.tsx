"use client";
import { useParams, useRouter } from "next/navigation";
import { Search, LogOut, Menu, Grid } from "lucide-react";
import { useState } from "react";

export default function TablePage() {
  const { tableName } = useParams();
  const router = useRouter();
  const [active, setActive] = useState(
    tableName ? (typeof tableName === 'string' ? tableName.charAt(0).toUpperCase() + tableName.slice(1) : '') : ''
  );

  // Define column headers for each table
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
    booking: ["Booking ID", "User ID", "Trip ID", "Seat ID", "Status"]
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

  // Handle table click
  const handleTableClick = (table: string): void => {
    setActive(table);
    router.push(`/tables/${table.toLowerCase()}`);
  };

  // Get the current table columns
  const currentTableColumns = tableColumns[tableName as keyof typeof tableColumns] || [];

  return (
    <div className="min-h-screen flex flex-col bg-white border border-gray-300">
      {/* Top navigation bar */}
      <div className="flex items-center justify-between bg-teal-800 text-white px-4 py-2">
        <div className="flex items-center space-x-4 text-sm">
          <button className="px-3 py-1 bg-teal-600 rounded-md font-semibold">Tables</button>
          <button 
            onClick={() => router.push('/quaries')}
            className="px-3 py-1 hover:bg-teal-600 rounded-md"
          >
            Queries
          </button>
          <button 
            onClick={() => router.push('/forms')}
            className="px-3 py-1 hover:bg-teal-600 rounded-md"
          >
            Forms
          </button>
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
          <div 
            onClick={() => router.push('/login')}
            className="flex items-center space-x-1 cursor-pointer"
          >
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
                onClick={() => handleTableClick(t)}
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
                  {currentTableColumns.map((column, index) => (
                    <th key={index} className="border px-3 py-2">{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {currentTableColumns.map((_, index) => (
                    <td key={index} className="border px-3 py-2 text-red-500">
                      {index === 0 ? "new" : ""}
                    </td>
                  ))}
                </tr>

                {[...Array(50)].map((_, i) => (
                  <tr key={i}>
                    {currentTableColumns.map((_, index) => (
                      <td key={index} className="border px-3 py-2"></td>
                    ))}
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
