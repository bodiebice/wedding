import Image from "next/image";
import {
  Cheers,
  Church,
  ForkKnife,
  MusicNotes,
} from "@phosphor-icons/react/ssr";
import { weddingSchedule, type ScheduleIcon } from "~/lib/wedding-details";
import SectionCard from "./SectionCard";

const iconClass = "mt-0.5 h-8 w-8 shrink-0 text-wedding-ink";
const iconSize = 32;

function ScheduleIconComponent({ icon }: { icon: ScheduleIcon }) {
  switch (icon) {
    case "church":
      return (
        <Church
          className={iconClass}
          size={iconSize}
          weight="regular"
          aria-hidden
        />
      );
    case "cheers":
      return (
        <Cheers
          className={iconClass}
          size={iconSize}
          weight="regular"
          aria-hidden
        />
      );
    case "fork-knife":
      return (
        <ForkKnife
          className={iconClass}
          size={iconSize}
          weight="regular"
          aria-hidden
        />
      );
    case "music":
      return (
        <MusicNotes
          className={iconClass}
          size={iconSize}
          weight="regular"
          aria-hidden
        />
      );
    case "dance":
      return (
        <Image
          src="/noun-wedding-dance-1317437.svg"
          alt=""
          width={iconSize}
          height={iconSize}
          className="mt-0.5 h-8 w-8 shrink-0 object-contain"
        />
      );
  }
}

export default function DaySchedule() {
  return (
    <SectionCard>
      <h2 className="font-script text-3xl text-wedding-ink">The Day</h2>
      <ul className="mt-6 space-y-5 font-serif">
        {weddingSchedule.map((item) => (
          <li key={item.label} className="flex gap-4">
            <ScheduleIconComponent icon={item.icon} />
            <div>
              <p className="font-medium">{item.time}</p>
              <p className="text-wedding-muted">{item.label}</p>
            </div>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
