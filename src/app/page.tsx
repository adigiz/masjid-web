"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFindNearbyMosques = (): void => {
    if (!navigator.geolocation) {
      alert("Browser Anda tidak mendukung geolocation");
      return;
    }

    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        router.push(`/mosques?lat=${latitude}&lng=${longitude}`);
      },
      (error) => {
        setIsLoading(false);
        let errorMessage = "Tidak dapat mengakses lokasi Anda. ";

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage += "Mohon izinkan akses lokasi pada browser.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage += "Informasi lokasi tidak tersedia.";
            break;
          case error.TIMEOUT:
            errorMessage += "Permintaan lokasi timeout.";
            break;
          default:
            errorMessage += "Terjadi kesalahan tidak dikenal.";
            break;
        }

        alert(errorMessage);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Hero Section - Takes remaining height */}
      <section className="flex-1 relative flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
            alt="Beautiful Mosque"
            className="w-full h-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-20 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-6 lg:space-y-8">
                {/* Location Badge */}
                <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white">
                  <svg
                    className="w-4 h-4 text-teal-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium">
                    Temukan masjid di seluruh Indonesia
                  </span>
                </div>

                {/* Main Heading */}
                <div className="space-y-3 lg:space-y-4">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                    Temukan Masjid dengan
                    <span className="block text-teal-400">
                      Informasi Lengkap
                    </span>
                  </h1>

                  <p className="text-base sm:text-lg lg:text-xl text-white/80 leading-relaxed max-w-xl">
                    Cari masjid terdekat dengan informasi detail yang tidak ada
                    di Google Maps - kondisi AC, kebersihan tempat wudhu, dan
                    fasilitas lainnya.
                  </p>
                </div>

                {/* CTA Button */}
                <div className="pt-2 lg:pt-4">
                  <button
                    onClick={handleFindNearbyMosques}
                    disabled={isLoading}
                    className="group relative inline-flex items-center justify-center px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Mengakses Lokasi...
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        Temukan Masjid Terdekat
                      </>
                    )}

                    {/* Button shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full transform -skew-x-12"></div>
                  </button>
                </div>
                </div>

              {/* Right Side - Image space (content flows naturally) */}
              <div className="hidden lg:block">
                {/* This space is for the mosque image which is in the background */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
