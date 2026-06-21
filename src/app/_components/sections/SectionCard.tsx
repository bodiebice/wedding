import { type ReactNode } from "react";

type SectionCardProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export default function SectionCard({
  children,
  className = "",
  id,
}: SectionCardProps) {
  return (
    <section
      id={id}
      className={`rounded-2xl border-2 border-wedding-ink/10 bg-white p-6 text-wedding-ink shadow-xl sm:p-8 ${className}`}
    >
      {children}
    </section>
  );
}
