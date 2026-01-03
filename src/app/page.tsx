import Link from "next/link";

export default function Home() {
  return (
    <div
     className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to the Inventory System
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            This is the main page of the inventory management system.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
             href="/sign-in"
             className="bg-purple-600 px-8 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors">
              Sign In
            </Link>
            <Link
            //ddewed
             href="/#"
            className="bg-purple-600 px-8 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}