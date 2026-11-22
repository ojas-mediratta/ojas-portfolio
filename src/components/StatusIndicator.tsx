import { useTheme } from "@/contexts/ThemeContext";
import { getStatusColors } from "@/data/theme";

interface StatusIndicatorProps {
  label: string;
  className?: string;
}

/**
 * A status label with a bright white, pulsing dot.
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
            backgroundColor: '#ffffff',
            boxShadow: '0 0 12px 3px rgba(255,255,255,0.9)',
          }}
          aria-hidden
        />
        {/* soft halo with enhanced pulse */}
        <span
          className="absolute inset-0 rounded-full blur-[4px] animate-[pulse_1.5s_ease-in-out_infinite]"
          style={{ backgroundColor: 'rgba(255,255,255,0.8)' }}
          aria-hidden
        />
      </span>
      {label}
    </span>
  );
}
