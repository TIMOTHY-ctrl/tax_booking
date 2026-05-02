import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md rounded-[2rem] bg-white p-8 shadow-2xl shadow-slate-900/5">
        <h1 className="text-2xl font-semibold text-slate-900">Forgot your password?</h1>
        <p className="mt-3 text-slate-600">Enter the email address associated with your account and we will send you a reset link.</p>

        <form className="mt-8 space-y-5">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Email address</span>
            <input
              type="email"
              placeholder="you@example.com"
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-teal-500"
            />
          </label>
          <button className="w-full rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-700">
            Send reset link
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          <Link href="/login" className="font-medium text-teal-600 hover:underline">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
