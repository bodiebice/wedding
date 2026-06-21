import DaySchedule from "./DaySchedule";
import HotelsSection from "./HotelsSection";
import MenuSection from "./MenuSection";
import RegistriesSection from "./RegistriesSection";

type WeddingDetailsGridProps = {
  id?: string;
};

export default function WeddingDetailsGrid({ id }: WeddingDetailsGridProps) {
  return (
    <div id={id} className="grid gap-8 lg:grid-cols-3">
      <DaySchedule />
      <section className="min-w-0 space-y-8">
        <MenuSection />
        <RegistriesSection id="registry" />
      </section>
      <HotelsSection />
    </div>
  );
}
