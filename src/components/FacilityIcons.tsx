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
    xmlns="http://www.w3.org/2000/svg"
    className={`${sizeClasses[size]} ${getColorClass(available, className)}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <circle cx="6.5" cy="17.5" r="3.5" />
    <circle cx="17.5" cy="17.5" r="3.5" />
    <path d="M6.5 17.5L9 10h3l2 5h3.5" />
    <path d="M12 10L13 7h1.5" />
  </svg>
);

export const WheelchairIcon = ({
  size = "md",
  available,
  className,
}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`${sizeClasses[size]} ${getColorClass(available, className)}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path d="M10 5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM12 7v4h6m-2 6a5 5 0 11-10 0 5 5 0 0110 0z" />
  </svg>
);

export const PrayerMatIcon = ({
  size = "md",
  available,
  className,
}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`${sizeClasses[size]} ${getColorClass(available, className)}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <rect x="6" y="4" width="12" height="16" rx="1" />
    <path d="M9 8h6M9 12h6M9 16h6" />
  </svg>
);

export const ShoeRackIcon = ({
  size = "md",
  available,
  className,
}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`${sizeClasses[size]} ${getColorClass(available, className)}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
  >
    <rect x="4" y="4" width="16" height="3" rx="1" />
    <rect x="4" y="10.5" width="16" height="3" rx="1" />
    <rect x="4" y="17" width="16" height="3" rx="1" />
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
    ac: ShoeRackIcon,
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
