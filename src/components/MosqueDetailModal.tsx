import { useEffect } from "react";
import Image from "next/image";
import {
  CarParkingIcon,
  BikeParkingIcon,
  WheelchairIcon,
  PrayerMatIcon,
} from "@/components/FacilityIcons";
import { Mosque } from "@/types/Mosque";

interface MosqueDetailModalProps {
  mosque: Mosque | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function MosqueDetailModal({
  mosque,
  isOpen,
  onClose,
}: MosqueDetailModalProps) {
  // Close modal on ESC key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mosque) return null;

  const getACStatus = (hasAC: boolean, status?: string | null) => {
    if (!hasAC)
      return {
        text: "Tidak ada AC",
        color: "text-gray-500 bg-gray-100",
        icon: "❄️",
      };
    switch (status) {
      case "working":
        return {
          text: "AC berfungsi dengan baik",
          color: "text-green-700 bg-green-100",
          icon: "✅",
        };
      case "broken":
        return {
          text: "AC rusak/tidak berfungsi",
          color: "text-red-700 bg-red-100",
          icon: "❌",
        };
      case "partial":
        return {
          text: "AC sebagian ruangan",
          color: "text-yellow-700 bg-yellow-100",
          icon: "⚠️",
        };
      default:
        return {
          text: "AC tersedia",
          color: "text-blue-700 bg-blue-100",
          icon: "❄️",
        };
    }
  };

  const getCleanlinessStatus = (cleanliness?: string | null) => {
    switch (cleanliness) {
      case "very_clean":
        return {
          text: "Sangat bersih",
          color: "text-green-700 bg-green-100",
          icon: "⭐",
        };
      case "clean":
        return {
          text: "Bersih",
          color: "text-green-700 bg-green-100",
          icon: "✨",
        };
      case "average":
        return {
          text: "Cukup bersih",
          color: "text-yellow-700 bg-yellow-100",
          icon: "👌",
        };
      case "needs_cleaning":
        return {
          text: "Perlu dibersihkan",
          color: "text-red-700 bg-red-100",
          icon: "⚠️",
        };
      default:
        return {
          text: "Belum ada informasi",
          color: "text-gray-500 bg-gray-100",
          icon: "❓",
        };
    }
  };

  const getShoeStorageText = (storage?: string) => {
    switch (storage) {
      case "shelves":
        return "Rak sepatu tersedia";
      case "lockers":
        return "Loker sepatu tersedia";
      case "floor_only":
        return "Lantai saja";
      case "none":
        return "Tidak ada tempat khusus";
      default:
        return "Belum ada informasi";
    }
  };

  const handleDirectionsClick = () => {
    // Guard against SSR
    if (typeof window === "undefined") return;

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

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black opacity-70 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
            type="button"
            aria-label="Close modal"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Content */}
          <div className="overflow-y-auto max-h-[90vh]">
            {/* Header Image */}
            <div className="h-64 md:h-80 bg-gray-200 relative">
              {mosque.image_url ? (
                <Image
                  src={mosque.image_url}
                  alt={mosque.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                  className="object-cover"
                  priority={true} // Modal images should load with priority
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                  <svg
                    className="w-24 h-24 text-white/80"
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
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-teal-600 font-semibold px-3 py-1 rounded-full shadow-lg">
                    📍 {mosque.distance}km dari Anda
                  </span>
                </div>
              )}

              {/* 24-Hour Badge */}
              {mosque.open_24_hours && (
                <div
                  className="absolute top-4 left-4"
                  style={{ top: mosque.distance ? "3.5rem" : "1rem" }}
                >
                  <span className="bg-green-500/90 backdrop-blur-sm text-white font-semibold px-3 py-1 rounded-full shadow-lg">
                    🕐 Buka 24 Jam
                  </span>
                </div>
              )}
            </div>

            {/* Main Content */}
            <div className="p-6 md:p-8">
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {mosque.name}
                </h2>
                <p className="text-gray-600 flex items-start">
                  <svg
                    className="w-5 h-5 mt-0.5 mr-2 text-gray-400 flex-shrink-0"
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

              {/* Description */}
              {mosque.description && (
                <div className="mb-6">
                  <p className="text-gray-700 leading-relaxed">
                    {mosque.description}
                  </p>
                </div>
              )}

              {/* Main Facilities Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* AC Information */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
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
                    Sistem Pendingin
                  </h3>
                  <div
                    className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium ${acStatus.color}`}
                  >
                    <span className="mr-2">{acStatus.icon}</span>
                    {acStatus.text}
                  </div>
                </div>

                {/* Wudhu Information */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
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
                    Fasilitas Wudhu
                  </h3>
                  <div
                    className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium mb-2 ${cleanlinessStatus.color}`}
                  >
                    <span className="mr-2">{cleanlinessStatus.icon}</span>
                    {cleanlinessStatus.text}
                  </div>
                  {mosque.separate_wudhu_areas && (
                    <p className="text-sm text-gray-600 mt-2">
                      ✅ Area wudhu terpisah pria/wanita
                    </p>
                  )}
                </div>
              </div>

              {/* Operational Hours */}
              {mosque.open_24_hours && (
                <div className="mb-8">
                  <h3 className="font-semibold text-gray-900 mb-4 text-lg flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-teal-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Jam Operasional
                  </h3>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-800 font-medium">
                      🕐 Masjid buka 24 jam - Jamaah dapat beribadah kapan saja
                    </p>
                  </div>
                </div>
              )}

              {/* Detailed Facilities */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-4 text-lg">
                  Fasilitas Lengkap
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <CarParkingIcon
                      size="sm"
                      available={mosque.parking_available}
                    />
                    <div className="ml-3">
                      <p
                        className={`font-medium text-sm ${
                          mosque.parking_available
                            ? "text-gray-900"
                            : "text-gray-500"
                        }`}
                      >
                        Parkir Mobil
                      </p>
                      <p
                        className={`text-xs ${
                          mosque.parking_available
                            ? "text-gray-600"
                            : "text-gray-400"
                        }`}
                      >
                        {mosque.parking_available
                          ? "Tersedia"
                          : "Tidak tersedia"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <BikeParkingIcon
                      size="sm"
                      available={mosque.bike_parking_available}
                    />
                    <div className="ml-3">
                      <p
                        className={`font-medium text-sm ${
                          mosque.bike_parking_available
                            ? "text-gray-900"
                            : "text-gray-500"
                        }`}
                      >
                        Parkir Motor/Sepeda
                      </p>
                      <p
                        className={`text-xs ${
                          mosque.bike_parking_available
                            ? "text-gray-600"
                            : "text-gray-400"
                        }`}
                      >
                        {mosque.bike_parking_available
                          ? "Tersedia"
                          : "Tidak tersedia"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <WheelchairIcon
                      size="sm"
                      available={mosque.wheelchair_accessible}
                    />
                    <div className="ml-3">
                      <p
                        className={`font-medium text-sm ${
                          mosque.wheelchair_accessible
                            ? "text-gray-900"
                            : "text-gray-500"
                        }`}
                      >
                        Akses Wheelchair
                      </p>
                      <p
                        className={`text-xs ${
                          mosque.wheelchair_accessible
                            ? "text-gray-600"
                            : "text-gray-400"
                        }`}
                      >
                        {mosque.wheelchair_accessible
                          ? "Tersedia"
                          : "Tidak tersedia"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <PrayerMatIcon
                      size="sm"
                      available={mosque.prayer_mats_provided}
                    />
                    <div className="ml-3">
                      <p
                        className={`font-medium text-sm ${
                          mosque.prayer_mats_provided
                            ? "text-gray-900"
                            : "text-gray-500"
                        }`}
                      >
                        Sajadah
                      </p>
                      <p
                        className={`text-xs ${
                          mosque.prayer_mats_provided
                            ? "text-gray-600"
                            : "text-gray-400"
                        }`}
                      >
                        {mosque.prayer_mats_provided
                          ? "Disediakan"
                          : "Bawa sendiri"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <svg
                      className="w-3 h-3 text-green-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Rak bagian atas */}
                      <rect x="3" y="4" width="18" height="3" rx="1" />
                      {/* Rak bagian tengah */}
                      <rect x="3" y="10.5" width="18" height="3" rx="1" />
                      {/* Rak bagian bawah */}
                      <rect x="3" y="17" width="18" height="3" rx="1" />
                      {/* Sepatu kiri atas */}
                      <path d="M5.5 5.5h4v1h-4z" fill="currentColor" />
                      {/* Sepatu kanan tengah */}
                      <path d="M14.5 12h4v1h-4z" fill="currentColor" />
                      {/* Sepatu kiri bawah */}
                      <path d="M5.5 18.5h4v1h-4z" fill="currentColor" />
                    </svg>

                    <div className="ml-3">
                      <p className="font-medium text-sm text-gray-900">
                        Tempat Sepatu
                      </p>
                      <p className="text-xs text-gray-600">
                        {getShoeStorageText(mosque.shoe_storage)}
                      </p>
                    </div>
                  </div>

                  {mosque.phone && (
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <svg
                        className="w-3 h-3 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <div className="ml-3">
                        <p className="font-medium text-sm text-gray-900">
                          Telepon
                        </p>
                        <p className="text-xs text-gray-600">{mosque.phone}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact & Actions */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleDirectionsClick}
                    className="flex-1 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors font-medium flex items-center justify-center"
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
                      <path
                        d="M12 2v20"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
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
                    Petunjuk Arah
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
