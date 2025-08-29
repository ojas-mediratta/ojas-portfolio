// Section.tsx
export default function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`py-8 md:py-16 ${className}`}  // ↓ from py-12/md:py-20
    >
      {children}
    </section>
  );
}