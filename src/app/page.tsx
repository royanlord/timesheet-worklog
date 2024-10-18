import Link from "next/link";

export default function Home() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
          <h2 className="text-2xl font-bold text-center">Welcome to Timesheet Worklog Website</h2>
          <div className="flex justify-center">
            <Link href="/login">
              <span className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Go to Login
              </span>
            </Link>
          </div>
        </div>
      </div>
    );
}
