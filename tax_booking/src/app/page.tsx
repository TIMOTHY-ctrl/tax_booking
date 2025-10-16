
import Image from "next/image";
import Link from "next/link";
export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative">
      <div className="absolute top-0 left-0 right-0 bg-[#008183] h-18"> 
        <h1 className="text-3xl font-bold mb-4 p-6 text-center">
            Welcome to Tax-booking Database!
          </h1></div>
      <div className="bg-white rounded-2xl w-[800px] max-w-full flex flex-col md:flex-row overflow-hidden">
        
       
        <div className="flex-1 p-8 bg-white text-white border border-gray-300 shadow-lg-500">         
          <p className="text-black leading-relaxed">
            Use this database to help track information about your tax business details.
            You can track information about trips, booking details, users, routes,
            vehicles, and drivers.
          </p>
        </div>

        {/* Right section */}
        <div className="flex flex-col items-center justify-center p-6 bg-[#008183] text-white">
          <h2 className="text-sm text-white mb-2">
            Using database to maximise your profits
          </h2>

          <div className="w-40 h-40 relative mb-4">
            <Image
              src="/image.jpg" // put your image in /public
              alt="Tax database illustration"
              fill
              className="object-contain"
            />
          </div>

          <Link href="/login">
            <button className="bg-white text-black px-6 py-2 rounded-full hover:bg-teal-800 transition-all">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
