"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import MosqueCard from "@/components/MosqueCard";
import MosqueDetailModal from "@/components/MosqueDetailModal";
import {
  CarParkingIcon,
  BikeParkingIcon,
  WheelchairIcon,
  PrayerMatIcon,
  ACIcon,
} from "@/components/FacilityIcons";
import { Mosque } from "@/types/Mosque";
import { createMockMosques } from "../data/mockMosques";

interface UserLocation {
  lat: number;
  lng: number;
}

export default function MosquesPage() {
  const searchParams = useSearchParams();
  const [mosques, setMosques] = useState<Mosque[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [selectedMosque, setSelectedMosque] = useState<Mosque | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    if (lat && lng) {
      const location = { lat: parseFloat(lat), lng: parseFloat(lng) };
      setUserLocation(location);
      fetchNearbyMosques(location.lat, location.lng);
    }
  }, [searchParams]);

  useEffect(() => {
    // Initialize or reinitialize map when switching to map view
    if (viewMode === "map" && userLocation && mapContainerRef.current) {
      // Clean up existing map if it exists
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }

      // Small delay to ensure container is properly rendered
      setTimeout(() => {
        initializeMap();
      }, 100);
    }

    // Clean up map when switching away from map view
    if (viewMode === "list" && mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }
  }, [viewMode, userLocation, mosques]);

  const fetchNearbyMosques = async (
    lat: number,
    lng: number
  ): Promise<void> => {
    setLoading(true);
    try {
      // TODO: Replace with actual Supabase call
      // For now, use mock data
      const mockMosques = createMockMosques(lat, lng);
      setMosques(mockMosques);
    } catch (error) {
      console.error("Error fetching mosques:", error);
    } finally {
      setLoading(false);
    }
  };

  const initializeMap = (): void => {
    if (!mapContainerRef.current || !userLocation) return;

    // Create map
    const map = L.map(mapContainerRef.current).setView(
      [userLocation.lat, userLocation.lng],
      14
    );
    mapRef.current = map;

    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    // Custom user location icon
    const userIcon = L.divIcon({
      html: `
        <div class="bg-blue-500 w-4 h-4 rounded-full border-2 border-white shadow-lg">
          <div class="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-75"></div>
        </div>
      `,
      className: "relative",
      iconSize: [16, 16],
      iconAnchor: [8, 8],
    });

    // Add user location marker
    L.marker([userLocation.lat, userLocation.lng], { icon: userIcon })
      .bindPopup("Lokasi Anda")
      .addTo(map);

    // Custom mosque icon function to differentiate 24-hour mosques
    const getMosqueIcon = (is24Hours: boolean) => {
      const bgColor = is24Hours ? "bg-green-600" : "bg-teal-600";
      return L.divIcon({
        html: `
          <div class="${bgColor} text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2 border-white relative">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2L3 7v11h4v-6h6v6h4V7l-7-5z"/>
            </svg>
            ${
              is24Hours
                ? '<div class="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border border-white"></div>'
                : ""
            }
          </div>
        `,
        className: "",
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });
    };

    // Add mosque markers
    mosques.forEach((mosque) => {
      const marker = L.marker([mosque.latitude, mosque.longitude], {
        icon: getMosqueIcon(mosque.open_24_hours),
      })
        .bindPopup(
          `
          <div class="p-2">
            <h3 class="font-semibold text-sm">${mosque.name}</h3>
            <p class="text-xs text-gray-600 mt-1">${mosque.address}</p>
            <div class="mt-2 flex items-center space-x-2 flex-wrap gap-1">
              <span class="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded">${
                mosque.distance
              }km</span>
              ${
                mosque.has_ac
                  ? '<span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">AC</span>'
                  : ""
              }
              ${
                mosque.open_24_hours
                  ? '<span class="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">24 Jam</span>'
                  : ""
              }
              ${
                mosque.bike_parking_available
                  ? '<span class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Parkir Motor</span>'
                  : ""
              }
            </div>
          </div>
        `
        )
        .addTo(map);

      // Add click event to center mosque in view
      marker.on("click", () => {
        const mosqueElement = document.getElementById(`mosque-${mosque.id}`);
        if (mosqueElement) {
          mosqueElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      });
    });

    // Fit map to show all markers
    if (mosques.length > 0) {
      const group = L.featureGroup([
        L.marker([userLocation.lat, userLocation.lng]),
        ...mosques.map((m) => L.marker([m.latitude, m.longitude])),
      ]);
      map.fitBounds(group.getBounds().pad(0.1));
    }
  };

  const handleMosqueDetailClick = (mosque: Mosque): void => {
    setSelectedMosque(mosque);
    setIsModalOpen(true);
  };

  const handleCloseModal = (): void => {
    setSelectedMosque(null);
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Mencari masjid terdekat...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Masjid Terdekat
              </h1>
              <p className="text-gray-600 mt-1">
                Ditemukan {mosques.length} masjid dalam radius 5km dari lokasi
                Anda
              </p>
            </div>

            {/* View Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("list")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  viewMode === "list"
                    ? "bg-white text-teal-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <svg
                  className="w-4 h-4 inline mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  />
                </svg>
                List
              </button>
              <button
                onClick={() => setViewMode("map")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  viewMode === "map"
                    ? "bg-white text-teal-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <svg
                  className="w-4 h-4 inline mr-2"
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
                Map
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {viewMode === "list" ? (
          /* List View */
          <div>
            {mosques.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {mosques.map((mosque) => (
                  <div key={mosque.id} id={`mosque-${mosque.id}`}>
                    <MosqueCard
                      mosque={mosque}
                      onClick={handleMosqueDetailClick}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  Tidak ada masjid ditemukan
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Coba perluas radius pencarian.
                </p>
              </div>
            )}
          </div>
        ) : (
          /* Map View */
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Map Container */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div
                  ref={mapContainerRef}
                  className="h-96 lg:h-[600px] w-full"
                  id="map"
                />
              </div>
            </div>

            {/* Mosque List Sidebar */}
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Daftar Masjid
                </h3>
                <div className="space-y-3 max-h-[520px] overflow-y-auto">
                  {mosques.map((mosque) => (
                    <div
                      key={mosque.id}
                      className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => {
                        if (mapRef.current) {
                          mapRef.current.setView(
                            [mosque.latitude, mosque.longitude],
                            17
                          );
                        }
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm text-gray-900">
                            {mosque.name}
                          </h4>
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                            {mosque.address}
                          </p>
                        </div>
                        {mosque.open_24_hours && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full ml-2 flex-shrink-0">
                            24H
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-teal-600 font-medium">
                          {mosque.distance}km
                        </span>
                        <div className="flex items-center space-x-2">
                          <div title="Parkir Mobil">
                            <CarParkingIcon
                              size="lg"
                              available={mosque.parking_available}
                            />
                          </div>
                          <div title="Parkir Motor">
                            <BikeParkingIcon
                              size="lg"
                              available={mosque.bike_parking_available}
                            />
                          </div>
                          <div title="Akses Wheelchair">
                            <WheelchairIcon
                              size="lg"
                              available={mosque.wheelchair_accessible}
                            />
                          </div>
                          <div title="Sajadah">
                            <PrayerMatIcon
                              size="lg"
                              available={mosque.prayer_mats_provided}
                            />
                          </div>
                          <div title="AC">
                            <ACIcon size="lg" available={mosque.has_ac} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      <MosqueDetailModal
        mosque={selectedMosque}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
