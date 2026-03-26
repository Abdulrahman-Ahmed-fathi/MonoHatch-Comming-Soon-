import { useState } from "react";
import { Menu } from "lucide-react";
import LandingButton from "@/components/ui/button";
import logoUrl from "@/assets/logo.png";

const links = [
  { label: "About", href: "#about" },
  { label: "What We Offer", href: "#features" },
  { label: "Impact", href: "#impact" },
  { label: "Our Team", href: "#team" },
  { label: "Partnerships", href: "#partner" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-[#efe8e5]/90 bg-white/75 backdrop-blur-xl">
      <div className="section-container flex items-center justify-between py-3">
        <a
          href="#top"
          className="shrink-0 rounded-sm flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-french-rose focus:ring-offset-2"
        >
          <img
            src={logoUrl}
            alt="Mono Hatch"
            className="h-14 w-auto max-h-[3.5rem] mix-blend-multiply"
            style={{ maxWidth: '220px' }}
          />
          <span className="text-xl font-bold tracking-tight text-french-rose">Mono Hatch</span>
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="p2-b relative text-ink-warm/85 transition-colors hover:text-french-rose after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-french-rose after:transition-all hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
          <LandingButton
            href="#free-trial"
            size="sm"
            className="px-6"
          >
            Free Trial
          </LandingButton>
        </nav>
        <button
          type="button"
          className="rounded-md p-2 text-french-rose focus:outline-none focus:ring-2 focus:ring-french-rose focus:ring-offset-2 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
      {open ? (
        <div className="border-t border-[#efe8e5] bg-white/95 shadow-lg md:hidden">
          <div className="section-container flex flex-col gap-3 py-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="p2-b text-ink-warm/90 py-1"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <LandingButton
              href="#free-trial"
              onClick={() => setOpen(false)}
              className="mt-2 w-full justify-center"
            >
              Free Trial
            </LandingButton>
          </div>
        </div>
      ) : null}
    </header>
  );
}
