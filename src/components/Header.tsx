"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="relative z-30 bg-white backdrop-blur-sm border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 2L3 7v11h4v-6h6v6h4V7l-7-5z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">
              MasjidFinder
            </span>
          </Link>

          {/* Submit Mosque Button */}
          <Link
            href="/submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-200 hover:scale-105"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Tambah Masjid
          </Link>
        </div>
      </div>
    </header>
  );
}
