import * as React from "react";

type BrandmarkProps = React.SVGProps<SVGSVGElement> & {
  strokeWidth?: number;
};

export default function Brandmark({
  strokeWidth = 4, 
  className,
  ...props
}: BrandmarkProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      {/* O */}
      <circle
        cx="24"
        cy="24"
        r="20"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* M */}
      <path
        d="M14 30 V18 L24 26 L34 18 V30"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}