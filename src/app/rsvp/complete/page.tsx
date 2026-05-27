import { type Metadata } from "next";
import Image from "next/image";
import {
  Cheers,
  Church,
  ForkKnife,
  MusicNotes,
} from "@phosphor-icons/react/ssr";

export const metadata: Metadata = {
  title: "RSVP Complete | Bodie & Abby's Wedding",
  description: "Thank you for your RSVP — details for our wedding day.",
};

const iconClass = "mt-0.5 h-8 w-8 shrink-0 text-wedding-ink";
const iconSize = 32;

export default function RsvpCompletePage() {
  return (
    <main className="min-h-screen px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-center font-script text-4xl text-white sm:text-5xl">
          RSVP Complete
        </h1>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          <section className="rounded-2xl border-2 border-wedding-ink/10 bg-white p-6 text-wedding-ink shadow-xl sm:p-8">
            <h2 className="font-script text-3xl text-wedding-ink">The Day</h2>
            <ul className="mt-6 space-y-5 font-serif">
              <li className="flex gap-4">
                <Church
                  className={iconClass}
                  size={iconSize}
                  weight="regular"
                  aria-hidden
                />
                <div>
                  <p className="font-medium">2:00</p>
                  <p className="text-wedding-muted">Ceremony</p>
                </div>
              </li>
              <li className="flex gap-4">
                <Cheers
                  className={iconClass}
                  size={iconSize}
                  weight="regular"
                  aria-hidden
                />
                <div>
                  <p className="font-medium">3:30</p>
                  <p className="text-wedding-muted">Cocktail hour</p>
                </div>
              </li>
              <li className="flex gap-4">
                <ForkKnife
                  className={iconClass}
                  size={iconSize}
                  weight="regular"
                  aria-hidden
                />
                <div>
                  <p className="font-medium">5:00</p>
                  <p className="text-wedding-muted">Dinner and toasts</p>
                </div>
              </li>
              <li className="flex gap-4">
                <MusicNotes
                  className={iconClass}
                  size={iconSize}
                  weight="regular"
                  aria-hidden
                />
                <div>
                  <p className="font-medium">6:30</p>
                  <p className="text-wedding-muted">Special dances</p>
                </div>
              </li>
              <li className="flex gap-4">
                <Image
                  src="/noun-wedding-dance-1317437.svg"
                  alt=""
                  width={iconSize}
                  height={iconSize}
                  className="mt-0.5 h-8 w-8 shrink-0 object-contain"
                />
                <div>
                  <p className="font-medium">11:00</p>
                  <p className="text-wedding-muted">Private last dance</p>
                </div>
              </li>
            </ul>
          </section>

          <section className="min-w-0 space-y-8">
            <div className="rounded-2xl border-2 border-wedding-ink/10 bg-white p-6 text-wedding-ink shadow-xl sm:p-8">
              <h2 className="font-script text-3xl text-wedding-ink">Menu</h2>
              <div className="mt-4 space-y-2 font-serif text-wedding-muted">
                <p className="font-medium text-wedding-ink">SMOAK — Rochester</p>
                <p>Pulled pork and brisket sandwiches</p>
                <p>Pit beans, mac &amp; cheese, and salad</p>
              </div>
            </div>
            <div className="@container min-w-0 rounded-2xl border-2 border-wedding-ink/10 bg-white p-6 text-wedding-ink shadow-xl sm:p-8">
              <h2 className="font-script text-3xl text-wedding-ink">Registries</h2>
              <ul className="mt-4 min-w-0 space-y-4 font-serif">
                <li className="min-w-0">
                  <p className="font-medium text-wedding-ink">Amazon</p>
                  <a
                    href="https://www.amazon.com/wedding/share/Bice26"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block min-w-0 max-w-full whitespace-nowrap font-serif text-[clamp(0.4375rem,4.15cqi,0.8125rem)] leading-snug text-wedding-accent underline-offset-2 transition hover:text-wedding-accent-hover"
                  >
                    www.amazon.com/wedding/share/Bice26
                  </a>
                </li>
                <li className="min-w-0">
                  <p className="font-medium text-wedding-ink">Target</p>
                  <a
                    href="https://www.target.com/gift-registry/gift/bicewedding2026"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block min-w-0 max-w-full whitespace-nowrap font-serif text-[clamp(0.4375rem,4.15cqi,0.8125rem)] leading-snug text-wedding-accent underline-offset-2 transition hover:text-wedding-accent-hover"
                  >
                    www.target.com/gift-registry/gift/bicewedding2026
                  </a>
                </li>
              </ul>
            </div>
          </section>

          <section className="rounded-2xl border-2 border-wedding-ink/10 bg-white p-6 text-wedding-ink shadow-xl sm:p-8">
            <h2 className="font-script text-3xl leading-tight text-wedding-ink">
              Hotel recommendations
            </h2>
            <p className="mt-4 font-serif text-sm leading-relaxed text-wedding-muted">
              We did not block any rooms at hotels, but below are some
              recommendations around the area.
            </p>
            <div className="mt-6 space-y-6 font-serif">
              <div>
                <p className="font-semibold text-wedding-ink">Mankato</p>
                <ul className="mt-2 space-y-1 text-sm text-wedding-muted">
                  <li>AmericInn by Wyndham Mankato Event Center</li>
                  <li>Holiday Inn Express Hotel and Suites Mankato East by IHG</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-wedding-ink">Owatonna</p>
                <ul className="mt-2 space-y-1 text-sm text-wedding-muted">
                  <li>Baymont by Wyndham Owatonna</li>
                  <li>DoubleTree by Hilton Owatonna</li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        <p className="mt-12 text-center font-serif text-sm text-white/85">
          Thank you again — we can&apos;t wait to celebrate with you.
        </p>
      </div>
    </main>
  );
}
