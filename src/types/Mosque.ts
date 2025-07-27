// types/mosque.ts
export interface Mosque {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  distance?: number;
  has_ac: boolean;
  ac_status?: "working" | "broken" | "partial" | null;
  wudhu_cleanliness:
    | "very_clean"
    | "clean"
    | "average"
    | "needs_cleaning"
    | null;
  parking_available: boolean;
  bike_parking_available: boolean;
  wheelchair_accessible: boolean;
  prayer_mats_provided: boolean;
  phone?: string;
  website?: string;
  google_maps_link?: string;
  image_url?: string;
  description?: string;
  friday_khutbah_time?: string;
  separate_wudhu_areas?: boolean;
  shoe_storage?: string;
  open_24_hours: boolean;
}