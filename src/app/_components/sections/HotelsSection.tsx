import { weddingHotels } from "~/lib/wedding-details";
import SectionCard from "./SectionCard";

export default function HotelsSection() {
  return (
    <SectionCard>
      <h2 className="font-script text-3xl leading-tight text-wedding-ink">
        Hotel recommendations
      </h2>
      <p className="mt-4 font-serif text-sm leading-relaxed text-wedding-muted">
        {weddingHotels.intro}
      </p>
      <div className="mt-6 space-y-6 font-serif">
        {weddingHotels.areas.map((area) => (
          <div key={area.area}>
            <p className="font-semibold text-wedding-ink">{area.area}</p>
            <ul className="mt-2 space-y-1 text-sm text-wedding-muted">
              {area.hotels.map((hotel) => (
                <li key={hotel}>{hotel}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
