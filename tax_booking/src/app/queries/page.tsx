import Link from "next/link";

export default function QueriesPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="rounded-[2rem] bg-white p-8 shadow-2xl shadow-slate-900/5">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-teal-600">Business queries</p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-900">Explore operational insights</h1>
            </div>
            <Link href="/dashboard" className="inline-flex rounded-full border border-slate-300 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-200">
              Return to dashboard
            </Link>
          </div>

          <p className="max-w-3xl text-slate-600">Use queries to review route performance, booking trends, driver assignments and revenue summaries. The current app structure supports easy expansion with custom query pages.</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Route performance", description: "See route efficiency and travel times." },
              { title: "Booking trends", description: "Track the busiest trips and seats." },
              { title: "Revenue report", description: "Monitor payments and collection status." },
              { title: "Driver allocations", description: "Review driver schedules and coverage." },
              { title: "Seat availability", description: "Check open seats for upcoming trips." },
              { title: "Vehicle status", description: "View fleet readiness and licences." },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
