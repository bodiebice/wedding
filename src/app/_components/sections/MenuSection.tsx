import { weddingMenu } from "~/lib/wedding-details";
import SectionCard from "./SectionCard";

export default function MenuSection() {
  return (
    <SectionCard>
      <h2 className="font-script text-3xl text-wedding-ink">Menu</h2>
      <div className="mt-4 space-y-2 font-serif text-wedding-muted">
        <p className="font-medium text-wedding-ink">{weddingMenu.vendor}</p>
        {weddingMenu.items.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
    </SectionCard>
  );
}
