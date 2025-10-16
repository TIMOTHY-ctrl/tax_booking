
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-teal-100">
      {/* Login Card */}
      <div className="bg-white shadow-lg p-1 border border-gray-300 rounded-md w-[400px]">
        
        {/* Top teal banner with abstract design */}
        <div className="h-48 bg-gradient-to-r p-10 from-teal-800 to-white relative flex items-center justify-center">          
          <Image
            src="/image2.jpg"
            alt="Abstract design"
            fill
            className="object-cover opacity-40"
          />
        </div>

        {/* Form section */}
        <div className="p-8 space-y-4">
          <input
            type="text"
            placeholder="User name"
            className="w-full px-4 py-2 rounded-md bg-[#008183] text-white placeholder-white focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded-md bg-[#008183] text-white placeholder-white focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded-md bg-[#008183] text-white placeholder-white focus:outline-none"
          />

          {/* Links below fields */}
          <div className="flex justify-between text-sm text-black mt-2">
            <Link href="/register" className="hover:underline">register</Link>
            <Link href="/forgot-password" className="hover:underline">Forgot Password</Link>
          </div>

          {/* Login button */}
          <div className="flex justify-center mt-4">
            <Link href="/dashboard">
            <button className="px-6 py-1 border border-yellow-400 rounded-full text-black hover:bg-yellow-600 hover:text-white transition-all">
              login
            </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer text */}
      <p className="mt-4 text-sm text-black">designed by group Q</p>
    </div>
  );
}

