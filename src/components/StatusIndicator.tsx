import { useTheme } from "@/contexts/ThemeContext";
import { getStatusColors } from "@/data/theme";

interface StatusIndicatorProps {
  label: string;
  className?: string;
}

/**
 * A glowing status indicator with a pulsing dot.
 * Shows green/emerald in dark mode, cyan in light mode.
 */
export default function StatusIndicator({ label, className = "" }: StatusIndicatorProps) {
  const { theme } = useTheme();
  const statusColors = getStatusColors(theme);

  return (
    <span
      className={`inline-flex items-center gap-2 text-sm font-medium ${className}`}
      style={{ color: statusColors.color }}
    >
      <span className="relative inline-flex h-2.5 w-2.5">
        {/* bright core */}
        <span
          className="absolute inset-0 rounded-full opacity-100"
          style={{
            backgroundColor: statusColors.backgroundHex,
            boxShadow: `0 0 12px 3px rgba(${statusColors.shadowRgba},0.9)`,
          }}
          aria-hidden
        />
        {/* soft halo with enhanced pulse */}
        <span
          className="absolute inset-0 rounded-full blur-[4px] animate-[pulse_1.5s_ease-in-out_infinite]"
          style={{ backgroundColor: `${statusColors.backgroundHex}cc` }}
          aria-hidden
        />
      </span>
      {label}
    </span>
  );
}
