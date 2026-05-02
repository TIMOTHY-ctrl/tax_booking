
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-6 py-10">
        <header className="rounded-[2rem] bg-gradient-to-r from-teal-800 via-cyan-600 to-teal-500 p-10 text-center text-white shadow-2xl shadow-teal-500/20">
          <p className="text-sm uppercase tracking-[0.4em] text-cyan-100/90">Tax Booking Database</p>
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">Control your fleet, routes, bookings and revenue in one place.</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-teal-100/90">
            Manage trips, drivers, vehicles and payments while keeping your operations organized and profitable.
            Jump straight into the dashboard or sign in to update your data.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/login" className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-slate-900/10 transition hover:bg-slate-100">
              Login
            </Link>
            <Link href="/dashboard" className="inline-flex rounded-full border border-white/80 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              Open dashboard
            </Link>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          <article className="rounded-[1.5rem] bg-white p-8 shadow-lg shadow-slate-900/5">
            <h2 className="text-xl font-semibold text-slate-900">Why use Tax Booking?</h2>
            <ul className="mt-6 space-y-4 text-slate-700">
              <li className="rounded-2xl border border-slate-200 bg-slate-50 p-4">Organize drivers, vehicles and routes from one dashboard.</li>
              <li className="rounded-2xl border border-slate-200 bg-slate-50 p-4">Track bookings, payments and trip status with clear tables.</li>
              <li className="rounded-2xl border border-slate-200 bg-slate-50 p-4">Speed up operations with a mobile-friendly admin experience.</li>
            </ul>
          </article>

          <article className="rounded-[1.5rem] bg-[#008183] p-8 text-white shadow-lg shadow-teal-900/20">
            <h2 className="text-xl font-semibold">Quick access</h2>
            <p className="mt-4 leading-7 text-teal-100/90">
              Use the system to register new trips, assign drivers, update seat availability, and review route performance.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "Trips",
                "Routes",
                "Payments",
                "Users",
              ].map((item) => (
                <div key={item} className="rounded-2xl bg-white/10 p-4 text-sm">
                  {item}
                </div>
              ))}
            </div>
          </article>
        </section>

        <div className="grid gap-6 rounded-[2rem] bg-white p-6 shadow-lg shadow-slate-900/5 md:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5">
            <h2 className="text-2xl font-semibold text-slate-900">Beautiful data management built for your taxi business</h2>
            <p className="text-slate-600 leading-7">
              Navigate directly to tables, forms and business queries from the dashboard. The system is designed for fast lookup and quick updates.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/forms" className="rounded-full bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700">
                Go to forms
              </Link>
              <Link href="/tables" className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-100">
                Explore tables
              </Link>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[1.5rem] bg-slate-900 p-3">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.25),_transparent_35%)]" />
            <div className="relative h-72 w-full overflow-hidden rounded-[1.5rem] bg-slate-950">
              <Image
                src="/image.jpg"
                alt="Dashboard overview"
                fill
                className="object-cover opacity-80"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
