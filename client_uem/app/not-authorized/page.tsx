// app/not-authorized/page.tsx

import Link from "next/link";

export default function NotAuthorized() {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
          <p>You are not authorized to view this page.</p>
          <Link href="/" className="mt-4 inline-block text-blue-500 hover:underline">
            Go back to home page
          </Link>
          <p className="mt-4 text-sm text-gray-500">If you believe this is an error, please contact support.</p>
        </div>
      </div>
    );
  }
  