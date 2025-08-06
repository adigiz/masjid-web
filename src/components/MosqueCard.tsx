import Image from "next/image";
import Link from "next/link";
import {
  CarParkingIcon,
  BikeParkingIcon,
  WheelchairIcon,
  PrayerMatIcon,
} from "@/components/FacilityIcons";
import { Mosque } from "@/types/Mosque";

interface MosqueCardProps {
  mosque: Mosque;
  onClick?: (mosque: Mosque) => void;
  detailsHref?: string; // Optional: if you want to navigate to a details page
}

export default function MosqueCard({
  mosque,
  onClick,
  detailsHref,
}: MosqueCardProps) {
  const getACStatus = (hasAC: boolean, status?: string | null) => {
    if (!hasAC)
      return { text: "Tidak ada AC", color: "text-gray-500 bg-gray-100" };
    switch (status) {
      case "working":
        return { text: "AC berfungsi", color: "text-green-700 bg-green-100" };
      case "broken":
        return { text: "AC rusak", color: "text-red-700 bg-red-100" };
      case "partial":
        return { text: "AC sebagian", color: "text-yellow-700 bg-yellow-100" };
      default:
        return { text: "AC tersedia", color: "text-blue-700 bg-blue-100" };
    }
  };

  const getCleanlinessStatus = (cleanliness?: string | null) => {
    switch (cleanliness) {
      case "very_clean":
        return { text: "Sangat bersih", color: "text-green-700 bg-green-100" };
      case "clean":
        return { text: "Bersih", color: "text-green-700 bg-green-100" };
      case "average":
        return { text: "Cukup bersih", color: "text-yellow-700 bg-yellow-100" };
      case "needs_cleaning":
        return { text: "Perlu dibersihkan", color: "text-red-700 bg-red-100" };
      default:
        return { text: "Belum ada info", color: "text-gray-500 bg-gray-100" };
    }
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick(mosque);
    }
  };

  const handleDirectionsClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    // Use google_maps_link if available, otherwise construct search query
    const mapsUrl =
      mosque.google_maps_link ||
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        mosque.address
      )}`;

    // Open external link with security best practices
    const newWindow = window.open(mapsUrl, "_blank");
    if (newWindow) {
      newWindow.opener = null; // Security: prevent access to parent window
    }
  };

  const acStatus = getACStatus(mosque.has_ac, mosque.ac_status);
  const cleanlinessStatus = getCleanlinessStatus(mosque.wudhu_cleanliness);

  // Content component to avoid duplication
  const CardContent = () => (
    <>
      {/* Image */}
      <div className="h-48 bg-gray-200 relative overflow-hidden">
        {mosque.image_url ? (
          <Image
            src={mosque.image_url}
            alt={mosque.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 hover:scale-105"
            priority={false} // Set to true if this is above the fold
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
            <svg
              className="w-16 h-16 text-white/80"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M10 2L3 7v11h4v-6h6v6h4V7l-7-5z" />
            </svg>
          </div>
        )}

        {/* Distance Badge */}
        {mosque.distance && (
          <div className="absolute top-3 right-3">
            <span className="bg-white/90 backdrop-blur-sm text-teal-600 font-medium px-2 py-1 rounded-full text-sm shadow-sm">
              {mosque.distance}km
            </span>
          </div>
        )}

        {/* 24-Hour Badge */}
        {mosque.open_24_hours && (
          <div className="absolute top-3 left-3">
            <span className="bg-green-500/90 backdrop-blur-sm text-white font-medium px-2 py-1 rounded-full text-xs shadow-sm">
              24 Jam
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {mosque.name}
          </h3>

          {/* Address */}
          <p className="text-gray-600 text-sm flex items-start">
            <svg
              className="w-4 h-4 mt-0.5 mr-2 text-gray-400 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            {mosque.address}
          </p>
        </div>

        {/* Status Badges */}
        <div className="space-y-2 mb-4">
          <div>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${acStatus.color}`}
            >
              <svg
                className="w-5 h-5 mr-2 text-teal-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* <!-- Unit AC utama --> */}
                <rect x="3" y="4" width="18" height="6" rx="1" ry="1" />

                {/* <!-- Ventilasi horizontal --> */}
                <line x1="6" y1="7" x2="18" y2="7" />
                <line x1="6" y1="9" x2="18" y2="9" />

                {/* <!-- Tetesan udara dingin --> */}
                <path d="M8 14v2" />
                <path d="M12 14v3" />
                <path d="M16 14v2.5" />
              </svg>

              {acStatus.text}
            </span>
          </div>
          <div>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cleanlinessStatus.color}`}
            >
              <svg
                className="w-5 h-5 mr-2 text-teal-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {/* Shower pipe vertical */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M8 3v8"
                />

                {/* Shower pipe horizontal */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M8 11h6"
                />

                {/* Shower head */}
                <circle cx="14" cy="11" r="2.5" strokeWidth={2.5} />

                {/* Water streams */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v4M14 16v3M16 15v4"
                  opacity="0.7"
                />

                {/* Water drops */}
                <circle
                  cx="13"
                  cy="20"
                  r="0.5"
                  fill="currentColor"
                  opacity="0.6"
                />
                <circle
                  cx="15"
                  cy="20.5"
                  r="0.5"
                  fill="currentColor"
                  opacity="0.8"
                />
              </svg>
              Wudhu: {cleanlinessStatus.text}
            </span>
          </div>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-2 gap-3 text-xs mb-4">
          <div className="flex items-center">
            <CarParkingIcon size="lg" available={mosque.parking_available} />
            <span
              className={`ml-2 ${
                mosque.parking_available
                  ? "text-gray-700"
                  : "text-gray-400 line-through"
              }`}
            >
              Parkir Mobil
            </span>
          </div>
          <div className="flex items-center">
            <BikeParkingIcon
              size="lg"
              available={mosque.bike_parking_available}
            />
            <span
              className={`ml-2 ${
                mosque.bike_parking_available
                  ? "text-gray-700"
                  : "text-gray-400 line-through"
              }`}
            >
              Parkir Motor
            </span>
          </div>
          <div className="flex items-center">
            <WheelchairIcon
              size="lg"
              available={mosque.wheelchair_accessible}
            />
            <span
              className={`ml-2 ${
                mosque.wheelchair_accessible
                  ? "text-gray-700"
                  : "text-gray-400 line-through"
              }`}
            >
              Wheelchair
            </span>
          </div>
          <div className="flex items-center">
            <PrayerMatIcon size="lg" available={mosque.prayer_mats_provided} />
            <span
              className={`ml-2 ${
                mosque.prayer_mats_provided
                  ? "text-gray-700"
                  : "text-gray-400 line-through"
              }`}
            >
              Sajadah
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2 border-t border-gray-100">
          <button
            onClick={handleDirectionsClick}
            className="flex-1 text-xs bg-teal-50 text-teal-700 px-3 py-2 rounded-md hover:bg-teal-100 transition-colors duration-200 font-medium"
            type="button"
          >
            <svg
              className="w-3 h-3 inline mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2v20" strokeLinecap="round" strokeLinejoin="round" />
              <path
                d="M12 6H5l-1.5 2L5 10h7V6z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 14h7l1.5 2L19 18h-7v-4z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Arah
          </button>
        </div>

        {/* Click to view details hint */}
        <div className="mt-3 pt-2 border-t border-gray-100">
          <p className="text-xs text-gray-500 text-center">
            Klik untuk melihat detail lengkap
          </p>
        </div>
      </div>
    </>
  );

  // If detailsHref is provided, wrap with Link, otherwise use div with onClick
  if (detailsHref) {
    return (
      <Link
        href={detailsHref}
        className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer block"
      >
        <CardContent />
      </Link>
    );
  }

  return (
    <div
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer"
      onClick={handleCardClick}
    >
      <CardContent />
    </div>
  );
}
