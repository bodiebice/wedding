import { weddingRegistries } from "~/lib/wedding-details";
import SectionCard from "./SectionCard";

type RegistriesSectionProps = {
  id?: string;
};

export default function RegistriesSection({ id }: RegistriesSectionProps) {
  return (
    <SectionCard id={id} className="@container min-w-0">
      <h2 className="font-script text-3xl text-wedding-ink">Registries</h2>
      <ul className="mt-4 min-w-0 space-y-4 font-serif">
        {weddingRegistries.map((registry) => (
          <li key={registry.name} className="min-w-0">
            <p className="font-medium text-wedding-ink">{registry.name}</p>
            <a
              href={registry.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block min-w-0 max-w-full whitespace-nowrap font-serif text-[clamp(0.4375rem,4.15cqi,0.8125rem)] leading-snug text-wedding-accent underline-offset-2 transition hover:text-wedding-accent-hover"
            >
              {registry.displayUrl}
            </a>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
