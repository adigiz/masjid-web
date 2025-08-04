"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Mosque } from "@/types/Mosque";

interface MapClientProps {
  userLocation: { lat: number; lng: number };
  mosques: Mosque[];
  onMapReady?: (centerMapFunction: (lat: number, lng: number) => void) => void;
}

export default function MapClient({ userLocation, mosques, onMapReady }: MapClientProps) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Fix Leaflet map reuse issue without using `any`
    const leafletContainer = containerRef.current as HTMLDivElement & {
      _leaflet_id?: number;
    };

    if (leafletContainer._leaflet_id !== undefined) {
      delete leafletContainer._leaflet_id;
    }

    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    const map = L.map(leafletContainer).setView(
      [userLocation.lat, userLocation.lng],
      14
    );
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

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

    L.marker([userLocation.lat, userLocation.lng], { icon: userIcon })
      .bindPopup("Lokasi Anda")
      .addTo(map);

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

    mosques.forEach((mosque) => {
      const marker = L.marker([mosque.latitude, mosque.longitude], {
        icon: getMosqueIcon(mosque.open_24_hours),
      })
        .bindPopup(
          `<div class='p-2'>
            <h3 class='font-semibold text-sm'>${mosque.name}</h3>
            <p class='text-xs text-gray-600 mt-1'>${mosque.address}</p>
            <div class='mt-2 flex items-center space-x-2 flex-wrap gap-1'>
              <span class='text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded'>${mosque.distance}km</span>
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
          </div>`
        )
        .addTo(map);

      marker.on("click", () => {
        const mosqueElement = document.getElementById(`mosque-${mosque.id}`);
        if (mosqueElement) {
          mosqueElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      });
    });

    if (mosques.length > 0) {
      const group = L.featureGroup([
        L.marker([userLocation.lat, userLocation.lng]),
        ...mosques.map((m) => L.marker([m.latitude, m.longitude])),
      ]);
      map.fitBounds(group.getBounds().pad(0.1));
    }

    // Create the center map function and pass it to parent
    const centerMap = (lat: number, lng: number) => {
      if (mapRef.current) {
        mapRef.current.setView([lat, lng], 17, {
          animate: true,
          duration: 1, // Animation duration in seconds
        });
      }
    };

    // Call the callback to pass the centering function to parent
    if (onMapReady) {
      onMapReady(centerMap);
    }

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [userLocation, mosques, onMapReady]);

  return <div ref={containerRef} className="h-96 lg:h-[600px] w-full" id="map" />;
}