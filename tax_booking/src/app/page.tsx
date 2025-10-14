import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Home Page</h1>

      <Link
        href="/login"
        className="text-blue-600 underline hover:text-blue-800 mb-2"
      >
        Go to Login
      </Link>

      <Link
        href="/form"
        className="text-blue-600 underline hover:text-blue-800"
      >
        Go to Form
      </Link>
    </div>
  );
}
