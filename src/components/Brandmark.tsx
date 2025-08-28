import * as React from "react";

/**
 * OM brandmark
 * - Inherits currentColor by default (works with your Tailwind hover/text classes)
 * - Optional gradient stroke via `gradient` prop
 * - Use size via className (e.g., "h-6 w-6")
 */
type BrandmarkProps = React.SVGProps<SVGSVGElement> & {
  gradient?: boolean;
  strokeWidth?: number;
};

export default function Brandmark({
  gradient = false,
  strokeWidth = 2.6,
  className,
  ...props
}: BrandmarkProps) {
  const gradId = React.useId();

  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      {gradient && (
        <defs>
          <linearGradient id={gradId} x1="8" y1="8" x2="40" y2="40">
            {/* accent purple -> accent blue */}
            <stop offset="0%" stopColor="#d4bfff" />
            <stop offset="100%" stopColor="#59c2ff" />
          </linearGradient>
        </defs>
      )}

      {/* O (outer ring) */}
      <circle
        cx="24"
        cy="24"
        r="20"
        stroke={gradient ? `url(#${gradId})` : "currentColor"}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* M (inside the O) */}
      <path
        d="M14 30 V18 L24 26 L34 18 V30"
        stroke={gradient ? `url(#${gradId})` : "currentColor"}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}