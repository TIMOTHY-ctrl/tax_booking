"use client";

import { useEffect, useState } from "react";
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

const isSelectField = (field: BaseField): field is BaseField & { options: string[] } =>
  field.type === "select";

export default function FormPage() {
  const router = useRouter();
  const params = useParams();
  const [active, setActive] = useState<string>("");

  const formType = params?.formType as string;

  const formConfigs: Record<string, FormConfig> = {
    routes: {
      title: "🧭 Route Form",
      fields: [
        { name: "routeId", label: "Route ID", type: "text", disabled: true, placeholder: "Auto-generated" },
        { name: "origin", label: "Origin", type: "text", required: true },
        { name: "destination", label: "Destination", type: "text", required: true },
        { name: "distance", label: "Distance (km)", type: "number", required: true },
        { name: "duration", label: "Duration (minutes)", type: "number", required: true },
      ],
    },
    vehicles: {
      title: "🚐 Vehicle Form",
      fields: [
        { name: "vehicleId", label: "Vehicle ID", type: "text", disabled: true, placeholder: "Auto-generated" },
        { name: "numberPlate", label: "Number Plate", type: "text", required: true },
        { name: "type", label: "Type", type: "select", options: ["Bus", "Taxi", "Van"], required: true },
        { name: "totalSeats", label: "Total Seats", type: "number", required: true },
      ],
    },
    drivers: {
      title: "👨‍✈️ Driver Form",
      fields: [
        { name: "driverId", label: "Driver ID", type: "text", disabled: true, placeholder: "Auto-generated" },
        { name: "driverName", label: "Driver Name", type: "text", required: true },
        { name: "licenceNumber", label: "Licence Number", type: "text", required: true },
        { name: "phone", label: "Phone", type: "tel", required: true },
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
        { name: "price", label: "Price", type: "number", required: true },
      ],
    },
    users: {
      title: "🧍‍♂️ User Form",
      fields: [
        { name: "userId", label: "User ID", type: "text", disabled: true, placeholder: "Auto-generated" },
        { name: "name", label: "Name", type: "text", required: true },
        { name: "email", label: "Email", type: "email", required: true },
        { name: "phone", label: "Phone", type: "tel", required: true },
        { name: "password", label: "Password", type: "password", required: true },
      ],
    },
    bookings: {
      title: "🎟️ Booking Form",
      fields: [
        { name: "bookingId", label: "Booking ID", type: "text", disabled: true, placeholder: "Auto-generated" },
        { name: "user", label: "User", type: "select", options: ["User 1", "User 2"], required: true },
        { name: "tripSeat", label: "Trip Seat", type: "select", options: ["Seat 1", "Seat 2"], required: true },
        { name: "bookingDate", label: "Booking Date", type: "date", required: true },
        { name: "status", label: "Status", type: "select", options: ["Pending", "Confirmed", "Cancelled"], required: true },
      ],
    },
    payments: {
      title: "💳 Payment Form",
      fields: [
        { name: "paymentId", label: "Payment ID", type: "text", disabled: true, placeholder: "Auto-generated" },
        { name: "booking", label: "Booking", type: "select", options: ["Booking 1", "Booking 2"], required: true },
        { name: "amount", label: "Amount", type: "number", required: true },
        { name: "paymentMethod", label: "Payment Method", type: "select", options: ["Cash", "Mobile Money", "Card"], required: true },
        { name: "paymentDate", label: "Payment Date", type: "datetime-local", required: true },
      ],
    },
    seats: {
      title: "💺 Seat Management Form",
      fields: [
        { name: "seatId", label: "Seat ID", type: "text", disabled: true, placeholder: "Auto-generated" },
        { name: "vehicleId", label: "Vehicle", type: "select", options: ["Vehicle 1", "Vehicle 2"], required: true },
        { name: "seatNumber", label: "Seat Number", type: "number", required: true },
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
          required: true,
        },
      ],
    },
  };

  const forms = Object.keys(formConfigs);
  const currentForm = formConfigs[formType] || { title: "Select a form", fields: [] };

  useEffect(() => {
    if (formType) {
      setActive(formType.charAt(0).toUpperCase() + formType.slice(1));
    }
  }, [formType]);

  const handleFormClick = (form: string) => {
    setActive(form);
    router.push(`/forms/${form.toLowerCase()}`);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Form submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col">
        <header className="flex flex-col gap-4 border-b border-slate-200 bg-white px-4 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-teal-600">Forms</p>
            <h1 className="text-2xl font-semibold">Create or update records</h1>
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
              Sign out
            </button>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden border-t border-slate-200">
          <aside className="w-56 shrink-0 border-r border-slate-200 bg-white p-4">
            <div className="mb-4 rounded-3xl bg-slate-50 p-4 shadow-sm">
              <p className="text-sm font-semibold text-slate-600">Form categories</p>
              <p className="mt-1 text-xs text-slate-500">Choose a form to edit the entry type.</p>
            </div>
            <ul className="space-y-2 text-slate-700">
              {forms.map((f) => (
                <li
                  key={f}
                  onClick={() => handleFormClick(f)}
                  className={`cursor-pointer rounded-2xl px-4 py-3 transition ${
                    active === f ? "bg-teal-100 font-semibold text-slate-900" : "hover:bg-slate-100"
                  }`}
                >
                  {f}
                </li>
              ))}
            </ul>
          </aside>

          <main className="flex-1 overflow-auto p-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold">{currentForm.title}</h2>
                <p className="mt-2 text-sm text-slate-500">Fill out the form to add or update records.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {currentForm.fields.map((field, index) => (
                  <div key={index}>
                    <label className="block text-sm font-medium text-slate-700">{field.label}</label>
                    {isSelectField(field) ? (
                      <select
                        name={field.name}
                        required={field.required}
                        disabled={field.disabled}
                        className="mt-2 block w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 shadow-sm focus:border-teal-500 focus:ring-teal-500/20"
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
                        className="mt-2 block w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 shadow-sm focus:border-teal-500 focus:ring-teal-500/20"
                      />
                    )}
                  </div>
                ))}

                {currentForm.fields.length > 0 ? (
                  <div className="flex flex-wrap justify-end gap-3 pt-4">
                    <button type="button" className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
                      Cancel
                    </button>
                    <button type="submit" className="rounded-2xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700">
                      Save changes
                    </button>
                  </div>
                ) : (
                  <p className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-slate-500">
                    Select a form from the left menu to begin.
                  </p>
                )}
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
