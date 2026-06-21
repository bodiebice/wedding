import { contactEmail } from "~/lib/wedding-details";

export default function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-white/20 pt-8 text-center text-sm text-white/80">
      Questions? Email{" "}
      <a
        className="font-medium text-wedding-accent transition hover:text-wedding-accent-hover"
        href={`mailto:${contactEmail}`}
      >
        {contactEmail}
      </a>
    </footer>
  );
}
