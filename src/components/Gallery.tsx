import React from "react";

type Item = { src: string; alt?: string; href?: string };

const withBase = (path?: string) =>
    path ? `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}` : undefined;

/**
 * Masonry via CSS columns. Images stack vertically per column and wrap fluidly.
 */
export default function Gallery({ items }: { items: Item[] }) {
    if (!items?.length) return null;
    return (
        <div
            className="
        columns-1 gap-4
        sm:columns-2
        lg:columns-3
        [column-fill:balance]
      "
        >
            {items.map((it, i) => {
                const img = (
                    <img
                        src={withBase(it.src)}
                        alt={it.alt ?? `gallery image ${i + 1}`}
                        loading="lazy"
                        className="
              mb-4 w-full rounded-xl border border-border bg-bg/50
              object-cover
              break-inside-avoid
            "
                    />
                );
                return it.href ? (
                    <a
                        key={i}
                        href={it.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block break-inside-avoid"
                    >
                        {img}
                    </a>
                ) : (
                    <div key={i} className="break-inside-avoid">
                        {img}
                    </div>
                );
            })}
        </div>
    );
}