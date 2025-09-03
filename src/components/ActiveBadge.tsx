// components/ActiveBadge.tsx
interface ActiveBadgeProps {
  label?: string; // defaults to "Active"
}

export default function ActiveBadge({ label = "Active" }: ActiveBadgeProps) {
  return (
    <span className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-background/60 px-2.5 py-1 text-xs font-medium text-emerald-400">
      <span className="relative inline-flex h-2.5 w-2.5">
        {/* Bright dot */}
        <span
          className="absolute inset-0 rounded-full bg-emerald-400 shadow-[0_0_10px_2px_rgba(16,185,129,0.75)]"
          aria-hidden
        />
        {/* Soft halo pulse */}
        <span
          className="absolute inset-0 rounded-full bg-emerald-400/70 blur-[4px] opacity-80 animate-[pulse-glow_1.8s_ease-in-out_infinite]"
          aria-hidden
        />
      </span>
      {label}
    </span>
  );
}