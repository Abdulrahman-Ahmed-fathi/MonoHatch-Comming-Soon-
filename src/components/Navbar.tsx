import { useState } from "react";
import { Menu } from "lucide-react";
import { useTranslation } from "react-i18next";
import logoUrl from "@/assets/logo.png";
import DownloadAppButton from "@/components/DownloadAppButton";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Navbar() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const links = [
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.whatWeOffer"), href: "#features" },
    { label: t("nav.impact"), href: "#impact" },
    { label: t("nav.ourTeam"), href: "#team" },
    { label: t("nav.partnerships"), href: "#partner" },
  ];

  return (
    <header className="fixed top-0 z-50 w-full border-b border-[#efe8e5]/90 bg-white/75 backdrop-blur-xl">
      <div className="section-container flex items-center justify-between py-3">
        <a
          href="#top"
          className="flex shrink-0 items-center gap-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-french-rose focus:ring-offset-2"
        >
          <img
            src={logoUrl}
            alt="Mono Hatch"
            className="h-14 w-auto max-h-[3.5rem] mix-blend-multiply"
            style={{ maxWidth: "220px" }}
          />
          <span className="text-xl font-bold tracking-tight text-french-rose">{t("brand.name")}</span>
        </a>
        <nav className="hidden items-center gap-5 md:flex lg:gap-7">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="p2-b relative text-ink-warm/85 transition-colors hover:text-french-rose after:absolute after:-bottom-1 after:start-0 after:h-[2px] after:w-0 after:bg-french-rose after:transition-all hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
          <LanguageSwitcher />
          <DownloadAppButton size="sm" className="shrink-0" />
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            className="rounded-md p-2 text-french-rose focus:outline-none focus:ring-2 focus:ring-french-rose focus:ring-offset-2"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
      {open ? (
        <div className="border-t border-[#efe8e5] bg-white/95 shadow-lg md:hidden">
          <div className="section-container flex flex-col gap-3 py-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="p2-b py-1 text-ink-warm/90"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <DownloadAppButton
              size="sm"
              className="mt-2 w-full [&_button]:w-full [&_button]:justify-center"
            />
          </div>
        </div>
      ) : null}
    </header>
  );
}
