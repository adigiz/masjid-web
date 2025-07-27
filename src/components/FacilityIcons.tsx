/**
 * Reusable Facility Icons for Mosque Components
 *
 * Usage Examples:
 *
 * // Individual icons
 * <CarParkingIcon size="md" available={true} />
 * <BikeParkingIcon size="lg" available={false} />
 *
 * // With custom styling
 * <ACIcon size="sm" className="text-blue-500" />
 *
 * // Using the convenience component
 * <FacilityItem
 *   icon="car"
 *   available={mosque.parking_available}
 *   label="Parkir Mobil"
 *   size="md"
 * />
 *
 * // Icon only (no text)
 * <FacilityItem
 *   icon="wheelchair"
 *   available={mosque.wheelchair_accessible}
 *   label="Wheelchair"
 *   showText={false}
 * />
 */

interface IconProps {
  size?: "sm" | "md" | "lg" | "xl";
  available?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "w-3 h-3",
  md: "w-4 h-4",
  lg: "w-5 h-5",
  xl: "w-6 h-6",
};

const getColorClass = (available?: boolean, className?: string) => {
  if (className) return className;
  return available ? "text-green-500" : "text-gray-400";
};

export const CarParkingIcon = ({
  size = "md",
  available,
  className,
}: IconProps) => (
  <svg
    className={`${sizeClasses[size]} ${getColorClass(available, className)}`}
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
  </svg>
);

export const BikeParkingIcon = ({
  size = "md",
  available,
  className,
}: IconProps) => (
  <svg
    className={`${sizeClasses[size]} ${getColorClass(available, className)}`}
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M5 18.5a3.5 3.5 0 107 0 3.5 3.5 0 00-7 0zM16.5 18.5a3.5 3.5 0 107 0 3.5 3.5 0 00-7 0z" />
    <path d="M5 18.5c0-.28.22-.5.5-.5s.5.22.5.5-.22.5-.5.5-.5-.22-.5-.5zm14 0c0-.28.22-.5.5-.5s.5.22.5.5-.22.5-.5.5-.5-.22-.5-.5z" />
    <path d="M5 15l6.5 0V9h2l2 6h3.5v-2h-2l-1.07-3.2c-.18-.54-.69-.8-1.25-.8H9.5v2L5 15z" />
  </svg>
);

export const WheelchairIcon = ({
  size = "md",
  available,
  className,
}: IconProps) => (
  <svg
    className={`${sizeClasses[size]} ${getColorClass(available, className)}`}
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12 6a2 2 0 110-4 2 2 0 010 4z" />
    <path d="M21 9h-6l-2 7-3-4h-2l-1 2v6h2v-4l1.5-3L13 17v3h2v-4l-1.5-2.5L15.5 11H21V9z" />
    <path d="M7.5 22a5.5 5.5 0 110-11 5.5 5.5 0 010 11zm0-2a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" />
  </svg>
);

export const PrayerMatIcon = ({
  size = "md",
  available,
  className,
}: IconProps) => (
  <svg
    className={`${sizeClasses[size]} ${getColorClass(available, className)}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <rect
      x="4"
      y="9"
      width="16"
      height="10"
      rx="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 9V7a1 1 0 011-1h6a1 1 0 011 1v2"
    />
    <circle cx="12" cy="14" r="2" strokeWidth={2} />
  </svg>
);

export const ACIcon = ({ size = "md", available, className }: IconProps) => (
  <svg
    className={`${sizeClasses[size]} ${getColorClass(available, className)}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
    />
  </svg>
);

// Convenience component that renders a facility icon with text
interface FacilityItemProps {
  icon: "car" | "bike" | "wheelchair" | "prayerMat" | "ac";
  available: boolean;
  label: string;
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  className?: string;
}

export const FacilityItem = ({
  icon,
  available,
  label,
  size = "md",
  showText = true,
  className,
}: FacilityItemProps) => {
  const iconComponents = {
    car: CarParkingIcon,
    bike: BikeParkingIcon,
    wheelchair: WheelchairIcon,
    prayerMat: PrayerMatIcon,
    ac: ACIcon,
  };

  const IconComponent = iconComponents[icon];

  return (
    <div className={`flex items-center ${className || ""}`}>
      <IconComponent size={size} available={available} />
      {showText && (
        <span
          className={`ml-2 text-xs ${
            available ? "text-gray-700" : "text-gray-400 line-through"
          }`}
        >
          {label}
        </span>
      )}
    </div>
  );
};
