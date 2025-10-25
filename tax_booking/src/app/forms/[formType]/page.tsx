"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Search, LogOut, Menu, Grid } from "lucide-react";

// ---------- Field Types ----------
type InputType =
  | "text"
  | "number"
  | "email"
  | "tel"
  | "password"
  | "date"
  | "datetime-local"
  | "daterange"
  | "select";

interface BaseField {
  name: string;
  label: string;
  type: InputType;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  options?: string[];
}

interface FormConfig {
  title: string;
  fields: BaseField[];
}

// ---------- Helper ----------
const isSelectField = (field: BaseField): field is BaseField & { options: string[] } =>
  field.type === "select";

// ---------- Component ----------
export default function FormPage() {
  const router = useRouter();
  const params = useParams();
  const [active, setActive] = useState<string>("");

  const formType = params?.formType as string;

  // ---------- All form configurations ----------
  const formConfigs: Record<string, FormConfig> = {
    routes: {
      title: "🧭 Route Form",
      fields: [
        { name: "routeId", label: "Route ID", type: "text", disabled: true, placeholder: "Auto-generated" },
        { name: "origin", label: "Origin", type: "text", required: true },
        { name: "destination", label: "Destination", type: "text", required: true },
        { name: "distance", label: "Distance (km)", type: "number", required: true },
        { name: "duration", label: "Duration (minutes)", type: "number", required: true }
      ],
    },
    vehicles: {
      title: "🚐 Vehicle Form",
      fields: [
        { name: "vehicleId", label: "Vehicle ID", type: "text", disabled: true, placeholder: "Auto-generated" },
        { name: "numberPlate", label: "Number Plate", type: "text", required: true },
        { name: "type", label: "Type", type: "select", options: ["Bus", "Taxi", "Van"], required: true },
        { name: "totalSeats", label: "Total Seats", type: "number", required: true }
      ],
    },
    drivers: {
      title: "👨‍✈️ Driver Form",
      fields: [
        { name: "driverId", label: "Driver ID", type: "text", disabled: true, placeholder: "Auto-generated" },
        { name: "driverName", label: "Driver Name", type: "text", required: true },
        { name: "licenceNumber", label: "Licence Number", type: "text", required: true },
        { name: "phone", label: "Phone", type: "tel", required: true }
      ],
    },
    trips: {
      title: "📅 Trip Form",
      fields: [
        { name: "tripId", label: "Trip ID", type: "text", disabled: true, placeholder: "Auto-generated" },
        { name: "route", label: "Route", type: "select", options: ["Route 1", "Route 2"], required: true },
        { name: "vehicle", label: "Vehicle", type: "select", options: ["Vehicle 1", "Vehicle 2"], required: true },
        { name: "departureTime", label: "Departure Time", type: "datetime-local", required: true },
        { name: "arrivalTime", label: "Arrival Time", type: "datetime-local", required: true },
        { name: "price", label: "Price", type: "number", required: true }
      ],
    },
    users: {
      title: "🧍‍♂️ User Form",
      fields: [
        { name: "userId", label: "User ID", type: "text", disabled: true, placeholder: "Auto-generated" },
        { name: "name", label: "Name", type: "text", required: true },
        { name: "email", label: "Email", type: "email", required: true },
        { name: "phone", label: "Phone", type: "tel", required: true },
        { name: "password", label: "Password", type: "password", required: true }
      ],
    },
    bookings: {
      title: "🎟️ Booking Form",
      fields: [
        { name: "bookingId", label: "Booking ID", type: "text", disabled: true, placeholder: "Auto-generated" },
        { name: "user", label: "User", type: "select", options: ["User 1", "User 2"], required: true },
        { name: "tripSeat", label: "Trip Seat", type: "select", options: ["Seat 1", "Seat 2"], required: true },
        { name: "bookingDate", label: "Booking Date", type: "date", required: true },
        { name: "status", label: "Status", type: "select", options: ["Pending", "Confirmed", "Cancelled"], required: true }
      ],
    },
    payments: {
      title: "💳 Payment Form",
      fields: [
        { name: "paymentId", label: "Payment ID", type: "text", disabled: true, placeholder: "Auto-generated" },
        { name: "booking", label: "Booking", type: "select", options: ["Booking 1", "Booking 2"], required: true },
        { name: "amount", label: "Amount", type: "number", required: true },
        { name: "paymentMethod", label: "Payment Method", type: "select", options: ["Cash", "Mobile Money", "Card"], required: true },
        { name: "paymentDate", label: "Payment Date", type: "datetime-local", required: true }
      ],
    },
    seats: {
      title: "💺 Seat Management Form",
      fields: [
        { name: "seatId", label: "Seat ID", type: "text", disabled: true, placeholder: "Auto-generated" },
        { name: "vehicleId", label: "Vehicle", type: "select", options: ["Vehicle 1", "Vehicle 2"], required: true },
        { name: "seatNumber", label: "Seat Number", type: "number", required: true }
      ],
    },
    reports: {
      title: "📊 Reports Dashboard",
      fields: [
        { name: "dateRange", label: "Date Range", type: "daterange", required: true },
        {
          name: "reportType",
          label: "Report Type",
          type: "select",
          options: ["Total Trips per Day", "Most Used Routes", "Driver Assignments", "Revenue Collection"],
          required: true
        }
      ],
    },
  };

  const forms = Object.keys(formConfigs);
  const currentForm = formConfigs[formType] || { title: "Select a form", fields: [] };

  const handleFormClick = (form: string) => {
    setActive(form);
    router.push(`/forms/${form.toLowerCase()}`);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Form submitted successfully!");
  };

  // ---------- UI ----------
  return (
    <div className="min-h-screen flex flex-col bg-white border border-gray-300">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between bg-teal-800 text-white px-4 py-2">
        <div className="flex items-center space-x-4 text-sm">
          <button onClick={() => router.push("/dashboard")} className="px-3 py-1 hover:bg-teal-600 rounded-md">
            Dashboard
          </button>
          <button onClick={() => router.push("/tables")} className="px-3 py-1 hover:bg-teal-600 rounded-md">
            Tables
          </button>
          <button onClick={() => router.push("/queries")} className="px-3 py-1 hover:bg-teal-600 rounded-md">
            Queries
          </button>
          <button className="px-3 py-1 bg-teal-600 rounded-md font-semibold">Forms</button>
        </div>

        <div className="flex items-center bg-teal-700 px-3 py-1 rounded-full w-72">
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none w-full text-white placeholder-white text-sm"
          />
          <Search className="w-4 h-4 text-black" />
        </div>

        <div className="flex items-center space-x-3">
          <Grid className="w-5 h-5" />
          <div onClick={() => router.push("/login")} className="flex items-center space-x-1 cursor-pointer">
            <span>Log out</span>
            <LogOut className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-1 border-t border-gray-300">
        {/* Sidebar */}
        <div className="w-52 bg-gray-50 border-r border-gray-300">
          <button className="p-3 border-b border-gray-300 w-full text-left hover:bg-gray-100">
            <Menu className="w-5 h-5 text-black" />
          </button>
          <ul className="text-black">
            {forms.map((f) => (
              <li
                key={f}
                onClick={() => handleFormClick(f)}
                className={`px-4 py-2 cursor-pointer ${
                  active === f ? "bg-teal-200 font-semibold" : "hover:bg-gray-100"
                }`}
              >
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Form Area */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">{currentForm.title}</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {currentForm.fields.map((field, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-black">{field.label}</label>

                  {isSelectField(field) ? (
                    <select
                      name={field.name}
                      required={field.required}
                      disabled={field.disabled}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                    >
                      <option value="">Select {field.label}</option>
                      {field.options?.map((option, i) => (
                        <option key={i} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      required={field.required}
                      disabled={field.disabled}
                      placeholder={field.placeholder}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                    />
                  )}
                </div>
              ))}

              {currentForm.fields.length > 0 && (
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-yellow-700 hover:bg-yellow-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-teal-600 text-white rounded-md text-sm font-medium hover:bg-teal-700"
                  >
                    Save
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
