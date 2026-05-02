import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md rounded-[2rem] bg-white p-8 shadow-2xl shadow-slate-900/5">
        <h1 className="text-2xl font-semibold text-slate-900">Create a new account</h1>
        <p className="mt-3 text-slate-600">Complete the form below to register a new admin account for Tax Booking.</p>

        <form className="mt-8 space-y-5">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Full name</span>
            <input
              type="text"
              placeholder="John Doe"
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-teal-500"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Email address</span>
            <input
              type="email"
              placeholder="you@example.com"
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-teal-500"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Password</span>
            <input
              type="password"
              placeholder="Enter a secure password"
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-teal-500"
            />
          </label>
          <button className="w-full rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-700">
            Create account
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-teal-600 hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
