"use client";

import { useState } from "react";
import { Check, Info, Building2, Snowflake, Droplets, Car, Clock, Bike, Accessibility, MapPin, Package } from "lucide-react";

interface MosqueFormData {
  name: string;
  address: string;
  phone: string;
  website: string;
  google_maps_link: string;
  has_ac: boolean;
  ac_status: "working" | "broken" | "partial" | "";
  wudhu_cleanliness: "very_clean" | "clean" | "average" | "needs_cleaning" | "";
  separate_wudhu_areas: boolean;
  parking_available: boolean;
  bike_parking_available: boolean;
  wheelchair_accessible: boolean;
  prayer_mats_provided: boolean;
  shoe_storage: "shelves" | "lockers" | "floor_only" | "none" | "";
  open_24_hours: boolean;
}

interface CustomCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  name: string;
  icon?: React.ReactNode;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ checked, onChange, label, name, icon }) => {
  return (
    <div className="flex items-center">
      <div className="relative">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div
          onClick={() => onChange(!checked)}
          className={`w-5 h-5 rounded border-2 cursor-pointer transition-all duration-200 flex items-center justify-center ${
            checked
              ? 'bg-teal-600 border-teal-600 shadow-sm'
              : 'bg-white border-gray-300 hover:border-teal-400'
          }`}
        >
          {checked && (
            <Check className="w-3 h-3 text-white" strokeWidth={3} />
          )}
        </div>
      </div>
      <label 
        onClick={() => onChange(!checked)}
        className="ml-3 text-sm font-medium text-gray-700 cursor-pointer flex items-center"
      >
        {icon && <span className="mr-2">{icon}</span>}
        {label}
      </label>
    </div>
  );
};

export default function SubmitPage() {
  const [formData, setFormData] = useState<MosqueFormData>({
    name: "",
    address: "",
    phone: "",
    website: "",
    google_maps_link: "",
    has_ac: false,
    ac_status: "",
    wudhu_cleanliness: "",
    separate_wudhu_areas: false,
    parking_available: false,
    bike_parking_available: false,
    wheelchair_accessible: false,
    prayer_mats_provided: false,
    shoe_storage: "",
    open_24_hours: false,
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showMapsHelp, setShowMapsHelp] = useState<boolean>(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Submit to Supabase
      console.log("Form data:", formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      alert(
        "Terima kasih! Data masjid telah dikirim dan akan diverifikasi terlebih dahulu."
      );

      // Reset form
      setFormData({
        name: "",
        address: "",
        phone: "",
        website: "",
        google_maps_link: "",
        has_ac: false,
        ac_status: "",
        wudhu_cleanliness: "",
        separate_wudhu_areas: false,
        parking_available: false,
        bike_parking_available: false,
        wheelchair_accessible: false,
        prayer_mats_provided: false,
        shoe_storage: "",
        open_24_hours: false,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setFormData((prev) => ({
        ...prev,
        [name]: target.checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Tambah Data Masjid
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Bantu komunitas muslim dengan menambahkan informasi detail masjid
            yang belum tersedia. Data akan diverifikasi terlebih dahulu sebelum
            dipublikasikan.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Building2 className="w-5 h-5 mr-2 text-teal-600" />
                  Informasi Dasar
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Masjid <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-gray-900"
                    placeholder="Contoh: Masjid Al-Ikhlas"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nomor Telepon
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-gray-900"
                    placeholder="08123456789"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alamat Lengkap <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-gray-900"
                  placeholder="Jl. Contoh No.123, Kelurahan, Kecamatan, Kota, Provinsi"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website (Opsional)
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-gray-900"
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  Link Google Maps (Opsional)
                  <button
                    type="button"
                    onClick={() => setShowMapsHelp(!showMapsHelp)}
                    className="ml-2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </label>
                <input
                  type="url"
                  name="google_maps_link"
                  value={formData.google_maps_link}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-gray-900"
                  placeholder="https://maps.app.goo.gl/..."
                />
                
                {showMapsHelp && (
                  <div className="mt-2 p-4 bg-blue-50 border border-blue-200 rounded-md">
                    <h4 className="font-medium text-blue-900 mb-2">📍 Cara mendapatkan link Google Maps:</h4>
                    <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                      <li>Buka Google Maps di browser atau aplikasi</li>
                      <li>Cari nama masjid atau ketik alamatnya</li>
                      <li>Klik pada pin/marker masjid</li>
                      <li>Klik tombol &quot;Share&quot; atau &quot;Bagikan&quot;</li>
                      <li>Pilih &quot;Copy link&quot; atau &quot;Salin tautan&quot;</li>
                      <li>Paste link tersebut di kolom ini</li>
                    </ol>
                    <p className="text-xs text-blue-600 mt-2">
                      Contoh: https://maps.app.goo.gl/ABC123xyz atau https://goo.gl/maps/ABC123
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* AC Information */}
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Snowflake className="w-5 h-5 mr-2 text-teal-600" />
                  Sistem Pendingin
                </h2>
              </div>

              <div className="space-y-4">
                <CustomCheckbox
                  checked={formData.has_ac}
                  onChange={(checked) => setFormData(prev => ({ ...prev, has_ac: checked }))}
                  label="Masjid memiliki AC"
                  name="has_ac"
                  icon={<Snowflake className="w-4 h-4 text-teal-600" />}
                />

                {formData.has_ac && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status AC
                    </label>
                    <select
                      name="ac_status"
                      value={formData.ac_status}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-gray-900"
                    >
                      <option value="" className="text-gray-500">Pilih status AC</option>
                      <option value="working" className="text-gray-900">Berfungsi dengan baik</option>
                      <option value="partial" className="text-gray-900">Sebagian ruangan saja</option>
                      <option value="broken" className="text-gray-900">Rusak/tidak berfungsi</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* Wudhu Area */}
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Droplets className="w-5 h-5 mr-2 text-teal-600" />
                  Fasilitas Wudhu
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kondisi Kebersihan
                  </label>
                  <select
                    name="wudhu_cleanliness"
                    value={formData.wudhu_cleanliness}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-gray-900"
                  >
                    <option value="" className="text-gray-500">Pilih kondisi kebersihan</option>
                    <option value="very_clean" className="text-gray-900">Sangat bersih</option>
                    <option value="clean" className="text-gray-900">Bersih</option>
                    <option value="average" className="text-gray-900">Cukup bersih</option>
                    <option value="needs_cleaning" className="text-gray-900">Perlu dibersihkan</option>
                  </select>
                </div>

                <div className="flex items-center pt-8">
                  <CustomCheckbox
                    checked={formData.separate_wudhu_areas}
                    onChange={(checked) => setFormData(prev => ({ ...prev, separate_wudhu_areas: checked }))}
                    label="Area wudhu terpisah pria/wanita"
                    name="separate_wudhu_areas"
                    icon={<Droplets className="w-4 h-4 text-teal-600" />}
                  />
                </div>
              </div>
            </div>

            {/* Facilities */}
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Building2 className="w-5 h-5 mr-2 text-teal-600" />
                  Fasilitas Umum
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <CustomCheckbox
                    checked={formData.parking_available}
                    onChange={(checked) => setFormData(prev => ({ ...prev, parking_available: checked }))}
                    label="Parkir mobil tersedia"
                    name="parking_available"
                    icon={<Car className="w-4 h-4 text-teal-600" />}
                  />

                  <CustomCheckbox
                    checked={formData.bike_parking_available}
                    onChange={(checked) => setFormData(prev => ({ ...prev, bike_parking_available: checked }))}
                    label="Parkir motor/sepeda tersedia"
                    name="bike_parking_available"
                    icon={<Bike className="w-4 h-4 text-teal-600" />}
                  />

                  <CustomCheckbox
                    checked={formData.wheelchair_accessible}
                    onChange={(checked) => setFormData(prev => ({ ...prev, wheelchair_accessible: checked }))}
                    label="Akses kursi roda"
                    name="wheelchair_accessible"
                    icon={<Accessibility className="w-4 h-4 text-teal-600" />}
                  />

                  <CustomCheckbox
                    checked={formData.prayer_mats_provided}
                    onChange={(checked) => setFormData(prev => ({ ...prev, prayer_mats_provided: checked }))}
                    label="Sajadah disediakan"
                    name="prayer_mats_provided"
                    icon={<Package className="w-4 h-4 text-teal-600" />}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tempat Penyimpanan Sepatu
                  </label>
                  <select
                    name="shoe_storage"
                    value={formData.shoe_storage}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-gray-900"
                  >
                    <option value="" className="text-gray-500">Pilih tempat sepatu</option>
                    <option value="shelves" className="text-gray-900">Rak sepatu</option>
                    <option value="lockers" className="text-gray-900">Loker sepatu</option>
                    <option value="floor_only" className="text-gray-900">Lantai saja</option>
                    <option value="none" className="text-gray-900">Tidak ada tempat khusus</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Operational Hours */}
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-teal-600" />
                  Jam Operasional
                </h2>
              </div>

              <CustomCheckbox
                checked={formData.open_24_hours}
                onChange={(checked) => setFormData(prev => ({ ...prev, open_24_hours: checked }))}
                label="Buka 24 jam"
                name="open_24_hours"
                icon={<Clock className="w-4 h-4 text-teal-600" />}
              />
              <span className="ml-8 text-xs text-gray-500">
                (Jamaah dapat beribadah kapan saja)
              </span>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-teal-600 text-white py-4 px-6 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 font-semibold text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
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
                    Mengirim Data...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5 mr-2"
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
                    Kirim Data Masjid
                  </>
                )}
              </button>
            </div>

            {/* Disclaimer */}
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <div className="flex">
                <svg
                  className="w-5 h-5 text-blue-400 mt-0.5 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="text-sm text-blue-700">
                  <p className="font-medium mb-1">Informasi Penting:</p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>
                      Data akan diverifikasi oleh tim kami sebelum
                      dipublikasikan
                    </li>
                    <li>
                      Pastikan informasi yang diberikan akurat dan terkini
                    </li>
                    <li>
                      Anda dapat menghubungi kami jika ada perubahan data di
                      kemudian hari
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}