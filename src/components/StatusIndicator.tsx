import { useTheme } from "@/contexts/ThemeContext";
import { getStatusColors } from "@/data/theme";

interface StatusIndicatorProps {
  label: string;
  className?: string;
}

/**
 * A status label with a green, pulsing dot.
 */
export default function StatusIndicator({ label, className = "" }: StatusIndicatorProps) {
  const { theme } = useTheme();
  const statusColors = getStatusColors(theme);
  const indicatorColor = statusColors.color;
  const indicatorCore = theme === 'light' ? `${indicatorColor}cc` : indicatorColor;
  const indicatorShadow = theme === 'light' ? `${indicatorColor}99` : `${indicatorColor}e6`;
  const indicatorHalo = theme === 'light' ? `${indicatorColor}73` : `${indicatorColor}cc`;

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
            backgroundColor: indicatorCore,
            boxShadow: `0 0 12px 3px ${indicatorShadow}`,
          }}
          aria-hidden
        />
        {/* soft halo with enhanced pulse */}
        <span
          className="absolute inset-0 rounded-full blur-[4px] animate-[pulse_1.5s_ease-in-out_infinite]"
          style={{ backgroundColor: indicatorHalo }}
          aria-hidden
        />
      </span>
      {label}
    </span>
  );
}
